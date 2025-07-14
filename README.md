# 線上預約系統

一個完整的線上預約管理系統，採用前後端分離架構，已部署至雲端平台。

## 🌟 功能特色

- ✅ 線上預約管理
- ✅ 時間表管理
- ✅ QR Code 確認
- ✅ 多員工帳號
- ✅ 多店舖管理
- ✅ 網店功能
- ✅ 線上線下收款
- ✅ 促銷活動
- ✅ 會員積分
- ✅ 推薦計劃
- ✅ 數據分析
- ✅ 客戶管理
- ✅ 通知中心
- ✅ 手機版響應式設計

## 🚀 線上體驗

- **前端網站**: https://david2fat.github.io/booking-system/
- **後端 API**: https://david2fat-booking-system-299d0c6a305f.herokuapp.com/api/v1
- **API 文件**: https://david2fat-booking-system-299d0c6a305f.herokuapp.com/docs

## 🛠 技術架構

### 後端 (Backend)
- **框架**: FastAPI (Python)
- **資料庫**: PostgreSQL (Heroku Postgres)
- **ORM**: SQLAlchemy
- **認證**: JWT
- **API 文件**: Swagger UI
- **部署平台**: Heroku

### 前端 (Frontend)
- **框架**: React 18
- **語言**: TypeScript
- **狀態管理**: Redux Toolkit
- **路由**: React Router
- **UI 組件**: Ant Design
- **HTTP 客戶端**: Axios
- **部署平台**: GitHub Pages

## 📱 手機版支援

- **響應式設計**: 支援所有螢幕尺寸
- **觸控優化**: 適合手指操作
- **漢堡選單**: 手機版側邊欄
- **簡潔介面**: 清晰的視覺層次

## 🚀 快速啟動

### 1. 克隆專案
```bash
git clone https://github.com/david2fat/booking-system.git
cd booking-system
```

### 2. 本地開發 - 後端
```bash
cd backend
python -m venv venv
source venv/bin/activate  # macOS/Linux
# 或 venv\Scripts\activate  # Windows
pip install -r requirements.txt
python -m uvicorn main:app --host 0.0.0.0 --port 8008 --reload
```

### 3. 本地開發 - 前端
```bash
cd frontend
npm install
npm start
```

## 🌐 雲端部署

### 後端部署 (Heroku)
1. **建立 Heroku 應用**
2. **設定環境變數**
   - `DATABASE_URL`: PostgreSQL 資料庫連線
   - `SECRET_KEY`: JWT 密鑰
3. **部署命令**
   ```bash
   heroku create your-app-name
   heroku addons:create heroku-postgresql:mini
   git push heroku main
   ```

### 前端部署 (GitHub Pages)
1. **設定 GitHub Pages**
   - 分支: `gh-pages`
   - 來源: Deploy from a branch
2. **自動部署**
   ```bash
   npm run build
   git checkout gh-pages
   cp -r build/* .
   git add . && git commit -m "deploy"
   git push origin gh-pages
   ```

## 📁 專案結構

```
預約系統/
├── backend/                 # FastAPI 後端
│   ├── app/                # 應用模組
│   │   ├── api/           # API 路由
│   │   ├── core/          # 核心設定
│   │   ├── crud/          # 資料庫操作
│   │   ├── models/        # 資料模型
│   │   └── schemas/       # 資料驗證
│   ├── main.py            # 主入口文件
│   ├── requirements.txt   # Python 依賴
│   └── Procfile          # Heroku 部署配置
├── frontend/              # React 前端
│   ├── src/              # 源代碼
│   │   ├── components/   # 通用組件
│   │   ├── pages/        # 頁面組件
│   │   ├── store/        # Redux store
│   │   └── App.tsx       # 主應用
│   ├── public/           # 靜態文件
│   └── package.json      # Node.js 依賴
├── .github/              # GitHub 配置
└── README.md             # 專案說明
```

## 🔧 開發指南

### 後端開發
- API 端點在 `backend/app/api/` 目錄
- 資料模型在 `backend/app/models/` 目錄
- 資料庫操作在 `backend/app/crud/` 目錄
- 資料驗證在 `backend/app/schemas/` 目錄

### 前端開發
- 頁面組件在 `frontend/src/pages/` 目錄
- 通用組件在 `frontend/src/components/` 目錄
- Redux store 在 `frontend/src/store/` 目錄
- 路由配置在 `frontend/src/App.tsx`

## 🌍 環境配置

### 本地開發環境
- **前端**: http://localhost:3003
- **後端 API**: http://localhost:8008
- **API 文件**: http://localhost:8008/docs

### 雲端環境
- **前端**: https://david2fat.github.io/booking-system/
- **後端 API**: https://david2fat-booking-system-299d0c6a305f.herokuapp.com/api/v1
- **API 文件**: https://david2fat-booking-system-299d0c6a305f.herokuapp.com/docs

## 📊 資料庫

### 本地開發
- **資料庫**: SQLite
- **檔案**: `backend/app.db`

### 雲端部署
- **資料庫**: PostgreSQL (Heroku Postgres)
- **連線**: 透過環境變數 `DATABASE_URL`

## 🔐 認證系統

- **JWT Token**: 用於 API 認證
- **登入端點**: `/api/v1/auth/login`
- **註冊端點**: `/api/v1/auth/register`
- **Token 儲存**: localStorage

## 📱 手機版特色

- **響應式設計**: 自動適應螢幕大小
- **漢堡選單**: 手機版側邊欄
- **觸控優化**: 適合手指操作
- **簡潔介面**: 清晰的視覺層次

## 🚀 部署狀態

- ✅ **後端**: 已部署至 Heroku
- ✅ **前端**: 已部署至 GitHub Pages
- ✅ **資料庫**: 已設定 PostgreSQL
- ✅ **手機版**: 已完成響應式設計

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 授權

MIT License 