# 檔案下載中心

GitHub Pages 網站，可從私人電腦或手機上傳公開檔案，並在同一頁一鍵下載。

網站 URL：<https://astonlu.github.io/file-download-hub/>

## 目前功能

- 自動列出 `/files` 第一層的公開檔案
- 一鍵下載並保留原始檔名
- 手機與桌面版上傳介面
- 拖曳上傳、檔案大小檢查、同名覆蓋確認
- 兩種上傳模式：
  - 立即可用：私人裝置儲存 GitHub fine-grained token，瀏覽器直接呼叫 GitHub API
  - 建議正式版：Cloudflare Access + Worker，Token 僅存放於 Worker Secret

## 立即啟用上傳

建立 GitHub fine-grained personal access token：

- Repository access：Only select repositories → `file-download-hub`
- Repository permissions：Contents → Read and write
- 建議設定有效期限

打開網站後，在「上傳檔案」區輸入 Token。勾選「僅儲存在這台裝置」才會寫入瀏覽器 localStorage；未勾選時只暫存在該瀏覽工作階段。

## 升級為 Email 登入

Worker 程式位於 `worker/`。完成 `worker/README.md` 的一次性部署後，把 Worker URL 填入 `config.js`：

```js
window.FILE_HUB_CONFIG = Object.freeze({
  uploadApi: "https://file-download-hub-upload.your-subdomain.workers.dev",
});
```

設定後，前端會自動隱藏 Token 欄位，改用 Cloudflare Access 驗證。

## 儲存庫結構

```text
file-download-hub/
├── index.html
├── styles.css
├── app.js
├── config.js
├── files/
└── worker/
    ├── src/index.js
    ├── wrangler.toml.example
    └── README.md
```

## 讓 ChatGPT 或 Codex 快速上傳

> Upload the attached file to `AstonLu/file-download-hub` under `/files` using the GitHub Git Data API as a single binary blob, preserve the original filename, commit directly to `main`, verify the blob SHA, and return the website URL.

使用 single binary blob 可避免將 Excel 或 PDF 拆成多段 Base64 再由 GitHub Actions 重組。

## 限制

- `/files` 中的內容完全公開，請勿上傳機密或個人敏感資料
- 網頁上傳限制為單檔 25 MB
- GitHub 一般 repository 不適合存放大型檔案；大型檔案應改用 Releases 或物件儲存服務
