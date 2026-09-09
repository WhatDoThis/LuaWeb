#!/usr/bin/env bash
# LuaWeb Prd — 서버에서 git clone + pnpm build (대안 경로, RAM 2GB+ 권장)
# 사용: bash 04-server-build.sh <git-repo-url> [branch]
# Dev PC rsync 배포가 기본 — 이 스크립트는 서버 빌드가 필요할 때만.

set -euo pipefail

REPO_URL="${1:-}"
BRANCH="${2:-main}"
BUILD_DIR="${BUILD_DIR:-/home/rocky/lua-web-src}"
RELEASE_ROOT="/var/www/lua/releases"

if [[ -z "${REPO_URL}" ]]; then
  echo "Usage: bash $0 <git-repo-url> [branch]"
  exit 1
fi

echo "[1/5] Node.js 20 (if missing)"
if ! command -v node &>/dev/null; then
  curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
  sudo dnf install -y nodejs
fi

echo "[2/5] pnpm"
if ! command -v pnpm &>/dev/null; then
  sudo corepack enable
  corepack prepare pnpm@9.15.9 --activate
fi

echo "[3/5] clone / pull"
if [[ -d "${BUILD_DIR}/.git" ]]; then
  git -C "${BUILD_DIR}" fetch origin
  git -C "${BUILD_DIR}" checkout "${BRANCH}"
  git -C "${BUILD_DIR}" pull origin "${BRANCH}"
else
  git clone --branch "${BRANCH}" "${REPO_URL}" "${BUILD_DIR}"
fi

echo "[4/5] build"
cd "${BUILD_DIR}"
pnpm install --frozen-lockfile 2>/dev/null || pnpm install
pnpm typecheck
pnpm build

echo "[5/5] deploy to releases"
RELEASE="${RELEASE_ROOT}/$(date +%Y%m%d_%H%M)"
sudo mkdir -p "${RELEASE}"
sudo rsync -a --delete "${BUILD_DIR}/apps/web/out/" "${RELEASE}/"
sudo ln -sfn "${RELEASE}" /var/www/lua/current
sudo chown -R rocky:nginx /var/www/lua
sudo restorecon -Rv /var/www/lua 2>/dev/null || true
sudo nginx -t && sudo systemctl reload nginx

echo "=== Deployed to ${RELEASE} ==="
