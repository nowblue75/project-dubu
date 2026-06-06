# 프로젝트 두부: 흑임자 테린 (Vol.39) 화보집 V2 개편 및 리디자인

- [/] **HTML 캐시 버스팅 업데이트**
    - [ ] `index.html`에서 `style_portal.css?v=5.5` 및 `dubu_app.js?v=5.5`로 파라미터 상향 수정
- [/] **dubu_app.js 화보집 V2 마크업 개편**
    - [ ] 2페이지: 단면 컷 풀스크린 배경을 럭셔리 세로 액자 레이아웃(`.lookbook-detail-container`)으로 전면 수정
- [/] **style_portal.css 명절 베이지 테마 및 2/3페이지 스타일 신설**
    - [ ] `#lookbook-overlay` 주변 프레임을 놋쇠 황동색(`border: 2px solid #a0713b;`)으로 수정
    - [ ] 2페이지 세로 액자 레이아웃(`.lookbook-detail-container`, `.lookbook-detail-img-frame`, `.lookbook-detail-text-box`) CSS 신설
    - [ ] 3페이지 2분할 컷 레이아웃(`.lookbook-note-images`, `.lookbook-note-img-half`, `.lookbook-img-label`) CSS 신설 및 깨짐 해결
    - [ ] 3페이지 크리에이터 노트 카드를 웜 아이보리 배경(`rgba(255,255,255,0.95)`)에 짙은 밤색 텍스트로 가독성 개편
    - [ ] 1, 4페이지 풀스크린 가독성을 위한 밤색 오버레이 그라디언트 및 radial 놋쇠색 글로우 보정
- [/] **최종 검증 및 Git Push**
    - [ ] `node -c dubu_app.js` 실행 문법 검증
    - [ ] `git add -A && git commit -m "fix: lookbook v2 redesign" && git push` 실행 및 완료 보고

