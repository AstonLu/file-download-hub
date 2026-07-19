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
  button.textContent = "下載";
  button.setAttribute("aria-label", `下載 ${file.name}`);
  button.addEventListener("click", () => downloadFile(file, button));

  meta.append(extension, size);
  details.append(name, meta);
  item.append(details, button);
  return item;
}

function renderFiles(files) {
  fileListElement.replaceChildren(...files.map(makeFileItem));
  fileCountElement.textContent = files.length === 1 ? "1 個檔案" : `${files.length} 個檔案`;
  statusElement.hidden = true;
  fileListElement.hidden = false;
}

async function loadFiles() {
  fileListElement.hidden = true;
  refreshButton.hidden = true;
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

refreshButton.addEventListener("click", loadFiles);
loadFiles();
