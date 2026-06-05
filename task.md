# 프로젝트 두부: 흑임자 테린 (Vol.39) 화보집 파일럿 구현

- [x] **데이터베이스 경로 수정**
    - [x] `dubu_data.js`의 PROJECTS 내 39번 레시피 `path`를 `40. 순두부 흑임자테린/index.html`로 수정
- [x] **풀스크린 화보집 스타일 작성**
    - [x] `style_portal.css`에 `#lookbook-overlay` 및 슬라이더 트랜지션 애니메이션 스타일 추가
- [x] **풀스크린 화보집 렌더링 및 인터랙션 구현**
    - [x] `dubu_app.js`에서 `openLookbook` 함수 내에 39번 전용 풀스크린 오버레이 동적 생성 및 페이드인 처리
    - [x] 마우스 휠, 키보드 방향키, 좌우 화살표를 통한 1~4페이지 전환 기능 구현
    - [x] ✕ 닫기 및 브라우저 뒤로가기(`popstate`) 연동으로 이전 상세화면 복구 처리
- [x] **최종 검증 및 Git Push**
    - [x] `node -c dubu_app.js` 및 `node -c dubu_data.js` 문법 검증
    - [x] Git Commit & Push (`feat: add lookbook pilot for vol39 heukimja terin`)
