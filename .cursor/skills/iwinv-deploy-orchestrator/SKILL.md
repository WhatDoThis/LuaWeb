---
name: iwinv-deploy-orchestrator
description: LuaWeb iwinv 클라우드(Rocky Linux) 단계별 배포·보안·DNS·HTTPS·메일 설정 오케스트레이션. iwinv, ELCAP, nginx, certbot, 도메인, DNS, 이메일, 서버 하드ening, DDoS 수비적 대응 요청 시 사용. 사용자가 서버에 직접 붙을 수 없으므로 콘솔·SSH 복붙 명령·스크립트를 단계별로 제공.
---

# iwinv Deploy Orchestrator — LuaWeb Prd 배포

## 역할

사용자는 **서버에 직접 원격 조작할 수 없음**. 에이전트는 각 Phase마다:

1. **iwinv 콘솔에서 할 일** (클릭 경로·선택값)
2. **SSH에서 붙여넣을 명령/스크립트** (Rocky Linux 9.x)
3. **Dev PC(Windows PowerShell)에서 할 일** (빌드·업로드)
4. **검증 명령** + **다음 Phase 진행 조건**

을 순서대로 제공한다. **한 번에 전 Phase를 진행하지 않는다** — Phase 완료 확인 후 다음만 진행.

## 시작 전 읽기

| 자료 | 용도 |
|---|---|
| [phases.md](phases.md) | Phase D0~D6 체크리스트·게이트 |
| [reference-iwinv.md](reference-iwinv.md) | iwinv 공식 문서 URL·ELCAP·DNS·메일 |
| `docs/report/12_iwinvDeployRoadmap.md` | 사용자용 로드맵(한국어) |
| `docs/main/06-LAUNCH-GUIDE.md` | LuaWeb 정적 export·nginx·certbot (참고) |
| `deploy/rocky-linux/` | nginx 템플릿·스크립트 |

## 프로젝트 전제 (LuaWeb)

- Next.js `output: 'export'` → **`apps/web/out/`** 만 nginx로 서빙
- Prd OS: **Rocky Linux 9.x** (iwinv 가상서버)
- **권장**: Dev PC에서 `pnpm build` → rsync 업로드 (서버 Node 불필요)
- **대안**: 서버에서 git clone + pnpm build (RAM 2GB+ 권장)
- `packages/env/site.json` · `deploy.json` — 도메인·IP 확정 후 갱신

## Phase 진행 규칙

```
Phase Dn 시작
  → 콘솔/SSH/Dev 명령 제공 (복붙 가능)
  → 사용자 "완료" 또는 검증 출력 공유
  → 게이트 통과 확인
  → Phase D(n+1)만 제안 — 사용자 확인 후 진행
```

**금지**: D2(보안) 전 D1(ELCAP) 건너뛰기, DNS 전파 전 certbot, SSL 후 nginx.conf.example 덮어쓰기.

## Phase 요약

| Phase | 목표 | iwinv 콘솔 | 서버 SSH |
|---|---|---|---|
| **D0** | 사전 확정 | — | — |
| **D1** | VM 구매·ELCAP | 서버 생성, Lite-Zone, ELCAP | SSH 최초 접속 |
| **D2** | OS 보안·패키지 | Port 모니터링(선택) | hardening 스크립트, nano·nginx |
| **D3** | 빌드·배포·HTTP | — | nginx·out/ 배치, IP로 /ko/ 확인 |
| **D4** | 도메인·DNS | DNS 등록, A 레코드 | — |
| **D5** | HTTPS | — | certbot, HSTS |
| **D6** | 이메일 | 테라웹메일/그룹웨어 신청 | MX·SPF·A (DNS) |

상세: [phases.md](phases.md)

## Phase별 출력 형식 (필수)

각 응답에 아래 구조 사용:

```markdown
## Phase DX — [제목]

### 목표
### 선행 조건
### A. iwinv 콘솔 (console.iwinv.kr)
### B. SSH — Rocky Linux (복사하여 실행)
### C. Dev PC — Windows PowerShell (해당 시)
### D. 검증
### E. 다음 Phase 진행 조건
```

## 보안 원칙 (수비적·트래픽 공격 대비)

**2계층 방화벽**: iwinv **ELCAP**(L3, 콘솔) + 서버 **firewalld**(OS). 둘 다 열어야 포트 개방.

| 위협 | 1차(무료·필수) | 2차(권장) | 대규모 DDoS |
|---|---|---|---|
| 포트 스캔·SSH brute | ELCAP Inbound 최소화, SSH 포트 변경, fail2ban | hosts.allow/deny | — |
| HTTP flood | nginx `limit_req`·`limit_conn` | ELCAP 해외 국가 차단 | WAPPLES WAF/CDN(유료) |
| L7 웹 공격 | nginx 보안 헤더(已有) | WAPPLES Cloud | — |

스크립트: `deploy/rocky-linux/scripts/01-initial-hardening.sh`, `03-nginx-rate-limit.conf.snippet`

**정적 사이트 한계**: VM 단독으로 terabit급 DDoS는 불가. iwinv [ELCAP](https://help.iwinv.kr/manual/62), [WAPPLES](https://help.iwinv.kr/manual/768) 문서 참고.

## 패키지 기준 (Rocky Linux)

| 구분 | 패키지 |
|---|---|
| **필수** | `nano`, `nginx` |
| **보안** | `firewalld`, `fail2ban`, `policycoreutils-python-utils`(SELinux) |
| **HTTPS** | `certbot`, `python3-certbot-nginx` (D5) |
| **배포(서버 빌드 시)** | `git`, Node 20, `pnpm@9.15.9` |
| **유틸** | `rsync`, `curl`, `bind-utils`(dig), `tar`, `unzip` |

## iwinv 문서 (에이전트는 작업 전 reference-iwinv.md 확인)

- 포털: [docs.iwinv.kr](https://docs.iwinv.kr/)
- 콘솔: [console.iwinv.kr](https://console.iwinv.kr/)

## Dev 빌드·업로드 (D3 기본 경로)

```powershell
cd c:\Project\LuaWeb
npm exec --yes pnpm@9.15.9 install
npm exec --yes pnpm@9.15.9 typecheck
npm exec --yes pnpm@9.15.9 build
```

```bash
# Git Bash / WSL
RELEASE=$(date +%Y%m%d_%H%M)
rsync -av --delete apps/web/out/ rocky@PUBLIC_IP:/var/www/lua/releases/$RELEASE/
ssh rocky@PUBLIC_IP "ln -sfn /var/www/lua/releases/$RELEASE /var/www/lua/current && sudo nginx -t && sudo systemctl reload nginx"
```

## 서브에이전트 사용

| 시점 | subagent | 용도 |
|---|---|---|
| 스크립트·nginx conf 변경 후 | `explore` (very thorough) | 보안·설정 누락 검수 |
| 검수 ISSUES | `generalPurpose` | deploy/ 스크립트만 최소 수정 |

코드( deploy/ ) 변경 시: `pnpm typecheck && pnpm build` — 정적 export 영향 없어도 게이트 유지.

## 사용자 완료 보고

- 수정 확인 질문 금지
- 완료 Phase + 검증 결과 요약
- **다음 Phase 진행 여부만** 질문

## 첫 세션 시작 문구

사용자가 배포를 시작하면 **Phase D0**부터: 운영 도메인 보유 여부, iwinv 계정, Git 저장소 URL, Dev PC에서 SSH 가능 여부, 이메일(테라웹메일 vs 그룹웨어) 선호를 확인한 뒤 **Phase D1** 콘솔 절차 제공.
