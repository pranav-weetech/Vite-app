#!/bin/bash

# ======================================
# 📁 Configuration
# ======================================
PROJECT_DIR="$HOME/Desktop/Workspace/Projects/frontend-react"
BUILD_DIR="$PROJECT_DIR/dist"
NGINX_DIR="/var/www/app-dev"

# Prevent deleting OS accidentally
if [ -z "$NGINX_DIR" ] || [ "$NGINX_DIR" = "/" ]; then
  echo "❌ ERROR: NGINX_DIR is NOT safe! Script stopped to protect OS."
  exit 1
fi

# Ensure folder exists
if [ ! -d "$NGINX_DIR" ]; then
  echo "❌ ERROR: NGINX_DIR does not exist: $NGINX_DIR"
  exit 1
fi

# Ensure NGINX_DIR contains expected directory name
case "$NGINX_DIR" in
  *app-dev*)
    echo "✅ Safe target directory confirmed: $NGINX_DIR"
    ;;
  *)
    echo "❌ ERROR: NGINX_DIR does not look safe. Expected 'app-dev' in path."
    exit 1
    ;;
esac

# ======================================
# 🏗️ Build Frontend
# ======================================
echo "🔨 Building frontend..."
cd "$PROJECT_DIR" || exit
npm run build

# ======================================
# 📦 Deploy to Nginx
# ======================================
echo "📦 Copying build to Nginx directory..."

sudo mkdir -p "$NGINX_DIR"

# Remove OLD build files safely (ONLY inside app-dev)
sudo rm -rf "$NGINX_DIR"/*

# Copy new build
sudo cp -r "$BUILD_DIR"/* "$NGINX_DIR/"

# Fix permissions
sudo chown -R www-data:www-data "$NGINX_DIR"
sudo chmod -R 755 "$NGINX_DIR"

# ======================================
# 🚀 Restart Nginx
# ======================================
echo "🔁 Restarting Nginx..."
sudo systemctl restart nginx

echo "✅ Deployment complete!"
sudo nginx -t
sudo systemctl start nginx

echo "✅ Deployment complete!"
echo "🌐 http://localhost"
