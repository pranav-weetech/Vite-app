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

echo "📦 Starting Frontend (Vite)..."
cd "$FRONTEND_DIR" || exit
npm install
nohup npm run dev > frontend.log 2>&1 &

echo "🚀 Starting Backend (Node)..."
cd "$BACKEND_DIR" || exit
npm install
nohup node index.js > backend.log 2>&1 &

echo "====================================="
echo "🌐 Frontend running on: http://localhost:5173"
echo "🛠 Backend running on: http://localhost:5000"
echo "📄 Logs: frontend.log & backend.log"
echo "====================================="
