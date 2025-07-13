#!/bin/bash

# Heroku 部署腳本

echo "開始部署到 Heroku..."

# 檢查是否已安裝 Heroku CLI
if ! command -v heroku &> /dev/null; then
    echo "請先安裝 Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli"
    exit 1
fi

# 檢查是否已登入 Heroku
if ! heroku auth:whoami &> /dev/null; then
    echo "請先登入 Heroku: heroku login"
    exit 1
fi

# 設定應用名稱
APP_NAME="your-booking-system-app"

# 創建 Heroku 應用（如果不存在）
if ! heroku apps:info $APP_NAME &> /dev/null; then
    echo "創建新的 Heroku 應用: $APP_NAME"
    heroku create $APP_NAME
fi

# 設定環境變數
echo "設定環境變數..."
heroku config:set SECRET_KEY=$(python -c 'import secrets; print(secrets.token_hex(32))') --app $APP_NAME
heroku config:set NODE_ENV=production --app $APP_NAME

# 添加 PostgreSQL 資料庫
echo "添加 PostgreSQL 資料庫..."
heroku addons:create heroku-postgresql:mini --app $APP_NAME

# 添加 Redis
echo "添加 Redis..."
heroku addons:create heroku-redis:mini --app $APP_NAME

# 設定 buildpacks
echo "設定 buildpacks..."
heroku buildpacks:clear --app $APP_NAME
heroku buildpacks:add heroku/nodejs --app $APP_NAME
heroku buildpacks:add heroku/python --app $APP_NAME

# 部署
echo "部署應用..."
git add .
git commit -m "Deploy to Heroku"
git push heroku main

# 運行資料庫遷移
echo "運行資料庫遷移..."
heroku run python init_db.py --app $APP_NAME

echo "部署完成！"
echo "應用網址: https://$APP_NAME.herokuapp.com" 