# Deploy — 배포 환경 개요

| 환경 | OS | 용도 | 비고 |
|---|---|---|---|
| **Dev** | Windows (local PC) | 개발·빌드 검증 | `pnpm dev` → localhost:3000 |
| **Prd** | Rocky Linux (iwinv 클라우드) | 정적 사이트 서빙 | `pnpm build` → `apps/web/out/` → nginx |

## 산출물 흐름

```
[Dev Windows]  pnpm build  →  apps/web/out/
                                ↓ rsync/scp (Phase 7 CI)
[Prd Rocky]    nginx root  →  /var/www/lua/current/
```

## 설정 파일 위치

| 파일 | 용도 |
|---|---|
| `packages/env/deploy.json` | 서버 OS·IP·도메인 placeholder (도메인/IP 확정 후 수정) |
| `packages/env/site.json` | `domain` — SEO·OG·sitemap base URL |
| `.env.example` | 빌드·배포 환경변수 템플릿 (주석 설명) |
| `deploy/rocky-linux/README.md` | Rocky Linux 초기 세팅 절차 |
| `deploy/rocky-linux/nginx.conf.example` | nginx 정적 호스팅 설정 템플릿 |
| `deploy/rocky-linux/scripts/` | preflight·hardening·nginx·server-build 스크립트 |
| `docs/report/12_iwinvDeployRoadmap.md` | **iwinv Phase D0~D6** 배포 로드맵 |
| `.cursor/skills/iwinv-deploy-orchestrator/` | 배포 오케스트레이터 에이전트 스킬 |

## Prd 적용 시점 (미확정 항목)

- [ ] iwinv 클라우드 서버 IP
- [ ] 운영 도메인 (DNS A/CNAME)
- [ ] SSL 인증서 (Let's Encrypt certbot)
- [ ] `packages/env/deploy.json` → `publicIp`, `domain` 갱신
- [ ] `packages/env/site.json` → `domain` 갱신
