# Log

## Log Index

3. 2026-08-22 GitHub 원격 저장소 초기 푸시
2. 2026-08-22 Phase별 상세 구현 로드맵 작성 및 docs 구조 재편
1. 2026-08-22 프로젝트 기획 문서 6종 작성

## Log Body

3. 2026-08-22 GitHub 원격 저장소 초기 푸시
Purpose: 로컬 프로젝트를 GitHub 원격 저장소에 최초 등록 및 main 브랜치 푸시 Changes:

.gitignore: Node/Next.js/pnpm 빌드·의존성·환경변수 제외 규칙 추가
git init, initial commit, origin remote 설정, main 푸시 완료
Changed files: .gitignore, docs/log/log.md

2. 2026-08-22 Phase별 상세 구현 로드맵 작성 및 docs 구조 재편
Purpose: 단일 자립형 Phase 0~7 개발 가이드 작성. 기존 00~05 문서를 main으로 이동 Changes:

docs/report/01_ImplementationRoadmap.md: PRD·아키텍처·스키마·컴포넌트·Phase 0~7 세부 작업 통합
docs/report/00_ReportIndex: report/main 파일 목록
docs/main/: 00~05 기획 문서 이동, 04-PHASE-PLAN 요약 축소
Changed files: docs/report/01_ImplementationRoadmap.md, docs/report/00_ReportIndex, docs/main/00-PRD.md ~ 05-CONVENTIONS.md, docs/main/04-PHASE-PLAN.md, docs/log/log.md

1. 2026-08-22 프로젝트 기획 문서 6종 작성
Purpose: Woori Tech 기업 홍보 사이트 확정 아키텍처를 문서화. 코드 없이 PRD·아키텍처·컴포넌트·스키마·Phase·컨벤션 정의 Changes:

docs/00-PRD.md: KPI, FR/NFR, 사이트맵, 스코프 아웃
docs/01-ARCHITECTURE.md: 디렉터리 트리, 데이터 흐름, JSON 뉴스 설계
docs/02-COMPONENT-SPEC.md: UI 패턴 12종 props 명세
docs/03-CONTENT-SCHEMA.md: content/env JSON 스키마, images 슬롯 전체
docs/04-PHASE-PLAN.md: Phase 0~7 산출물·완료조건
docs/05-CONVENTIONS.md: 네이밍, Server/Client, Tailwind, 금지목록
Changed files: docs/00-PRD.md, docs/01-ARCHITECTURE.md, docs/02-COMPONENT-SPEC.md, docs/03-CONTENT-SCHEMA.md, docs/04-PHASE-PLAN.md, docs/05-CONVENTIONS.md, docs/log/log.md
