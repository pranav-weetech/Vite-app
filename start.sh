#!/bin/bash

# ======================================
# 🚀 Full Stack Dev Start Script (Node + React + Nginx)
# ======================================

# Project paths
BACKEND_DIR="$HOME/Desktop/Workspace/Projects/backend-node"
FRONTEND_DIR="$HOME/Desktop/Workspace/Projects/frontend-react"
NGINX_WEB_DIR="/var/www/app-dev"

# ======================================
# 🧹 Clean up old processes
# ======================================
echo "🧹 Cleaning old processes..."

sudo fuser -k 5000/tcp >/dev/null 2>&1  # backend
sudo fuser -k 5173/tcp >/dev/null 2>&1  # frontend

sleep 1
echo "✅ Old processes cleaned."

# ======================================
# 🚀 Start Backend
# ======================================
echo "🚀 Starting Backend..."
cd "$BACKEND_DIR" || { echo "❌ Backend directory not found!"; exit 1; }
npm install >/dev/null 2>&1
npm start &   # run in background
BACK_PID=$!
sleep 3
echo "✅ Backend running on http://localhost:5000 (PID: $BACK_PID)"

# ======================================
# 🌐 Build Frontend & Deploy to Nginx
# ======================================
echo "🌐 Building Frontend..."
cd "$FRONTEND_DIR" || { echo "❌ Frontend directory not found!"; exit 1; }
npm install >/dev/null 2>&1
npm run dev >/dev/null 2>&1

echo "📦 Deploying build to Nginx..."
sudo rm -rf "$NGINX_WEB_DIR"
sudo mkdir -p "$NGINX_WEB_DIR"
sudo cp -r dist/* "$NGINX_WEB_DIR/"
sudo chown -R www-data:www-data "$NGINX_WEB_DIR"
sudo chmod -R 755 "$NGINX_WEB_DIR"

# Reload Nginx
echo "🔁 Reloading Nginx..."
sudo nginx -t && sudo systemctl reload nginx
echo "✅ Nginx reloaded successfully!"

# ======================================
# 🧭 Summary
# ======================================
echo ""
echo "🎯 All services started successfully!"
echo "-------------------------------------"
echo "Frontend (dev) → http://localhost:5173"
echo "Backend (API)  → http://localhost:5000"
echo "Nginx (prod)   → http://localhost:81"
echo "-------------------------------------"
echo "🟢 Use 'ps -ef | grep node' to check running processes"
echo "🛑 To stop them manually, run:"
echo "    sudo fuser -k 5173/tcp"
echo "    sudo fuser -k 5000/tcp"
echo "-------------------------------------"
