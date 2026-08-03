"use strict";

const OWNER = "AstonLu";
const REPOSITORY = "file-download-hub";
const BRANCH = "main";
const DIRECTORY = "files";
const API_ROOT = `https://api.github.com/repos/${OWNER}/${REPOSITORY}/contents`;
const FILES_ENDPOINT = `${API_ROOT}/${DIRECTORY}?ref=${BRANCH}`;

const statusElement = document.querySelector("#status");
const fileListElement = document.querySelector("#file-list");
const fileCountElement = document.querySelector("#file-count");
const refreshButton = document.querySelector("#refresh-button");
const selectionModeButton = document.querySelector("#selection-mode-button");
const selectionToolbar = document.querySelector("#selection-toolbar");
const selectAllControl = document.querySelector("#select-all-control");
const selectAllCheckbox = document.querySelector("#select-all-checkbox");
const downloadSelectedButton = document.querySelector("#download-selected-button");
const deleteSelectedButton = document.querySelector("#delete-selected-button");
const deleteDialog = document.querySelector("#delete-dialog");
const deleteDialogTitle = document.querySelector("#delete-dialog-title");
const deleteDialogFilename = document.querySelector("#delete-dialog-filename");
const deleteDialogMessage = document.querySelector("#delete-dialog-message");
const deleteCancelButton = document.querySelector("#delete-cancel-button");
const deleteConfirmButton = document.querySelector("#delete-confirm-button");
const TOKEN_STORAGE_KEY = "file-download-hub.github-token";
const API_VERSION = "2022-11-28";
const UPLOAD_API = String(window.FILE_HUB_CONFIG?.uploadApi || "").replace(/\/$/, "");

let pendingDeletion = null;
let currentFiles = [];
const selectedPaths = new Set();
let selectionMode = false;

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

function getStoredToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY) || "";
}

function canDeleteFiles() {
  return Boolean(UPLOAD_API || getStoredToken());
}

function githubHeaders(token) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": API_VERSION,
  };
}

function getSelectedFiles() {
  return currentFiles.filter((file) => selectedPaths.has(file.path));
}

function updateSelectionControls() {
  const selectedCount = getSelectedFiles().length;
  const allSelected = currentFiles.length > 0 && selectedCount === currentFiles.length;

  selectionModeButton.hidden = currentFiles.length === 0;
  selectionModeButton.textContent = selectionMode ? "完成" : "選取";
  selectionModeButton.setAttribute("aria-pressed", String(selectionMode));
  selectionToolbar.hidden = !selectionMode || currentFiles.length === 0;
  selectAllControl.hidden = false;
  selectAllCheckbox.checked = allSelected;
  selectAllCheckbox.indeterminate = selectedCount > 0 && !allSelected;
  selectAllCheckbox.setAttribute(
    "aria-label",
    allSelected ? "取消全選" : "全選所有檔案",
  );

  downloadSelectedButton.hidden = selectedCount === 0;
  downloadSelectedButton.textContent = `下載已選（${selectedCount}）`;
  deleteSelectedButton.hidden = selectedCount === 0 || !canDeleteFiles();
  deleteSelectedButton.textContent = `刪除已選（${selectedCount}）`;
}

function setFileSelected(file, selected) {
  if (selected) {
    selectedPaths.add(file.path);
  } else {
    selectedPaths.delete(file.path);
  }
  updateSelectionControls();
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
  item.classList.toggle("selection-active", selectionMode);
  item.classList.toggle("is-selected", selectedPaths.has(file.path));

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

  const actions = document.createElement("div");
  actions.className = "file-actions";

  let selectLabel;
  if (selectionMode) {
    selectLabel = document.createElement("label");
    selectLabel.className = "file-select-control";
    selectLabel.title = `選取 ${file.name}`;

    const selectCheckbox = document.createElement("input");
    selectCheckbox.type = "checkbox";
    selectCheckbox.checked = selectedPaths.has(file.path);
    selectCheckbox.setAttribute("aria-label", `選取 ${file.name}`);
    selectCheckbox.addEventListener("change", () => {
      setFileSelected(file, selectCheckbox.checked);
      item.classList.toggle("is-selected", selectCheckbox.checked);
    });
    selectLabel.append(selectCheckbox);
  }

  const downloadButton = document.createElement("button");
  downloadButton.className = "download-button";
  downloadButton.type = "button";
  downloadButton.textContent = "下載";
  downloadButton.setAttribute("aria-label", `下載 ${file.name}`);
  downloadButton.addEventListener("click", () => downloadFile(file, downloadButton));
  actions.append(downloadButton);

  if (canDeleteFiles()) {
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-icon-button";
    deleteButton.type = "button";
    deleteButton.setAttribute("aria-label", `刪除 ${file.name}`);
    deleteButton.title = "刪除檔案";
    deleteButton.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M9 7V4.8c0-.44.36-.8.8-.8h4.4c.44 0 .8.36.8.8V7m-8.7 0 .72 12.05c.03.54.48.95 1.02.95h8.12c.54 0 .99-.41 1.02-.95L17.9 7M10 10.5v5.75m4-5.75v5.75" stroke="currentColor" stroke-width="1.65" stroke-linecap="round"/></svg>';
    deleteButton.addEventListener("click", () => openDeleteDialog([file], [deleteButton]));
    actions.append(deleteButton);
  }

  meta.append(extension, size);
  details.append(name, meta);
  if (selectLabel) {
    item.append(selectLabel, details, actions);
  } else {
    item.append(details, actions);
  }
  return item;
}

function renderFiles(files) {
  currentFiles = files;
  const validPaths = new Set(files.map((file) => file.path));
  for (const path of selectedPaths) {
    if (!validPaths.has(path)) selectedPaths.delete(path);
  }
  fileListElement.replaceChildren(...files.map(makeFileItem));
  fileCountElement.textContent = files.length === 1 ? "1 個檔案" : `${files.length} 個檔案`;
  statusElement.hidden = true;
  fileListElement.hidden = false;
  updateSelectionControls();
}

async function loadFiles() {
  fileListElement.hidden = true;
  refreshButton.hidden = true;
  currentFiles = [];
  selectedPaths.clear();
  updateSelectionControls();
  fileCountElement.textContent = "";
  showStatus("正在整理檔案…", { loading: true });

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
      fileCountElement.textContent = "尚無檔案";
      showStatus("這個檔案庫目前仍是空的。");
      return;
    }

    renderFiles(files);
  } catch (error) {
    console.error("載入檔案失敗：", error);
    showStatus("暫時無法讀取檔案，請稍後重試。", { error: true });
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

async function getLatestFileSha(filePath, token) {
  const endpoint = `${API_ROOT}/${encodePath(filePath)}?ref=${BRANCH}`;
  const response = await fetch(endpoint, {
    cache: "no-store",
    headers: githubHeaders(token),
  });
  const metadata = await response.json().catch(() => ({}));

  if (!response.ok || metadata.type !== "file" || !metadata.sha) {
    if (response.status === 401 || response.status === 403) {
      throw new Error("刪除權限無效或已到期，請重新設定憑證。");
    }
    throw new Error(metadata.message || "找不到要刪除的檔案。");
  }

  return metadata.sha;
}

async function deleteWithGitHubToken(file) {
  const token = getStoredToken();
  if (!token) throw new Error("這台裝置沒有刪除權限。");

  const sha = await getLatestFileSha(file.path, token);
  const response = await fetch(`${API_ROOT}/${encodePath(file.path)}`, {
    method: "DELETE",
    headers: {
      ...githubHeaders(token),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `Delete ${file.name}`,
      sha,
      branch: BRANCH,
    }),
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error("刪除權限無效或已到期，請重新設定憑證。");
    }
    throw new Error(result.message || `GitHub 刪除失敗（${response.status}）`);
  }
}

async function deleteWithWorker(file) {
  const response = await fetch(`${UPLOAD_API}/delete`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename: file.name }),
  });
  const result = await response.json().catch(() => ({}));

  if (response.status === 401 || response.status === 403) {
    throw new Error("請先完成私人上傳服務登入。");
  }
  if (!response.ok) {
    throw new Error(result.error || `刪除服務回應 ${response.status}`);
  }
}

function setDeleteDialogMessage(message = "") {
  deleteDialogMessage.textContent = message;
  deleteDialogMessage.hidden = !message;
}

function openDeleteDialog(files, buttons = []) {
  pendingDeletion = { files, buttons };
  const count = files.length;
  deleteDialogTitle.textContent = count === 1 ? "刪除這個檔案？" : `刪除 ${count} 個檔案？`;
  deleteDialogFilename.textContent = count === 1
    ? files[0].name
    : `已選取 ${count} 個檔案`;
  setDeleteDialogMessage();
  deleteCancelButton.disabled = false;
  deleteConfirmButton.disabled = false;
  deleteConfirmButton.textContent = "刪除檔案";
  deleteDialog.showModal();
  deleteConfirmButton.focus();
}

async function confirmDeletion() {
  if (!pendingDeletion) return;

  const { files, buttons } = pendingDeletion;
  deleteConfirmButton.disabled = true;
  deleteCancelButton.disabled = true;
  setDeleteDialogMessage();
  buttons.forEach((button) => { button.disabled = true; });

  let completedCount = 0;

  try {
    for (const file of files) {
      deleteConfirmButton.textContent = files.length === 1
        ? "刪除中…"
        : `刪除中（${completedCount + 1}/${files.length}）…`;
      if (UPLOAD_API) {
        await deleteWithWorker(file);
      } else {
        await deleteWithGitHubToken(file);
      }
      completedCount += 1;
    }

    deleteDialog.close();
    pendingDeletion = null;
    showStatus("刪除完成，正在重新整理頁面…", { loading: true });
    window.setTimeout(() => window.location.reload(), 350);
  } catch (error) {
    console.error("刪除檔案失敗：", error);
    if (completedCount > 0) {
      deleteDialog.close();
      pendingDeletion = null;
      showStatus(`已刪除 ${completedCount} 個檔案，正在重新整理頁面…`, { loading: true });
      window.setTimeout(() => window.location.reload(), 350);
      return;
    }
    setDeleteDialogMessage(error?.message || "刪除失敗，請稍後再試。");
    deleteConfirmButton.disabled = false;
    deleteCancelButton.disabled = false;
    deleteConfirmButton.textContent = "再試一次";
    buttons.forEach((button) => { button.disabled = false; });
  }
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

async function downloadFileToDevice(file) {
  let freshUrl;

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

    freshUrl ||= await getFreshDownloadUrl(file.path);
    window.open(freshUrl, "_blank", "noopener,noreferrer");
  }
}

async function downloadFile(file, button) {
  const originalText = button.textContent;
  button.disabled = true;
  button.replaceChildren();
  const spinner = document.createElement("span");
  spinner.className = "button-spinner";
  spinner.setAttribute("aria-hidden", "true");
  button.append(spinner, "下載中…");

  try {
    await downloadFileToDevice(file);
  } catch (error) {
    console.error("下載失敗：", error);
    window.alert("目前無法下載此檔案，請稍後再試。");
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
}

async function downloadSelectedFiles() {
  const files = getSelectedFiles();
  if (files.length === 0) return;

  const originalText = downloadSelectedButton.textContent;
  downloadSelectedButton.disabled = true;
  const failures = [];

  try {
    for (const [index, file] of files.entries()) {
      downloadSelectedButton.textContent = `下載中（${index + 1}/${files.length}）`;
      try {
        await downloadFileToDevice(file);
      } catch (error) {
        console.error(`下載 ${file.name} 失敗：`, error);
        failures.push(file.name);
      }
    }
  } finally {
    downloadSelectedButton.disabled = false;
    downloadSelectedButton.textContent = originalText;
  }

  if (failures.length > 0) {
    window.alert(`有 ${failures.length} 個檔案無法下載，請稍後再試。`);
  }
}

refreshButton.addEventListener("click", loadFiles);
selectionModeButton.addEventListener("click", () => {
  selectionMode = !selectionMode;
  if (!selectionMode) selectedPaths.clear();
  renderFiles(currentFiles);
});
selectAllCheckbox.addEventListener("change", () => {
  if (selectAllCheckbox.checked) {
    currentFiles.forEach((file) => selectedPaths.add(file.path));
  } else {
    selectedPaths.clear();
  }
  renderFiles(currentFiles);
});
downloadSelectedButton.addEventListener("click", downloadSelectedFiles);
deleteSelectedButton.addEventListener("click", () => {
  const files = getSelectedFiles();
  const buttons = Array.from(document.querySelectorAll(".delete-icon-button"));
  if (files.length > 0) openDeleteDialog(files, buttons);
});
deleteCancelButton.addEventListener("click", () => deleteDialog.close());
deleteDialog.addEventListener("cancel", () => {
  pendingDeletion = null;
});
deleteDialog.addEventListener("close", () => {
  pendingDeletion = null;
});
deleteConfirmButton.addEventListener("click", confirmDeletion);
loadFiles();
