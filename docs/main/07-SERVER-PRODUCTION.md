# 07-SERVER-PRODUCTION — iwinv Prd 서버 현황 (최종 반영본)

**대상**: LuaWeb Prd — iwinv 클라우드 VM (Rocky Linux)  
**상태**: D2 보안 완료 (firewalld·fail2ban·swap) · nginx·배포(D3) 대기  
**관련**: `06-LAUNCH-GUIDE.md`, `docs/report/12_iwinvDeployRoadmap.md`, `.cursor/skills/iwinv-deploy-orchestrator/`

> 본 문서는 **현재까지 실제 적용된 내용만** 기록합니다. (히스토리·미적용 예정 항목 제외)

---

## 1. 서버 스펙 (확정)

| 항목 | 값 |
|---|---|
| 제공자 | iwinv 클라우드 |
| 서버 이름 | `lua-web-prd` |
| Zone | **KR1-Lite-Z01** |
| 상품 | `vgna_1_n` (Shared) |
| vCPU | 1 |
| RAM | 1 GB |
| Disk | NVMe 25 GB |
| Traffic | 620 GB / Network 2.5 Gbps |
| OS | **Rocky Linux 9.8 (Blue Onyx)** |
| Kernel | 5.14.0-687.45.1.el9_8 (dnf update 후) |
| Hostname | `whi2021-320420` |
| 네트워크 | **Direct IP** (VPC/NAT Gateway 미사용) |
| 공인 IP | `49.247.132.xxx` *(§9 마스킹)* |
| SSH 계정 | `root` (PuTTY 접속) |
| SSH Key | 생성·iwinv 등록 (`iwinv_lua` / `lua-dev-pc`) — PuTTY는 현재 비밀번호 접속 |

### Lite Zone 제약 (확정)

| 기능 | 지원 |
|---|---|
| **ELCAP 방화벽** | **불가** ([iwinv 공식](https://docs.iwinv.kr/service/compute/common-console-feature-guide/elcap/)) |
| SSD Block | 불가 |
| 보안 대체 | **OS firewalld + fail2ban** (필수) |

---

## 2. 운영 계획 (확정·미적용 구분)

| 항목 | 값 | 상태 |
|---|---|---|
| 운영 도메인 | `luacorp.co.kr` (iwinv 구매 예정) | 미구매 |
| Git 저장소 | `https://github.com/WhatDoThis/LuaWeb.git` | — |
| 배포 브랜치 | `main` | — |
| 앱 방식 | Next.js static export → `apps/web/out/` → nginx | 미배포 |
| 배포 경로 | `/var/www/lua/current` → `releases/<timestamp>/` | 미생성 |
| 이메일 | 테라웹메일 (예정) | D6 |

---

## 3. 설치된 패키지 (적용 완료)

```bash
dnf update -y
dnf install -y nano curl wget git rsync tar unzip bind-utils policycoreutils-python-utils
dnf install -y firewalld
dnf install -y epel-release   # fail2ban용 — fail2ban 본체는 RAM 부족으로 설치 중단(Killed)
```

| 패키지 | 용도 | 상태 |
|---|---|---|
| nano | 서버 편집 (필수) | ✅ |
| curl, wget, git, rsync | 배포·검증 | ✅ |
| bind-utils | dig/nslookup (DNS 게이트) | ✅ |
| firewalld | OS 방화벽 (ELCAP 대체) | ✅ |
| epel-release | fail2ban 저장소 | ✅ |
| fail2ban | SSH brute force 차단 (증가형 bantime) | ✅ |
| swap | 1 GB `/swapfile` (OOM 방지) | ✅ |
| nginx | 정적 웹 서빙 | ⏳ 미설치 |

---

## 4. 보안 — firewalld (적용 완료)

### 4.1 정책 요약

| 트래픽 | 포트 | 허용 소스 |
|---|---|---|
| HTTP | 80 | 전체 (0.0.0.0/0) |
| HTTPS | 443 | 전체 (0.0.0.0/0) |
| SSH | 22 | 관리 PC IP 2곳 + localhost만 (rich rule) |
| SSH service | — | **제거됨** (`remove-service=ssh`) |

### 4.2 적용 명령 (최종)

```bash
dnf install -y firewalld
systemctl enable --now firewalld

# 웹 공개
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https

# SSH — IP 제한 (전체 ssh service 사용 금지)
firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="121.173.132.xxx/32" port port="22" protocol="tcp" accept'
firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="121.143.68.xxx/32" port port="22" protocol="tcp" accept'
firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="127.0.0.1/32" port port="22" protocol="tcp" accept'

# 기본 ssh service 제거 (필수)
firewall-cmd --permanent --remove-service=ssh

firewall-cmd --reload
firewall-cmd --list-all
```

### 4.3 검증 결과 (2026-09-09)

```
services: cockpit dhcpv6-client http https   # ssh 없음 ✅
rich rules: 121.173.132.xxx, 121.143.68.xxx, 127.0.0.1 — port 22 accept ✅
```

### 4.4 관리 PC IP (KT 유동)

| PC | 공인 IP (확인일 2026-09-09) |
|---|---|
| PuTTY 주 PC | `121.173.132.xxx` |
| 다른 PC (동일 KT 단말·별도 외부 IP) | `121.143.68.xxx` |

IP 변경 시: `firewall-cmd --permanent --add-rich-rule=...` 로 새 IP 추가 후 `reload`.

---

## 5. 보안 — fail2ban (적용 완료)

### 5.1 swap (OOM 방지)

```bash
fallocate -l 1G /swapfile
chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

### 5.2 jail 설정 (증가형 bantime · Rocky 9)

```ini
# /etc/fail2ban/jail.d/lua-local.conf

[DEFAULT]
findtime = 10m
maxretry = 5
ignoreip = 127.0.0.1/8 121.173.132.xxx 121.143.68.xxx

# 1차 1시간 → 재범 시 2배 증가 → 최대 1주
bantime = 1h
bantime.increment = true
bantime.factor = 2
bantime.maxtime = 1w

[sshd]
enabled = true
port    = ssh
logpath = /var/log/secure
backend = systemd
banaction = firewallcmd-rich-rules
```

| 옵션 | 동작 |
|---|---|
| `bantime.increment` | 같은 IP 재범 시 밴 시간 누적 증가 |
| `bantime.factor = 2` | 1h → 2h → 4h → … |
| `bantime.maxtime = 1w` | 최대 1주 |
| `ignoreip` | 관리 PC 2 IP는 밴 제외 |

### 5.3 설치·적용

```bash
dnf install -y epel-release
dnf install -y fail2ban --setopt=install_weak_deps=False
# lua-local.conf 저장 후
systemctl enable --now fail2ban
fail2ban-client status sshd   # jail sshd active ✅
```

---

## 6. 미적용 — 다음 명령 (순서)

### 6.1 nginx + 배포 디렉터리

```bash
dnf install -y nginx

mkdir -p /var/www/lua/releases/initial
echo '<!DOCTYPE html><html><body>LuaWeb placeholder</body></html>' > /var/www/lua/releases/initial/index.html
ln -sfn /var/www/lua/releases/initial /var/www/lua/current

chown -R root:nginx /var/www/lua
find /var/www/lua -type d -exec chmod 755 {} \;
find /var/www/lua -type f -exec chmod 644 {} \;
setsebool -P httpd_read_user_content 1
restorecon -Rv /var/www/lua

systemctl enable --now nginx
```

### 6.2 nginx LuaWeb 설정

템플릿: `deploy/rocky-linux/nginx.conf.example`  
적용 경로: `/etc/nginx/conf.d/lua.conf`

```bash
# 프로젝트 lua.conf 내용 또는 example 복사 후
nginx -t && systemctl reload nginx
curl -I http://127.0.0.1/
curl -I http://49.247.132.xxx/
```

### 6.3 Dev PC 빌드·업로드 (D3)

```powershell
cd c:\Project\LuaWeb
npm exec --yes pnpm@9.15.9 build
# WinSCP / rsync → /var/www/lua/releases/<YYYYMMDD_HHMM>/
# ssh: ln -sfn ... /var/www/lua/current && nginx -t && systemctl reload nginx
```

---

## 7. Phase 진행 현황

| Phase | 내용 | 상태 |
|---|---|---|
| D0 | 도메인·계정·Git 확정 | ✅ |
| D1 | VM 생성 (Lite) | ✅ |
| D1 | ELCAP | ⛔ Lite 미지원 — OS 방화벽으로 대체 |
| D2 | nano·update·firewalld | ✅ |
| D2 | swap + fail2ban (증가형 bantime) | ✅ |
| D2 | nginx·/var/www/lua | ⏳ |
| D3 | build·rsync·HTTP 공개 | ⏳ |
| D4 | luacorp.co.kr DNS | ⏳ |
| D5 | certbot HTTPS | ⏳ |
| D6 | 테라웹메일 | ⏳ |

---

## 8. 프로젝트 설정 파일 (갱신 대상)

| 파일 | 필드 | 값 (마스킹) |
|---|---|---|
| `packages/env/deploy.json` | `publicIp` | `49.247.132.xxx` |
| `packages/env/deploy.json` | `domain` / `siteUrl` | D4 후 `luacorp.co.kr` |
| `packages/env/site.json` | `domain` | D4 후 HTTPS URL |

---

## 9. 민감 정보 (마스킹 참조)

| 항목 | 실제 값 패턴 | 문서 표기 |
|---|---|---|
| 서버 공인 IP | 49.247.132.149 | `49.247.132.xxx` |
| 관리 PC IP #1 | 121.173.132.13 | `121.173.132.xxx` |
| 관리 PC IP #2 | 121.143.68.242 | `121.143.68.xxx` |
| SSH 개인키 | `C:\Users\<user>\.ssh\iwinv_lua` | 로컬만 보관 |
| root 비밀번호 | iwinv 콘솔 발급 | **문서·Git 미기록** |

---

_문서 버전: 2026-09-09 | lua-web-prd · KR1-Lite · Rocky 9.8 · firewalld 적용 완료_
