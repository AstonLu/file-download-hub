# 檔案下載中心

以 GitHub Pages 架設的個人公開檔案下載網站。首頁會直接讀取 GitHub Contents API，因此新增檔案後不需要維護 manifest 或執行建置指令。

網站 URL：<https://astonlu.github.io/file-download-hub/>

## 使用方式

- 首頁只顯示公開下載清單
- 標題區右上角的低對比星點圖示會進入私人上傳頁
- 上傳頁網址為 `/upload.html`，並設定 `noindex`
- 首次在裝置上使用時輸入 fine-grained GitHub Token
- Token 只保存在該裝置的瀏覽器 `localStorage`，之後不再顯示輸入欄位
- 清除瀏覽器網站資料或 Token 到期後，需要重新設定

隱藏入口與 `noindex` 只能降低被偶然發現的機率，不構成真正的存取控制。正式安全模式可透過 `config.js` 接入 Cloudflare Access 與 `worker/` 上傳服務，將 GitHub Token 存放在 Worker Secret。

## 儲存庫結構

```text
file-download-hub/
├── index.html       # 公開下載首頁
├── app.js           # 下載清單與下載邏輯
├── upload.html      # 私人上傳頁
├── upload.js        # 裝置憑證與上傳邏輯
├── config.js        # 可選的安全上傳 API 設定
├── styles.css       # 桌面與行動版樣式
├── worker/          # Cloudflare Worker 安全上傳服務
├── .nojekyll        # 停用 GitHub Pages 的 Jekyll 處理
└── files/           # 公開下載檔案
```

## 上傳權限

建立 GitHub fine-grained personal access token：

- Repository access：Only select repositories → `file-download-hub`
- Repository permissions：Contents → Read and write
- 建議設定有效期限

每台私人裝置只需設定一次。Token 會持續保存在該裝置，直到網站資料被清除或 Token 失效。

## 讓 ChatGPT 或其他 Agent 上傳檔案

可使用下列指令：

> Upload the attached file to `AstonLu/file-download-hub` under `/files`, preserve the original filename, create one binary blob, commit directly to `main`, and return the website URL. Do not split the file into Base64 text chunks or use a reconstruction workflow.

上傳規則：

- 檔案必須直接放在 `/files` 下
- 保留原始檔名
- 使用 GitHub binary blob、tree、commit 與 ref 流程，避免文字分段重組
- repository 與 `/files` 內檔案皆為公開存取，請勿上傳機密資料
- 網頁上傳限制為單檔 25 MB
