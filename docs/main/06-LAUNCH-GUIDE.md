# 06-LAUNCH-GUIDE — 최종 브라우저 배포·오픈 가이드

**대상**: **루아(Lua)** 기업 홍보 웹사이트 — 운영 오픈 종합 절차서  
> (벤치마크 사이트 wooritg.com·「우리기술」 명칭과 무관. 본 가이드는 루아 공식 사이트 기준입니다.)

> **전제**: Next.js `output: 'export'` → `apps/web/out/` → Rocky Linux(iwinv) + nginx + HTTPS  
> **관련 문서**: `deploy/README.md`, `deploy/rocky-linux/README.md`, `packages/env/site.json`, `packages/env/deploy.json`

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
| 9 | Google·네이버·Bing 검색 등록 |
| 10 | 오픈 후 모니터링 |

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
sudo mkdir -p /var/www/lua/out
sudo chown -R $USER:nginx /var/www/lua
sudo chmod -R 750 /var/www/lua
```

---

## 4. 정적 파일 업로드

### 4.1 Dev Windows → Prd 서버

PowerShell (프로젝트 루트):

```powershell
scp -r apps/web/out/* rocky@YOUR_PUBLIC_IP:/var/www/lua/out/
```

또는 rsync(WSL·Git Bash 등):

```bash
rsync -avz --delete apps/web/out/ rocky@YOUR_PUBLIC_IP:/var/www/lua/out/
```

- `-r` / `-a`: 폴더 통째로 복사
- `--delete`: 서버에 남은 옛 파일 삭제(재배포 시 권장)

### 4.2 GitHub Actions 산출물 사용 (CI)

`.github/workflows/deploy.yml`은 현재 **빌드 아티팩트 업로드**까지 구현되어 있습니다. iwinv SSH 배포는 credentials 설정 후 TODO 구간을 완성하면 자동화할 수 있습니다.

수동 오픈 1회차는 위 `scp`/`rsync`로 충분합니다.

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
| `root` | `/var/www/lua/out` |

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

## 7. SSL(HTTPS) 적용 — Let’s Encrypt + certbot

도메인 DNS가 서버 IP를 가리킨 **후** 진행하세요.

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

- [ ] GNB·푸터·언어 전환(ko/en) 정상
- [ ] 17+ 라우트 주요 페이지 404 없음
- [ ] 뉴스 목록·상세 링크 동작
- [ ] 모바일 화면 레이아웃 확인
- [ ] 연락처·지도·이메일 등 실제 정보 일치

### 8.2 SEO·메타

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

- [ ] Lighthouse Performance ≥ 95 (PRD)
- [ ] `_next/static/` 캐시 헤더 — `nginx.conf.example`에 1년 캐시 설정됨

---

## 9. 검색엔진 등록 — Google · 네이버 · Bing

검색 등록은 “사이트를 검색 결과에 **넣어 달라**”고 알리는 작업입니다.  
등록 직후 바로 1위에 노출되지는 않으며, **색인**까지 보통 **수일~수주** 걸릴 수 있습니다.

### 9.0 공통 사전 조건

| 조건 | 확인 방법 |
|---|---|
| HTTPS 정상 | `https://대표도메인/ko/` 접속 |
| robots.txt 허용 | `User-agent: *` + `Allow: /` (본 프로젝트 기본값) |
| sitemap 접근 | 브라우저에서 `/sitemap.xml` 200 OK |
| 대표 URL 확정 | 등록·sitemap·site.json 모두 **동일 도메인** |

---

### 9.1 Google — Search Console (구글 서치 콘솔)

**공식**: [Search Console 속성 추가](https://support.google.com/webmasters/answer/34592?hl=ko)

#### 접속

1. https://search.google.com/search-console
2. Google 계정 로그인 → **속성 추가**

#### 속성 유형 선택

| 유형 | 장점 | 소유권 확인 |
|---|---|---|
| **도메인** (`example.com`) | `http`/`https`, `www`/non-www 전체 | **DNS TXT 레코드만** |
| **URL 접두어** (`https://www.example.com/`) | HTML 태그·파일 업로드 등 선택지 많음 | HTML 메타 태그, HTML 파일, DNS 등 |

**권장(초보)**: URL 접두어 `https://www.YOUR-DOMAIN.com/` — 운영 대표 URL과 **완전히 동일**하게 입력(끝 `/` 포함).

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

### 9.2 네이버 — 서치어드바이저 (Search Advisor)

**공식**: [시작하기](https://searchadvisor.naver.com/start), [robots.txt](https://searchadvisor.naver.com/guide/seo-basic-robots), [사이트맵 제출](https://searchadvisor.naver.com/guide/request-feed)

#### 접속·등록

1. https://searchadvisor.naver.com/
2. 네이버 로그인 → **웹마스터 도구**
3. **사이트 등록** — `https://www.YOUR-DOMAIN.com` (**http와 https 별도**. HTTPS 사이트면 **https** 로 등록)

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
Sitemap: https://www.YOUR-DOMAIN.com/sitemap.xml
```

주의 (네이버 공식):

- `robots.txt`는 **반드시 사이트 루트** (`/robots.txt`)
- `Content-Type: text/plain`, **2xx** 응답
- `Disallow: /` 로 전체 차단하면 **어떤 페이지도 검색 노출 안 됨**
- Yeti만 막혀 있지 않은지 확인 (`User-agent: Yeti` + `Allow: /`)

#### 사이트맵 제출

1. **요청 → 사이트맵 제출**
2. `https://www.YOUR-DOMAIN.com/sitemap.xml` 입력

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

### 9.3 Bing — Webmaster Tools (빙 웹마스터 도구)

**공식**: [Bing Webmaster Tools](https://www.bing.com/webmasters), [시작 가이드(2025)](https://blogs.bing.com/webmaster/June-2025/Start-Using-Bing-Webmaster-Tools-to-Improve-Your-Site-Visibility)

Bing 등록은 Yahoo 검색에도 데이터가 공유되는 경우가 많습니다.

#### 가장 빠른 방법 — Google Search Console 가져오기

1. https://www.bing.com/webmasters 로그인
2. **Import from Google Search Console** 선택
3. Google 계정 연동 → **이미 Google에서 확인한 사이트·sitemap** 이 함께 옴

Google 등록을 먼저 끝낸 뒤 이 방법을 쓰면 **30초 내** 설정 가능.

#### 수동 등록

1. **Add a site** → `https://www.YOUR-DOMAIN.com`
2. 소유권 확인: XML 파일(`BingSiteAuth.xml`) 루트 업로드, 메타 태그, DNS TXT/CNAME 중 선택
3. **Sitemaps → Submit sitemap**
4. **전체 URL** 입력: `https://www.YOUR-DOMAIN.com/sitemap.xml`  
   (Google과 달리 Bing은 **전체 URL** 필요 — `sitemap.xml` 만 넣으면 실패하는 경우 있음)

#### (선택) IndexNow

- 콘텐츠 업데이트 시 Bing 등에 즉시 알리는 프로토콜
- 정적 사이트는 **재빌드·재배포 + sitemap** 으로도 충분. 대규모 자주 업데이트 시 검토

---

### 9.4 검색 등록 요약표

| 플랫폼 | URL | 소유 확인 | 사이트맵 입력 형식 | 공식 가이드 |
|---|---|---|---|---|
| Google | search.google.com/search-console | DNS TXT / HTML 파일 / 메타 태그 | `sitemap.xml` (경로만) | [도움말](https://support.google.com/webmasters/answer/34592?hl=ko) |
| 네이버 | searchadvisor.naver.com | HTML 파일 / 메타 태그 / DNS | 전체 URL | [사이트맵](https://searchadvisor.naver.com/guide/request-feed) |
| Bing | bing.com/webmasters | GSC 가져오기 / 파일 / 메타 / DNS | **전체 URL** | [Bing 블로그](https://blogs.bing.com/webmaster/June-2025/Start-Using-Bing-Webmaster-Tools-to-Improve-Your-Site-Visibility) |

---

## 10. 소유권 확인 파일·메타 태그 — 프로젝트 적용 팁

정적 export 사이트이므로 **서버에서 동적 처리 불가**. 아래 중 하나:

### 10.1 HTML 파일 (가장 단순)

```
apps/web/public/googleXXXXXXXX.html
apps/web/public/naverXXXXXXXX.html
apps/web/public/BingSiteAuth.xml
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

---

## 11. 오픈 후 운영·재배포

### 11.1 콘텐츠 수정 → 재오픈 흐름

```
콘텐츠 JSON/이미지 수정
  → pnpm typecheck && pnpm build
  → apps/web/out/ 서버 동기화 (scp/rsync)
  → (필요 시) Search Console URL 검사 / 네이버 수집 요청
```

### 11.2 정기 점검 (월 1회 권장)

- [ ] SSL 만료일 — `certbot certificates`
- [ ] nginx·디스크 용량 — `df -h`, 로그 로테이션
- [ ] Search Console — **색인 생성** 오류, 404 증가
- [ ] 네이버 서치어드바이저 — 수집·색인 리포트, robots/sitemap 오류

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
| 네이버만 색인 안 됨 | Yeti 차단·http/https 불일치 | robots.txt, **https** 로 사이트 등록 |
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
[4] out/ 업로드 → /var/www/lua/out/
         ↓
[5] nginx server_name·root 설정
         ↓
[6] iwinv DNS A 레코드 (@, www) → VM IP
         ↓
[7] certbot --nginx → HTTPS
         ↓
[8] 브라우저·sitemap·robots 최종 점검
         ↓
[9] Google Search Console → 네이버 서치어드바이저 → Bing
         ↓
[10] 색인·트래픽 모니터링, 콘텐츠 변경 시 재빌드·재배포
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

- [ ] iwinv VM 공인 IP
- [ ] 최종 운영 도메인 (www 유무)
- [ ] 대표 URL 하나로 통일(301)
- [ ] 검색 등록 담당 Google·네이버·Microsoft 계정
- [ ] CI → iwinv 자동 배포 SSH 키·시크릿

---

_문서 버전: 2026-08-23 | 루아(Lua) · LuaWeb 정적 export · iwinv Rocky Linux · nginx · Let’s Encrypt 기준_
