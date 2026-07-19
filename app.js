"use strict";

const OWNER = "AstonLu";
const REPOSITORY = "file-download-hub";
const BRANCH = "main";
const DIRECTORY = "files";
const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;
const TOKEN_STORAGE_KEY = "file-download-hub.github-token";
const API_VERSION = "2022-11-28";
const API_ROOT = `https://api.github.com/repos/${OWNER}/${REPOSITORY}/contents`;
const FILES_ENDPOINT = `${API_ROOT}/${DIRECTORY}?ref=${BRANCH}`;
const UPLOAD_API = String(window.FILE_HUB_CONFIG?.uploadApi || "").replace(/\/$/, "");

const statusElement = document.querySelector("#status");
const fileListElement = document.querySelector("#file-list");
const fileCountElement = document.querySelector("#file-count");
const refreshButton = document.querySelector("#refresh-button");
const uploadModeElement = document.querySelector("#upload-mode");
const tokenPanel = document.querySelector("#token-panel");
const tokenInput = document.querySelector("#github-token");
const rememberTokenInput = document.querySelector("#remember-token");
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

let selectedFile = null;
let uploadInProgress = false;

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) return "大小不明";
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB", "TB"];
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

function isVisibleFile(entry) {
  return (
    entry &&
    entry.type === "file" &&
    typeof entry.name === "string" &&
    !entry.name.startsWith(".")
  );
}

function encodePath(path) {
  return path.split("/").map(encodeURIComponent).join("/");
}

function showStatus(message, { loading = false, error = false } = {}) {
  statusElement.replaceChildren();
  statusElement.classList.toggle("error", error);

  if (loading) {
    const spinner = document.createElement("span");
    spinner.className = "spinner";
    spinner.setAttribute("aria-hidden", "true");
    statusElement.append(spinner);
  }

  const text = document.createElement("span");
  text.textContent = message;
  statusElement.append(text);
  statusElement.hidden = false;
}

function makeFileItem(file) {
  const item = document.createElement("li");
  item.className = "file-item";

  const details = document.createElement("div");
  details.className = "file-details";

  const name = document.createElement("p");
  name.className = "file-name";
  name.textContent = file.name;
  name.title = file.name;

  const meta = document.createElement("p");
  meta.className = "file-meta";

  const extension = document.createElement("span");
  extension.className = "extension";
  extension.textContent = getExtension(file.name);

  const size = document.createElement("span");
  size.textContent = formatBytes(file.size);

  const button = document.createElement("button");
  button.className = "download-button";
  button.type = "button";
  button.textContent = "下載檔案";
  button.setAttribute("aria-label", `下載 ${file.name}`);
  button.addEventListener("click", () => downloadFile(file, button));

  meta.append(extension, size);
  details.append(name, meta);
  item.append(details, button);
  return item;
}

function renderFiles(files) {
  fileListElement.replaceChildren(...files.map(makeFileItem));
  fileCountElement.textContent = `共 ${files.length} 個檔案`;
  statusElement.hidden = true;
  fileListElement.hidden = false;
}

async function loadFiles() {
  fileListElement.hidden = true;
  refreshButton.hidden = true;
  fileCountElement.textContent = "";
  showStatus("正在載入檔案…", { loading: true });

  try {
    const response = await fetch(FILES_ENDPOINT, {
      cache: "no-store",
      headers: { Accept: "application/vnd.github+json" },
    });

    if (!response.ok) {
      throw new Error(`GitHub API 回應 ${response.status}`);
    }

    const entries = await response.json();
    if (!Array.isArray(entries)) {
      throw new Error("GitHub API 回傳格式不符預期");
    }

    const files = entries
      .filter(isVisibleFile)
      .map(({ name, path, size }) => ({ name, path, size }))
      .sort((a, b) =>
        a.name.localeCompare(b.name, "zh-Hant", {
          numeric: true,
          sensitivity: "base",
        }),
      );

    if (files.length === 0) {
      fileCountElement.textContent = "共 0 個檔案";
      showStatus("目前沒有可下載的檔案。");
      return;
    }

    renderFiles(files);
  } catch (error) {
    console.error("載入檔案失敗：", error);
    showStatus("無法載入檔案，請稍後再試。", { error: true });
    refreshButton.hidden = false;
  }
}

async function getFreshDownloadUrl(filePath) {
  const endpoint = `${API_ROOT}/${encodePath(filePath)}?ref=${BRANCH}`;
  const response = await fetch(endpoint, {
    cache: "no-store",
    headers: { Accept: "application/vnd.github+json" },
  });

  if (!response.ok) {
    throw new Error(`無法取得最新檔案網址（${response.status}）`);
  }

  const metadata = await response.json();
  if (metadata.type !== "file" || !metadata.download_url) {
    throw new Error("找不到可下載的檔案網址");
  }

  return metadata.download_url;
}

function saveBlob(blob, filename) {
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = filename;
  anchor.hidden = true;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
}

async function downloadFile(file, button) {
  const originalText = button.textContent;
  let freshUrl;

  button.disabled = true;
  button.replaceChildren();
  const spinner = document.createElement("span");
  spinner.className = "button-spinner";
  spinner.setAttribute("aria-hidden", "true");
  button.append(spinner, "下載中…");

  try {
    freshUrl = await getFreshDownloadUrl(file.path);
    const response = await fetch(freshUrl, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`檔案下載失敗（${response.status}）`);
    }

    const blob = await response.blob();
    saveBlob(blob, file.name);
  } catch (error) {
    console.error("Blob 下載失敗，改用原始檔案網址：", error);

    try {
      freshUrl ||= await getFreshDownloadUrl(file.path);
      window.open(freshUrl, "_blank", "noopener,noreferrer");
    } catch (fallbackError) {
      console.error("備用下載亦失敗：", fallbackError);
      window.alert("目前無法下載此檔案，請稍後再試。");
    }
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
}

function getStoredToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY) || sessionStorage.getItem(TOKEN_STORAGE_KEY) || "";
}

function saveToken() {
  const token = tokenInput.value.trim();
  if (!token) {
    setUploadMessage("請先輸入 GitHub Token。", "error");
    return;
  }

  localStorage.removeItem(TOKEN_STORAGE_KEY);
  sessionStorage.removeItem(TOKEN_STORAGE_KEY);
  const storage = rememberTokenInput.checked ? localStorage : sessionStorage;
  storage.setItem(TOKEN_STORAGE_KEY, token);
  setUploadMessage(rememberTokenInput.checked ? "Token 已儲存在這台裝置。" : "Token 已暫存至本次瀏覽工作階段。", "success");
  updateUploadButton();
}

function clearToken() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  sessionStorage.removeItem(TOKEN_STORAGE_KEY);
  tokenInput.value = "";
  rememberTokenInput.checked = false;
  setUploadMessage("Token 已清除。", "success");
  updateUploadButton();
}

function configureUploadMode() {
  if (UPLOAD_API) {
    uploadModeElement.textContent = "安全 API 模式：登入後直接上傳";
    tokenPanel.hidden = true;
    loginButton.hidden = false;
    loginButton.addEventListener("click", () => window.open(`${UPLOAD_API}/health`, "_blank", "noopener,noreferrer"));
    return;
  }

  uploadModeElement.textContent = "GitHub Token 模式：只在你的裝置儲存權限";
  tokenPanel.hidden = false;
  loginButton.hidden = true;
  const storedToken = getStoredToken();
  tokenInput.value = storedToken;
  rememberTokenInput.checked = Boolean(localStorage.getItem(TOKEN_STORAGE_KEY));
}

function normalizeFilename(filename) {
  return filename.normalize("NFC").replace(/[\\/]/g, "_").replace(/^\.+/, "").trim();
}

function selectFile(file) {
  if (!file) return;
  if (file.size > MAX_UPLOAD_BYTES) {
    selectedFile = null;
    selectedFileName.textContent = "檔案超過 25 MB";
    selectedFileMeta.textContent = `目前大小為 ${formatBytes(file.size)}，請改用較小檔案。`;
    setUploadMessage("檔案大小超過上限。", "error");
    updateUploadButton();
    return;
  }

  const normalizedName = normalizeFilename(file.name);
  if (!normalizedName) {
    setUploadMessage("檔名無效，請重新命名後再試。", "error");
    return;
  }

  selectedFile = file;
  selectedFileName.textContent = normalizedName;
  selectedFileMeta.textContent = `${getExtension(normalizedName)} · ${formatBytes(file.size)}`;
  dropZone.classList.add("has-file");
  setUploadMessage("檔案已就緒。", "neutral");
  updateUploadButton();
}

function updateUploadButton() {
  const hasCredential = UPLOAD_API || Boolean(getStoredToken() || tokenInput.value.trim());
  uploadButton.disabled = uploadInProgress || !selectedFile || !hasCredential;
}

function setUploadMessage(message, type = "neutral", progress = null) {
  uploadProgress.hidden = false;
  uploadStatus.textContent = message;
  uploadStatus.className = `upload-status ${type}`;
  progressBar.classList.toggle("indeterminate", progress === null);
  if (progress !== null) {
    progressBar.style.width = `${Math.max(0, Math.min(100, progress))}%`;
  } else {
    progressBar.style.width = "35%";
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
  const token = tokenInput.value.trim() || getStoredToken();
  if (!token) throw new Error("請先輸入並儲存 GitHub Token。");

  const filename = normalizeFilename(file.name);
  setUploadMessage("正在檢查同名檔案…", "neutral", 8);
  const existingSha = await getExistingFileSha(filename, token);
  if (existingSha && !window.confirm(`「${filename}」已存在。是否覆蓋？`)) {
    throw new DOMException("使用者取消覆蓋", "AbortError");
  }

  setUploadMessage("正在讀取並編碼檔案…", "neutral", 20);
  const content = arrayBufferToBase64(await file.arrayBuffer());
  setUploadMessage("正在上傳至 GitHub…", "neutral", 55);

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
    throw new Error("請先點選「登入上傳服務」，完成 Email 驗證後再試。");
  }
  if (!response.ok) {
    throw new Error(result.error || `上傳服務回應 ${response.status}`);
  }

  return { filename: result.filename || filename, commitUrl: result.commitUrl || "" };
}

async function handleUpload() {
  if (!selectedFile || uploadInProgress) return;

  uploadInProgress = true;
  updateUploadButton();
  uploadButton.textContent = "上傳中…";

  try {
    const result = UPLOAD_API
      ? await uploadWithWorker(selectedFile)
      : await uploadWithGitHubToken(selectedFile);

    setUploadMessage(`「${result.filename}」上傳完成。`, "success", 100);
    selectedFile = null;
    fileInput.value = "";
    dropZone.classList.remove("has-file");
    selectedFileName.textContent = "選擇檔案或拖曳到這裡";
    selectedFileMeta.textContent = "單一檔案上限 25 MB，檔案會公開出現在下載清單";
    await loadFiles();
  } catch (error) {
    if (error?.name === "AbortError") {
      setUploadMessage("已取消上傳。", "neutral", 0);
    } else {
      console.error("上傳失敗：", error);
      setUploadMessage(error?.message || "上傳失敗，請稍後再試。", "error", 0);
    }
  } finally {
    uploadInProgress = false;
    uploadButton.textContent = "開始上傳";
    updateUploadButton();
  }
}

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
dropZone.addEventListener("drop", (event) => selectFile(event.dataTransfer?.files?.[0]));

toggleTokenButton.addEventListener("click", () => {
  const show = tokenInput.type === "password";
  tokenInput.type = show ? "text" : "password";
  toggleTokenButton.textContent = show ? "隱藏" : "顯示";
});
saveTokenButton.addEventListener("click", saveToken);
clearTokenButton.addEventListener("click", clearToken);
tokenInput.addEventListener("input", updateUploadButton);
uploadButton.addEventListener("click", handleUpload);
refreshButton.addEventListener("click", loadFiles);

configureUploadMode();
updateUploadButton();
loadFiles();
