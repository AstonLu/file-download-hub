# 檔案下載中心

以 GitHub Pages 架設的極簡公開檔案下載網站。網站會在瀏覽器載入時直接讀取 GitHub Contents API，因此新增檔案後不需要維護 manifest 或執行建置指令。

網站 URL：<https://astonlu.github.io/file-download-hub/>

## 儲存庫結構

```text
file-download-hub/
├── index.html       # 網站頁面
├── styles.css       # 響應式樣式
├── app.js           # 檔案清單與強制下載邏輯
├── .nojekyll        # 停用 GitHub Pages 的 Jekyll 處理
└── files/           # 公開下載檔案（只讀取此目錄的第一層）
```

## 讓另一個 chatbot 上傳檔案

請使用下列可重複使用的指令：

> “Upload the attached file to `AstonLu/file-download-hub` under `/files`, preserve the original filename, commit directly to `main`, and return the website URL.”

上傳規則：

- 檔案必須直接放在 `/files` 下；不要放入子目錄。
- 保留原始檔名，將變更提交並推送至 `main`。
- GitHub 收到 commit 後，網站便會自動顯示檔案，不需修改清單或重新建置。
- 本儲存庫及 `/files` 內的所有檔案都是公開可存取的，請勿上傳機密資料。

建議 agent 透過 Git 或 GitHub API commit 並 push。標準 GitHub 儲存庫會封鎖大於 100 MiB 的單一檔案；瀏覽器上傳的限制更低。較大的檔案請改用 GitHub Releases 或其他物件儲存服務。
