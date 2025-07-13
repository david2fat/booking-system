# 線上預約系統

一個完整的線上預約管理系統，包含前後端分離架構。

## 功能特色

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

## 技術架構

### 後端 (Backend)
- **框架**: FastAPI (Python)
- **資料庫**: SQLite
- **ORM**: SQLAlchemy
- **認證**: JWT
- **API 文件**: Swagger UI

### 前端 (Frontend)
- **框架**: React 18
- **語言**: TypeScript
- **狀態管理**: Redux Toolkit
- **路由**: React Router
- **UI 組件**: Ant Design
- **HTTP 客戶端**: Axios

## 快速啟動

### 1. 克隆專案
```bash
git clone https://github.com/你的用戶名/booking-system.git
cd booking-system
```

### 2. 啟動後端
```bash
cd backend
python -m venv venv
source venv/bin/activate  # macOS/Linux
# 或 venv\Scripts\activate  # Windows
pip install -r requirements.txt
python -m uvicorn main:app --host 0.0.0.0 --port 8008 --reload
```

### 3. 啟動前端
```bash
cd frontend
npm install
npm start
```

## 訪問地址

- **前端**: http://localhost:3003
- **後端 API**: http://localhost:8008
- **API 文件**: http://localhost:8008/docs

## 專案結構

```
預約系統/
├── backend/                 # FastAPI 後端
│   ├── app/                # 應用模組
│   ├── main.py             # 主入口文件
│   ├── requirements.txt    # Python 依賴
│   └── venv/              # 虛擬環境
├── frontend/               # React 前端
│   ├── src/               # 源代碼
│   ├── public/            # 靜態文件
│   └── package.json       # Node.js 依賴
└── README.md              # 專案說明
```

## 開發指南

### 後端開發
- API 端點在 `backend/app/routers/` 目錄
- 資料模型在 `backend/app/models/` 目錄
- 資料庫操作在 `backend/app/crud/` 目錄

### 前端開發
- 頁面組件在 `frontend/src/pages/` 目錄
- 通用組件在 `frontend/src/components/` 目錄
- Redux store 在 `frontend/src/store/` 目錄

## 部署

### 後端部署
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --host 0.0.0.0 --port 8008
```

### 前端部署
```bash
cd frontend
npm run build
```

## 貢獻

歡迎提交 Issue 和 Pull Request！

## 授權

MIT License 