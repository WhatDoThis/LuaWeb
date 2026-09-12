# Search Engine Registration — Phase S0~S4

> **실행본**: `docs/report/13_SearchEngineRoadmap.md`  
> **Prd 기준 URL**: `https://www.luacorp.co.kr`

---

## S0 — SEO 사전 게이트

### 선행

- [x] D0~D6 완료 (`07-SERVER-PRODUCTION.md`)
- [x] `packages/env/site.json` → `domain`: `https://www.luacorp.co.kr`

### 체크리스트

- [ ] `https://www.luacorp.co.kr/ko/` → 200, HTTPS 자물쇠
- [ ] `https://www.luacorp.co.kr/robots.txt` → `Allow: /` + Sitemap URL
- [ ] `https://www.luacorp.co.kr/sitemap.xml` → URL이 `www.luacorp.co.kr` (example.com 없음)
- [ ] `http://luacorp.co.kr` → `https://www.luacorp.co.kr` 리다이렉트
- [ ] 검색 등록용 **Google 계정** 확정
- [ ] 검색 등록용 **네이버 계정** 확정
- [ ] (S3용) Google·Microsoft(Bing) 연동 가능 계정

### Dev PC 검증

```powershell
curl.exe -sI "https://www.luacorp.co.kr/ko/"
curl.exe -s "https://www.luacorp.co.kr/robots.txt"
curl.exe -s "https://www.luacorp.co.kr/sitemap.xml" | Select-Object -First 5
```

### 게이트

위 3 URL 모두 **200** + sitemap `<loc>` 도메인 일치 → **S1 진행**

---

## S1 — Google Search Console

### A. 속성 추가

1. https://search.google.com/search-console
2. **속성 추가** → **URL 접두어** 선택
3. 입력: `https://www.luacorp.co.kr/` *(끝 `/` 포함)*

### B. 소유 확인 — HTML 파일 (권장)

1. Search Console이 제공하는 `googleXXXXXXXX.html` 다운로드
2. `apps/web/public/googleXXXXXXXX.html` 에 저장
3. Dev PC:

```powershell
cd c:\Project\LuaWeb
npm exec --yes pnpm@9.15.9 build
```

4. `apps/web/out/googleXXXXXXXX.html` → 서버 업로드 (기존 SCP/rsync)
5. 브라우저: `https://www.luacorp.co.kr/googleXXXXXXXX.html` 열림 확인
6. Search Console **확인** 클릭

### C. 사이트맵 제출

1. 좌측 **색인 생성 → Sitemaps**
2. **새 사이트맵 추가**: `sitemap.xml` *(경로만)*
3. 상태 **성공**

### D. (권장) URL 검사

- **URL 검사** → `https://www.luacorp.co.kr/ko/` → **색인 생성 요청**
- **URL 검사** → `https://www.luacorp.co.kr/en/` → **색인 생성 요청**

### 게이트

- 속성 **소유권 확인됨**
- sitemap **성공**
→ **S2 진행** (또는 S3 Bing 가져오기)

---

## S2 — 네이버 서치어드바이저

### A. 사이트 등록

1. https://searchadvisor.naver.com/
2. **웹마스터 도구** → **사이트 등록**
3. `https://www.luacorp.co.kr` *(https, www 포함 — http 별도 등록 불필요)*

### B. 소유 확인

| 방법 | 절차 |
|---|---|
| HTML 파일 | `naverXXXXXXXX.html` → `apps/web/public/` → 빌드·배포 |
| HTML 메타 | `layout.tsx` → `verification.other['naver-site-verification']` |
| DNS TXT | iwinv DNS → TXT 레코드 추가 |

HTML 파일 사용 시 S1과 **같은 빌드·배포**에 네이버 파일 함께 포함 가능.

### C. 사이트맵 제출

1. **요청 → 사이트맵 제출**
2. 전체 URL: `https://www.luacorp.co.kr/sitemap.xml`

### D. (권장) 수집 요청

1. **요청 → 웹 페이지 수집** — 홈·주요 페이지 URL
2. **요청 → robots.txt 수집** — robots 변경 없어도 최초 1회 권장

### 게이트

- 소유 확인 완료
- 사이트맵 제출 완료
→ **S3 진행**

---

## S3 — Bing Webmaster Tools

### A. GSC 가져오기 (권장)

1. https://www.bing.com/webmasters
2. Microsoft 계정 로그인
3. **Import from Google Search Console**
4. Google 계정 연동 → 사이트·sitemap 자동 반영 확인

### B. (대안) 수동 등록

1. **Add a site** → `https://www.luacorp.co.kr`
2. `BingSiteAuth.xml` → `public/` → 빌드·배포
3. **Sitemaps** → `https://www.luacorp.co.kr/sitemap.xml` *(전체 URL)*

### 게이트

- Bing에 사이트 표시
- sitemap **Submitted** 또는 **Success**
→ **S4 진행**

---

## S4 — 사후 모니터링

### 주간 (최초 2~4주)

- [ ] Search Console — **색인 생성** 페이지 수·오류
- [ ] 네이버 — **요약·수집 현황**
- [ ] Bing — **Pages indexed**

### 월 1회

- [ ] Search Console 404 증가 여부
- [ ] 네이버 robots/sitemap 오류
- [ ] 콘텐츠 변경 시 재빌드·재배포 → (선택) URL 검사·수집 요청

### 기대 기간

| 플랫폼 | 색인까지 (참고) |
|---|---|
| Google | 수일~2주 |
| 네이버 | 1~4주 |
| Bing | Google 연동 시 수일 |

**순위 보장 없음** — 등록은 수집·색인 **요청·모니터링** 도구.

---

## Phase 완료 후

- [ ] `docs/report/13_SearchEngineRoadmap.md` 체크박스 갱신
- [ ] `docs/log/log.md` 갱신
- [ ] (선택) `07-SERVER-PRODUCTION.md` §검색 등록 상태 반영
