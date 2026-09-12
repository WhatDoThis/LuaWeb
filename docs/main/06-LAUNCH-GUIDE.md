# 06-LAUNCH-GUIDE — 최종 브라우저 배포·오픈 가이드

**대상**: **루아(Lua)주식회사** 공식 홈페이지 — 운영 오픈 종합 절차서

> **전제**: Next.js `output: 'export'` → `apps/web/out/` → Rocky Linux(iwinv) + nginx + HTTPS  
> **Prd 현황**: `07-SERVER-PRODUCTION.md` — **D0~D6·S0~S3 완료** (`luacorp.co.kr`)  
> **관련 문서**: `deploy/README.md`, `deploy/rocky-linux/README.md`, `packages/env/site.json`, `packages/env/deploy.json`, `docs/report/13_SearchEngineRoadmap.md`

---

## 0. 이 가이드가 다루는 범위

| 단계 | 내용 |
|---|---|
| 1 | 콘텐츠·설정 최종 확정 |
| 2 | 운영용 빌드 생성 |
| 3 | iwinv 클라우드 VM(Rocky Linux) 준비 |
| 4 | 정적 파일 업로드 |
| 5 | nginx(리버스 프록시) 설정 |
| 6 | iwinv 도메인·DNS 연결 |
| 7 | SSL(HTTPS) 적용 |
| 8 | 오픈 전 점검 |
| 9 | Google·네이버·Bing 검색 등록 (**S0~S4**, `docs/report/13_SearchEngineRoadmap.md`) |
| 9.6 | organic SEO (검색어·메타·JSON-LD) — 유료 광고 없이 |
| 10 | 오픈 후·검색 **노출 확인** 모니터링 (§9.5, §11.2) |

### 용어 미리보기 (본문에서 반복 설명)

| 용어 | 쉬운 뜻 |
|---|---|
| **정적 사이트** | 서버가 HTML·CSS·JS 파일을 그대로 전달하는 방식. DB 없이 파일만 올리면 됨 |
| **nginx** | 웹 서버·**리버스 프록시** 소프트웨어. 방문자 요청을 받아 사이트 파일을 돌려줌 |
| **리버스 프록시(Reverse Proxy)** | 사용자와 실제 서비스 사이에서 요청을 받아 전달·보호하는 중간 문지기 |
| **SSL / HTTPS** | 주소창 자물쇠. 통신을 암호화하는 보안 연결 (`https://`) |
| **DNS** | 도메인(예: `www.example.com`)을 서버 IP 주소로 바꿔 주는 전화번호부 |
| **A 레코드** | DNS에서 “이 도메인 → 이 IP”를 가리키는 설정 |
| **TXT 레코드** | DNS에 텍스트 값을 넣는 설정. 검색엔진 **소유권 확인**에 자주 사용 |
| **사이트맵(sitemap.xml)** | 사이트에 있는 페이지 URL 목록 파일. 검색로봇에게 “이 페이지들을 봐 주세요”라고 알림 |
| **robots.txt** | 검색로봇에게 “수집해도 되는 경로 / 하면 안 되는 경로”를 알려 주는 파일 |
| **색인(Indexing)** | 검색엔진이 페이지를 읽어 검색 결과에 넣을 수 있게 등록하는 과정 |
| **크롤링(Crawling)** | 검색로봇이 웹페이지를 방문·수집하는 행위 |
| **organic SEO** | 검색광고 없이 title·description·콘텐츠로 검색 노출을 **유도**하는 작업 (순위·검색어 **보장 없음**) |

---

## 1. 오픈 전 준비 — “지금 올려도 되는 상태”인지 확인

아래 **전부** 체크된 뒤 서버 작업을 시작하세요.

### 1.1 콘텐츠·기능

- [ ] 모든 페이지 문구·이미지·연락처가 **최종본**인지 확인 (`docs/report/10_ContentInventory.md` 기준)
- [ ] ko/en 다국어 페이지가 모두 열리는지 로컬에서 확인
- [ ] 뉴스·공지 등 게시판 샘플/플레이스홀더가 운영에 맞게 정리되었는지 확인
- [ ] 파비콘·OG 이미지 등 공통 이미지 확정

### 1.2 빌드·품질

Dev(Windows) PC에서:

```powershell
cd c:\Project\LuaWeb
npm exec --yes pnpm@9.15.9 install
npm exec --yes pnpm@9.15.9 typecheck
npm exec --yes pnpm@9.15.9 build
```

- [ ] `typecheck` 오류 없음
- [ ] `build` 성공 후 `apps/web/out/` 폴더 생성됨
- [ ] (권장) Lighthouse SEO 점수 100 목표 — PRD KPI

### 1.3 확정해야 할 운영 정보 (미확정 시 보류)

| 항목 | 예시 | 기록 위치 |
|---|---|---|
| 운영 도메인 | `www.YOUR-DOMAIN.com` (루아 확정 도메인) | `packages/env/site.json` → `domain` |
| 서버 공인 IP | iwinv VM 할당 IP | `packages/env/deploy.json` → `publicIp` |
| SSH 접속 계정 | `rocky` 등 | 배포 스크립트·`.env` |
| 대표 URL 형식 | `https://www.YOUR-DOMAIN.com` (www 유무 확정) | SEO·리다이렉트·검색 등록에 동일하게 사용 |

> **중요**: `site.json`의 `domain`은 **빌드 시점**에 sitemap·robots·OG URL에 박힙니다. 도메인을 바꾸면 **반드시 다시 빌드** 후 업로드하세요.

---

## 2. 운영 설정 반영 및 프로덕션 빌드

### 2.1 `packages/env/site.json` 수정

```json
{
  "domain": "https://www.YOUR-DOMAIN.com",
  ...
}
```

- `https://` 포함, 끝에 `/` 없이 작성
- 회사명·연락처·주소 등 운영 값으로 갱신

### 2.2 `packages/env/deploy.json` 수정

```json
{
  "publicIp": "123.456.789.0",
  "domain": "www.YOUR-DOMAIN.com",
  "siteUrl": "https://www.YOUR-DOMAIN.com",
  "ssl": { "enabled": true, "provider": "letsencrypt" }
}
```

### 2.3 (선택) 환경변수

`.env.example` 참고. CI/CD 사용 시:

```bash
NEXT_PUBLIC_SITE_URL=https://www.YOUR-DOMAIN.com
NODE_ENV=production
```

### 2.4 프로덕션 빌드

```powershell
npm exec --yes pnpm@9.15.9 build
```

산출물: **`apps/web/out/`** — 이 폴더 전체가 웹사이트 본문입니다.

빌드 후 로컬 확인(선택):

```powershell
npx --yes serve apps/web/out -p 5050
```

브라우저에서 `http://localhost:5050/ko/` 접속.

### 2.5 이 프로젝트가 자동 생성하는 SEO 파일

| URL | 설명 |
|---|---|
| `/robots.txt` | 전체 허용 + sitemap 위치 (`apps/web/src/app/robots.ts`) |
| `/sitemap.xml` | 정적·뉴스 URL 목록 (`apps/web/src/app/sitemap.ts`) |
| `/ko/`, `/en/` | `trailingSlash: true` — 슬래시(`/`) 포함 URL |

오픈 후 `https://YOUR-DOMAIN/sitemap.xml`, `https://YOUR-DOMAIN/robots.txt` 가 브라우저에서 열려야 합니다.

---

## 3. iwinv 클라우드 VM 준비 (Rocky Linux)

> 상세 명령은 `deploy/rocky-linux/README.md` 참고.

### 3.1 VM 생성

1. [iwinv 관리콘솔](https://www.iwinv.kr/) 로그인
2. **클라우드 → 서버 생성**
3. OS: **Rocky Linux 9.x**
4. 사양(정적 호스팅 기준): 1 vCPU / 1 GB RAM / 20 GB Disk 이상
5. 생성 후 **공인 IP** 기록 → `deploy.json`의 `publicIp`

### 3.2 SSH 접속

Windows PowerShell:

```powershell
ssh rocky@YOUR_PUBLIC_IP
```

(최초 접속 시 iwinv 콘솔에서 제공하는 키·비밀번호 사용)

### 3.3 필수 패키지 설치

서버에서:

```bash
sudo dnf update -y
sudo dnf install -y nginx
sudo systemctl enable --now nginx

# HTTP(80), HTTPS(443) 방화벽 허용
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

- **nginx**: 앞단에서 HTTP/HTTPS 요청을 받아 `out/` 파일을 응답
- **방화벽(firewall)**: 외부에서 80·443 포트 접근 허용

> 이 프로젝트는 **서버에서 Node.js로 실행하지 않습니다.** 빌드는 Dev PC 또는 GitHub Actions에서 하고, 서버에는 `out/` 파일만 둡니다.

### 3.4 배포 디렉터리 생성

```bash
sudo mkdir -p /var/www/lua/releases
sudo ln -sfn /var/www/lua/releases/initial /var/www/lua/current
sudo chown -R $USER:nginx /var/www/lua
sudo find /var/www/lua -type d -exec chmod 755 {} \;
sudo find /var/www/lua -type f -exec chmod 644 {} \;
```

- nginx `root`는 **`/var/www/lua/current`** 를 가리킵니다(4장 releases 방식).
- 실제 산출물은 `/var/www/lua/releases/<타임스탬프>/` 에 두고, `current` 심볼릭만 바꿔 전환합니다.

---

## 4. 정적 파일 업로드

> **권장: rsync** — `scp -r out/*` 는 `.nojekyll` 등 **dot 파일(`.`으로 시작)** 을 누락할 수 있습니다. rsync는 숨김 파일까지 복사합니다.

### 4.1 무중단 배포 — releases / current (1순위)

Dev PC(WSL·Git Bash 등)에서 프로젝트 루트:

```bash
RELEASE=$(date +%Y%m%d_%H%M)
rsync -av --delete apps/web/out/ rocky@YOUR_PUBLIC_IP:/var/www/lua/releases/$RELEASE/
ssh rocky@YOUR_PUBLIC_IP "ln -sfn /var/www/lua/releases/$RELEASE /var/www/lua/current && sudo systemctl reload nginx"
```

| 단계 | 설명 |
|---|---|
| 업로드 | `/var/www/lua/releases/20260823_1430/` 등 타임스탬프 폴더에 rsync |
| 전환 | `ln -sfn <새 릴리스> /var/www/lua/current` — nginx reload |
| 롤백 | 이전 타임스탬프로 `ln -sfn` 재지정만 하면 **1초 컷** (nginx reload) |
| 정리 | `/var/www/lua/releases/` 에 **최근 3~5개**만 남기고 오래된 폴더 삭제 |

- `-a`: 권한·타임스탬프 유지, dot 파일 포함
- `--delete`: 대상 폴더에 남은 옛 파일 삭제

### 4.2 (대안) scp — dot 파일 주의

PowerShell:

```powershell
scp -r apps/web/out/* rocky@YOUR_PUBLIC_IP:/var/www/lua/releases/MANUAL/
```

dot 파일이 필요하면 WinSCP 등으로 `.nojekyll` 등을 **별도 업로드**하세요.

### 4.3 GitHub Actions 산출물 사용 (CI)

`.github/workflows/deploy.yml`은 현재 **빌드 아티팩트 업로드**까지 구현되어 있습니다. iwinv SSH 배포는 credentials 설정 후 TODO 구간을 완성하면 자동화할 수 있습니다.

수동 오픈 1회차는 **4.1 rsync + releases** 방식을 권장합니다.

---

## 5. nginx 설정 (리버스 프록시·정적 호스팅)

### 5.1 설정 파일 복사

서버에서 (또는 로컬에서 편집 후 업로드):

```bash
sudo cp /path/to/nginx.conf.example /etc/nginx/conf.d/lua.conf
```

프로젝트 템플릿: `deploy/rocky-linux/nginx.conf.example`

### 5.2 수정할 항목

| 항목 | 변경 예 |
|---|---|
| `server_name` | `www.YOUR-DOMAIN.com YOUR-DOMAIN.com` |
| `root` | `/var/www/lua/current` (→ `releases/<타임스탬프>/` 심볼릭) |

핵심 동작:

```nginx
location / {
    try_files $uri $uri/ $uri/index.html =404;
}
```

- Next.js 정적 export + `trailingSlash: true` 에 맞춰 `/ko/` → `ko/index.html` 을 찾습니다.

### 5.3 적용

```bash
sudo nginx -t
sudo systemctl reload nginx
```

- `nginx -t`: 설정 문법 검사
- `reload`: 서비스 중단 없이 설정 반영

### 5.4 (SSL 적용 전) IP로 1차 확인

```bash
curl -I http://YOUR_PUBLIC_IP/ko/
```

HTTP 200 또는 301/302 응답이면 nginx·파일 배치는 정상입니다.

### 5.5 SELinux·파일 권한 (Rocky Linux — 403 예방)

Rocky Linux는 **SELinux**(Security-Enhanced Linux, 보안 강화 커널 정책)가 기본 **enforcing**(강제 적용)입니다.  
`chmod`·`chown`이 맞아도 **파일 컨텍스트**가 nginx(httpd)에 맞지 않으면 **403 Forbidden** 이 납니다. 권한만 반복 조정해도 해결되지 않는 대표 원인입니다.

```bash
sudo chown -R $USER:nginx /var/www/lua
sudo find /var/www/lua -type d -exec chmod 755 {} \;
sudo find /var/www/lua -type f -exec chmod 644 {} \;
sudo restorecon -Rv /var/www/lua
sudo setsebool -P httpd_read_user_content 1
```

- **755(디렉터리) / 644(파일)**: HTML·CSS·JS에는 실행 권한(`750` 일괄 적용)이 불필요합니다.
- **`restorecon`**: SELinux 컨텍스트를 nginx가 읽을 수 있게 재설정
- **`httpd_read_user_content`**: nginx가 사용자 홈/웹 디렉터리 콘텐츠를 읽도록 허용

403 발생 시 SELinux 거부 로그 확인:

```bash
sudo ausearch -m avc -ts recent
```

---

> **⚠️ certbot 적용 후 nginx conf 덮어쓰기 금지**  
> `certbot --nginx` 는 `/etc/nginx/conf.d/lua.conf` 에 **HTTPS server 블록을 직접 추가·수정**합니다.  
> SSL 적용 **이후** `nginx.conf.example` 을 다시 `cp`로 덮어쓰면 **HTTPS 설정이 통째로 사라집니다.**  
> **재배포 시**: `/var/www/lua/releases/` 의 **정적 파일만** 교환하고, nginx conf는 건드리지 마세요. conf 변경이 필요할 때만 `nginx -t` 후 `reload` 합니다.

---

## 6. iwinv 도메인·DNS 연결

도메인을 iwinv에서 구매했거나, iwinv DNS로 관리할 때의 흐름입니다.  
(iwinv 공식: [DNS 관리(레코드 수정)](https://help.iwinv.kr/manual/374), [A 레코드·도메인 연결](https://help.iwinv.kr/manual/200))

### 6.1 DNS 등록 (최초 1회)

1. iwinv **관리콘솔 → 도메인 & DNS → DNS 관리**
2. **등록하기** → 운영 도메인 입력 → **도메인 추가**
3. 타사 구매 도메인이면 **네임서버**를 iwinv(`ns1.iwinv.kr` 등)로 변경 — **레코드 등록 후** 변경 권장

### 6.2 A 레코드 추가

**레코드 수정 → 레코드 추가**

| 이름(호스트) | 유형 | 값 |
|---|---|---|
| *(빈칸)* — 루트 `@` | A | VM **공인 IP** |
| `www` | A | VM **공인 IP** |

- **A 레코드**: “이 이름의 도메인은 이 IP 서버로 가라”는 DNS 설정
- 루트(`example.com`)와 `www.example.com` **둘 다** 쓸 경우 레코드 2개 필요

### 6.3 전파 확인

PowerShell:

```powershell
nslookup www.YOUR-DOMAIN.com
nslookup YOUR-DOMAIN.com
```

응답 IP가 VM 공인 IP와 같으면 OK. 반영까지 **수 분~48시간** 걸릴 수 있습니다.

### 6.4 (권장) www ↔ non-www 통일

검색엔진·SSL·소셜 공유 URL이 하나로 모이도록 **대표 주소** 하나를 정하세요.

예: `https://www.YOUR-DOMAIN.com` 을 대표로 할 때 — SSL 적용 후 nginx에 non-www → www 리다이렉트 추가:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name YOUR-DOMAIN.com;
    return 301 https://www.YOUR-DOMAIN.com$request_uri;
}
```

(certbot이 HTTPS 블록도 자동 생성한 뒤 동일하게 301 추가)

---

> **🛑 SSL(7장) 시작 전 필수 — DNS 전파 완료 확인**  
> Let's Encrypt **certbot**(HTTP-01 챌린지)은 도메인이 **이미 VM 공인 IP**를 가리켜야 성공합니다. DNS 미전파 상태에서 certbot을 돌리면 실패하며, **실패 횟수 제한(rate limit)** 에 걸리면 **오픈 당일 몇 시간~하루** 발급이 막힐 수 있습니다. **7장으로 넘어가기 전에 반드시 아래를 통과하세요.**

Linux/macOS:

```bash
dig +short www.YOUR-DOMAIN.com @8.8.8.8
dig +short YOUR-DOMAIN.com @8.8.8.8
```

Windows PowerShell:

```powershell
nslookup www.YOUR-DOMAIN.com 8.8.8.8
nslookup YOUR-DOMAIN.com 8.8.8.8
```

- 결과 IP가 **VM 공인 IP와 일치**할 때만 7장 진행
- 불일치면 6.3 전파 대기 후 재확인 (최대 48시간)

---

## 7. SSL(HTTPS) 적용 — Let’s Encrypt + certbot

> **⚠️ certbot은 nginx conf를 자동 수정합니다**  
> 5.5절 경고와 동일 — SSL 적용 후 `nginx.conf.example` 덮어쓰기 금지. 인증서 갱신은 `certbot renew` 가 처리합니다.

도메인 DNS가 서버 IP를 가리킨 **후**(위 DNS 게이트 통과 후) 진행하세요.

### 7.1 certbot 설치

```bash
sudo dnf install -y certbot python3-certbot-nginx
```

- **Let’s Encrypt**: 무료 SSL 인증서 발급 기관
- **certbot**: 인증서 발급·nginx 자동 설정 도구

### 7.2 인증서 발급

```bash
sudo certbot --nginx -d www.YOUR-DOMAIN.com -d YOUR-DOMAIN.com
```

- 이메일 입력, 약관 동의
- HTTP → HTTPS 리다이렉트 질문: **권장 — Redirect(2)** 선택

### 7.3 자동 갱신

```bash
sudo certbot renew --dry-run
```

인증서는 약 90일마다 갱신 필요. certbot이 systemd timer로 자동 갱신합니다.

### 7.4 HTTPS 최종 확인

브라우저:

- `https://www.YOUR-DOMAIN.com/ko/`
- `https://www.YOUR-DOMAIN.com/en/`
- `https://www.YOUR-DOMAIN.com/sitemap.xml`
- `https://www.YOUR-DOMAIN.com/robots.txt`

주소창 **자물쇠** 표시, Mixed Content(HTTP 리소스) 경고 없음.

---

## 8. 오픈 전 최종 점검 체크리스트

### 8.1 기능·페이지

- [ ] `packages/env/site.json` 의 `domain` 이 **운영 HTTPS 도메인**인가 (`example.com`·미설정 시 **production 빌드가 실패**하도록 변경됨)
- [ ] `packages/env/deploy.json` 의 `publicIp` / `domain` / `siteUrl` 갱신 여부
- [ ] 브라우저에서 **루트(`/`)** 접속 시 `/ko/` 로 이동하는가 (meta refresh + nginx `302 /ko/`)
- [ ] 없는 주소 접속 시 **커스텀 404**(`404.html`)가 뜨는가
- [ ] GNB·푸터·언어 전환(ko/en) 정상
- [ ] 17+ 라우트 주요 페이지 404 없음
- [ ] 뉴스 목록·상세 링크 동작
- [ ] 모바일 화면 레이아웃 확인
- [ ] 연락처·지도·이메일 등 실제 정보 일치

### 8.2 SEO·메타

- [ ] `out/sitemap.xml` · `out/robots.txt` 에 **example.com** 이 남아 있지 않은가
- [ ] 페이지 `<title>`, `description` 적절
- [ ] `/sitemap.xml` 에 운영 도메인 URL로 출력
- [ ] `/robots.txt` 에 `Sitemap: https://.../sitemap.xml` 포함
- [ ] JSON-LD Organization 스키마(홈) — 소스 보기에서 확인

### 8.3 서버·보안

- [ ] HTTP → HTTPS 리다이렉트
- [ ] nginx `nginx -t` 통과
- [ ] 불필요한 디렉터리 listing 비활성(기본 off)
- [ ] SSH 키 로그인·강한 비밀번호

### 8.4 성능(권장)

- [ ] 재배포 후 **강력 새로고침 없이** 최신 HTML이 보이는가 (nginx HTML `no-cache` 정책)
- [ ] Lighthouse Performance ≥ 95 (PRD)
- [ ] `_next/static/` 캐시 헤더 — `nginx.conf.example`에 1년 캐시 설정됨

---

## 9. 검색엔진 등록 — Google · 네이버 · Bing

검색 등록은 “사이트를 검색 결과에 **넣어 달라**”고 알리는 작업입니다.  
등록 직후 바로 1위에 노출되지는 않으며, **색인**까지 보통 **수일~수주** 걸릴 수 있습니다.

> **Prd(luacorp.co.kr)**: iwinv **D0~D6(HTTPS 공개) 완료 후** 진행.  
> **실행 체크리스트**: `docs/report/13_SearchEngineRoadmap.md`  
> **에이전트 스킬**: `.cursor/skills/search-engine-registration-orchestrator/` — 배포(D0~D6)와 동일하게 **Phase S0→S4 한 단계씩** 진행.

### 9.0 Phase S0~S4 개요 (오케스트레이터)

| Phase | 목표 | 완료 게이트 |
|---|---|---|
| **S0** | SEO 사전 게이트 | HTTPS·robots·sitemap 정상, 계정 준비 |
| **S1** | Google Search Console | 소유 확인 + sitemap 성공 |
| **S2** | 네이버 서치어드바이저 | 소유 확인 + 사이트맵 제출 |
| **S3** | Bing Webmaster Tools | GSC 가져오기 또는 수동 + sitemap |
| **S4** | 사후 모니터링 | 색인·404·월간 점검 |

```
S0 게이트 (sitemap·robots·HTTPS)
  ↓
S1 Google — 속성·소유 확인·sitemap·URL 검사
  ↓
S2 네이버 — 등록·소유 확인·sitemap·(선택) 수집 요청
  ↓
S3 Bing — Import from Google Search Console (권장)
  ↓
S4 색인·트래픽 모니터링
```

**루아 Prd 확정값** (S0~S3 입력 시 그대로 사용):

| 항목 | 값 |
|---|---|
| 대표 URL | `https://www.luacorp.co.kr` |
| Google 속성 | **도메인** `luacorp.co.kr` *(www·http/https 전체)* |
| 네이버·Bing 사이트 URL | `https://www.luacorp.co.kr` |
| sitemap (네이버·Bing) | `https://www.luacorp.co.kr/sitemap.xml` |
| sitemap (Google 입력) | `sitemap.xml` *(경로만)* |

### 9.0.0 Prd 완료 기록 (2026-09-11)

| Phase | 방법 | 상태 |
|---|---|---|
| S0 | HTTPS·robots·sitemap 게이트 | ✅ |
| S1 Google | **도메인** `luacorp.co.kr` + iwinv DNS **TXT** (`google-site-verification=...`) | ✅ |
| S1 sitemap | `sitemap.xml` 제출 — 색인 **승인 진행 중** (정상) | ✅ |
| S2 네이버 | `https://www.luacorp.co.kr` + HTML `naver1ca80d5dc74efb3674336faa5e15901b.html` | ✅ |
| S2 robots | `https://www.luacorp.co.kr/robots.txt` — **수집 요청**·실시간 조회는 **https+www** URL 사용 | ✅ |
| S3 Bing | **Import from Google Search Console** (자동 등록) | ✅ |

### 9.0.1 S0 — SEO 사전 게이트 (선행 필수)

**선행**: `07-SERVER-PRODUCTION.md` — D0~D6 완료.

Dev PC 검증:

```powershell
curl.exe -sI "https://www.luacorp.co.kr/ko/"
curl.exe -s "https://www.luacorp.co.kr/robots.txt"
curl.exe -s "https://www.luacorp.co.kr/sitemap.xml" | Select-Object -First 5
```

| 조건 | 확인 방법 | Prd 기대값 |
|---|---|---|
| HTTPS 정상 | `/ko/` 200, 자물쇠 | ✅ |
| robots.txt 허용 | `User-agent: *` + `Allow: /` | ✅ |
| sitemap 접근 | `/sitemap.xml` 200, `<loc>` 도메인 | `www.luacorp.co.kr` |
| 대표 URL 일치 | site.json·sitemap·등록 URL 동일 | `https://www.luacorp.co.kr` |
| 검색 Bot 미차단 | firewalld·nginx에서 Googlebot/Yeti/bingbot 차단 없음 | ✅ |

- [x] S0 게이트 통과 → **S1 Google** 시작
- [x] Google·네이버 로그인 계정 확정
- [x] 소유 확인: Google **DNS TXT** / 네이버 **HTML 파일** / Bing **GSC 가져오기**

### 9.0.2 소유 확인 — 1회 빌드·배포 (HTML 파일 권장)

정적 export이므로 Search Console 등이 주는 파일을 **`apps/web/public/`** 에 넣고 빌드·배포합니다.

```
apps/web/public/googleXXXXXXXX.html
apps/web/public/naverXXXXXXXX.html    (네이버 HTML 방식)
apps/web/public/BingSiteAuth.xml      (Bing 수동 등록 시만; GSC 가져오기면 생략 가능)
```

```powershell
cd c:\Project\LuaWeb
npm exec --yes pnpm@9.15.9 build
# apps/web/out/ → /var/www/lua/releases/<timestamp>/ 업로드 (D3과 동일)
```

메타 태그 방식은 §10.2, DNS TXT는 §10.3·iwinv DNS 관리 참고.

---

### 9.1 S1 — Google Search Console (구글 서치 콘솔)

> **Phase S1** — S0 게이트 통과 후 진행.

**공식**: [Search Console 속성 추가](https://support.google.com/webmasters/answer/34592?hl=ko)

#### 접속

1. https://search.google.com/search-console
2. Google 계정 로그인 → **속성 추가**

#### 속성 유형 선택

| 유형 | 장점 | 소유권 확인 |
|---|---|---|
| **도메인** (`example.com`) | `http`/`https`, `www`/non-www 전체 | **DNS TXT 레코드만** |
| **URL 접두어** (`https://www.example.com/`) | HTML 태그·파일 업로드 등 선택지 많음 | HTML 메타 태그, HTML 파일, DNS 등 |

**Prd 적용**: **도메인** `luacorp.co.kr` — iwinv DNS `@` TXT 추가 (기존 SPF TXT **유지**).

**대안(초보)**: URL 접두어 `https://www.luacorp.co.kr/` — HTML 파일·메타 태그 등 선택지 많음.

#### 소유권 확인 방법 (URL 접두어 기준)

**방법 A — HTML 파일 업로드 (정적 사이트에 적합)**

1. Search Console이 제공하는 `googleXXXX.html` 파일 다운로드
2. `apps/web/public/` 에 넣고 **다시 빌드** → `out/`에 포함됨
3. 업로드 후 `https://www.YOUR-DOMAIN.com/googleXXXX.html` 브라우저에서 열림 확인
4. Search Console **확인** 클릭

**방법 B — HTML 메타 태그**

1. `<meta name="google-site-verification" content="..." />` 복사
2. `apps/web/src/app/[locale]/layout.tsx` 의 `generateMetadata` → `verification.google` 에 추가 후 빌드·배포
3. Search Console **확인**

**방법 C — DNS TXT (도메인 속성)**

1. Search Console → 도메인 속성 → TXT 값 복사
2. iwinv **DNS 관리 → 레코드 추가 → TXT**
3. 전파 후(최대 24~48시간) **확인**

#### 사이트맵 제출

1. 좌측 **색인 생성 → Sitemaps**
2. **새 사이트맵 추가**에 `sitemap.xml` 만 입력 (경로만, 전체 URL 아님)
3. 상태 **성공** 확인

#### (선택) URL 색인 요청

- **URL 검사** → 홈·주요 페이지 URL 입력 → **색인 생성 요청**
- 모든 페이지를 일일이 넣을 필요는 없음. sitemap 제출이 우선.

#### 참고

- 등록해도 Google 검색 순위가 보장되지는 않음 — **수집·색인 현황 확인 도구**
- 데이터 표시까지 며칠 소요 가능

---

### 9.2 S2 — 네이버 서치어드바이저 (Search Advisor)

> **Phase S2** — S1 Google 소유 확인·sitemap 제출 후 진행 (순서 바꿔도 되나 Bing GSC 가져오기는 S1 후가 빠름).

**공식**: [시작하기](https://searchadvisor.naver.com/start), [robots.txt](https://searchadvisor.naver.com/guide/seo-basic-robots), [사이트맵 제출](https://searchadvisor.naver.com/guide/request-feed)

#### 접속·등록

1. https://searchadvisor.naver.com/
2. 네이버 로그인 → **웹마스터 도구**
3. **사이트 등록** — `https://www.luacorp.co.kr` (**http와 https 별도**. HTTPS 사이트면 **https** 로 등록)

#### 소유 확인

| 방법 | 절차 |
|---|---|
| HTML 태그 | `<meta name="naver-site-verification" content="..." />` → layout metadata에 추가 후 빌드·배포 |
| HTML 파일 | 제공 파일을 `public/` → 빌드 → `out/` 루트 업로드 |
| DNS | TXT 레코드 추가 (iwinv DNS) |

#### robots.txt (네이버 Yeti 로봇)

본 프로젝트 기본 `robots.ts`는 `User-agent: *` + `Allow: /` — **네이버 Yeti 포함 전체 허용**.

네이버 권장 예시(참고):

```
User-agent: *
Allow: /
Sitemap: https://www.luacorp.co.kr/sitemap.xml
```

주의 (네이버 공식):

- `robots.txt`는 **반드시 사이트 루트** (`/robots.txt`)
- `Content-Type: text/plain`, **2xx** 응답
- `Disallow: /` 로 전체 차단하면 **어떤 페이지도 검색 노출 안 됨**
- Yeti만 막혀 있지 않은지 확인 (`User-agent: Yeti` + `Allow: /`)

#### 사이트맵 제출

1. **요청 → 사이트맵 제출**
2. `https://www.luacorp.co.kr/sitemap.xml` 입력

**네이버 제한 (공식)**:

| 항목 | 제한 |
|---|---|
| 파일 크기 | 10 MB 미만 |
| URL 개수 | 사이트맵 1개당 50,000 URL 이하 |
| 도메인 | sitemap 내 URL 도메인 = 소유 확인된 도메인과 **동일** |

#### (선택) 웹 페이지 수집 요청

- **요청 → 웹 페이지 수집** — 새로 올린 중요 URL 직접 제출
- **robots.txt 수집 요청** — robots 수정 후 빠른 반영

#### 색인 기간

- 통상 **1~4주** — 사이트맵·수집 요청·내부 링크 품질에 따라 달라짐

---

### 9.3 S3 — Bing Webmaster Tools (빙 웹마스터 도구)

> **Phase S3** — **S1 Google 완료 후** `Import from Google Search Console` 권장 (약 30초).

**공식**: [Bing Webmaster Tools](https://www.bing.com/webmasters), [시작 가이드(2025)](https://blogs.bing.com/webmaster/June-2025/Start-Using-Bing-Webmaster-Tools-to-Improve-Your-Site-Visibility)

Bing 등록은 Yahoo 검색에도 데이터가 공유되는 경우가 많습니다.

#### 가장 빠른 방법 — Google Search Console 가져오기

1. https://www.bing.com/webmasters 로그인
2. **Import from Google Search Console** 선택
3. Google 계정 연동 → **이미 Google에서 확인한 사이트·sitemap** 이 함께 옴

Google 등록을 먼저 끝낸 뒤 이 방법을 쓰면 **30초 내** 설정 가능.

#### 수동 등록

1. **Add a site** → `https://www.luacorp.co.kr`
2. 소유권 확인: XML 파일(`BingSiteAuth.xml`) 루트 업로드, 메타 태그, DNS TXT/CNAME 중 선택
3. **Sitemaps → Submit sitemap**
4. **전체 URL** 입력: `https://www.luacorp.co.kr/sitemap.xml`  
   (Google과 달리 Bing은 **전체 URL** 필요 — `sitemap.xml` 만 넣으면 실패하는 경우 있음)

#### (선택) IndexNow

- 콘텐츠 업데이트 시 Bing 등에 즉시 알리는 프로토콜
- 정적 사이트는 **재빌드·재배포 + sitemap** 으로도 충분. 대규모 자주 업데이트 시 검토

---

### 9.4 검색 등록 요약표

| 플랫폼 | URL | 소유 확인 (Prd) | 사이트맵 입력 형식 | 공식 가이드 |
|---|---|---|---|---|
| Google | search.google.com/search-console | **DNS TXT** `@` | `sitemap.xml` (경로만) | [도움말](https://support.google.com/webmasters/answer/34592?hl=ko) |
| 네이버 | searchadvisor.naver.com | **HTML** `naver1ca80d5dc74efb3674336faa5e15901b.html` | 전체 URL | [사이트맵](https://searchadvisor.naver.com/guide/request-feed) |
| Bing | bing.com/webmasters | **GSC 가져오기** | **전체 URL** (자동) | [Bing 블로그](https://blogs.bing.com/webmaster/June-2025/Start-Using-Bing-Webmaster-Tools-to-Improve-Your-Site-Visibility) |

> **네이버 robots.txt 주의**: [공식 가이드](https://searchadvisor.naver.com/guide/seo-basic-robots) — robots는 **호스트·프로토콜별** 적용. URL 실시간 조회·수집은 **`https://www.luacorp.co.kr`** 기준. `http://luacorp.co.kr`(non-www) 조회 시 301 때문에 **「없음」 오탐** 가능.

---

### 9.5 S4 — 검색 노출 확인·모니터링 (지속)

> **Phase S4** — S1~S3 완료 후. **검색어를 “설정”하는 메뉴는 없음** — organic 노출은 콘텐츠·메타 + 시간.

#### 9.5.1 검색어는 어떻게 정해지나

| 요인 | 프로젝트 반영 위치 |
|---|---|
| `<title>` · `description` | `packages/content/*/home.json` · 페이지별 `generateMetadata` |
| 본문·제목 | `packages/content/` JSON |
| JSON-LD Organization | `json-ld-organization.tsx` |
| sitemap·robots | 빌드 시 자동 (`sitemap.ts`, `robots.ts`) |

**빨리 잡히기 쉬운 검색어**: `루아주식회사`, `LUA Corporation`, `luacorp`, `site:luacorp.co.kr`  
**경쟁 큰 일반어**(`데이터센터` 등): 순위 보장 없음 — §9.6 organic SEO로 **유도**만 가능.

#### 9.5.2 노출 확인 루틴

**1~2주 후 (최초)**

| 확인 | 방법 |
|---|---|
| Google 색인 | Search Console → **색인 생성** 페이지 수 |
| Google 검색어 | Search Console → **실적** → 검색어 *(데이터 처리 중이면 며칠 대기)* |
| Google 수동 검색 | `site:luacorp.co.kr` · `루아주식회사` · `luacorp` |
| 네이버 | `site:www.luacorp.co.kr` · `루아주식회사` |
| 네이버 리포트 | 서치어드바이저 → **요약·수집·색인** |
| Bing | Webmaster Tools → **Pages indexed** |

**월 1회**

- [ ] Search Console — 색인 오류·404 증가
- [ ] 네이버 — robots/sitemap·수집 리포트
- [ ] §11.2 서버·SSL 점검
- [ ] 실적 검색어 보고 → description·뉴스 콘텐츠 조정 (§9.6)

**콘텐츠·SEO 수정 후**

```
JSON/메타 수정 → pnpm build → releases 업로드
  → (선택) GSC URL 검사 · 네이버 웹 페이지·robots.txt 수집 요청
```

#### 9.5.3 기대 기간 (참고)

| 플랫폼 | 색인·실적 데이터 |
|---|---|
| Google | 수일~2주 |
| 네이버 | 1~4주 |
| Bing | GSC 연동 후 수일~수주 |

---

### 9.6 organic SEO — 유료 광고 없이 적용 (Prd 반영)

검색 **순위·검색어를 지정하는 설정은 없음**. 아래는 **노출 힌트**를 사이트에 박는 작업.

| 항목 | 파일 | Prd 적용 |
|---|---|---|
| 홈 description·keywords | `packages/content/ko|en/home.json` → `meta` | ✅ 키워드·설명 보강 |
| 페이지별 title·description | `apps/web/src/lib/sub-page-metadata.ts` + 각 `page.tsx` `generateMetadata` | ✅ 서브 페이지 |
| metadataBase · naver verification | `apps/web/src/app/[locale]/layout.tsx` | ✅ |
| JSON-LD alternateName·description | `json-ld-organization.tsx` | ✅ |
| 네이버 소유 확인 파일 | `apps/web/public/naver1ca80d5dc74efb3674336faa5e15901b.html` | ✅ |

**수정 후 배포 (필수)**:

```powershell
cd c:\Project\LuaWeb
npm exec --yes pnpm@9.15.9 typecheck
npm exec --yes pnpm@9.15.9 build
# apps/web/out/ → /var/www/lua/releases/<YYYYMMDD_HHMM>/ → current 심볼릭 (§4, 07-SERVER-PRODUCTION)
```

**추가 권장 (운영)**

- 뉴스·공지 등록 → sitemap 자동 포함 → (선택) GSC URL 검사·네이버 수집 요청
- description에 **회사명·핵심 사업어**를 자연스럽게 포함 (키워드 나열 금지)

---

## 10. 소유권 확인 파일·메타 태그 — 프로젝트 적용 팁

정적 export 사이트이므로 **서버에서 동적 처리 불가**. 아래 중 하나:

### 10.1 HTML 파일 (가장 단순)

```
apps/web/public/googleXXXXXXXX.html          (Google URL 접두어 방식 시)
apps/web/public/naver1ca80d5dc74efb3674336faa5e15901b.html   (Prd 네이버)
apps/web/public/BingSiteAuth.xml             (Bing 수동 등록 시만)
```

→ `pnpm build` → `out/` 루트에 복사됨 → 서버 업로드

### 10.2 Next.js Metadata (메타 태그)

`apps/web/src/app/[locale]/layout.tsx` 의 `generateMetadata` return 객체에:

```ts
verification: {
  google: 'google-site-verification=...',
  other: {
    'naver-site-verification': '...',
  },
},
```

→ 빌드·배포 후 홈 HTML `<head>` 에 태그 포함

### 10.3 DNS TXT (도메인 단위, 파일 업로드 불필요)

iwinv DNS에 Google·네이버·Bing이 준 TXT 문자열 추가.  
코드 변경 없이 확인 가능 — **DNS 전파 대기** 필요.

**Prd Google TXT** (2026-09-11): `@` TXT `google-site-verification=...` — SPF TXT와 **공존**.

---

## 11. 오픈 후 운영·재배포

### 11.1 콘텐츠 수정 → 재오픈 흐름

```
콘텐츠 JSON/이미지 수정
  → pnpm typecheck && pnpm build
  → apps/web/out/ → releases/<타임스탬프>/ 동기화 (rsync)
  → (필요 시) Search Console URL 검사 / 네이버 수집 요청
```

### 11.2 정기 점검 (월 1회 권장)

**서버**

- [ ] SSL 만료일 — `certbot certificates`
- [ ] nginx·디스크 용량 — `df -h`, 로그 로테이션

**검색·노출** (상세 §9.5.2)

- [ ] Search Console — **색인 생성** 오류, 404 증가, **실적 → 검색어**
- [ ] 네이버 서치어드바이저 — 수집·색인 리포트, robots/sitemap 오류
- [ ] Bing Webmaster Tools — indexed pages
- [ ] 수동 검색: `site:luacorp.co.kr`, `루아주식회사`, `site:www.luacorp.co.kr`

### 11.3 로그

- nginx access: `/var/log/nginx/lua.access.log`
- nginx error: `/var/log/nginx/lua.error.log`

---

## 12. 자주 발생하는 문제

| 증상 | 원인 | 해결 |
|---|---|---|
| 도메인 접속 안 됨 | DNS 미전파·A 레코드 오타 | `nslookup`, iwinv DNS 재확인, 최대 48h 대기 |
| HTTPS 인증서 실패 | DNS가 아직 IP 미연결 | A 레코드 전파 후 certbot 재실행 |
| `/ko/` 404 | `out/` 미업로드·root 경로 오류 | nginx `root`, `try_files` 확인 |
| sitemap 도메인이 example.com | `site.json` 미변경 상태로 빌드 | domain 수정 → **재빌드** → 재업로드 |
| Google 소유 확인 실패 | 파일·메타 미배포 또는 http/https 불일치 | URL 접두어와 실제 접속 URL 일치 확인 |
| 네이버만 색인 안 됨 | Yeti 차단·http/https 불일치 | robots.txt, **https+www** 로 등록·조회 |
| 네이버 robots 「없음」 | `http://luacorp.co.kr` 조회 시 301 | **`https://www.luacorp.co.kr/robots.txt`** · robots.txt **수집 요청** |
| Bing sitemap 오류 | 경로만 제출 | `https://도메인/sitemap.xml` 전체 URL 제출 |

---

## 13. 전체 흐름도 (한눈에)

```
[1] 콘텐츠·site.json·deploy.json 확정
         ↓
[2] pnpm build → apps/web/out/
         ↓
[3] iwinv Rocky Linux VM + nginx + 방화벽
         ↓
[4] out/ → /var/www/lua/releases/<타임스탬프>/ → current 심볼릭
         ↓
[5] nginx server_name·root 설정
         ↓
[6] iwinv DNS A 레코드 (@, www) → VM IP
         ↓
[7] certbot --nginx → HTTPS
         ↓
[8] 브라우저·sitemap·robots 최종 점검
         ↓
[9] S0~S3 검색 등록 + §9.6 organic SEO
         ↓
[10] S4 노출 확인 루틴 (§9.5), 콘텐츠 변경 시 재빌드·재배포
```

---

## 14. 관련 파일 빠른 참조

| 파일 | 역할 |
|---|---|
| `packages/env/site.json` | 운영 도메인·회사 정보 (빌드 시 SEO 반영) |
| `packages/env/deploy.json` | 서버 IP·배포 경로 placeholder |
| `deploy/rocky-linux/nginx.conf.example` | nginx 템플릿 |
| `deploy/rocky-linux/README.md` | 서버 명령어 상세 |
| `apps/web/out/` | 배포 산출물 (빌드 후 생성) |
| `apps/web/src/app/sitemap.ts` | sitemap.xml 생성 |
| `apps/web/src/app/robots.ts` | robots.txt 생성 |
| `.github/workflows/deploy.yml` | CI 빌드 (Prd SSH 배포는 credentials 후 확장) |

---

## 15. 확인 필요 (운영 정보 확정 시 갱신)

- [x] iwinv VM 공인 IP — `49.247.132.149` (`07-SERVER-PRODUCTION.md`)
- [x] 최종 운영 도메인 — `luacorp.co.kr` / `www.luacorp.co.kr`
- [x] 대표 URL — `https://www.luacorp.co.kr` (301 통일)
- [x] 검색 등록 — Google·네이버·Bing (S0~S3, 2026-09-11)
- [ ] S4 노출 확인 루틴 지속 (§9.5.2)
- [ ] CI → iwinv 자동 배포 SSH 키·시크릿

---

_문서 버전: 2026-09-11 (2차) | luacorp.co.kr Prd · S0~S3 완료 · §9.5 노출 루틴 · §9.6 organic SEO 반영_

**변경 이력**

- 2026-08-23: SELinux·DNS SSL 게이트·certbot 경고·releases/current 무중단 배포·오픈 점검 항목 보강 (2차 검수 반영)
