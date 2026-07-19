"use strict";

const OWNER = "AstonLu";
const REPOSITORY = "file-download-hub";
const BRANCH = "main";
const DIRECTORY = "files";
const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;
const TOKEN_STORAGE_KEY = "file-download-hub.github-token";
const API_VERSION = "2022-11-28";
const API_ROOT = `https://api.github.com/repos/${OWNER}/${REPOSITORY}/contents`;
const UPLOAD_API = String(window.FILE_HUB_CONFIG?.uploadApi || "").replace(/\/$/, "");

const uploadModeElement = document.querySelector("#upload-mode");
const credentialStatus = document.querySelector("#credential-status");
const credentialToggle = document.querySelector("#credential-toggle");
const credentialPanel = document.querySelector("#credential-panel");
const tokenInput = document.querySelector("#github-token");
const toggleTokenButton = document.querySelector("#toggle-token");
const saveTokenButton = document.querySelector("#save-token");
const clearTokenButton = document.querySelector("#clear-token");
const dropZone = document.querySelector("#drop-zone");
const fileInput = document.querySelector("#file-input");
const chooseFileButton = document.querySelector("#choose-file");
const selectedFileName = document.querySelector("#selected-file-name");
const selectedFileMeta = document.querySelector("#selected-file-meta");
const uploadButton = document.querySelector("#upload-button");
const loginButton = document.querySelector("#login-button");
const uploadProgress = document.querySelector("#upload-progress");
const progressBar = document.querySelector("#progress-bar");
const uploadStatus = document.querySelector("#upload-status");
const postUploadLink = document.querySelector("#post-upload-link");

let selectedFile = null;
let uploadInProgress = false;

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) return "大小不明";
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB"];
  const unitIndex = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  const value = bytes / 1024 ** unitIndex;
  const digits = unitIndex === 0 || value >= 10 ? 0 : 1;
  return `${value.toFixed(digits)} ${units[unitIndex]}`;
}

function getExtension(filename) {
  const lastDot = filename.lastIndexOf(".");
  if (lastDot <= 0 || lastDot === filename.length - 1) return "無副檔名";
  return filename.slice(lastDot + 1).toUpperCase();
}

function encodePath(path) {
  return path.split("/").map(encodeURIComponent).join("/");
}

function normalizeFilename(filename) {
  return filename
    .normalize("NFC")
    .replace(/[\\/]/g, "_")
    .replace(/^\.+/, "")
    .trim();
}

function getStoredToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY) || "";
}

function setCredentialBadge(connected) {
  credentialStatus.textContent = connected ? "已連接" : "未連接";
  credentialStatus.classList.toggle("connected", connected);
}

function setCredentialPanel(open) {
  credentialPanel.hidden = !open;
  credentialToggle.setAttribute("aria-expanded", String(open));
}

function configureUploadMode() {
  if (UPLOAD_API) {
    uploadModeElement.textContent = "安全 API 模式";
    setCredentialBadge(true);
    credentialToggle.hidden = true;
    credentialPanel.hidden = true;
    loginButton.hidden = false;
    updateUploadButton();
    return;
  }

  loginButton.hidden = true;
  credentialToggle.hidden = false;
  const hasToken = Boolean(getStoredToken());
  uploadModeElement.textContent = hasToken
    ? "已記住此裝置的上傳權限"
    : "需要完成一次上傳權限設定";
  setCredentialBadge(hasToken);
  setCredentialPanel(!hasToken);
  updateUploadButton();
}

function saveToken() {
  const token = tokenInput.value.trim();
  if (!token) {
    setUploadMessage("請先貼上 GitHub Token。", "error", 0);
    return;
  }

  localStorage.setItem(TOKEN_STORAGE_KEY, token);
  tokenInput.value = "";
  tokenInput.type = "password";
  toggleTokenButton.textContent = "顯示";
  setCredentialPanel(false);
  configureUploadMode();
  setUploadMessage("上傳權限已儲存在這台裝置。", "success", 100);
}

function clearToken() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  tokenInput.value = "";
  postUploadLink.hidden = true;
  configureUploadMode();
  setUploadMessage("已清除這台裝置的上傳權限。", "neutral", 0);
}

function selectFile(file) {
  if (!file) return;

  postUploadLink.hidden = true;
  if (file.size > MAX_UPLOAD_BYTES) {
    selectedFile = null;
    selectedFileName.textContent = "檔案超過 25 MB";
    selectedFileMeta.textContent = `目前大小為 ${formatBytes(file.size)}`;
    dropZone.classList.remove("has-file");
    setUploadMessage("檔案大小超過上限。", "error", 0);
    updateUploadButton();
    return;
  }

  const normalizedName = normalizeFilename(file.name);
  if (!normalizedName) {
    selectedFile = null;
    setUploadMessage("檔名無效，請重新命名後再試。", "error", 0);
    updateUploadButton();
    return;
  }

  selectedFile = file;
  selectedFileName.textContent = normalizedName;
  selectedFileMeta.textContent = `${getExtension(normalizedName)} · ${formatBytes(file.size)}`;
  dropZone.classList.add("has-file");
  setUploadMessage("檔案已就緒。", "neutral", 0);
  updateUploadButton();
}

function updateUploadButton() {
  const hasCredential = Boolean(UPLOAD_API || getStoredToken());
  uploadButton.disabled = uploadInProgress || !selectedFile || !hasCredential;
}

function setUploadMessage(message, type = "neutral", progress = null) {
  uploadProgress.hidden = false;
  uploadStatus.textContent = message;
  uploadStatus.className = `upload-status ${type}`;
  progressBar.classList.toggle("indeterminate", progress === null);

  if (progress === null) {
    progressBar.style.width = "35%";
  } else {
    progressBar.style.width = `${Math.max(0, Math.min(100, progress))}%`;
  }
}

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = "";

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }

  return btoa(binary);
}

function githubHeaders(token) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": API_VERSION,
  };
}

async function getExistingFileSha(filename, token) {
  const endpoint = `${API_ROOT}/${encodePath(`${DIRECTORY}/${filename}`)}?ref=${BRANCH}`;
  const response = await fetch(endpoint, {
    cache: "no-store",
    headers: githubHeaders(token),
  });

  if (response.status === 404) return null;
  if (!response.ok) {
    const details = await response.json().catch(() => ({}));
    throw new Error(details.message || `無法檢查同名檔案（${response.status}）`);
  }

  const metadata = await response.json();
  return metadata.sha || null;
}

async function uploadWithGitHubToken(file) {
  const token = getStoredToken();
  if (!token) throw new Error("請先完成上傳權限設定。");

  const filename = normalizeFilename(file.name);
  setUploadMessage("正在檢查同名檔案…", "neutral", 8);
  const existingSha = await getExistingFileSha(filename, token);

  if (existingSha && !window.confirm(`「${filename}」已存在。是否覆蓋？`)) {
    throw new DOMException("使用者取消覆蓋", "AbortError");
  }

  setUploadMessage("正在準備檔案…", "neutral", 24);
  const content = arrayBufferToBase64(await file.arrayBuffer());
  setUploadMessage("正在寫入下載中心…", "neutral", 58);

  const endpoint = `${API_ROOT}/${encodePath(`${DIRECTORY}/${filename}`)}`;
  const payload = {
    message: existingSha ? `Replace ${filename}` : `Upload ${filename}`,
    content,
    branch: BRANCH,
  };
  if (existingSha) payload.sha = existingSha;

  const response = await fetch(endpoint, {
    method: "PUT",
    headers: {
      ...githubHeaders(token),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error("上傳權限無效或已到期，請重新設定憑證。");
    }
    throw new Error(result.message || `GitHub 上傳失敗（${response.status}）`);
  }

  return { filename, commitUrl: result.commit?.html_url || "" };
}

async function uploadWithWorker(file) {
  const filename = normalizeFilename(file.name);
  const formData = new FormData();
  formData.append("file", file, filename);

  setUploadMessage("正在傳送至安全上傳服務…", "neutral", null);
  let response = await fetch(`${UPLOAD_API}/upload`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (response.status === 409 && window.confirm(`「${filename}」已存在。是否覆蓋？`)) {
    formData.set("overwrite", "true");
    response = await fetch(`${UPLOAD_API}/upload`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
  }

  const result = await response.json().catch(() => ({}));
  if (response.status === 401 || response.status === 403) {
    throw new Error("請先完成私人上傳服務登入。");
  }
  if (!response.ok) {
    throw new Error(result.error || `上傳服務回應 ${response.status}`);
  }

  return { filename: result.filename || filename, commitUrl: result.commitUrl || "" };
}

function resetFileSelection() {
  selectedFile = null;
  fileInput.value = "";
  dropZone.classList.remove("has-file");
  selectedFileName.textContent = "選擇檔案或拖曳到這裡";
  selectedFileMeta.textContent = "單一檔案上限 25 MB";
}

async function handleUpload() {
  if (!selectedFile || uploadInProgress) return;

  uploadInProgress = true;
  updateUploadButton();
  uploadButton.textContent = "上傳中…";
  postUploadLink.hidden = true;

  try {
    const result = UPLOAD_API
      ? await uploadWithWorker(selectedFile)
      : await uploadWithGitHubToken(selectedFile);

    setUploadMessage(`「${result.filename}」上傳完成。`, "success", 100);
    resetFileSelection();
    postUploadLink.hidden = false;
  } catch (error) {
    if (error?.name === "AbortError") {
      setUploadMessage("已取消上傳。", "neutral", 0);
    } else {
      console.error("上傳失敗：", error);
      setUploadMessage(error?.message || "上傳失敗，請稍後再試。", "error", 0);
      if (/權限/.test(error?.message || "")) setCredentialPanel(true);
    }
  } finally {
    uploadInProgress = false;
    uploadButton.textContent = "開始上傳";
    updateUploadButton();
  }
}

credentialToggle.addEventListener("click", () => {
  setCredentialPanel(credentialPanel.hidden);
});

toggleTokenButton.addEventListener("click", () => {
  const show = tokenInput.type === "password";
  tokenInput.type = show ? "text" : "password";
  toggleTokenButton.textContent = show ? "隱藏" : "顯示";
});

saveTokenButton.addEventListener("click", saveToken);
clearTokenButton.addEventListener("click", clearToken);

chooseFileButton.addEventListener("click", (event) => {
  event.stopPropagation();
  fileInput.click();
});

dropZone.addEventListener("click", () => fileInput.click());
dropZone.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    fileInput.click();
  }
});
fileInput.addEventListener("change", () => selectFile(fileInput.files?.[0]));

for (const eventName of ["dragenter", "dragover"]) {
  dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropZone.classList.add("dragging");
  });
}

for (const eventName of ["dragleave", "drop"]) {
  dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropZone.classList.remove("dragging");
  });
}

dropZone.addEventListener("drop", (event) => {
  selectFile(event.dataTransfer?.files?.[0]);
});

uploadButton.addEventListener("click", handleUpload);
loginButton.addEventListener("click", () => {
  window.open(`${UPLOAD_API}/health`, "_blank", "noopener,noreferrer");
});

configureUploadMode();
