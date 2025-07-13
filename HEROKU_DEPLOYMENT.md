# Heroku 部署指南

## 快速部署步驟

### 1. 準備 GitHub 倉庫
```bash
# 確保所有檔案都已提交到 Git
git add .
git commit -m "準備 Heroku 部署"
git push origin main
```

### 2. 使用 Heroku 網頁界面部署

1. **登入 Heroku Dashboard**
   - 前往 https://dashboard.heroku.com/
   - 使用您的 Heroku 帳號登入

2. **創建新應用**
   - 點擊 "New" → "Create new app"
   - 輸入應用名稱（例如：`your-booking-system`）
   - 選擇地區（建議選擇離您最近的）
   - 點擊 "Create app"

3. **連接 GitHub 倉庫**
   - 在應用頁面，點擊 "Deploy" 標籤
   - 選擇 "GitHub" 作為部署方法
   - 連接您的 GitHub 帳號
   - 選擇您的預約系統倉庫
   - 選擇 `main` 分支

4. **設定 Buildpacks**
   - 在 "Settings" 標籤中
   - 點擊 "Add buildpack"
   - 添加以下 buildpacks（按順序）：
     - `heroku/python`
     - `heroku/nodejs`

5. **設定環境變數**
   - 在 "Settings" 標籤中
   - 點擊 "Reveal Config Vars"
   - 添加以下環境變數：
     ```
     SECRET_KEY = [生成一個隨機密鑰]
     NODE_ENV = production
     ```

6. **添加資料庫**
   - 在 "Resources" 標籤中
   - 點擊 "Find more add-ons"
   - 搜尋並添加 "Heroku Postgres"
   - 選擇 "Mini" 方案（免費）

7. **部署應用**
   - 回到 "Deploy" 標籤
   - 點擊 "Deploy Branch"
   - 等待部署完成

### 3. 初始化資料庫

部署完成後，需要初始化資料庫：

1. **打開 Heroku CLI（如果已安裝）**
```bash
heroku run python init_db.py --app your-app-name
```

2. **或使用 Heroku Dashboard**
   - 在應用頁面點擊 "More" → "Run console"
   - 輸入：`python init_db.py`
   - 點擊 "Run"

### 4. 設定自定義域名（可選）

1. 在 "Settings" 標籤中
2. 點擊 "Add domain"
3. 輸入您的域名
4. 按照指示設定 DNS

## 重要注意事項

### 環境變數設定
確保以下環境變數已正確設定：
- `SECRET_KEY`: JWT 密鑰
- `DATABASE_URL`: Heroku 會自動設定
- `NODE_ENV`: 設為 `production`

### 資料庫遷移
如果您的資料庫結構有變更，需要重新運行：
```bash
heroku run python init_db.py --app your-app-name
```

### 監控應用
- 使用 `heroku logs --tail --app your-app-name` 查看日誌
- 在 Heroku Dashboard 中監控應用狀態

### 常見問題

1. **部署失敗**
   - 檢查 `requirements.txt` 是否包含所有依賴
   - 確認 `Procfile` 格式正確
   - 查看部署日誌找出錯誤

2. **資料庫連接問題**
   - 確認已添加 Postgres 插件
   - 檢查 `DATABASE_URL` 環境變數

3. **靜態檔案問題**
   - 確認 `static` 目錄存在
   - 檢查檔案權限

## 成本估算

- **免費方案**：每月 550-1000 小時（足夠個人使用）
- **付費方案**：從 $7/月起
- **資料庫**：Postgres Mini 免費，其他方案需付費

## 支援

如果遇到問題：
1. 查看 Heroku 官方文檔
2. 檢查應用日誌
3. 聯繫 Heroku 支援 