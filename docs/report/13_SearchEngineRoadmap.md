# 13 — 검색엔진 등록 로드맵 (LuaWeb Prd)

> **상태**: **S0~S3 완료** · **S4 모니터링** · §9.6 organic SEO (2026-09-11)  
> **에이전트 스킬**: `.cursor/skills/search-engine-registration-orchestrator/SKILL.md`  
> **선행 완료**: iwinv D0~D6 (`07-SERVER-PRODUCTION.md`)  
> **참고**: `docs/main/06-LAUNCH-GUIDE.md` §9

---

## 0. 범위와 전제

| 항목 | 값 |
|---|---|
| 대표 URL | `https://www.luacorp.co.kr` |
| sitemap | `https://www.luacorp.co.kr/sitemap.xml` |
| robots | `https://www.luacorp.co.kr/robots.txt` |
| 등록 대상 | **Google** · **네이버** · **Bing** |
| 작업 방식 | 사용자가 **브라우저·DNS·Dev PC**에 복붙 — 에이전트가 단계별 안내 |

**공식 가이드**

- Google: [Search Console 시작](https://support.google.com/webmasters/answer/34592?hl=ko)
- 네이버: [서치어드바이저 시작](https://searchadvisor.naver.com/start)
- Bing: [Webmaster Tools](https://www.bing.com/webmasters)

---

## 1. 기존 가이드 vs 본 로드맵

| 기존 (`06-LAUNCH-GUIDE` §9) | 본 로드맵 보강 |
|---|---|
| Google·네이버·Bing 한 절에 나열 | **5 Phase(S0~S4)** 분리, 게이트 명시 |
| `YOUR-DOMAIN` placeholder | **`luacorp.co.kr` 확정값** |
| 소유 확인 방법 나열 | **HTML 파일 1회 배포** 권장 흐름 |
| 배포 완료 가정 없음 | **D0~D6 완료** 전제, S0 SEO 게이트 |

---

## 2. Phase 개요

```
S0 SEO 사전 게이트 (HTTPS·sitemap·robots)
  ↓
S1 Google Search Console (소유 확인·sitemap·URL 검사)
  ↓
S2 네이버 서치어드바이저 (소유 확인·sitemap·수집 요청)
  ↓
S3 Bing Webmaster Tools (GSC 가져오기)
  ↓
S4 색인·트래픽 모니터링
```

> **순서 권장 이유**: Bing은 Google 가져오기가 가장 빠름. 네이버는 한국 검색에 필수.

---

## 3. Phase별 체크리스트

### S0 — SEO 사전 게이트

- [x] `https://www.luacorp.co.kr/ko/` HTTPS 200
- [x] `/robots.txt` — `Allow: /` + Sitemap 줄
- [x] `/sitemap.xml` — `www.luacorp.co.kr` URL만 포함
- [x] Google·네이버 로그인 계정 준비
- [x] 소유 확인: Google DNS TXT / 네이버 HTML / Bing GSC

**게이트**: 위 URL 3종 정상 → S1

---

### S1 — Google Search Console

- [x] 속성: **도메인** `luacorp.co.kr`
- [x] 소유 확인: iwinv DNS `@` TXT
- [x] Sitemaps `sitemap.xml` — 승인 진행 중
- [x] URL 검사: `/ko/`, `/en/` 색인 요청

**게이트**: 소유 확인 + sitemap 성공 → S2

---

### S2 — 네이버 서치어드바이저

- [x] 사이트 등록: `https://www.luacorp.co.kr`
- [x] 소유 확인: `naver1ca80d5dc74efb3674336faa5e15901b.html`
- [x] 사이트맵·수집·robots.txt 수집
- [x] URL 실시간 조회 — **https+www** 기준

**게이트**: 소유 확인 + 사이트맵 제출 → S3

---

### S3 — Bing Webmaster Tools

- [x] Import from Google Search Console — 자동 등록
- [x] sitemap 반영

**게이트**: Bing에 사이트·sitemap 표시 → S4

---

### S4 — 사후 모니터링

- [ ] 1~2주: Search Console 색인 페이지 수 확인
- [ ] 1~4주: 네이버 수집·색인 리포트
- [ ] 월 1회: 404·robots/sitemap 오류 점검
- [ ] 콘텐츠 변경 시 재빌드·재배포 + (선택) URL 검사

---

## 4. 소유 확인 파일 배치 (한 번에)

Search Console·네이버·Bing에서 받은 파일을 **한꺼번에** `apps/web/public/`에 넣고 1회 배포:

```
apps/web/public/googleXXXXXXXX.html
apps/web/public/naverXXXXXXXX.html   (네이버 HTML 방식 시)
apps/web/public/BingSiteAuth.xml     (Bing 수동 등록 시만)
```

```powershell
cd c:\Project\LuaWeb
npm exec --yes pnpm@9.15.9 build
# apps/web/out/ → 서버 releases/<timestamp>/ 업로드
```

---

## 5. 트러블슈팅 (요약)

| 증상 | 해결 |
|---|---|
| Google 소유 확인 실패 | URL 접두어와 실제 URL 일치, 파일 404 여부, http vs https |
| sitemap 도메인 불일치 | `site.json` domain 수정 → 재빌드·재배포 |
| 네이버만 색인 안 됨 | **https** 로 등록, Yeti 차단 없는지 robots 확인 |
| Bing sitemap 오류 | `sitemap.xml`만 넣지 말고 **전체 URL** 제출 |

상세: `06-LAUNCH-GUIDE.md` §9·§12

---

## 6. 관련 파일

| 파일 | 역할 |
|---|---|
| `packages/env/site.json` | sitemap·OG base URL |
| `apps/web/src/app/sitemap.ts` | sitemap.xml 생성 |
| `apps/web/src/app/robots.ts` | robots.txt 생성 |
| `apps/web/src/app/[locale]/layout.tsx` | 메타 태그 소유 확인(선택) |
| `apps/web/public/` | HTML/XML 소유 확인 파일 |

---

_문서 버전: 2026-09-11 | Prd luacorp.co.kr · D0~D6 완료 후_
