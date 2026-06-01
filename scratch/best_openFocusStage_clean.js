"// 프로젝트 두부: 포털 핵심 애플리케이션 스크립트 (v16.0 Rebranding)

let currentScale = 1.0;
let currentRecipeId = null;
let currentTab = 'calc';

// 3D 책장 드래그 스크롤 전역 상태
let isDown = false;
let startX;
let scrollLeft;

// 1. 초기화 및 페이지 로드
document.addEventListener('DOMContentLoaded', () => {
    // 서가 및 이벤트 연동
    renderBookshelf(PROJECTS);
    initBookshelfInteractions();
    
    // 시각 효과 가동
    initCursorAura();
    initAtmosphericParticles();
    init3DTiltCards();
    
    // 사이드바 LNB ScrollSpy 연동
    initScrollSpy();
});

// 2. 3D 책장에 디저트 책 렌더링
function renderBookshelf(projects) {
    const container = document.getElementById('bookshelf-3d');
    if (!container) return;

    if (projects.length === 0) {
        container.innerHTML = `
            <div class="no-results-message sans" style="color: #ffd57e; text-align: center; padding: 100px 0; font-size: 1.1rem; width: 100%;">
                <i class="fa-solid fa-face-dashed"></i> 검색 결과에 맞는 디저트 책이 존재하지 않습니다.
            </div>
        `;
        return;
    }

    let html = '';
    projects.forEach((p) => {
        let themeClass = 'spine-default';
        if (p.categories.includes('romantic')) themeClass = 'spine-romantic';
        else if (p.categories.includes('traditional')) themeClass = 'spine-traditional';
        else if (p.categories.includes('halloween')) themeClass = 'spine-halloween';
        else if (p.categories.includes('christmas')) themeClass = 'spine-christmas';

        const displayNum = p.id < 100 ? String(p.id).padStart(2, '0') : 'SP';

        html += `
            <div class="book-card" onclick="openFocusStage(${p.id})">
                <div class="book-cover" style="background-image: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url('${p.img}');"></div>
                <div class="book-spine ${themeCl
<truncated 17475 bytes>