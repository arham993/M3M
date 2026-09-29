#!/usr/bin/env bash
# Build the site and publish it to Nginx with zero downtime.
# Usage (on the server, inside the repo folder):  ./deploy/deploy.sh
set -euo pipefail

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
WEB_ROOT="/var/www/jewelcrest"
RELEASE="$WEB_ROOT/releases/$(date +%Y%m%d%H%M%S)"

cd "$APP_DIR"
echo "==> Pulling latest code"
git pull --ff-only

echo "==> Installing dependencies"
npm ci --no-audit --no-fund

echo "==> Building"
npm run build

echo "==> Publishing to $RELEASE"
sudo mkdir -p "$RELEASE"
sudo cp -r dist/. "$RELEASE/"
sudo ln -sfn "$RELEASE" "$WEB_ROOT/current"

echo "==> Keeping the 3 most recent releases"
ls -1dt "$WEB_ROOT"/releases/* | tail -n +4 | xargs -r sudo rm -rf

sudo nginx -t && sudo systemctl reload nginx
echo "==> Live: https://jewelcrestnoidasec97.com"
