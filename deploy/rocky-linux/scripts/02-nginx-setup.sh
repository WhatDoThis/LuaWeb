#!/usr/bin/env bash
# LuaWeb Prd — nginx 정적 호스팅 설정
# 사용: sudo bash 02-nginx-setup.sh [/path/to/nginx.conf.example]
# 전제: 01-initial-hardening.sh 완료, /var/www/lua/current 존재

set -euo pipefail

if [[ "${EUID:-0}" -ne 0 ]]; then
  echo "Run as root: sudo bash $0"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE="${1:-${SCRIPT_DIR}/../nginx.conf.example}"
TARGET="/etc/nginx/conf.d/lua.conf"
RATE_SNIPPET="${SCRIPT_DIR}/03-nginx-rate-limit.conf.snippet"

if [[ ! -f "${SOURCE}" ]]; then
  echo "Missing nginx template: ${SOURCE}"
  exit 1
fi

echo "[1/3] Install lua.conf"
cp "${SOURCE}" "${TARGET}"

if [[ -f "${RATE_SNIPPET}" ]] && ! grep -q 'limit_req_zone' "${TARGET}" 2>/dev/null; then
  echo "[2/3] Append rate limit snippet"
  cat "${RATE_SNIPPET}" >> "${TARGET}"
else
  echo "[2/3] Rate limit snippet skip (missing or already present)"
fi

echo "[3/3] nginx test + reload"
nginx -t
systemctl reload nginx

echo "=== nginx ready ==="
echo "Edit server_name in ${TARGET} when domain is known (D4/D5)"
echo "Test: curl -I http://127.0.0.1/ko/"
