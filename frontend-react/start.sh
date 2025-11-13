#!/bin/bash

# ==========================================================
# 🚀 Full Deployment Script for Frontend + Backend + Nginx
# ==========================================================

FRONTEND_DIR="/home/pranav/Desktop/Workspace/Projects/frontend-react"
BACKEND_DIR="/home/pranav/Desktop/Workspace/Projects/backend-node"
NGINX_WEB_ROOT="/var/www/app-dev"

echo "🧹 Killing existing processes on ports 5173, 5000, and 81..."
sudo fuser -k 5173/tcp 2>/dev/null
sudo fuser -k 5000/tcp 2>/dev/null
sudo fuser -k 81/tcp 2>/dev/null

echo "📦 Building frontend..."
cd "$FRONTEND_DIR" || exit
npm install
npm run build

echo "🗂️ Copying frontend build to Nginx web root..."
sudo rm -rf "$NGINX_WEB_ROOT"
sudo mkdir -p "$NGINX_WEB_ROOT"
sudo cp -r dist/* "$NGINX_WEB_ROOT"

echo "🔁 Restarting Nginx..."
sudo systemctl restart nginx

echo "🚀 Starting backend..."
cd "$BACKEND_DIR" || exit
npm install
nohup npm start > backend.log 2>&1 &

echo "✅ Deployment complete!"
echo "🌐 Visit your app at: http://localhost:81"
