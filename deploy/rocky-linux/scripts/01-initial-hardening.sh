#!/usr/bin/env bash
# LuaWeb Prd — 초기 하드ening + 필수 패키지 (Rocky Linux 9.x / iwinv)
# 사용: sudo bash 01-initial-hardening.sh
# 전제: D1 ELCAP 적용 완료, SSH 접속 가능
#
# 설치: nano, nginx, firewalld, fail2ban, curl, rsync, bind-utils, policycoreutils-python-utils
# 보안: firewalld http/https/ssh, fail2ban sshd+nginx, 배포 디렉터리·SELinux

set -euo pipefail

if [[ "${EUID:-0}" -ne 0 ]]; then
  echo "Run as root: sudo bash $0"
  exit 1
fi

DEPLOY_USER="${DEPLOY_USER:-rocky}"
WEB_ROOT="/var/www/lua"

echo "[1/7] dnf update + packages"
dnf update -y
dnf install -y \
  nano \
  nginx \
  firewalld \
  fail2ban \
  curl \
  rsync \
  tar \
  unzip \
  bind-utils \
  policycoreutils-python-utils \
  git

echo "[2/7] firewalld"
systemctl enable --now firewalld
firewall-cmd --permanent --add-service=ssh
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --reload

echo "[3/7] nginx"
systemctl enable --now nginx

echo "[4/7] deploy directories"
mkdir -p "${WEB_ROOT}/releases"
if [[ ! -L "${WEB_ROOT}/current" ]]; then
  mkdir -p "${WEB_ROOT}/releases/initial"
  echo '<!DOCTYPE html><html><body>LuaWeb placeholder</body></html>' > "${WEB_ROOT}/releases/initial/index.html"
  ln -sfn "${WEB_ROOT}/releases/initial" "${WEB_ROOT}/current"
fi
chown -R "${DEPLOY_USER}:nginx" "${WEB_ROOT}"
find "${WEB_ROOT}" -type d -exec chmod 755 {} \;
find "${WEB_ROOT}" -type f -exec chmod 644 {} \;

echo "[5/7] SELinux"
setsebool -P httpd_read_user_content 1 2>/dev/null || true
restorecon -Rv "${WEB_ROOT}" 2>/dev/null || true

echo "[6/7] fail2ban"
cat > /etc/fail2ban/jail.d/lua-local.conf << 'EOF'
[DEFAULT]
bantime  = 1h
findtime = 10m
maxretry = 5

[sshd]
enabled = true
port    = ssh
logpath = %(sshd_log)s
backend = %(sshd_backend)s

[nginx-http-auth]
enabled = true
port    = http,https
logpath = /var/log/nginx/error.log
EOF
systemctl enable --now fail2ban

echo "[7/7] sshd hardening snippet (manual review recommended)"
SSHD_DROP="/etc/ssh/sshd_config.d/99-lua-hardening.conf"
if [[ ! -f "${SSHD_DROP}" ]]; then
  cat > "${SSHD_DROP}" << 'EOF'
# LuaWeb — review before reload. Change Port only with ELCAP rule updated first.
PermitRootLogin no
PasswordAuthentication yes
MaxAuthTries 3
ClientAliveInterval 300
ClientAliveCountMax 2
EOF
  echo "Created ${SSHD_DROP} — run: sudo sshd -t && sudo systemctl reload sshd"
else
  echo "Skip: ${SSHD_DROP} exists"
fi

echo ""
echo "=== Hardening complete ==="
echo "Next: copy nginx.conf.example to /etc/nginx/conf.d/lua.conf (02-nginx-setup.sh)"
echo "Verify: systemctl is-active nginx firewalld fail2ban"
