# 線上預約系統

一個完整的線上預約管理系統，支援多店舖、多員工管理，包含網店功能和手機應用程式。

## 功能特色

### 核心預約功能
- ✅ 線上預約系統
- ✅ 時間表管理
- ✅ QR Code確認
- ✅ 服務額外收費
- ✅ 多員工帳號
- ✅ 多店舖管理
- ✅ 多員工管理

### 網店功能
- ✅ 店主APP
- ✅ 網店手機應用程式
- ✅ 線上收款
- ✅ 線下收款
- ✅ 促銷活動
- ✅ 推廣活動
- ✅ 會員積分計劃
- ✅ 推薦計劃
- ✅ 數據分析
- ✅ 客戶管理
- ✅ 免費圖庫
- ✅ 通知中心

## 技術架構

### 後端 (Python FastAPI)
- **框架**: FastAPI
- **資料庫**: PostgreSQL + Redis
- **認證**: JWT
- **支付**: Stripe
- **檔案儲存**: AWS S3
- **通知**: Firebase Cloud Messaging

### 前端 (React)
- **框架**: React 18 + TypeScript
- **狀態管理**: Redux Toolkit
- **UI框架**: Ant Design
- **路由**: React Router
- **HTTP客戶端**: Axios

### 手機應用 (React Native)
- **框架**: React Native + TypeScript
- **UI框架**: React Native Elements
- **狀態管理**: Redux Toolkit

## 快速開始

### 後端設定
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 前端設定
```bash
cd frontend
npm install
npm start
```

### 手機應用設定
```bash
cd mobile-app
npm install
npx react-native run-android  # 或 run-ios
```

## API文檔
啟動後端後，訪問 http://localhost:8000/docs 查看API文檔

## 部署
詳細部署說明請參考 `docs/deployment.md`

## 授權
MIT License 