# Rocky Linux (iwinv) — Prd 서버 세팅 가이드

> **상태**: 서버 미구입 — IP·도메인 확정 후 아래 placeholder를 교체하여 적용  
> **대상 OS**: Rocky Linux 9.x (iwinv 클라우드 VM)  
> **사이트**: Lua(루아) 공식 홈페이지 — 벤치마크(우리기술)와 무관

---

## 1. 서버 요구사항

| 항목 | 최소 사양 | 비고 |
|---|---|---|
| OS | Rocky Linux 9.x | iwinv 클라우드 이미지 |
| CPU | 1 vCPU | 정적 호스팅만 — 빌드는 CI/Dev에서 수행 |
| RAM | 1 GB | nginx + OS |
| Disk | 20 GB | out/ + 로그 + certbot |
| Node.js | 20 LTS | **빌드는 Dev/CI**. 서버는 nginx만 필요 시 Node 불필요 |
| nginx | 1.20+ | `out/` 정적 파일 서빙 |

### Prd 서버 역할

정적 export(`apps/web/out/`)만 nginx로 서빙. Node.js 런타임은 **선택** — CI에서 빌드 후 산출물만 배포하는 방식 권장.

---

## 2. placeholder (도메인/IP 확정 전)

```bash
# packages/env/deploy.json 에 반영할 값
PUBLIC_IP=""          # 예: 123.456.789.0
DOMAIN=""             # 예: www.lua.co.kr
DEPLOY_ROOT="/var/www/lua/current"
```

---

## 3. 초기 패키지 설치 (Rocky Linux)

```bash
# 시스템 업데이트
sudo dnf update -y

# nginx + 방화벽
sudo dnf install -y nginx
sudo systemctl enable --now nginx
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload

# (선택) CI 없이 서버에서 직접 빌드할 경우만
# curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
# sudo dnf install -y nodejs
# corepack enable && corepack prepare pnpm@9.15.9 --activate
```

---

## 4. 배포 디렉터리

```bash
sudo mkdir -p /var/www/lua/releases /var/www/lua/current
sudo chown -R $USER:nginx /var/www/lua
sudo chmod -R 750 /var/www/lua
```

Dev/CI에서 빌드한 `apps/web/out/` 내용을 `/var/www/lua/releases/<타임스탬프>/`에 동기화 후 `current` 심볼릭 링크 전환:

```bash
# Dev Windows → Prd (IP 확정 후)
# scp -r apps/web/out/* user@PUBLIC_IP:/var/www/lua/releases/20260823_1430/
# ssh user@PUBLIC_IP "ln -sfn /var/www/lua/releases/20260823_1430 /var/www/lua/current"
```

---

## 5. nginx 설정

`deploy/rocky-linux/nginx.conf.example` 참고.

```bash
sudo cp deploy/rocky-linux/nginx.conf.example /etc/nginx/conf.d/lua.conf
# server_name, root 경로 수정 후
sudo nginx -t && sudo systemctl reload nginx
```

---

## 6. SSL (도메인 확정 후)

```bash
sudo dnf install -y certbot python3-certbot-nginx
sudo certbot --nginx -d YOUR_DOMAIN
```

---

## 7. 검증

```bash
curl -I http://PUBLIC_IP/ko/
curl -I https://YOUR_DOMAIN/ko/
```

---

_문서 버전: 2026-08-23 | Lua(루아) 기준_
