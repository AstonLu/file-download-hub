# Cloudflare Worker 安全上傳服務

這個 Worker 讓 GitHub Pages 從手機或私人電腦上傳檔案，但不把 GitHub Token 放進瀏覽器。

## 一次性部署

1. 複製設定檔：`cp wrangler.toml.example wrangler.toml`
2. 將 `ALLOWED_EMAIL` 改成你的 Email
3. 建立只限 `AstonLu/file-download-hub`、Contents read/write 的 GitHub fine-grained token
4. 執行 `npx wrangler secret put GITHUB_TOKEN`
5. 執行 `npx wrangler deploy`
6. 在 Cloudflare Zero Trust 對 Worker 網址建立 Access application，只允許相同 Email
7. 將 Worker 網址填入根目錄 `config.js` 的 `uploadApi`

## 安全原則

- `GITHUB_TOKEN` 必須放在 Worker Secret，不得寫入 repository
- Cloudflare Access 必須在公開使用前啟用
- Worker 會再次比對 `Cf-Access-Authenticated-User-Email` 與 `ALLOWED_EMAIL`
- 單檔上限為 25 MB
