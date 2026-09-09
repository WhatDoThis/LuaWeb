# 12 — iwinv 클라우드 배포 로드맵 (LuaWeb Prd)

> **상태**: 실행 대기  
> **에이전트 스킬**: `.cursor/skills/iwinv-deploy-orchestrator/SKILL.md`  
> **기존 참고**: `docs/main/06-LAUNCH-GUIDE.md`, `deploy/rocky-linux/` (내용 보강·단계 분리)

---

## 0. 범위와 전제

| 항목 | 내용 |
|---|---|
| 호스팅 | iwinv **가상서버** (Rocky Linux 9.x, Lite-Zone 최소 사양) |
| 앱 | Next.js 정적 export → `apps/web/out/` → **nginx** |
| 보안 | **ELCAP**(클라우드) + **firewalld/fail2ban**(OS) — 수비적 트래픽 대응 |
| HTTPS | Let's Encrypt + certbot (도메인·DNS 후) |
| 메일 | iwinv 테라웹메일 또는 그룹웨어 + MX/SPF DNS |
| 작업 방식 | 사용자가 콘솔·SSH에 **복붙** — 에이전트가 단계별 명령 제공 |

**iwinv 문서**: [docs.iwinv.kr](https://docs.iwinv.kr/) · [console.iwinv.kr](https://console.iwinv.kr/)

---

## 1. 기존 계획 vs 본 로드맵

| 기존 (`06-LAUNCH-GUIDE`) | 본 로드맵 보강 |
|---|---|
| VM + nginx + rsync + DNS + certbot 한 문서 | **7 Phase(D0~D6)** 분리, 게이트 명시 |
| ELCAP 언급 적음 | **D1 ELCAP 필수**, 국제망·Inbound 정책 |
| OS hardening 간략 | **fail2ban, SSH, SELinux, rate limit** 스크립트 |
| 메일 없음 | **D6 이메일** (MX/SPF/A) |
| Dev 빌드만 | Dev rsync **권장** + 서버 git build **대안** |

---

## 2. Phase 개요

```
D0 사전 확정
  ↓
D1 VM 구매 + ELCAP (클라우드 방화벽)
  ↓
D2 OS 보안 + nano/nginx/필수 패키지
  ↓
D3 빌드·배포 → HTTP(IP 또는 도메인)
  ↓
D4 도메인·DNS (A @, www)
  ↓
D5 HTTPS (certbot) — DNS 전파 게이트
  ↓
D6 이메일 (테라웹메일/그룹웨어 + DNS)
```

---

## 3. Phase별 체크리스트

### D0 — 사전 확정

- [ ] iwinv 계정·결제
- [ ] 운영 도메인 확정(또는 구매 예정)
- [ ] Git URL·브랜치
- [ ] Dev PC `pnpm build` 성공
- [ ] SSH 관리 PC IP (ELCAP용)
- [ ] 이메일 상품 선택 (웹메일 vs 그룹웨어)

### D1 — VM + ELCAP

- [ ] [서버 생성](https://help.iwinv.kr/manual/398): Lite-Zone, Rocky 9, SSD 25GB
- [ ] [ELCAP 방화벽](https://help.iwinv.kr/manual/62): SSH=내 IP, 80/443=공개
- [ ] 검색 Bot 차단 **하지 않음** (SEO)
- [ ] 공인 IP → `packages/env/deploy.json`

**스크립트**: SSH 후 `deploy/rocky-linux/scripts/00-preflight.sh`

### D2 — OS 보안·패키지

- [ ] `sudo bash deploy/rocky-linux/scripts/01-initial-hardening.sh`
- [ ] `sudo bash deploy/rocky-linux/scripts/02-nginx-setup.sh`
- [ ] (권장) SSH 포트 변경 + ELCAP 동기화

**필수 패키지**: nano, nginx, firewalld, fail2ban, curl, rsync

### D3 — 빌드·배포·HTTP

**권장 (Dev PC)**:

```powershell
npm exec --yes pnpm@9.15.9 build
# Git Bash: rsync apps/web/out/ → server:/var/www/lua/releases/<ts>/
```

**대안 (서버)**: `bash 04-server-build.sh <git-url>`

- [ ] `curl -I http://PUBLIC_IP/ko/` → 200/302

### D4 — DNS

- [ ] [DNS 등록](https://help.iwinv.kr/manual/69) · [A 레코드](https://help.iwinv.kr/manual/374)
- [ ] `@`, `www` → VM IP (CNAME 아님)
- [ ] `site.json` domain 갱신 → **재빌드·재배포**
- [ ] `nslookup www.DOMAIN 8.8.8.8` == VM IP

### D5 — HTTPS

- [ ] DNS 게이트 통과 후 `certbot --nginx`
- [ ] `certbot renew --dry-run`
- [ ] nginx.conf.example **덮어쓰기 금지**

### D6 — 이메일

- [ ] 테라웹메일/그룹웨어 신청
- [ ] [MX·SPF·A](https://help.iwinv.kr/manual/475) DNS 추가
- [ ] 웹메일 계정 생성·수신 테스트

---

## 4. 스크립트 위치

| 파일 | Phase |
|---|---|
| `deploy/rocky-linux/scripts/00-preflight.sh` | D1 |
| `deploy/rocky-linux/scripts/01-initial-hardening.sh` | D2 |
| `deploy/rocky-linux/scripts/02-nginx-setup.sh` | D2/D3 |
| `deploy/rocky-linux/scripts/03-nginx-rate-limit.conf.snippet` | D2 |
| `deploy/rocky-linux/scripts/04-server-build.sh` | D3 (대안) |
| `deploy/rocky-linux/nginx.conf.example` | D2/D3 |

---

## 5. 에이전트 사용법

Cursor에서 배포 Phase 진행 시:

```
@iwinv-deploy-orchestrator Phase D1부터 진행해줘
```

또는:

```
iwinv 배포 D2 — hardening 스크립트 실행 후 검증 명령 알려줘
```

에이전트는 **한 Phase씩** 콘솔·SSH·PowerShell 명령을 제공하고, 완료 확인 후 다음 Phase만 제안합니다.

---

## 6. 어디부터 시작?

**지금 바로 → Phase D0**

1. 운영 도메인 보유 여부 확인
2. iwinv [console.iwinv.kr](https://console.iwinv.kr/) 로그인 가능 여부
3. 로컬 `pnpm typecheck && pnpm build` 통과
4. 위 3가지 OK → **Phase D1 (VM 구매 + ELCAP)** 요청

---

_문서 버전: 2026-09-09 | iwinv-deploy-orchestrator 스킬과 동기화_
