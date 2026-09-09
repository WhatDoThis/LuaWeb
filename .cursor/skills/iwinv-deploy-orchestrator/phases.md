# Phase D0~D6 — iwinv LuaWeb 배포 체크리스트

## D0 — 사전 확정 (코드·콘솔 작업 전)

- [ ] iwinv 회원·결제 수단
- [ ] 운영 도메인 (보유 / iwinv 구매 예정 / 미정)
- [ ] Git 저장소 URL + 배포 브랜치 (main)
- [ ] Dev PC: PowerShell, (권장) Git Bash/WSL for rsync
- [ ] SSH 접속 가능 PC IP (ELCAP "내 IP"용)
- [ ] 이메일: 테라웹메일 vs 그룹웨어
- [ ] `pnpm typecheck && pnpm build` 로컬 성공

**게이트**: 위 항목 확정 → D1

---

## D1 — VM 구매 + ELCAP (클라우드 보안)

### iwinv 콘솔

- [ ] [서버 생성](https://help.iwinv.kr/manual/398): **Lite-Zone**, Rocky Linux 9.x, **SSD 25GB**(최소)
- [ ] 서버 이름: `lua-web-prd`
- [ ] ELCAP: **생성** → Linux 기본 Rule → Inbound: SSH(내 IP), HTTP 80, HTTPS 443
- [ ] 국제망: (선택) 한국 외 차단 — **검색 Bot 차단 금지**
- [ ] 서버관리 → 방화벽 **On**
- [ ] **공인 IP** 기록 → `packages/env/deploy.json`

### SSH

- [ ] `ssh rocky@PUBLIC_IP` 최초 접속
- [ ] `deploy/rocky-linux/scripts/00-preflight.sh` 실행·출력 저장

**게이트**: SSH 접속 + ELCAP On + IP 기록 → D2

---

## D2 — OS 보안 + 기본 패키지

### SSH (스크립트)

- [ ] `01-initial-hardening.sh` 실행 (nano, nginx, firewalld, fail2ban, SELinux)
- [ ] (권장) SSH 포트 변경 — [manual/913](https://help.iwinv.kr/manual/913) — **ELCAP에 새 포트 추가 후** old 22 제거
- [ ] Port 모니터링 ON (콘솔, 선택)

**게이트**:

```bash
sudo systemctl is-active nginx firewalld fail2ban
curl -I http://127.0.0.1/   # nginx default 또는 404
sudo firewall-cmd --list-services   # http https ssh
```

→ D3

---

## D3 — 빌드·배포·HTTP 공개

### A. Dev PC 빌드 (권장)

- [ ] `site.json` domain 임시=IP 테스트 또는 placeholder
- [ ] `pnpm build` → `apps/web/out/`
- [ ] 배포 디렉터리·nginx conf 적용 (`02-nginx-setup.sh` 또는 수동)
- [ ] rsync → `/var/www/lua/releases/<ts>/` → `current` symlink
- [ ] `03-nginx-rate-limit.conf.snippet` 포함 여부 확인

### B. 서버 빌드 (대안)

- [ ] git clone, Node 20, pnpm, build on server
- [ ] out/ → releases/

**게이트**:

```bash
curl -I http://PUBLIC_IP/ko/    # 200 or 302
curl -I http://PUBLIC_IP/       # 302 /ko/
```

→ D4

---

## D4 — 도메인·DNS

### iwinv 콘솔

- [ ] [DNS 등록](https://help.iwinv.kr/manual/69) (미등록 시)
- [ ] 타사 도메인 → ns1/ns2.iwinv.kr ([manual/198](https://help.iwinv.kr/manual/198))
- [ ] [A 레코드](https://help.iwinv.kr/manual/374): `@`, `www` → VM IP
- [ ] `packages/env/site.json`, `deploy.json` domain/siteUrl 갱신
- [ ] **재빌드** + rsync 재배포

**게이트** (PowerShell):

```powershell
nslookup www.YOUR-DOMAIN.com 8.8.8.8
# IP == VM 공인 IP
```

→ D5

---

## D5 — HTTPS (Let's Encrypt)

- [ ] `certbot --nginx -d www.DOMAIN -d DOMAIN`
- [ ] `certbot renew --dry-run`
- [ ] nginx HSTS (certbot 후 수동 추가, example 참고)
- [ ] **nginx.conf.example 덮어쓰기 금지**

**게이트**:

```bash
curl -I https://www.YOUR-DOMAIN.com/ko/
# HTTP → HTTPS redirect
```

→ D6 (메일) 또는 오픈 완료

---

## D6 — 이메일 서비스

### iwinv 콘솔

- [ ] 웹호스팅/메일 → 테라웹메일 또는 그룹웨어 **신청** (도메인 연결)
- [ ] 상세페이지 **DNS 설정** (MX, SPF, mail A) 복사
- [ ] DNS 관리 → 레코드 추가 ([manual/475](https://help.iwinv.kr/manual/475))
- [ ] 웹메일 계정 생성 ([manual/945](https://help.iwinv.kr/manual/945))

**주의**: 기존 `@` A(웹) 유지. MX·mail A **추가만**.

**게이트**: 웹메일 로그인 + 테스트 발송/수신

---

## Phase 완료 후

- [ ] `docs/main/06-LAUNCH-GUIDE.md` §8 오픈 점검
- [ ] Search Console / 네이버 / Bing (선택)
- [ ] `docs/log/log.md` 갱신
