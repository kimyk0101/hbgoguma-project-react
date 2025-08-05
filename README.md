# 호박고구마 (HBGoguma) 중고거래 웹사이트 프로젝트

> "당근마켓"을 모티브로 한 중고거래 플랫폼 구현 프로젝트입니다.  
> 게시글 등록/수정/삭제, 회원관리, 채팅 및 신고기능 등 다양한 사용자 흐름을 구성하였으며  
> 프론트엔드(React)와 백엔드(Spring Boot)를 Docker 기반으로 통합 배포하였습니다.

---

## 프로젝트 기간
- 2025.02.18 ~ 2025.02.28 (11일)

---

## 공통 기술 스택

- Frontend: React, JSX, CSS
- Backend: Spring Boot, Java, MyBatis
- Database: MySQL
- DevOps: Docker, EC2, Docker Compose, shell script
- 기타: .env 환경 분리, 자동화 배포(.bat / .sh)

---

## 프론트엔드 주요 기능

- 로그인/회원가입 페이지
- 로그인 상태에 따라 UI 제어 (글쓰기, 구매 희망 버튼 등)
- 게시글 등록 (이미지 포함)
- 지역 기반 필터링 및 검색 기능
- 구매 희망자 신청 및 채팅 UI 구현
- 사용자 마이페이지: 내가 쓴 글, 리뷰, 댓글 등 조회 가능
- 게시글 신고 및 관리자 계정 대응 표시
- CSS로 카카오톡 스타일 채팅 UI 구현 (DB 저장 기반)

---

## 폴더 구조 (일부)

```
src/
├── components/
│   ├── AuthStatus.jsx
│   ├── searchBar.jsx
│   ├── userNegoChat.jsx
│   └── ...
├── css/
│   ├── productListPage.css
│   └── ...
├── pages/
│   ├── mainPage.jsx
│   ├── productDetailPage.jsx
│   ├── loginPage.jsx
│   └── ...
```

---

## 기타

- `.env.dev`, `.env.production` 환경 분리
- Dockerfile + compose.yml을 통해 EC2에 배포
- Mac/Windows 환경별 실행 자동화 스크립트 (.sh / .bat)

