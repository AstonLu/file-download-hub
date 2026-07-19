# PWA icon assets

正式圖示完成後，請將下列 PNG 放進這個目錄：

- `apple-touch-icon.png` — 180 × 180，供 iPhone / iPad Home Screen 使用
- `app-icon-192.png` — 192 × 192，供 web app manifest 使用
- `app-icon-512.png` — 512 × 512，供 web app manifest（含 maskable safe area）使用
- `source/app-icon-source-1024.png` — 1024 × 1024 原始設計檔

HTML 與 manifest 已使用相對路徑參照上述前三個檔案，因此在 GitHub Pages 的 `/file-download-hub/` 子目錄可正常運作。請不要在這個目錄存放 Token、憑證或其他敏感資料。
