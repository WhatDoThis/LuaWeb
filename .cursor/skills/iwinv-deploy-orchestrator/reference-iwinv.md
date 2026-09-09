# iwinv Reference — LuaWeb 배포용

> 공식 포털: [docs.iwinv.kr](https://docs.iwinv.kr/) · 콘솔: [console.iwinv.kr](https://console.iwinv.kr/)

## 서비스 카테고리 (docs.iwinv.kr)

| 카테고리 | LuaWeb 관련 |
|---|---|
| **컴퓨트 → 가상 서버** | Rocky Linux VM (Prd) |
| **네트워크 → ELCAP 방화벽** | L3 포트·IP·국가 필터 |
| **보안 → WAPPLES Cloud** | L7 WAF (선택·유료) |
| **도메인** | 구매·네임서버 |
| **도메인 & DNS** | DNS 등록·A/MX/TXT |
| **메일/그룹웨어** | 테라웹메일·그룹웨어 |

## 가상서버

| 문서 | URL | 내용 |
|---|---|---|
| 서버 생성 | [manual/398](https://help.iwinv.kr/manual/398) | Zone(Lite-Zone=저렴), OS, SSD 25GB, ELCAP |
| Lite-Zone | 콘솔 Zone 선택 | 최소 사양 VM |
| Port 모니터링 | [manual/398](https://help.iwinv.kr/manual/398) | SSH(22) 장애 알림 |
| GRUB 접근 제한 | [restrict-grub-access](https://docs.iwinv.kr/reference/compute/restrict-grub-access) | 고급(선택) |

**LuaWeb 최소 사양**: 1 vCPU, 1GB RAM, 20GB+ SSD, Rocky Linux 9.x

## ELCAP 방화벽 (클라우드 보안 — 필수)

| 문서 | URL |
|---|---|
| 방화벽 사용 | [manual/62](https://help.iwinv.kr/manual/62) |
| 네트워크 구조·2계층 | [manual/443](https://help.iwinv.kr/manual/443) |
| ELCAP 상세 | [manual/628](https://help.iwinv.kr/manual/628) |

**콘솔 경로**: 서버 → 보안 → ELCAP 방화벽 관리 · [console.iwinv.kr/firewall](https://console.iwinv.kr/firewall/)

**LuaWeb Inbound 권장**:

| 서비스 | 포트 | 소스 | 비고 |
|---|---|---|---|
| SSH | 22 또는 변경 포트 | **내 IP** / 관리 IP만 | brute force 방지 |
| HTTP | 80 | ANY (0.0.0.0/0) | certbot·리다이렉트 |
| HTTPS | 443 | ANY | 공개 웹 |

**국제망**: 한국 외 차단 선택 가능 — 트래픽·C2 차단 ([manual/62](https://help.iwinv.kr/manual/62)).  
**주의**: Google/Naver 봇 차단 시 SEO 색인 불가 — **검색 봇 차단하지 말 것**.

**서버 적용**: 가상서버 → 서버관리 → 방화벽 정책 On

## OS 방화벽 + SSH

| 문서 | URL |
|---|---|
| SSH 포트 변경 | [manual/913](https://help.iwinv.kr/manual/913) |
| iptables(참고) | [manual/443](https://help.iwinv.kr/manual/443) |

Rocky Linux: **firewalld** (`firewall-cmd`) — ELCAP와 별도로 80/443/SSH 허용.

## DNS·도메인

| 문서 | URL | 내용 |
|---|---|---|
| DNS 등록 | [manual/69](https://help.iwinv.kr/manual/69) | iwinv DNS에 도메인 추가 |
| 레코드 수정 | [manual/374](https://help.iwinv.kr/manual/374) | A, CNAME, TXT, MX |
| A 레코드 연결 | [manual/200](https://help.iwinv.kr/manual/200) | @, www → VM IP |
| 네임서버 변경 | [manual/198](https://help.iwinv.kr/manual/198) | ns1/ns2.iwinv.kr |

**LuaWeb A 레코드**:

| 호스트 | 유형 | 값 |
|---|---|---|
| (빈칸) @ | A | VM 공인 IP |
| www | A | VM 공인 IP |

**주의**: 웹은 **A 레코드**(CNAME 아님) — MX 조회 호환 ([manual/200](https://help.iwinv.kr/manual/200)).

## HTTPS

Let's Encrypt + certbot — 서버에서 `dnf install certbot python3-certbot-nginx`.  
LuaWeb: `docs/main/06-LAUNCH-GUIDE.md` §7. **DNS 전파 완료 후** certbot.

## 이메일

| 문서 | URL | 용도 |
|---|---|---|
| MX·SPF·A 개요 | [manual/475](https://help.iwinv.kr/manual/475) | 메일 DNS 공통 |
| 테라웹메일 DNS | [manual/945](https://help.iwinv.kr/manual/945) | MX/SPF/A from 상세페이지 |
| 테라웹메일 가이드 | [manual/1040](https://help.iwinv.kr/manual/1040) | 계정·MX 확인 |
| 그룹웨어 DNS | [manual/965](https://help.iwinv.kr/manual/965) | MX/SPF/CNAME |

**흐름**: 메일 상품 신청 → 상세페이지 **DNS 설정 값 복사** → DNS 관리에 MX·SPF·(mail) A 추가 → 전파 대기 → 웹메일 접속·계정 생성.

**웹(A) vs 메일(MX)**: 동일 도메인에서 `@` A=웹 VM IP, `mail` A=메일 서버 IP, MX=mail.domain — 충돌 없음.

## DDoS·트래픽 (수비적)

| 계층 | 수단 | 비용 |
|---|---|---|
| L3 | ELCAP default deny, geo block | 무료 |
| OS | firewalld, fail2ban, nginx rate limit | 무료 |
| L7 | WAPPLES Cloud WAF | 유료 ([manual/768](https://help.iwinv.kr/manual/768)) |
| CDN | iwinv CDN / 외부 Cloudflare | 별도 |

정적 corporate site: **ELCAP + firewalld + nginx limit_req** 로 시작. 트래픽 급증 시 WAPPLES·CDN 검토.

## 모니터링

| 문서 | URL |
|---|---|
| Port 모니터링 | [manual/398](https://help.iwinv.kr/manual/398) |
| 리소스 모니터링 | docs.iwinv.kr 검색 |

nginx 로그: `/var/log/nginx/lua.access.log`, `lua.error.log`
