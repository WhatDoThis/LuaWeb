---
name: search-engine-registration-orchestrator
description: LuaWeb Prd 검색엔진 등록(Google Search Console·네이버 서치어드바이저·Bing) 단계별 오케스트레이션. HTTPS·sitemap·robots 게이트, 소유 확인, 사이트맵 제출, 색인 모니터링. D0~D6 서버 배포 완료 후 S0~S4 진행.
---

# Search Engine Registration Orchestrator — LuaWeb

## 역할

사용자는 **웹마스터 콘솔에 직접 조작**한다. 에이전트는 각 Phase마다:

1. **브라우저에서 할 일** (URL·클릭 경로·입력값)
2. **Dev PC에서 할 일** (소유 확인 파일·메타 태그·빌드·배포)
3. **iwinv DNS에서 할 일** (TXT 소유 확인 시)
4. **검증** + **다음 Phase 진행 조건**

을 순서대로 제공한다. **한 번에 전 Phase를 진행하지 않는다** — Phase 완료 확인 후 다음만 진행.

## 시작 전 읽기

| 자료 | 용도 |
|---|---|
| [phases.md](phases.md) | Phase S0~S4 체크리스트·게이트 |
| `docs/report/13_SearchEngineRoadmap.md` | 사용자용 로드맵(한국어) |
| `docs/main/06-LAUNCH-GUIDE.md` §9 | 플랫폼별 상세·트러블슈팅 |
| `docs/main/07-SERVER-PRODUCTION.md` | Prd 도메인·HTTPS·릴리스 현황 |

## 프로젝트 전제 (LuaWeb Prd)

| 항목 | 값 |
|---|---|
| 대표 URL | `https://www.luacorp.co.kr` |
| 루트 도메인 | `luacorp.co.kr` |
| sitemap | `https://www.luacorp.co.kr/sitemap.xml` |
| robots | `https://www.luacorp.co.kr/robots.txt` |
| site.json domain | `https://www.luacorp.co.kr` |
| 배포 | Dev PC `pnpm build` → SCP/rsync → `/var/www/lua/releases/` |

**선행**: iwinv **D0~D6 완료**(HTTPS 공개). 미완료 시 [iwinv-deploy-orchestrator](../iwinv-deploy-orchestrator/SKILL.md) 먼저.

## Phase 진행 규칙

```
Phase Sn 시작
  → 브라우저/Dev/DNS 명령 제공 (복붙 가능)
  → 사용자 "완료" 또는 스크린샷·검증 출력 공유
  → 게이트 통과 확인
  → Phase S(n+1)만 제안 — 사용자 확인 후 진행
```

**금지**: S0 게이트 미통과 시 Google 등록, Google 소유 확인 전 Bing 수동 등록(가져오기 불가), http/https·www 혼용 등록.

## Phase 요약

| Phase | 목표 | 주 작업 |
|---|---|---|
| **S0** | SEO 사전 게이트 | sitemap·robots·HTTPS·대표 URL 일치 확인 |
| **S1** | Google Search Console | 속성 추가·소유 확인·sitemap·URL 검사 |
| **S2** | 네이버 서치어드바이저 | 사이트 등록·소유 확인·sitemap·(선택) 수집 요청 |
| **S3** | Bing Webmaster Tools | GSC 가져오기·sitemap 확인 |
| **S4** | 사후 모니터링 | 색인·404·월간 점검 |

상세: [phases.md](phases.md)

## Phase별 출력 형식 (필수)

```markdown
## Phase SX — [제목]

### 목표
### 선행 조건
### A. 브라우저 (복사하여 진행)
### B. Dev PC — Windows PowerShell (해당 시)
### C. iwinv DNS (해당 시)
### D. 검증
### E. 다음 Phase 진행 조건
```

## 소유 확인 방법 선택 (정적 export)

| 방법 | 장점 | 단점 |
|---|---|---|
| **HTML 파일** (`apps/web/public/`) | 코드 1줄 수정 없음, 3사 공통 | 빌드·재배포 필요 |
| **메타 태그** (`layout.tsx` verification) | 파일 여러 개 불필요 | 빌드·재배포 필요 |
| **DNS TXT** | 재배포 불필요 | 전파 대기·플랫폼별 TXT 추가 |

**권장(루아 Prd)**: **HTML 파일** — Google·네이버·Bing 각 1파일 → 1회 빌드·배포.

## 검색 Bot 차단 금지

firewalld·nginx에서 **Googlebot·Yeti·bingbot** IP/UA 차단하지 않음. (iwinv D1과 동일 원칙)

## 사용자 완료 보고

- 수정 확인 질문 금지
- 완료 Phase + 검증 결과 요약
- **다음 Phase 진행 여부만** 질문

## 첫 세션 시작 문구

D0~D6 완료 확인 후 **Phase S0**부터: sitemap·robots·HTTPS 게이트 검증 → 통과 시 **S1 Google** 브라우저 절차 제공.
