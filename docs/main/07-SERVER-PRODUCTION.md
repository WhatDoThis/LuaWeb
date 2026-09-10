# 07-SERVER-PRODUCTION — iwinv Prd 서버 현황 (최종 반영본)

**대상**: LuaWeb Prd — iwinv 클라우드 VM (Rocky Linux)  
**상태**: **D0~D6 완료** — HTTPS 공개 · 테라웹메일 운영 중  
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
| Kernel | 5.14.0-687.x.el9_8 |
| Hostname | `whi2021-320420` |
| 네트워크 | **Direct IP** (VPC/NAT Gateway 미사용) |
| 공인 IP | `49.247.132.xxx` *(§12 마스킹)* |
| SSH 계정 | `root` (PuTTY·키 `iwinv_lua`) |
| SSH Key | `C:\Users\<user>\.ssh\iwinv_lua` (Dev PC SCP/자동화) |

### Lite Zone 제약 (확정)

| 기능 | 지원 |
|---|---|
| **ELCAP 방화벽** | **불가** ([iwinv 공식](https://docs.iwinv.kr/service/compute/common-console-feature-guide/elcap/)) |
| SSD Block | 불가 |
| 보안 대체 | **OS firewalld + fail2ban** (필수) |

---

## 2. 운영 (확정·적용 완료)

| 항목 | 값 | 상태 |
|---|---|---|
| 운영 도메인 | `luacorp.co.kr` (iwinv 등록) | ✅ |
| 공개 URL | `https://www.luacorp.co.kr/ko/` | ✅ |
| Git 저장소 | `https://github.com/WhatDoThis/LuaWeb.git` | — |
| 배포 브랜치 | `main` | — |
| 앱 방식 | Next.js static export → `apps/web/out/` → nginx | ✅ |
| 배포 경로 | `/var/www/lua/current` → `releases/<timestamp>/` | ✅ |
| 현재 릴리스 | `20260911_0105` (갱신 시 타임스탬프 교체) | ✅ |
| Dev 빌드 | Windows PC `pnpm build` → SCP 업로드 | ✅ |
| 이메일 | iwinv **테라웹메일 Lite** (`lua-mail-prd`) | ✅ |
| 웹메일 URL | `https://mail.luacorp.co.kr` | ✅ |

---

## 3. 설치된 패키지 (적용 완료)

| 패키지 | 용도 | 상태 |
|---|---|---|
| nano | 서버 편집 | ✅ |
| curl, wget, git, rsync, bind-utils | 배포·검증 | ✅ |
| firewalld | OS 방화벽 (ELCAP 대체) | ✅ |
| epel-release + fail2ban | SSH brute force 차단 | ✅ |
| swap 1GB `/swapfile` | OOM 방지 (fail2ban 설치용) | ✅ |
| **nginx** | 정적 웹 서빙 | ✅ |
| **certbot**, **python3-certbot-nginx** | Let's Encrypt HTTPS | ✅ |

---

## 4. 보안 — firewalld (적용 완료)

### 4.1 정책 요약

| 트래픽 | 포트 | 허용 소스 |
|---|---|---|
| HTTP | 80 | 전체 (0.0.0.0/0) |
| HTTPS | 443 | 전체 (0.0.0.0/0) |
| SSH | 22 | 관리 PC IP 2곳 + localhost만 (rich rule) |
| SSH service | — | **제거됨** (`remove-service=ssh`) |
| cockpit | — | **제거됨** (미사용, 2026-09-10) |

### 4.2 현재 services (2026-09-10)

```
services: dhcpv6-client http https   # ssh·cockpit 없음 ✅
rich rules: 121.173.132.xxx, 121.143.68.xxx, 127.0.0.1 — port 22 accept ✅
```

### 4.3 관리 PC IP (KT 유동)

| PC | 공인 IP (확인일 2026-09-09) |
|---|---|
| PuTTY 주 PC | `121.173.132.xxx` |
| 다른 PC (동일 KT 단말·별도 외부 IP) | `121.143.68.xxx` |

IP 변경 시: `firewall-cmd --permanent --add-rich-rule=...` 로 새 IP 추가 후 `reload`.

---

## 5. 보안 — fail2ban (적용 완료)

설정: `/etc/fail2ban/jail.d/lua-local.conf` — sshd jail, 증가형 bantime, ignoreip에 관리 PC 2 IP.

```bash
fail2ban-client status sshd   # jail active ✅
```

---

## 6. nginx · 정적 배포 (적용 완료)

| 항목 | 값 |
|---|---|
| 설정 | `/etc/nginx/conf.d/lua.conf` (certbot이 HTTPS 블록 추가) |
| `server_name` | `luacorp.co.kr www.luacorp.co.kr` |
| `root` | `/var/www/lua/current` |
| HTTP | → HTTPS 리다이렉트 (certbot) |
| `/` | → 302 `/ko/` |

### 검증 (2026-09-10)

```bash
curl -I https://www.luacorp.co.kr/ko/    # 200 OK ✅
curl -I http://www.luacorp.co.kr/ko/     # 301 → HTTPS ✅
```

### 재배포 (Dev PC)

```powershell
cd c:\Project\LuaWeb
npm exec --yes pnpm@9.15.9 typecheck
npm exec --yes pnpm@9.15.9 build
# SCP apps/web/out/. → /var/www/lua/releases/<YYYYMMDD_HHMM>/
```

```bash
ln -sfn /var/www/lua/releases/<YYYYMMDD_HHMM> /var/www/lua/current
nginx -t && systemctl reload nginx
```

> **주의**: certbot 적용 후 `nginx.conf.example`으로 `lua.conf` **덮어쓰기 금지** — HTTPS 설정 삭제됨.

---

## 7. DNS — 웹 (iwinv DNS, 적용 완료)

| 호스트 | 유형 | 값 |
|---|---|---|
| `@` (`luacorp.co.kr`) | A | `49.247.132.xxx` |
| `www` | A | `49.247.132.xxx` |

---

## 8. HTTPS — Let's Encrypt (적용 완료)

```bash
certbot --nginx -d luacorp.co.kr -d www.luacorp.co.kr
certbot renew --dry-run          # success ✅
systemctl enable --now certbot-renew.timer
```

| 항목 | 값 |
|---|---|
| 인증서 | `/etc/letsencrypt/live/luacorp.co.kr/` |
| 만료 | 2026-12-09 (자동 갱신) |
| 도메인 | `luacorp.co.kr`, `www.luacorp.co.kr` |

---

## 9. 이메일 — 테라웹메일 Lite (적용 완료)

| 항목 | 값 |
|---|---|
| 서비스명 | `lua-mail-prd` |
| 상품 | 테라웹메일 Lite (HDD 100GB) |
| 웹메일 | `https://mail.luacorp.co.kr` |
| Outlook/IMAP | `mail.luacorp.co.kr` — IMAP 993 SSL, SMTP 587 STARTTLS |

### DNS (메일 — `@`·`www` A 유지, 추가만)

| 호스트 | 유형 | 값 |
|---|---|---|
| `@` | MX (10) | `mx2.mail.iwinv.kr` |
| `@` | TXT (SPF) | `v=spf1 include:_spf.mail.iwinv.kr ~all` |
| `mail` | CNAME | `mx2.mail.iwinv.kr` |

송수신 테스트 완료 (2026-09-10).

---

## 10. Phase 진행 현황

| Phase | 내용 | 상태 |
|---|---|---|
| D0 | 도메인·계정·Git 확정 | ✅ |
| D1 | VM 생성 (Lite) | ✅ |
| D1 | ELCAP | ⛔ Lite 미지원 — firewalld 대체 |
| D2 | 보안·패키지·nginx | ✅ |
| D3 | build·업로드·HTTP | ✅ |
| D4 | DNS·도메인·재배포 | ✅ |
| D5 | certbot HTTPS | ✅ |
| D6 | 테라웹메일·MX/SPF/CNAME | ✅ |

---

## 11. 프로젝트 설정 파일 (반영 완료)

| 파일 | 필드 | 값 |
|---|---|---|
| `packages/env/deploy.json` | `publicIp` | `49.247.132.xxx` |
| `packages/env/deploy.json` | `domain` | `www.luacorp.co.kr` |
| `packages/env/deploy.json` | `siteUrl` | `https://www.luacorp.co.kr` |
| `packages/env/deploy.json` | `ssl.enabled` | `true` |
| `packages/env/site.json` | `domain` | `https://www.luacorp.co.kr` |
| `packages/env/site.json` | `contact.email` | 운영 메일 (site.json 참조) |

---

## 12. 민감 정보 (마스킹 참조)

| 항목 | 실제 값 패턴 | 문서 표기 |
|---|---|---|
| 서버 공인 IP | 49.247.132.149 | `49.247.132.xxx` |
| 관리 PC IP #1 | 121.173.132.13 | `121.173.132.xxx` |
| 관리 PC IP #2 | 121.143.68.242 | `121.143.68.xxx` |
| SSH 개인키 | `C:\Users\<user>\.ssh\iwinv_lua` | 로컬만 보관 |
| root 비밀번호 | iwinv 콘솔 발급 | **문서·Git 미기록** |
| 메일 계정·비밀번호 | iwinv 테라웹메일 | **문서·Git 미기록** |

---

## 13. 운영 점검 (월 1회 권장)

- [ ] `certbot certificates` — SSL 만료일
- [ ] `systemctl is-active nginx fail2ban firewalld certbot-renew.timer`
- [ ] `df -h` — 디스크·로그
- [ ] `https://www.luacorp.co.kr/sitemap.xml` · `/robots.txt`
- [ ] 콘텐츠 변경 시 Dev PC 재빌드·재업로드

---

_문서 버전: 2026-09-11 | lua-web-prd · D0~D6 완료 · https://www.luacorp.co.kr_
