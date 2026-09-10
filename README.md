# LuaWeb — 루아주식회사 공식 홈페이지

Next.js 16 기반 **정적 export**(`output: 'export'`) 기업 사이트입니다.  
한/영(ko/en) 다국어, 17+ 페이지. 빌드 산출물은 `apps/web/out/` 정적 HTML/CSS/JS입니다.

| 환경 | OS | 역할 |
|---|---|---|
| **Dev** | Windows (로컬 PC) | 개발·빌드 검증 |
| **Prd** | Rocky Linux 9 (iwinv) | nginx로 `out/` 정적 서빙 |

---

## 프로젝트 구조

```
LuaWeb/
├── apps/web/          # Next.js 앱 (페이지·컴포넌트)
├── packages/
│   ├── content/       # ko/en JSON 콘텐츠
│   └── env/           # site.json, images.json, deploy.json
├── deploy/            # nginx 예시, Rocky Linux 배포 가이드
├── docs/              # PRD, 로드맵, 런치 가이드
├── README.md          # 이 파일
└── REQUIREMENTS.txt   # 서버(Prd) 패키지 목록
```

---

## 사전 요구사항

### Dev (Windows)

| 항목 | 버전 |
|---|---|
| Node.js | **20 LTS** 이상 |
| pnpm | **9.15.9** (`packageManager` 고정) |
| Git | 최신 |

Node.js만 설치되어 있으면 pnpm은 아래 `npm exec`로 실행 가능합니다.

### Prd (Rocky Linux 9)

정적 파일만 서빙할 경우 **nginx만** 필요합니다.  
서버에서 직접 빌드할 경우 Node.js 20 + pnpm 추가 설치.

→ 상세 패키지 목록: [`REQUIREMENTS.txt`](./REQUIREMENTS.txt)  
→ 배포 절차: [`deploy/rocky-linux/README.md`](./deploy/rocky-linux/README.md)  
→ 오픈 종합 가이드: [`docs/main/06-LAUNCH-GUIDE.md`](./docs/main/06-LAUNCH-GUIDE.md)

---

## Dev — 설치 및 실행 (Windows / PowerShell)

```powershell
cd C:\Project\LuaWeb

# 의존성 설치
npm exec --yes pnpm@9.15.9 install

# 타입 검사
npm exec --yes pnpm@9.15.9 typecheck

# 프로덕션 빌드 (산출물: apps/web/out/)
npm exec --yes pnpm@9.15.9 build

# 개발 서버 (http://localhost:3000/ko/)
npm exec --yes pnpm@9.15.9 dev
```

### 환경변수 (선택)

```powershell
Copy-Item .env.example .env.local
```

운영 도메인·SEO URL은 **`packages/env/site.json`** 의 `domain`을 빌드 전에 수정하세요.  
변경 후 **반드시 재빌드**해야 sitemap·OG URL에 반영됩니다.

---

## Prd — 배포 요약

1. Dev/CI에서 `pnpm build` → `apps/web/out/` 생성  
2. `out/` 내용을 서버 `/var/www/lua/current/` (또는 releases + symlink)에 업로드  
3. nginx 설정: `deploy/rocky-linux/nginx.conf.example` 참고  
4. 도메인 확정 후 SSL: `certbot --nginx`

```bash
# Rocky Linux — 최소 패키지 (root)
sudo dnf update -y
sudo dnf install -y $(grep -v '^#' REQUIREMENTS.txt | grep -v '^$' | tr '\n' ' ')
sudo systemctl enable --now nginx firewalld
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

배포 전 `packages/env/site.json`, `packages/env/deploy.json`의 **domain·publicIp**를 운영 값으로 갱신하세요.

---

## 주요 명령

| 명령 | 설명 |
|---|---|
| `pnpm dev` | 로컬 개발 서버 |
| `pnpm build` | 정적 export 빌드 |
| `pnpm typecheck` | TypeScript 검사 |
| `pnpm check:images` | images.json 빈 슬롯 검사 |

---

## 관련 문서

| 문서 | 내용 |
|---|---|
| `AGENTS.md` | AI/개발 에이전트 가이드 |
| `deploy/README.md` | Dev → Prd 배포 개요 |
| `docs/main/06-LAUNCH-GUIDE.md` | DNS·SSL·검색 등록 |
| `docs/report/01_ImplementationRoadmap.md` | 구현 로드맵 |

---

© LUA Corporation (루아주식회사)
