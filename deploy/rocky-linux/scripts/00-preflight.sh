#!/usr/bin/env bash
# LuaWeb Prd — 서버 사전 점검 (Rocky Linux 9.x / iwinv)
# 사용: bash 00-preflight.sh
# 목적: OS·네트워크·SELinux 상태 확인 후 D2 hardening 전 정보 수집

set -euo pipefail

echo "=== LuaWeb preflight ==="
echo "Date: $(date -Is)"
echo "Hostname: $(hostname -f 2>/dev/null || hostname)"
echo "User: $(whoami)"
echo ""

echo "--- OS ---"
cat /etc/redhat-release 2>/dev/null || cat /etc/os-release | head -5
echo "Kernel: $(uname -r)"
echo ""

echo "--- Network ---"
echo "Public IP (curl ifconfig.me):"
curl -fsS --max-time 5 ifconfig.me 2>/dev/null || echo "(curl failed — check outbound / ELCAP Outbound)"
echo ""
ip -4 addr show scope global 2>/dev/null | awk '/inet / {print $2, $NF}' || true
echo ""

echo "--- SELinux ---"
getenforce 2>/dev/null || echo "getenforce not available"
echo ""

echo "--- Services ---"
for svc in sshd nginx firewalld; do
  systemctl is-active "$svc" 2>/dev/null || echo "$svc: not installed/inactive"
done
echo ""

echo "--- Disk ---"
df -h / /var 2>/dev/null || df -h /
echo ""

echo "--- Memory ---"
free -h
echo ""

echo "=== Preflight done — 공인 IP를 deploy.json publicIp에 기록하세요 ==="
