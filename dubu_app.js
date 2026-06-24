// 프로젝트 두부: 포털 핵심 애플리케이션 스크립트 (v16.0 Rebranding)

function getBasePath() {
    const host = window.location.hostname;
    if (host.includes('github.io')) {
        return '/project-dubu/';
    }
    return '/';
}

let heroSlideIndex = 0;
let activeFocusRecipeId = null;
let currentTab = 'calc';

// ==========================================================================
// 1. 초기화 및 페이지 로드
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // 임시 디버그 뷰: ?debug_view=archive 일 때 책장만 스크린샷 캡처하기 위해 타 섹션 및 헤더 숨김, 가로폭 강제 클램핑
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('debug_view') === 'archive') {
        const homeEl = document.getElementById('home');
        const eventsEl = document.getElementById('events');
        const headerEl = document.querySelector('header');
        if (homeEl) homeEl.style.setProperty('display', 'none', 'important');
        if (eventsEl) eventsEl.style.setProperty('display', 'none', 'important');
        if (headerEl) headerEl.style.setProperty('display', 'none', 'important');
        
        document.documentElement.style.setProperty('width', '390px', 'important');
        document.documentElement.style.setProperty('overflow-x', 'hidden', 'important');
        document.body.style.setProperty('width', '390px', 'important');
        document.body.style.setProperty('overflow-x', 'hidden', 'important');
    }


















    // Hero 섹션 화보 로테이션 시작
    const slides = document.querySelectorAll('.visual-slide');
    if (slides.length > 0) {
        slides[0].classList.add('active');
        setInterval(rotateHeroSlide, 4500);
    }

    // 포털 대시보드 및 아코디언 렌더링 (dubu_data.js의 PROJECTS, EVENTS 배열 사용)
    if (typeof PROJECTS !== 'undefined' && typeof EVENTS !== 'undefined') {
        renderDashboard();
        renderAccordionArtbook();
    }

    // 3단계: 3D 책장 렌더링 (PROJECTS 데이터 사용)
    if (typeof PROJECTS !== 'undefined') {
        renderBookshelf();
    }

    // Smooth Scroll 바인딩
    document.querySelectorAll('.nav-links .nav-btn').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Navigation Active State on Scroll (ScrollSpy)
    const navLinks = document.querySelectorAll('.nav-links .nav-btn');
    const sections = document.querySelectorAll('section[id]');
    const sectionRatios = {};

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            sectionRatios[entry.target.id] = entry.intersectionRatio;
        });

        let mostVisibleSection = null;
        let maxRatio = 0;

        if (window.scrollY < 100) {
            mostVisibleSection = 'home';
        } else {
            for (const id in sectionRatios) {
                if (sectionRatios[id] > maxRatio) {
                    maxRatio = sectionRatios[id];
                    mostVisibleSection = id;
                }
            }
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (mostVisibleSection !== 'home' && link.getAttribute('href') === `#${mostVisibleSection}`) {
                link.classList.add('active');
            }
        });
    }, { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] });

    sections.forEach(section => scrollObserver.observe(section));

    // 최초 진입 시 URL 라우팅 처리 (/lookbook/39 및 /artbook 대응)
    // 로컬 개발 환경(localhost, 127.0.0.1) 및 로컬 파일(file:) 환경에서는 개발 편의성을 위해 자동 팝업 라우팅을 제외합니다.
    const initPath = window.location.pathname;
    const isLocalEnv = ['localhost', '127.0.0.1'].includes(window.location.hostname) || window.location.protocol === 'file:';

    if (!isLocalEnv) {
        if (initPath.endsWith('/lookbook/39')) {
            setTimeout(() => {
                openFocusStage(39);
                setTimeout(() => {
                    openLookbook(39);
                }, 150);
            }, 300);
        } else if (initPath.endsWith('/artbook') || initPath === getBasePath() + 'artbook') {
            setTimeout(() => {
                openArtbookViewer();
            }, 300);
        }
    }

});

// ==========================================================================
// 2. Hero Section 화보 크로스페이드 슬라이더
// ==========================================================================
function rotateHeroSlide() {
    const slides = document.querySelectorAll('.visual-slide');
    if (slides.length === 0) return;

    slides[heroSlideIndex].classList.remove('active');
    heroSlideIndex = (heroSlideIndex + 1) % slides.length;
    slides[heroSlideIndex].classList.add('active');
}

// ==========================================================================
// 3. 포털 대시보드 렌더링 (시즌 이벤트 이미지 카드)
// ==========================================================================
function renderDashboard() {
    const eventsContainer = document.getElementById('events-container');
    if (!eventsContainer) return;

    // THEMES 데이터가 있으면 사용, 없으면 기본 매핑
    const themeList = (typeof THEMES !== 'undefined') ? THEMES : [];

    if (themeList.length === 0) {
        eventsContainer.innerHTML = '<p style="color:#aaa;text-align:center;">이벤트 데이터 로딩 중...</p>';
        return;
    }

    // 태그 배지 색상 매핑
    const tagColors = {
        romantic:    { badge: '#e91e63', badgeBg: 'rgba(233,30,99,0.9)'   },
        traditional: { badge: '#8d5524', badgeBg: 'rgba(141,85,36,0.9)'   },
        halloween:   { badge: '#e65100', badgeBg: 'rgba(50,20,0,0.88)'    },
        christmas:   { badge: '#1b5e20', badgeBg: 'rgba(15,60,20,0.9)'    }
    };

    eventsContainer.innerHTML = themeList.map((theme, index) => {
        const tc = tagColors[theme.id] || { badge: '#333', badgeBg: 'rgba(30,30,30,0.85)' };
        return `
            <div class="season-event-card fade-in-up"
                 style="animation-delay:${index * 0.12}s; border: 2.5px solid ${tc.badge};"
                 onclick="openTheme('${theme.id}')">
                <div class="season-card-img-wrap">
                    <img src="${getBasePath() + encodeURI(theme.img)}" alt="${theme.title}" loading="lazy"
                         onerror="this.onerror=null; this.parentNode.style.background='#f0ece5'">
                    <span class="season-card-badge" style="background:${tc.badgeBg};">${theme.tag}</span>
                </div>
                <div class="season-card-footer">
                    <div class="season-card-info">
                        <span class="season-card-icon">${theme.icon}</span>
                        <span class="season-card-title">${theme.engTitle}</span>
                    </div>
                    <span class="season-card-arrow">→</span>
                </div>
            </div>`;
    }).join('');
}


// ==========================================================================
// 4. Atelier Focus Stage (몰입형 3D 계산기 및 3대 감성 탭)
// ==========================================================================
function getRecipeTheme(recipe) {
    if (!recipe) {
        return {
            themeColor: '#3a1d11',
            themeGlow: 'rgba(212, 175, 55, 0.35)',
            accentColor: '#d4af37',
            spineColor1: '#251109',
            spineColor2: '#3a1d11',
            spineTextColor: '#ebd090'
        };
    }

    const id = Number(recipe.id);
    const path = recipe.path || '';
    const categories = recipe.categories || [];
    const title = recipe.title || '';

    // Vol.37 순두부 레몬포슈에케익 전용 골드/옐로우 앤티크 테마
    if (id === 37) {
        return {
            themeColor: '#4A3B18',
            themeGlow: 'rgba(212, 172, 13, 0.45)',
            accentColor: '#F4D03F',
            spineColor1: '#2A200B',
            spineColor2: '#4A3B18',
            spineTextColor: '#FCF3CF'
        };
    }

    // 1. 크리스마스 / 성탄절 (짙은 에메랄드 고딕 그린 + 리치 골드)
    const isChristmas = 
        path.includes('성탄절') || 
        path.includes('크리스마스') || 
        title.includes('슈톨렌') || 
        title.includes('부쉬드노엘') || 
        title.includes('블랙포레스트') || 
        title.includes('눈꽃') || 
        [16, 17, 18, 19, 20, 21].includes(id);

    if (isChristmas) {
        return {
            themeColor: '#08321B',
            themeGlow: 'rgba(8, 50, 27, 0.5)',
            accentColor: '#D4AF37',
            spineColor1: '#041B0E',
            spineColor2: '#08321B',
            spineTextColor: '#ffd79e'
        };
    }

    // 2. 할로윈 (오컬트 마법사 딥 바이올렛 + 오렌지 골드)
    const isHalloween = 
        path.includes('할로윈') || 
        title.includes('단호박') || 
        [4, 8, 9].includes(id);

    if (isHalloween) {
        return {
            themeColor: '#320B44',
            themeGlow: 'rgba(50, 11, 68, 0.5)',
            accentColor: '#E09F3E',
            spineColor1: '#1B0626',
            spineColor2: '#320B44',
            spineTextColor: '#eed5ff'
        };
    }

    // 3. 발렌타인데이 / 화이트데이 / 로맨틱 테마 (드라이 버건디 & 딥 에스프레소)
    const isRomantic = 
        path.includes('발렌타인') || 
        path.includes('화이트데이') || 
        title.includes('바크초콜릿') || 
        title.includes('초코케익') || 
        title.includes('초코마들렌') || 
        [32, 25, 26, 27].includes(id);

    if (isRomantic) {
        if (id === 32 || id === 25) {
            return {
                themeColor: '#5A0E1F',
                themeGlow: 'rgba(90, 14, 31, 0.45)',
                accentColor: '#E0A3B1',
                spineColor1: '#3A0813',
                spineColor2: '#5A0E1F',
                spineTextColor: '#ffe6eb'
            };
        } else {
            return {
                themeColor: '#3A1E18',
                themeGlow: 'rgba(58, 30, 24, 0.45)',
                accentColor: '#E3C6B6',
                spineColor1: '#23120E',
                spineColor2: '#3A1E18',
                spineTextColor: '#fff0eb'
            };
        }
    }

    // 4. 설날-추석 / 명절 / 전통 감성 테마 (앤티크 말차 그린 & 묵직한 단팥 브라운)
    const isTraditional = 
        path.includes('명절') || 
        path.includes('수능') || 
        title.includes('흑임자') || 
        title.includes('쑥') || 
        title.includes('단팥') || 
        title.includes('모찌') || 
        categories.includes('nostalgia') || 
        [36, 34, 33, 14, 13, 28, 7, 30, 11, 10].includes(id);

    if (isTraditional) {
        if (title.includes('쑥') || categories.includes('soymilk')) {
            return {
                themeColor: '#244724',
                themeGlow: 'rgba(36, 71, 36, 0.45)',
                accentColor: '#C4B182',
                spineColor1: '#152A15',
                spineColor2: '#244724',
                spineTextColor: '#e5debf'
            };
        } else {
            return {
                themeColor: '#5A3816',
                themeGlow: 'rgba(90, 56, 22, 0.45)',
                accentColor: '#EAD7A8',
                spineColor1: '#3B220B',
                spineColor2: '#5A3816',
                spineTextColor: '#ebdaba'
            };
        }
    }

    // 5. 카테고리별 테마 (에메랄드 틸, 미드나잇 블루, 다크 시나몬, 티 올리브)
    if (categories.includes('creamy')) {
        return {
            themeColor: '#0A3129',
            themeGlow: 'rgba(10, 49, 41, 0.45)',
            accentColor: '#D6C195',
            spineColor1: '#061D19',
            spineColor2: '#0A3129',
            spineTextColor: '#ebdcb8'
        };
    }
    if (categories.includes('cloud')) {
        return {
            themeColor: '#1B1E37',
            themeGlow: 'rgba(27, 30, 55, 0.45)',
            accentColor: '#D3C2E8',
            spineColor1: '#101221',
            spineColor2: '#1B1E37',
            spineTextColor: '#eae1ed'
        };
    }
    if (categories.includes('fudgy')) {
        return {
            themeColor: '#3C1B0F',
            themeGlow: 'rgba(60, 27, 15, 0.45)',
            accentColor: '#DFCEAA',
            spineColor1: '#230E07',
            spineColor2: '#3C1B0F',
            spineTextColor: '#faedd2'
        };
    }
    if (categories.includes('teatime')) {
        return {
            themeColor: '#3C2B0C',
            themeGlow: 'rgba(60, 43, 12, 0.45)',
            accentColor: '#EBCFA2',
            spineColor1: '#211806',
            spineColor2: '#3C2B0C',
            spineTextColor: '#faf3d9'
        };
    }

    return {
        themeColor: '#3a1d11',
        themeGlow: 'rgba(212, 175, 55, 0.35)',
        accentColor: '#d4af37',
        spineColor1: '#251109',
        spineColor2: '#3a1d11',
        spineTextColor: '#ebd090'
    };
}

function openFocusStage(recipeId) {
    recipeId = Number(recipeId);
    const recipe = PROJECTS.find(p => p.id === recipeId);
    if (!recipe) return;

    activeFocusRecipeId = recipeId;

    // 기존 모달 제거
    const old = document.getElementById('focus-modal-overlay');
    if (old) old.remove();

    const theme = getRecipeTheme(recipe);
    const baseIngredients = INGREDIENT_DICT ? (INGREDIENT_DICT[recipeId] || []) : [];

    // "순두부" 또는 "두부"가 포함된 재료를 찾아서 배열의 가장 맨 앞(0번 인덱스)으로 재배치
    let ingredients = [...baseIngredients];
    let targetIdx = ingredients.findIndex(ing => ing.name && ing.name.includes('순두부'));
    if (targetIdx === -1) {
        targetIdx = ingredients.findIndex(ing => ing.name && ing.name.includes('두부'));
    }
    if (targetIdx > 0) {
        const targetIng = ingredients.splice(targetIdx, 1)[0];
        ingredients.unshift(targetIng);
    }

    const steps = typeof RECIPE_STEPS_DB !== 'undefined' ? (RECIPE_STEPS_DB[recipeId] || []) : [];
    const meta = getRecipeMetadata(recipeId);

    // ─── 탭 콘텐츠 빌드 ───────────────────────────────
    // 1. 재료 계산기
    const ingredientsHtml = ingredients.length > 0
        ? ingredients.map((ing, idx) => idx === 0
            ? `<div class="primary-anchor-box" style="border-color:${theme.themeColor};">
                   <div class="ing-check-circle" onclick="toggleIngCheck(this)"></div>
                   <span id="focus-anchor-label" class="focus-ing-name">${ing.name}</span>
                   <div class="focus-ing-input-wrapper">
                       <input type="number" id="focus-anchor-input" class="focus-ing-input"
                              value="${ing.base}" data-base="${ing.base}"
                              oninput="onFocusAnchorChange(this)"
                              style="color:${theme.themeColor};">
                       <span class="focus-ing-unit">g</span>
                   </div>
               </div>`
            : `<div class="focus-ingredient-calc-row">
                   <div class="ing-check-circle" onclick="toggleIngCheck(this)"></div>
                   <span class="focus-ing-name">${ing.name}</span>
                   <div class="focus-ing-input-wrapper">
                       <input type="number" class="focus-sub-input focus-ing-input" data-base="${ing.base}" value="${ing.base}" readonly>
                       <span class="focus-ing-unit">g</span>
                   </div>
               </div>`
        ).join('')
        : `<p class="fc-empty">재료 데이터 준비 중입니다.</p>`;

    // 2. 베이킹 순서
    const stepsHtml = steps.length > 0
        ? `<div class="timeline-progress-wrapper" style="border-color:#e5d8bf;">
               <div class="progress-info-row">
                   <span id="focus-progress-text" class="progress-text" style="color:${theme.themeColor};">0 / ${steps.length} 단계 완료 (0%)</span>
               </div>
               <div class="progress-bar-bg" style="background:#eee6d8;">
                   <div id="focus-progress-bar" class="progress-bar-fill" style="background:${theme.themeColor}; width: 0%;"></div>
               </div>
           </div>
           <div id="focus-steps-timeline" class="focus-timeline">` +
           steps.map((s, i) => `
            <div class="timeline-step-item" data-step-idx="${i}" onclick="toggleTimelineStepComplete(this, ${steps.length})">
                <div class="step-num-circle">
                    <span class="step-num-text">${i+1}</span>
                    <i class="fa-solid fa-check step-check-icon" style="display: none;"></i>
                </div>
                <div class="step-content-box">
                    <div class="step-header-row" style="display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 6px;">
                        <h4 class="step-title-text" style="font-weight:700; color:${theme.themeColor}; margin:0;">${s.title}</h4>
                        <span class="step-time-pill" style="font-size:0.75rem; font-weight:700; color:${theme.themeColor}; background:rgba(0,0,0,0.04); padding:3px 10px; border-radius:12px;">
                            <i class="fa-regular fa-clock"></i> ${s.time}
                        </span>
                    </div>
                    <p class="step-desc-text" style="font-size:0.84rem; color:#5D6D7E; line-height:1.5; margin:0; word-break:keep-all;">${s.desc}</p>
                </div>
            </div>`).join('') + `</div>`
        : `<p class="fc-empty">베이킹 순서 데이터 준비 중입니다.</p>`;

    // 3. 실패 대처법
    let troubleHtml = '';
    const rawTrouble = recipe.troubleShoot || '';
    const hasTrouble = rawTrouble.includes('Q.') && rawTrouble.includes('A.');
    if (hasTrouble) {
        const parts = rawTrouble.split('<br>');
        const q = (parts[0] || '').replace('Q.', '').trim();
        const a = (parts[1] || '').replace('A.', '').trim();
        troubleHtml = `
            <div class="fc-qa-q"><span class="fc-qa-badge fc-qa-q-badge" style="background:#e53935;">Q</span>${q}</div>
            <div class="fc-qa-a" style="border-color:${theme.themeColor};"><span class="fc-qa-badge" style="background:${theme.themeColor};">A</span>${a}</div>`;
    } else {
        troubleHtml = `<div class="fc-empty fc-no-trouble"><i class="fa-solid fa-circle-check" style="color:${theme.themeColor}; font-size:1.6rem; display:block; margin-bottom:8px;"></i>특별한 실패 유의사항이 없습니다.<br>기본 계량과 온도를 지켜주시면 성공입니다!</div>`;
    }

    // ─── 오버레이 DOM 생성 (3D 가죽책 펼침 레이아웃) ───────────────────────────
    const overlay = document.createElement('div');
    overlay.id = 'focus-modal-overlay';
    overlay.className = 'atelier-focus-overlay';
    overlay.onclick = (e) => { if (e.target === overlay) closeFocusStage(); };

    // 테마별 가죽 질감의 탭 그라디언트 정의
    const tabGradient = `linear-gradient(135deg, ${theme.themeColor} 0%, ${theme.spineColor1} 100%)`;

    overlay.innerHTML = `
        <div id="focus-modal-board" class="atelier-focus-board magic-book-theme" style="
            --magic-book-color: ${theme.themeColor};
            --magic-book-glow: ${theme.themeGlow};
            --magic-book-accent: ${theme.accentColor};">
            
            <!-- 책 표지 우측 상단 모퉁이에 고정되는 닫기 버튼 -->
            <button class="focus-overlay-close" onclick="closeFocusStage()" style="z-index: 30000;">&times;</button>

            <!-- 왼쪽 페이지: 요리 화보 및 한마디 -->
            <div class="focus-stage-left">
                <div class="focus-tag-top" style="font-family:'Playfair Display',serif; font-weight:600; letter-spacing:2px;">RECIPE FILE // Vol.${recipe.id}</div>
                <div class="focus-img-wrapper" style="height:62%; margin-top:20px; border-radius:14px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.5);">
                    <img src="${getBasePath() + encodeURI(recipe.img.startsWith('/') ? recipe.img.slice(1) : recipe.img)}" alt="${recipe.title}" style="width:100%; height:100%; object-fit:cover;" onerror="this.onerror=null; this.src='${getBasePath() + 'assets/default_dubu.jpg'}'">
                </div>
                <div class="focus-cheers-box" style="border-left-color:${theme.accentColor}; background:rgba(255,255,255,0.03); margin-top:15px; padding:10px 14px;">
                    <i class="fa-solid fa-quote-left" style="color:${theme.accentColor}; opacity:0.6; margin-bottom:6px; font-size:0.9rem;"></i>
                    <p class="focus-cheers-text" id="focus-recipe-cheers" style="font-size:0.78rem; line-height:1.5; color:#e5dcd3; margin:0;">${meta.cheers}</p>
                </div>
            </div>

            <!-- 오른쪽 페이지: 양피지 텍스트 탭 콘텐츠 -->
            <div class="focus-stage-right" style="background: linear-gradient(to left, #fdfaf2 0%, #f6edd0 85%, #dacda3 100%) !important;">
                
                <!-- 제목 헤더 -->
                <div class="focus-header" style="border-bottom:1px dashed rgba(117, 85, 60, 0.25); padding-bottom:14px; margin-bottom:18px;">
                    <h2 class="serif" id="focus-recipe-title" style="font-size:1.45rem; font-weight:900; color:#4e2912; margin:0 0 6px 0; font-family:'Noto Serif KR',serif;">${recipe.title}</h2>
                    <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-top: 6px;">
                        <span id="focus-recipe-difficulty" class="focus-diff-pill" style="border-color:${theme.themeColor}; background:${theme.themeGlow}; color:${theme.themeColor};">
                            <i class="fa-solid fa-gauge-simple-high"></i> 난이도: ${meta.difficulty}
                        </span>
                        <span id="focus-recipe-yield" class="focus-yield-pill" style="border-color:${theme.themeColor}; background:${theme.themeGlow}; color:${theme.themeColor};">
                            <i class="fa-solid fa-box-open"></i> 분량: ${meta.yieldText}
                        </span>
                    </div>
                </div>

                <!-- 탭 콘텐츠 스크롤 영역 -->
                <div class="tab-content" style="flex:1; overflow-y:auto; padding-right:6px; margin-bottom:15px;">
                    <div id="fctab-content-calc" class="focus-tab-view" style="display: flex; flex-direction: column;">
                        ${ingredientsHtml}
                        <div class="calc-tip-text"><i class="fa-solid fa-circle-info"></i> 기준 재료의 양을 변경하면 전체 비율이 실시간 연산됩니다.</div>
                    </div>
                    <div id="fctab-content-steps" class="focus-tab-view" style="display: none; flex-direction: column;">
                        ${stepsHtml}
                    </div>
                    <div id="fctab-content-trouble" class="focus-tab-view" style="display: none; flex-direction: column;">
                        ${troubleHtml}
                    </div>
                </div>

                <!-- 하단 액션 버튼 3개 -->
                <div class="focus-actions" style="margin-top:auto; padding-top:15px; border-top:1px solid rgba(117,85,60,0.2); display:flex; gap:8px;">
                    <button id="focus-btn-download" class="action-btn download-btn" onclick="issueRecipeCardFromFocus(${recipe.id},'${recipe.title}','${recipe.img}','${meta.difficulty}','${meta.bakingTip}','${meta.cheers}')" style="background:${theme.themeColor}; color:${theme.accentColor};">
                        <i class="fa-solid fa-download"></i> 레시피 소장하기
                    </button>
                    ${ recipe.blogUrl
                        ? `<a id="focus-btn-blog" href="${recipe.blogUrl}" target="_blank" class="action-btn blog-btn" style="background:#eee6d8; color:#3b281f;">
                            <i class="fa-solid fa-arrow-up-right-from-square"></i> 블로그 가기
                           </a>`
                        : `<button class="action-btn blog-btn" disabled style="background:#f0ece5; color:#ccc;">블로그 준비중</button>`
                    }
                </div>

                <!-- 우측 가죽 돌출형 책갈피 인덱스 탭 (Bookmark Ribbons) -->
                <div class="focus-card-tabs">
                    <button id="btn-tab-calc" class="focus-card-tab-btn active" onclick="switchFCTab('calc','${recipeId}','${theme.themeColor}')" style="
                        background: ${tabGradient};
                        border-color: ${theme.accentColor};" title="재료 계산기">
                        <i class="fa-solid fa-scale-balanced" style="transform: rotate(90deg);"></i>
                        <span style="writing-mode: vertical-rl; text-orientation: mixed; margin-top: 4px;">재료</span>
                    </button>
                    <button id="btn-tab-steps" class="focus-card-tab-btn" onclick="switchFCTab('steps','${recipeId}','${theme.themeColor}')" style="
                        background: ${tabGradient};
                        border-color: ${theme.accentColor};" title="베이킹 순서">
                        <i class="fa-solid fa-list-ol" style="transform: rotate(90deg);"></i>
                        <span style="writing-mode: vertical-rl; text-orientation: mixed; margin-top: 4px;">순서</span>
                    </button>
                    ${hasTrouble ? `
                    <button id="btn-tab-trouble" class="focus-card-tab-btn" onclick="switchFCTab('trouble','${recipeId}','${theme.themeColor}')" style="
                        background: ${tabGradient};
                        border-color: ${theme.accentColor};" title="실패 대처법">
                        <i class="fa-solid fa-circle-question" style="transform: rotate(90deg);"></i>
                        <span style="writing-mode: vertical-rl; text-orientation: mixed; margin-top: 4px;">대처</span>
                    </button>
                    ` : ''}
                </div>

            </div>
        </div>`;

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        overlay.classList.add('active');
    }, 30);
}

function closeFocusStage() {
    const overlay = document.getElementById('focus-modal-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        const themeOverlay = document.getElementById('theme-modal-overlay');
        if (!themeOverlay) {
            document.body.style.overflow = '';
        }
        setTimeout(() => overlay.remove(), 400);
    }
    activeFocusRecipeId = null;
}

function switchFCTab(tabId, recipeId, themeColor) {
    const recipe = PROJECTS.find(p => p.id === Number(recipeId));
    const theme = getRecipeTheme(recipe);
    const board = document.getElementById('focus-modal-board');

    ['calc','steps','trouble'].forEach(t => {
        const btn = board ? board.querySelector(`#btn-tab-${t}`) : null;
        const content = board ? board.querySelector(`#fctab-content-${t}`) : null;
        if (btn) {
            btn.classList.remove('active');
        }
        if (content) {
            content.style.display = 'none';
        }
    });

    const activeBtn = board ? board.querySelector(`#btn-tab-${tabId}`) : null;
    const activeContent = board ? board.querySelector(`#fctab-content-${tabId}`) : null;
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    if (activeContent) {
        activeContent.style.display = 'flex';
    }
}





function toggleIngCheck(circleEl) {
    circleEl.classList.toggle('checked');
    const parent = circleEl.closest('.focus-ingredient-calc-row') || circleEl.closest('.primary-anchor-box');
    if (parent) {
        parent.classList.toggle('checked-row');
    }
}



function toggleTimelineStepComplete(itemEl, totalSteps) {
    itemEl.classList.toggle('completed');
    const checkIcon = itemEl.querySelector('.step-check-icon');
    const numText = itemEl.querySelector('.step-num-text');

    if (itemEl.classList.contains('completed')) {
        if (checkIcon) checkIcon.style.display = 'block';
        if (numText) numText.style.display = 'none';
    } else {
        if (checkIcon) checkIcon.style.display = 'none';
        if (numText) numText.style.display = 'block';
    }

    updateTimelineProgress(itemEl.parentNode, totalSteps);
}

function resetTimelineProgress(totalSteps) {
    const board = document.getElementById('focus-modal-board');
    const textEl = board ? board.querySelector('#focus-progress-text') : null;
    const barEl = board ? board.querySelector('#focus-progress-bar') : null;
    if (textEl && barEl) {
        textEl.innerText = `0 / ${totalSteps} 단계 완료 (0%)`;
        barEl.style.width = '0%';
    }
}

function updateTimelineProgress(timelineContainer, totalSteps) {
    const completedCount = timelineContainer.querySelectorAll('.timeline-step-item.completed').length;
    const percent = Math.round((completedCount / totalSteps) * 100);

    const board = document.getElementById('focus-modal-board');
    const textEl = board ? board.querySelector('#focus-progress-text') : null;
    const barEl = board ? board.querySelector('#focus-progress-bar') : null;
    if (textEl && barEl) {
        textEl.innerText = `${completedCount} / ${totalSteps} 단계 완료 (${percent}%)`;
        barEl.style.width = `${percent}%`;
    }

    if (percent === 100) {
        triggerPageConfetti();
    }
}

// 구식 중복 closeFocusStage 제거

// ==========================================================================
// 5. 역비례 & 다중 앵커 양방향 비례 연산 (Atelier Scale)
// ==========================================================================
const BASE_YIELDS = {
    38: { template: "르뱅쿠키 {x}개 분량 🍪", baseCount: 8 },
    37: { template: "미니 번트틀 6구 2개 (총 12개) + 오란다 대 1개 기준 {x}배 분량 🍋", baseCount: 1 },
    36: { template: "찜케이크 1호 {x}개 분량 🧧", baseCount: 1 },
    35: { template: "오란다 대 틀 {x}개 분량 🍞", baseCount: 3 },
    34: { template: "오란다 대 틀 {x}개 분량 🖤", baseCount: 1 },
    33: { template: "쑥 찰떡브라우니 {x}판 분량 🌿", baseCount: 1 },
    32: { template: "화이트 바크초콜릿 {x}판 분량 🍫", baseCount: 1 },
    31: { template: "티라미수 푸딩 {x}컵 분량 🍮", baseCount: 2 },
    30: { template: "모찌떡 케이크 {x}호 1개 분량 🎂", baseCount: 1 },
    29: { template: "얼그레이그릭스콘 {x}개 분량 🍪", baseCount: 6 },
    28: { template: "오란다 대 팬 {x}개 분량 🍵", baseCount: 3 },
    27: { template: "마들렌 틀 {x}개 분량 🍫", baseCount: 12 },
    26: { template: "마들렌 틀 {x}개 분량 🍋", baseCount: 12 },
    25: { template: "실리콘 틀 {x}개 분량 🍫", baseCount: 8 },
    24: { template: "찰떡파이 {x}판 분량 🥧", baseCount: 1 },
    23: { template: "시나몬롤 {x}개 분량 🍥", baseCount: 6 },
    22: { template: "머핀 틀 {x}개 분량 🧁", baseCount: 6 },
    21: { template: "오란다 대 틀 {x}개 분량 🍓", baseCount: 3 },
    20: { template: "번트틀 {x}개 분량 🍫", baseCount: 1 },
    19: { template: "번트틀 {x}개 분량 🍋", baseCount: 1 },
    18: { template: "원형 컵 {x}개 분량 🍒", baseCount: 4 },
    17: { template: "정사각 팬 {x}판 분량 🍫", baseCount: 1 },
    16: { template: "슈톨렌 {x}개 분량 🎄", baseCount: 2 },
    15: { template: "실리콘 오발틀 {x}개 분량 🎃", baseCount: 8 },
    14: { template: "오란다 대자 팬 {x}개 분량 🌰", baseCount: 2 },
    13: { template: "원형 1호틀 {x}개 분량 🎃", baseCount: 1 },
    12: { template: "롤케이크 {x}롤 분량 🌀", baseCount: 1 },
    11: { template: "치즈스콘 {x}개 분량 🧀", baseCount: 6 },
    10: { template: "레몬케이크 {x}개 분량 🍋", baseCount: 6 },
    9: { template: "브라우니쿠키 {x}개 분량 🍪", baseCount: 8 },
    8: { template: "머핀 틀 {x}개 분량 🧁", baseCount: 6 },
    7: { template: "크림치즈쿠키 {x}개 분량 🍪", baseCount: 8 },
    6: { template: "오란다 대자 팬 {x}개 분량 🍵", baseCount: 2 },
    5: { template: "황치즈 휘낭시에 {x}개 분량 🧀", baseCount: 6 },
    4: { template: "퍼지 브라우니 {x}판 분량 🍫", baseCount: 1 },
    3: { template: "바스크 치즈케이크 {x}호 분량 🧀", baseCount: 1 },
    2: { template: "순두부 티라미수 {x}대접 분량 ☕", baseCount: 1 },
    1: { template: "순두부 크림치즈 {x}병 분량 🍯", baseCount: 1 }
};

function getDynamicYieldText(recipeId, scale) {
    const yieldInfo = BASE_YIELDS[recipeId];
    if (!yieldInfo) {
        return scale === 1 ? "1배 분량" : `약 ${Math.round(scale * 10) / 10}배 분량`;
    }
    const scaledCount = Math.round(yieldInfo.baseCount * scale * 10) / 10;
    const displayCount = scale === 1 ? `${scaledCount}` : `약 ${scaledCount}`;
    return yieldInfo.template.replace("{x}", displayCount);
}

function updateDynamicYieldDisplay(recipeId, scale) {
    const yieldText = getDynamicYieldText(recipeId, scale);
    const board = document.getElementById('focus-modal-board');
    const yieldPill = board ? board.querySelector('#focus-recipe-yield') : null;
    if (yieldPill) {
        yieldPill.innerHTML = `<i class="fa-solid fa-box-open"></i> 분량: ${yieldText}`;
    }
}

function animateValue(obj, start, end, duration = 300) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.value = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.value = end;
            obj.dispatchEvent(new Event('input'));
        }
    };
    window.requestAnimationFrame(step);
}

function onFocusAnchorChange(inputEl) {
    const val = parseFloat(inputEl.value) || 0;
    const base = parseFloat(inputEl.getAttribute('data-base'));
    if (base === 0 || val <= 0) return;

    const scale = val / base;
    const board = inputEl.closest('#focus-modal-board') || document;
    const inputs = board.querySelectorAll('.focus-sub-input');

    inputs.forEach(inp => {
        const b = parseFloat(inp.getAttribute('data-base'));
        const targetVal = Math.round(b * scale);
        const currentVal = parseFloat(inp.value) || 0;

        animateValue(inp, currentVal, targetVal, 300);
    });

    updateDynamicYieldDisplay(activeFocusRecipeId, scale);
    updateDynamicBakingTip(activeFocusRecipeId, scale);
}

function getRecipeMetadata(recipeId) {
    recipeId = Number(recipeId);
    const recipe = PROJECTS.find(p => p.id === recipeId);
    
    // 1. 실제 난이도 판별 (쉬움: 원볼/믹서기 언급, 어려움: 장시간/다단계/복잡공정, 그외 보통)
    let difficulty = "보통 🟡";
    if (recipe) {
        const steps = typeof RECIPE_STEPS_DB !== 'undefined' ? (RECIPE_STEPS_DB[recipeId] || []) : [];
        
        const descText = (recipe.desc || "") + " " + (recipe.emotionalQuote || "");
        const stepsText = steps.map(s => s.title + " " + s.desc).join(" ");
        const fullText = (descText + " " + stepsText).toLowerCase();
        
        const hasOneBowl = fullText.includes("원볼") || recipe.oneBowl;
        const hasMixer = fullText.includes("믹서기") || fullText.includes("믹서");
        
        // 예외 조항: 크럼블, 필링, 글레이즈, 프로스팅, 시럽 등 별도 부속 공정이 들어가는 것은 쉬움에서 배제
        const hasExtraProcess = fullText.includes("크럼블") || 
                                 fullText.includes("필링") || 
                                 fullText.includes("글레이즈") || 
                                 fullText.includes("프로스팅") || 
                                 fullText.includes("시럽");
        
        const isEasy = (hasOneBowl || hasMixer) && !hasExtraProcess;
        
        let timeMinutes = 0;
        if (recipe.time) {
            const timeMatch = recipe.time.match(/(\d+)분/);
            if (timeMatch) timeMinutes = parseInt(timeMatch[1]);
        }
        const isLongTime = timeMinutes >= 50;
        const isManySteps = steps.length >= 8 && recipeId !== 37;
        const hasComplexProcess = fullText.includes("머랭") || fullText.includes("발효") || recipeId === 16 || recipeId === 13;
        
        // 쉬움 우선 적용 (예외 공정이 없는 원볼 또는 믹서기 레시피)
        if (isEasy) {
            difficulty = "쉬움 🟢";
        } else if (isLongTime || isManySteps || hasComplexProcess) {
            difficulty = "어려움 🔴";
        }
    }

    // 2. 분량 텍스트 결정 (BASE_YIELDS 매핑 여부 기준)
    let yieldText = "1배 분량";
    if (typeof BASE_YIELDS !== 'undefined' && BASE_YIELDS[recipeId]) {
        yieldText = getDynamicYieldText(recipeId, 1);
    } else {
        yieldText = "기본 1판 분량";
    }

    let bakingTip = "오븐 예열 170℃ / 25분";
    let cheers = "오늘 내 손끝으로 빚는 건강한 두부 베이킹, 설레는 시작입니다! ✨";

    if (recipe) {
        if (recipe.id === 36) {
            bakingTip = "물이 끓는 찜기 중불 / 50분 (뜸 10분)";
            cheers = "케이크처럼 폭신하지만 떡처럼 쫀득함이 살아있는 단팥 찜케이크! 🧧";
        } else if (recipe.id === 35) {
            bakingTip = "180°C 예열 → 170°C / 40분 (콩물 마무리 + 하루 숙성 권장)";
            cheers = "다음 날이 진짜입니다! 하루 숙성 후 먹는 그 촉촉함 and 고소함은 레시피의 진짜 얼굴이에요. ☀️";
        } else if (recipe.id === 34) {
            bakingTip = "중탕 예열 140℃ / 140℃ 60분 (뜸 10분)";
            cheers = "순두부 물기를 짜지 않고 그대로 사용하여, 촉촉함과 꾸덕함이 극대화되는 특별한 레시피입니다. 🖤";
        } else if (recipe.id === 33) {
            bakingTip = "오븐 예열 180℃ / 160℃ 30~35분";
            cheers = "향긋한 쑥과 찰기가 만든 한국적 쫀득함! 부모님 선물용 부동의 1위 레시피랍니다. 🌿";
        } else if (recipe.id === 32) {
            bakingTip = "오븐 예열 165℃ / 25분";
            cheers = "단 한 방울의 수분도 허용하지 않는 수분 박멸 비법으로 완성하는 극강의 바삭함! 💝";
        } else if (recipe.id === 31) {
            bakingTip = "냉장실 냉각 / 4시간";
            cheers = "사르르 사그라지는 두부 크림의 극상 부드러움! 컵에 소복히 담으면 더욱 기쁩니다. 🍮";
        } else if (recipe.id === 30) {
            bakingTip = "오븐 예열 180℃ / 160℃ 50~55분";
            cheers = "명절의 기품을 한껏 높여주는 굳지 않는 비법 모찌떡케이크, 정성으로 완성해 보아요! 🧧";
        } else if (recipe.id === 14) {
            bakingTip = "오븐 예열 180℃ / 170℃ 40분";
            cheers = "달콤하고 고소한 밤이 콕콕 박혀 더욱 풍요로운 맛! 가을 감성을 가득 담아 구워내는 영양 만점 순두부 파운드케이크입니다. 🌰";
        } else if (recipe.id === 6) {
            bakingTip = "오븐 예열 180℃ / 35분 (식힌 후 홍차시럽 코팅)";
            cheers = "홍차의 은은한 향과 레몬 제스트의 상큼함이 입안 가득 번지는, 가볍고 촉촉한 원볼 베이킹의 진수를 만나보세요! 🍰";
        }
    }
    return { difficulty, yieldText, bakingTip, cheers };
}

function updateDynamicBakingTip(recipeId, scale) {
    const meta = getRecipeMetadata(recipeId);
    const board = document.getElementById('focus-modal-board');
    const cheersEl = board ? board.querySelector('#focus-recipe-cheers') : null;
    if (cheersEl) {
        cheersEl.innerText = meta.cheers;
    }
}

// ==========================================================================
// 6. 레시피 카드 발행 & 다운로드 & 공유
// ==========================================================================
function issueRecipeCardFromFocus(recipeId, title, img, difficulty, bakingTip, cheers) {
    const board = document.getElementById('focus-modal-board');
    const anchorLabelEl = board ? board.querySelector('#focus-anchor-label') : null;
    const anchorInput = board ? board.querySelector('#focus-anchor-input') : null;
    const anchorLabel = anchorLabelEl ? anchorLabelEl.innerText || anchorLabelEl.textContent || '' : '';
    const anchorVal = anchorInput ? parseFloat(anchorInput.value) || 0 : 0;
    const anchorBase = anchorInput ? parseFloat(anchorInput.getAttribute('data-base')) || 1 : 1;
    const scale = anchorBase === 0 ? 1 : anchorVal / anchorBase;

    let ingredientsSummary = '';
    if (anchorLabel && anchorInput) {
        ingredientsSummary += `
            <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px dashed rgba(58, 105, 88, 0.1); font-size: 0.9rem;">
                <span style="color: #4E342E; font-weight: 500;">${anchorLabel}</span>
                <strong style="color: var(--dubu-mint-accent);">${anchorInput.value}g</strong>
            </div>
        `;
    }

    const rows = document.querySelectorAll('.focus-ingredient-calc-row');
    rows.forEach(row => {
        const nameEl = row.querySelector('.focus-ing-name');
        const inputEl = row.querySelector('.focus-ing-input');
        if (nameEl && inputEl) {
            ingredientsSummary += `
                <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px dashed rgba(58, 105, 88, 0.1); font-size: 0.9rem;">
                    <span style="color: #4E342E; font-weight: 500;">${nameEl.innerText}</span>
                    <strong style="color: var(--dubu-mint-accent);">${inputEl.value}g</strong>
                </div>
            `;
        }
    });

    const yieldText = getDynamicYieldText(recipeId, scale);
    let finalBakingTip = bakingTip;
    if (scale > 1.1) {
        finalBakingTip += " (※ 대량 조리 시 굽는 시간 추가 필요)";
    } else if (scale < 0.9) {
        finalBakingTip += " (※ 소량 조리 시 굽는 시간 단축 필요)";
    }

    openUnifiedRecipeCardModal(recipeId, title, img, yieldText, finalBakingTip, cheers, ingredientsSummary);
}

function openUnifiedRecipeCardModal(id, title, img, yieldText, bakingTip, cheers, ingredientsSummary) {
    const oldModal = document.getElementById('recipe-card-modal');
    if (oldModal) oldModal.remove();

    // 가상 라우팅 우회용 절대 경로 변환
    const finalImgSrc = getBasePath() + encodeURI(img.startsWith('/') ? img.slice(1) : img);

    const modal = document.createElement('div');
    modal.id = 'recipe-card-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex; align-items: center; justify-content: center;
        z-index: 40000; opacity: 0; transition: opacity 0.3s ease;
    `;

    modal.innerHTML = `
        <div style="background: #FDFBF4; width: 95%; max-width: 400px; border-radius: 20px; padding: 25px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); transform: translateY(30px); transition: transform 0.3s ease; border: 2px solid #E8DCC4; position: relative;">
            <div style="text-align: center; margin-bottom: 15px; position: relative; padding-top: 10px;">
                <span style="font-size: 0.76rem; color: #7F8C8D; letter-spacing: 2.5px; font-weight: 700; display: block;">PROJECT DUBU</span>
                <button onclick="closeRecipeCardModal()" style="position: absolute; right: -10px; top: -5px; background: none; border: none; font-size: 1.5rem; color: #7F8C8D; cursor: pointer; outline: none;">&times;</button>
            </div>
            
            <div style="border-radius: 12px; overflow: hidden; height: 160px; margin-bottom: 15px; border: 1px solid #E8DCC4;">
                <img src="${finalImgSrc}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>

            <div style="text-align: center; margin-bottom: 15px;">
                <h4 style="color: #3A1D11; font-size: 1.05rem; margin: 0 0 5px 0; font-weight: 700;">${title}</h4>
                <div style="display: inline-flex; align-items: center; gap: 5px; background: #E8DCC4; color: #3A1D11; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600;">
                    <i class="fa-solid fa-box-open"></i> ${yieldText}
                </div>
            </div>

            <div style="background: white; border: 1px solid #E8DCC4; border-radius: 12px; padding: 15px; margin-bottom: 15px; max-height: 150px; overflow-y: auto;">
                <h5 style="color: #7F8C8D; font-size: 0.7rem; margin: 0 0 8px 0; letter-spacing: 1px;">INGREDIENTS</h5>
                ${ingredientsSummary}
            </div>

            <div style="background: rgba(58, 105, 88, 0.05); border: 1px solid rgba(58, 105, 88, 0.12); border-radius: 12px; padding: 12px; font-size: 0.78rem; color: #2C3E50; line-height: 1.5; margin-bottom: 15px;">
                <div style="font-weight: 700; color: #163B32; margin-bottom: 4px;"><i class="fa-regular fa-clock"></i> 베이킹 가이드 & 팁</div>
                <div>${bakingTip}</div>
                <div style="margin-top: 6px; font-style: italic; color: #7F8C8D;">${cheers}</div>
            </div>

            <div style="display: flex; gap: 10px;">
                <button onclick="downloadRecipeCard('${title}')" style="flex: 1; background: var(--dubu-mint-accent); color: white; border: none; padding: 12px; border-radius: 10px; font-size: 0.85rem; font-weight: 700; cursor: pointer; transition: background 0.2s; text-align: center; outline: none;">
                    <i class="fa-solid fa-download"></i> 이미지로 저장
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('div').style.transform = 'translateY(0)';
    }, 50);
}

function closeRecipeCardModal() {
    const modal = document.getElementById('recipe-card-modal');
    if (modal) {
        modal.style.opacity = '0';
        modal.querySelector('div').style.transform = 'translateY(30px)';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function downloadRecipeCard(title) {
    const modal = document.getElementById('recipe-card-modal');
    const card = modal ? modal.querySelector('div') : null;
    if (!card) return;

    // 카드 클론 생성
    const clone = card.cloneNode(true);
    
    // 클론을 화면 밖 임시 컨테이너에 배치
    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed;
        top: -99999px;
        left: -99999px;
        width: 400px;
        background: #FDFBF4;
        z-index: -1;
    `;
    
    // 클론 안의 모든 스크롤/overflow 제거
    clone.querySelectorAll('*').forEach(el => {
        el.style.maxHeight = 'none';
        el.style.height = 'auto';
        el.style.overflow = 'visible';
        el.style.overflowY = 'visible';
        el.style.overflowX = 'visible';
    });
    
    // 다운로드 버튼 숨기기
    const btn = clone.querySelector('button[onclick*="downloadRecipeCard"]');
    if (btn) btn.style.display = 'none';
    
    container.appendChild(clone);
    document.body.appendChild(container);
    
    // 렌더링 대기 후 캡처
    setTimeout(() => {
        html2canvas(clone, {
            useCORS: true,
            allowTaint: true,
            scale: 2,
            backgroundColor: '#FDFBF4',
            width: clone.scrollWidth,
            height: clone.scrollHeight
        }).then(canvas => {
            document.body.removeChild(container);
            const link = document.createElement('a');
            link.download = `프로젝트두부_${title}_레시피.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }).catch(err => {
            document.body.removeChild(container);
            alert('이미지 저장 중 오류가 발생했습니다.');
            console.error(err);
        });
    }, 300);
}

function shareRecipe(event, title) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const board = document.getElementById('focus-modal-board');
    const anchorLabelEl = board ? board.querySelector('#focus-anchor-label') : null;
    const anchorInput = board ? board.querySelector('#focus-anchor-input') : null;
    const anchorLabel = anchorLabelEl ? anchorLabelEl.innerText || anchorLabelEl.textContent || '' : '';
    const anchorValue = anchorInput ? anchorInput.value : '';

    let ingredientText = '';
    if (anchorLabel && anchorValue) {
        ingredientText += `- ${anchorLabel}: ${anchorValue}g\n`;
    }

    const rows = board ? board.querySelectorAll('.focus-ingredient-calc-row') : [];
    rows.forEach(row => {
        const nameEl = row.querySelector('.focus-ing-name');
        const inputEl = row.querySelector('.focus-ing-input');
        if (nameEl && inputEl) {
            const name = nameEl.innerText.trim();
            const value = inputEl.value.trim();
            if (name && value) {
                ingredientText += `- ${name}: ${value}g\n`;
            }
        }
    });

    const yieldEl = board ? board.querySelector('#focus-recipe-difficulty') : null;
    let yieldText = yieldEl ? yieldEl.innerText || '' : '';
    if (yieldText.includes('난이도:')) {
        yieldText = '';
    } else {
        yieldText = yieldText.replace('분량:', '').trim();
    }

    let copyText = `[프로젝트 두부] ${title} 레시피 💌\n\n`;
    if (yieldText) {
        copyText += `■ 기준 분량: ${yieldText}\n`;
    }
    if (ingredientText) {
        copyText += `■ 맞춤 계량 재료:\n${ingredientText}\n`;
    }

    const shareUrl = window.location.origin + window.location.pathname;
    copyText += `■ 레시피 상세 및 계산기 보러가기:\n${shareUrl}`;

    navigator.clipboard.writeText(copyText).then(() => {
        alert('📋 맞춤 레시피 정보가 클립보드에 복사되었습니다! 카카오톡이나 블로그에 편하게 붙여넣어 공유해보세요.');
    }).catch(err => {
        console.error('클립보드 복사 실패:', err);
    });
}

// ==========================================================================
// 7. 성공/다운로드 축하 Confetti 효과
// ==========================================================================
function triggerPageConfetti() {
    const canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        z-index: 10000; pointer-events: none;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const colors = ['#E2ECE9', '#FDFBF4', '#D3ECE2', '#E8DCC4', '#E6A4B4', '#FFF0F5'];
    const particles = [];

    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height - height,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 4 + 2,
            angle: Math.random() * 360,
            spin: Math.random() * 4 - 2
        });
    }

    let animationId;

    function render() {
        ctx.clearRect(0, 0, width, height);
        let active = false;

        particles.forEach(p => {
            p.y += p.speed;
            p.x += Math.sin(p.y / 30) * 0.5;
            p.angle += p.spin;

            if (p.y < height) {
                active = true;
            }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();
        });

        if (active) {
            animationId = requestAnimationFrame(render);
        } else {
            cancelAnimationFrame(animationId);
            canvas.remove();
        }
    }

    render();

    setTimeout(() => {
        particles.forEach(p => p.speed = p.speed * 1.5);
    }, 4000);
}

// ==========================================================================
// 14. Sensory Accordion Artbook - 아코디언 UI 렌더링 엔진
// ==========================================================================
function renderAccordionArtbook() {
    const container = document.getElementById('accordion-showroom-container');
    if (!container) return;

    // 1. 아코디언 전용 스타일 및 크리에이터 노트 매핑 데이터
    const accordionMetaMap = {
        38: {
            creatorsNote: "큼직한 다크 초코칩과 고소한 견과류가 아낌없이 들어가 겉바속쫀한 묵직한 르뱅 스타일 쿠키.",
            themeColor: "#5c3c24",
            themeGlow: "rgba(92, 60, 36, 0.15)",
            accentColor: "#d2a679"
        },
        37: {
            creatorsNote: "뜨거울 때 새콤한 레몬 시럽을 흠뻑 적셔 속까지 촉촉하게 즐기는 순두부 포슈에 케이크.",
            themeColor: "#D4AC0D",
            themeGlow: "rgba(212, 172, 13, 0.15)",
            accentColor: "#F7DC6F"
        },
        36: {
            creatorsNote: "물기 안 짠 순두부를 우유, 오일과 갈아 찹쌀가루 및 팥앙금을 얹어 쪄낸 쫀득 촉촉한 찜케이크.",
            themeColor: "#5A3816",
            themeGlow: "rgba(90, 56, 22, 0.15)",
            accentColor: "#EAD7A8"
        },
        35: {
            creatorsNote: "순두부와 콩물을 함께 갈아 고소하고 촉촉하게 완성한 웰빙 파운드케익.",
            themeColor: "#7B6F55",
            themeGlow: "rgba(123, 111, 85, 0.15)",
            accentColor: "#F5E6C8"
        },
        34: {
            creatorsNote: "오븐 중탕 공법으로 완성하는 극강의 고소하고 꾸덕한 흑임자 테린",
            themeColor: "#4A4F54",
            themeGlow: "rgba(74, 79, 84, 0.15)",
            accentColor: "#78909C"
        },
        33: {
            creatorsNote: "찹쌀가루 없이 완성한 반전의 찰기! 향긋한 쑥 반죽과 콩고물의 고소한 동행.",
            themeColor: "#4E6B56",
            themeGlow: "rgba(78, 107, 86, 0.15)",
            accentColor: "#A5D6A7"
        },
        32: {
            creatorsNote: "순두부 시트 위에 화이트 커버춰를 부어 피스타치오와 스프링클로 장식해 굳히는 바크 초콜릿.",
            themeColor: "#C25D7E",
            themeGlow: "rgba(194, 93, 126, 0.15)",
            accentColor: "#F48FB1"
        }
    };

    // 2. PROJECTS에서 자색고구마(id: 39)를 제외한 실질적 완성작 중 최신 5개 동적 추출 (과거 -> 최신 정렬)
    const latestFive = PROJECTS.filter(p => p.id !== 39)
                               .sort((a, b) => b.id - a.id)
                               .slice(0, 5)
                               .reverse();

    // 3. activeRecipes 배열 동적 매핑
    const activeRecipes = latestFive.map(p => {
        const meta = accordionMetaMap[p.id] || {
            creatorsNote: p.desc || "",
            themeColor: "#7B6F55",
            themeGlow: "rgba(123, 111, 85, 0.15)",
            accentColor: "#F5E6C8"
        };
        return {
            id: p.id,
            title: p.title,
            img: p.img,
            creatorsNote: meta.creatorsNote,
            themeColor: meta.themeColor,
            themeGlow: meta.themeGlow,
            accentColor: meta.accentColor
        };
    });

    const maxId = Math.max(...activeRecipes.map(r => r.id));
    const comingSoonVol = maxId + 1;

    // 4. 커밍순 카드 추가
    activeRecipes.push({
        id: 'coming-soon',
        title: "순두부 자색고구마 롤치즈스콘",
        comingSoonSubtitle: `Vol.${comingSoonVol} Coming Soon`,
        img: "",
        creatorsNote: "자색고구마의 달콤하고 고소한 반죽에 롤치즈가 콕콕 박혀 담백하게 즐기는 웰빙 스콘이 곧 찾아옵니다.",
        themeColor: "#6C3483",
        themeGlow: "rgba(108, 52, 131, 0.15)",
        accentColor: "#BB8FCE",
        isComingSoon: true
    });

    const specsData = {
        38: { texture: "겉바속쫀하고 든든함", wellness: "초코칩·견과류 가득 (8개 분량)", method: "170℃ 오븐 구움" },
        37: { texture: "촉촉하고 부드러움", wellness: "레몬 시럽 코팅, 비타민C 가득", method: "170℃ 오븐 구움" },
        36: { texture: "쫀득하고 촉촉함", wellness: "No밀가루, No버터, No오븐", method: "찜기 50분 찌기" },
        35: { texture: "고소하고 촉촉함", wellness: "진한 콩물, 하루 숙성 비법", method: "170℃ 오븐 구움" },
        34: { texture: "꾸덕함", wellness: "No밀가루, No버터", method: "140℃ 오븐 중탕" },
        33: { texture: "쫀득함", wellness: "No버터, 비건 지향", method: "160℃ 오븐 구움" },
        32: { texture: "바삭하고 달콤함", wellness: "No버터, 볶은 순두부", method: "165℃ 오븐 구움" }
    };

    container.innerHTML = activeRecipes.map((p, idx) => {
        const shortTitle = p.isComingSoon ? `Vol.${comingSoonVol} 커밍순` : p.title.replace("순두부 ", "").trim();
        const specs = specsData[p.id] || { texture: "???", wellness: "???", method: "???" };

        const bgStyle = p.isComingSoon 
            ? `background: linear-gradient(135deg, #1A1C1E 0%, #0D0E10 100%); display: flex; align-items: center; justify-content: center; flex-direction: column;` 
            : `background-image: url('${getBasePath() + encodeURI(p.img)}');`;

        const comingSoonOverlay = p.isComingSoon 
            ? `<div class="coming-soon-glowing-core" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align:center; padding:0 10px;">
                <i class="fa-solid fa-lock" style="font-size: 2.2rem; color: var(--accent-color); filter: drop-shadow(0 0 12px var(--theme-color)); margin-bottom: 12px; opacity: 0.85; animation: pulseGlow 2s infinite ease-in-out;"></i>
                <span style="color:#e5dcd3; font-size:1.1rem; font-weight:700; font-family:'Noto Serif KR',serif; margin-bottom:6px;">${p.title}</span>
                <span class="coming-soon-text-en font-serif" style="color: #95A5A6; font-size: 0.72rem; letter-spacing: 2px; margin-bottom: 2px;">COMING SOON</span>
                <span class="coming-soon-text-ko" style="color: #7F8C8D; font-size: 0.78rem;">비밀의 문이 곧 열립니다</span>
               </div>`
            : '';

        const isLatest = p.id === maxId;
        const showNewBadge = p.isNew || isLatest;

        const titleHtml = p.isComingSoon 
            ? `<h3 class="serif showcase-title" style="color: #7f8c8d;">${p.comingSoonSubtitle || 'Coming Soon'}</h3>`
            : `<h3 class="serif showcase-title">${p.title}${showNewBadge ? ` <span class="new-badge" style="display: inline-block; background: #FF3D71; color: white; font-family: var(--font-playfair), serif; font-weight: 700; font-size: 0.65rem; padding: 2px 8px; border-radius: 20px; vertical-align: middle; margin-left: 10px; box-shadow: 0 0 10px rgba(255, 61, 113, 0.4); text-transform: uppercase; letter-spacing: 0.5px;">NEW</span>` : ''}</h3>`;

        const metaText = p.isComingSoon ? "RECIPE FILE // COMING SOON" : `RECIPE FILE // Vol.${p.id}`;
        const actionBtnText = p.isComingSoon ? `공개 예정 <i class="fa-solid fa-lock" style="margin-left: 5px;"></i>` : `상세보기 <i class="fa-solid fa-chevron-right" style="margin-left: 5px;"></i>`;

        const mobileOrder = p.isComingSoon ? 6 : (5 - idx);

        return `
            <div class="accordion-slice ${p.isComingSoon ? 'coming-soon-slice' : ''} ${isLatest ? 'latest-highlight' : ''}" 
                 style="${bgStyle} --theme-color: ${p.themeColor}; --theme-glow: ${p.themeGlow}; --accent-color: ${p.accentColor}; --mobile-order: ${mobileOrder};" 
                 onclick="handleSliceClick(event, '${p.id}')"
                 data-vol="${p.isComingSoon ? comingSoonVol : p.id}">
                
                ${comingSoonOverlay}
                
                <div class="slice-overlay"></div>
                <div class="slice-vertical-title serif">${shortTitle}</div>
                
                <div class="slice-content-wrapper">
                    <!-- 헤더 아카이브 볼륨 레이블 -->
                    <div class="editorial-volume font-serif">${metaText}</div>
                    
                    <!-- 디저트 타이틀 블록 -->
                    <div class="editorial-title-block">
                        ${titleHtml}
                        <div class="editorial-essence font-serif">"${p.creatorsNote}"</div>
                    </div>
                    
                    <!-- 물성 스펙 테이블 -->
                    <div class="editorial-spec-grid font-serif">
                        <div class="spec-row">
                            <span class="spec-label">TEXTURE</span>
                            <span class="spec-value">${specs.texture}</span>
                        </div>
                        <div class="spec-row">
                            <span class="spec-label">WELLNESS SPEC</span>
                            <span class="spec-value">${specs.wellness}</span>
                        </div>
                        <div class="spec-row">
                            <span class="spec-label">BAKING METHOD</span>
                            <span class="spec-value">${specs.method}</span>
                        </div>
                    </div>
                    
                    <!-- 인터랙티브 소환 버튼 -->
                    <div class="editorial-action-box">
                        ${p.isComingSoon
                            ? `<button class="action-btn font-serif" onclick="event.stopPropagation(); alert('🔒 Vol.${comingSoonVol} 레시피는 업데이트 예정입니다.\\n\\n프로젝트 두부의 새로운 컬렉션 소식을 기대해 주세요! 🖤');">${actionBtnText}</button>`
                            : `<button class="action-btn font-serif" onclick="event.stopPropagation(); openFocusStage(${p.id});">${actionBtnText}</button>`
                        }
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // 페이지 로드 시 가장 최신(ID가 가장 높은) 슬라이스를 기본 활성화(확장) 상태로 세팅
    setTimeout(() => {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            // 모바일: 렌더링된 카드의 이미지 비율을 감지하여 클래스 동적 주입 (가로/세로 최적 크롭)
            container.querySelectorAll('.accordion-slice').forEach(slice => {
                const bg = slice.style.backgroundImage;
                if (bg && bg.startsWith('url(')) {
                    let url = bg.slice(4, -1);
                    if (url.startsWith('"') || url.startsWith("'")) {
                        url = url.slice(1, -1);
                    }
                    const img = new Image();
                    img.onload = function() {
                        if (this.naturalWidth > this.naturalHeight) {
                            slice.classList.add('bg-horizontal');
                        } else {
                            slice.classList.add('bg-vertical');
                        }
                    };
                    img.src = url;
                }
            });
            return;
        }

        const validRecipes = activeRecipes.filter(r => typeof r.id === 'number');
        let targetSlice = null;

        if (validRecipes.length > 0) {
            const maxRecipe = validRecipes.reduce((max, curr) => curr.id > max.id ? curr : max, validRecipes[0]);
            targetSlice = container.querySelector(`[data-vol="${maxRecipe.id}"]`);
        } else {
            targetSlice = container.querySelector('.accordion-slice');
        }

        if (targetSlice) {
            targetSlice.style.flex = '5.4';
            targetSlice.style.height = '';
            targetSlice.classList.add('active-expanded');
        }
    }, 150);
}

function handleSliceClick(event, projectId) {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        // 모바일 카드 리스트에서는 카드를 누르는 즉시 상세 모달이 열립니다.
        if (projectId === 'coming-soon') {
            const slice = event.currentTarget;
            const vol = slice.getAttribute('data-vol') || '39';
            alert(`🔒 Vol.${vol} 레시피는 업데이트 예정입니다.\n\n프로젝트 두부의 새로운 컬렉션 소식을 기대해 주세요! 🖤`);
            return;
        }
        openFocusStage(projectId);
        return;
    }

    const slice = event.currentTarget;
    const isButton = event.target.closest('.editorial-action-box') || event.target.closest('.action-btn');
    const isHovered = slice.classList.contains('active-expanded');

    if (isButton || isHovered) {
        if (projectId === 'coming-soon') {
            const vol = slice.getAttribute('data-vol') || '39';
            alert(`🔒 Vol.${vol} 레시피는 업데이트 예정입니다.\n\n프로젝트 두부의 새로운 컬렉션 소식을 기대해 주세요! 🖤`);
            return;
        }
        openFocusStage(projectId);
    } else {
        document.querySelectorAll('.accordion-slice').forEach(s => {
            if (s !== slice) {
                s.style.flex = '1';
                s.style.height = '';
                s.classList.remove('active-expanded');
            }
        });
        slice.style.flex = '5.4';
        slice.style.height = '';
        slice.classList.add('active-expanded');
    }
}

// ==========================================================================
// 15. 시즌 이벤트 테마 모달 (2단계)
// ==========================================================================
// 시즌 모달 슬라이더 인덱스 제어 전역 변수
let themeModalCurrentSlide = 0;

function slideTheme(dir, maxIndex) {
    const slider = document.querySelector('.theme-modal-cards-slider');
    if (!slider) return;
    
    themeModalCurrentSlide += dir;
    if (themeModalCurrentSlide < 0) themeModalCurrentSlide = 0;
    if (themeModalCurrentSlide > maxIndex) themeModalCurrentSlide = maxIndex;

    const cardWidth = 260;
    const gap = 25;
    const translateVal = -themeModalCurrentSlide * (cardWidth + gap);
    slider.style.transform = `translateX(${translateVal}px)`;

    const prevBtn = document.querySelector('.theme-slider-btn.prev');
    const nextBtn = document.querySelector('.theme-slider-btn.next');
    if (prevBtn) {
        prevBtn.style.opacity = themeModalCurrentSlide === 0 ? '0.2' : '1';
        prevBtn.style.pointerEvents = themeModalCurrentSlide === 0 ? 'none' : 'auto';
    }
    if (nextBtn) {
        nextBtn.style.opacity = themeModalCurrentSlide === maxIndex ? '0.2' : '1';
        nextBtn.style.pointerEvents = themeModalCurrentSlide === maxIndex ? 'none' : 'auto';
    }
}

function openTheme(themeId) {
    if (typeof THEMES === 'undefined') return;
    const theme = THEMES.find(t => t.id === themeId);
    if (!theme) return;

    themeModalCurrentSlide = 0; // 슬라이드 위치 초기화

    const old = document.getElementById('theme-modal-overlay');
    if (old) old.remove();

    const palettes = {
        romantic:    { bg: '#FFF0F2', text: '#4a0e1c', subtext: '#9a4d5f', accent: '#c2315a', cardBg: 'rgba(255,255,255,0.85)' },
        traditional: { bg: '#F5EBE0', text: '#3b2208', subtext: '#7a5a3a', accent: '#a0713b', cardBg: 'rgba(255,255,255,0.85)' },
        halloween:   { bg: '#121212', text: '#ffd700', subtext: '#e0a020', accent: '#ff7b00', cardBg: 'rgba(30,20,0,0.75)'   },
        christmas:   { bg: '#0F172A', text: '#e5d8b0', subtext: '#8fa8c0', accent: '#e5a93b', cardBg: 'rgba(15,25,50,0.75)' }
    };
    const pal = palettes[themeId] || palettes.romantic;

    const overlay = document.createElement('div');
    overlay.id = 'theme-modal-overlay';
    overlay.className = 'theme-modal-overlay';
    overlay.style.cssText = `background: ${pal.bg}; color: ${pal.text}; --theme-accent: ${pal.accent};`;
    overlay.onclick = (e) => { if (e.target === overlay) closeThemeModal(); };

    const recipesCount = (theme.recipes || []).length;
    const maxIndex = recipesCount > 4 ? recipesCount - 4 : 0;
    const showButtons = recipesCount > 4;

    const recipesHtml = (theme.recipes || []).map(recipe => {
        const imgSrc = recipe.img ? getBasePath() + encodeURI(recipe.img) : '';
        const displayTitle = recipe.title.replace('순두부 ', '');
        return `
            <div class="theme-recipe-card" onclick="openFocusStage(${recipe.id});">
                <div class="theme-recipe-card-img-wrapper">
                    <img src="${imgSrc}" alt="${recipe.title}" loading="lazy" onerror="this.onerror=null; this.parentNode.style.background='#f0f0f0'">
                    <div class="theme-recipe-card-vol" style="color:${pal.text};">${recipe.vol}</div>
                </div>
                <div class="theme-recipe-card-info" style="background:${pal.cardBg};">
                    <p class="theme-recipe-card-title" style="color:${pal.text};">${displayTitle}</p>
                    <span class="theme-recipe-card-icon" style="color:${pal.accent};"><i class="fa-solid fa-chevron-right"></i></span>
                </div>
            </div>`;
    }).join('');

    const dotsHtml = (theme.recipes || []).map((_, idx) => {
        return `<span class="theme-mobile-dot ${idx === 0 ? 'active' : ''}" onclick="jumpToThemeMobile(${idx})"></span>`;
    }).join('');

overlay.innerHTML = `
        <button class="theme-modal-close-btn" onclick="closeThemeModal()" style="color:${pal.subtext};">&times;</button>
        <div class="theme-modal-header">
            <div class="theme-modal-tag" style="color:${pal.subtext};">${theme.icon} ${theme.tag}</div>
            <h2 class="theme-modal-title serif" style="color:${pal.text};">${theme.title}</h2>
            <p class="theme-modal-desc" style="color:${pal.subtext};">${theme.desc}</p>
        </div>
        
        <div class="theme-modal-carousel-wrapper">
            <!-- 모바일 전용 좌측 화살표 -->
            <button id="theme-mobile-prev" class="theme-mobile-arrow-btn prev" onclick="scrollThemeMobile('prev')" style="opacity: 0; pointer-events: none;">
                <span>&lt;</span>
            </button>

            ${showButtons ? `
            <button class="theme-slider-btn prev" onclick="slideTheme(-1, ${maxIndex})" style="color: ${pal.text}; opacity: 0.2; pointer-events: none;">
                <i class="fa-solid fa-circle-chevron-left"></i>
            </button>
            ` : ''}
            
            <div class="theme-modal-cards-viewport">
                <div class="theme-modal-cards-slider">
                    ${recipesHtml}
                </div>
            </div>
            
            <!-- 모바일 전용 우측 화살표 -->
            <button id="theme-mobile-next" class="theme-mobile-arrow-btn next" onclick="scrollThemeMobile('next')" style="${recipesCount <= 1 ? 'opacity: 0; pointer-events: none;' : ''}">
                <span>&gt;</span>
            </button>

            ${showButtons ? `
            <button class="theme-slider-btn next" onclick="slideTheme(1, ${maxIndex})" style="color: ${pal.text};">
                <i class="fa-solid fa-circle-chevron-right"></i>
            </button>
            ` : ''}
        </div>

        <!-- 모바일 전용 도트 인디케이터 -->
        <div id="theme-mobile-dots" class="theme-mobile-dots">
            ${dotsHtml}
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    setTimeout(() => overlay.classList.add('active'), 30);

    const viewport = overlay.querySelector('.theme-modal-cards-viewport');
    if (viewport) {
        viewport.addEventListener('scroll', onThemeMobileScroll);
        
        // URL 쿼리 파라미터에서 slide_index를 읽어서 초기 스크롤 위치 강제 세팅 (디버그 캡처 지원용)
        const urlParams = new URLSearchParams(window.location.search);
        const targetSlide = parseInt(urlParams.get('slide_index') || '0', 10);
        
        setTimeout(() => {
            if (targetSlide > 0) {
                const card = viewport.querySelector('.theme-recipe-card');
                const cardWidth = card ? card.offsetWidth : 390;
                viewport.scrollLeft = targetSlide * cardWidth;
            }
            onThemeMobileScroll();
        }, 150);
    }
}

function closeThemeModal() {
    const overlay = document.getElementById('theme-modal-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 400);
    }
    
    document.body.style.overflow = '';
    
    // 모바일(768px 이하)일 때, 시즌 이벤트 목록(#events)으로 자연스럽게 스크롤 이동
    if (window.innerWidth <= 768) {
        const eventsSection = document.getElementById('events');
        if (eventsSection) {
            eventsSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
}

function onThemeMobileScroll() {
    const viewport = document.querySelector('.theme-modal-cards-viewport');
    if (!viewport) return;
    const cards = viewport.querySelectorAll('.theme-recipe-card');
    if (cards.length === 0) return;
    
    const cardWidth = cards[0].offsetWidth || 300; /* offsetWidth가 0일 때의 레이아웃 fallback 추가 */
    const gap = 0; /* 모바일 카드간 gap이 0이므로 0으로 변경 */
    const step = cardWidth + gap;
    
    const scrollLeft = viewport.scrollLeft;
    const index = Math.round(scrollLeft / step);
    
    updateThemeMobileDots(index);
    
    const prevBtn = document.getElementById('theme-mobile-prev');
    const nextBtn = document.getElementById('theme-mobile-next');
    
    if (prevBtn) {
        if (index === 0) {
            prevBtn.style.opacity = '0';
            prevBtn.style.pointerEvents = 'none';
        } else {
            prevBtn.style.opacity = '1';
            prevBtn.style.pointerEvents = 'auto';
        }
    }
    
    if (nextBtn) {
        if (index === cards.length - 1) {
            nextBtn.style.opacity = '0';
            nextBtn.style.pointerEvents = 'none';
        } else {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
        }
    }
}

function scrollThemeMobile(direction) {
    const viewport = document.querySelector('.theme-modal-cards-viewport');
    if (!viewport) return;
    const cards = viewport.querySelectorAll('.theme-recipe-card');
    if (cards.length === 0) return;
    
    const cardWidth = cards[0].offsetWidth;
    const gap = 0; /* gap이 0이므로 0으로 변경 */
    const step = cardWidth + gap;
    
    const currentScroll = viewport.scrollLeft;
    let targetIndex = Math.round(currentScroll / step);
    
    if (direction === 'prev') {
        targetIndex = Math.max(0, targetIndex - 1);
    } else {
        targetIndex = Math.min(cards.length - 1, targetIndex + 1);
    }
    
    viewport.scrollTo({
        left: targetIndex * step,
        behavior: 'smooth'
    });
}

function jumpToThemeMobile(index) {
    const viewport = document.querySelector('.theme-modal-cards-viewport');
    if (!viewport) return;
    const cards = viewport.querySelectorAll('.theme-recipe-card');
    if (cards.length === 0) return;
    
    const cardWidth = cards[0].offsetWidth;
    const gap = 0; /* gap이 0이므로 0으로 변경 */
    const step = cardWidth + gap;
    
    viewport.scrollTo({
        left: index * step,
        behavior: 'smooth'
    });
}

function updateThemeMobileDots(activeIndex) {
    const dots = document.querySelectorAll('.theme-mobile-dot');
    dots.forEach((dot, idx) => {
        if (idx === activeIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// ==========================================================================
// 16. 3D 마법책 책장 렌더링 엔진 (3단계)
// ==========================================================================
// 전역 3D 책장 제어 상태 객체
let bookshelfState = {
    currentPage: 1, // 오래된순 1페이지를 디폴트로 먼저 표시
    isEngineInitialized: false
};

// 휠 스크롤 쿨타임 상태
let bookshelfWheelCooldown = false;

function handleBookshelfWheel(e) {
    const frame = document.getElementById('bookshelf-frame');
    if (!frame) return;

    // 책장 영역 내부에서 휠을 굴렸을 때만 기본 세로 스크롤을 막고 페이지 전환을 실행
    e.preventDefault();

    if (bookshelfWheelCooldown) return;

    if (e.deltaY > 0) {
        scrollBookshelf('right');
    } else if (e.deltaY < 0) {
        scrollBookshelf('left');
    }

    bookshelfWheelCooldown = true;
    setTimeout(() => {
        bookshelfWheelCooldown = false;
    }, 600); // 600ms 쿨타임 (CSS 애니메이션 0.6s와 동기화)
}

function bindBookshelfWheelEvent() {
    const frame = document.getElementById('bookshelf-frame');
    if (!frame) return;

    // passive: false로 지정해야 e.preventDefault()가 작동하여 브라우저 스크롤을 차단함
    frame.removeEventListener('wheel', handleBookshelfWheel); // 중복 등록 방지
    frame.addEventListener('wheel', handleBookshelfWheel, { passive: false });
}

function goToBookshelfPage(page) {
    const sorted = [...PROJECTS].sort((a, b) => a.id - b.id);
    const totalPages = Math.ceil(sorted.length / 16);
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    if (bookshelfState.currentPage !== page) {
        bookshelfState.currentPage = page;
        renderBookshelf();
    }
}

function scrollBookshelf(direction) {
    const sorted = [...PROJECTS].sort((a, b) => a.id - b.id);
    const totalPages = Math.ceil(sorted.length / 16);
    
    let dir = 0;
    if (direction === 'left') {
        dir = -1;
    } else if (direction === 'right') {
        dir = 1;
    }
    
    let newPage = bookshelfState.currentPage + dir;
    if (newPage < 1) newPage = 1;
    if (newPage > totalPages) newPage = totalPages;
    
    if (bookshelfState.currentPage !== newPage) {
        bookshelfState.currentPage = newPage;
        renderBookshelf();
    }
}

function recalculateBookshelfBounds() {
    const row0 = document.getElementById('shelf-books-0');
    const row1 = document.getElementById('shelf-books-1');
    if (row0) {
        row0.classList.add('under-flow');
        row0.style.transform = 'none';
    }
    if (row1) {
        row1.classList.add('under-flow');
        row1.style.transform = 'none';
    }
}

function initBookshelfEngine() {
    bookshelfState.isEngineInitialized = true;
}

function getBookSpineColors(recipe) {
    const theme = getRecipeTheme(recipe);
    return {
        spine1: theme.spineColor1,
        spine2: theme.spineColor2,
        textColor: theme.spineTextColor,
        accentColor: theme.accentColor
    };
}

function renderBookshelf() {
    const section = document.getElementById('archive');
    if (!section) return;

    // 1. 오래된 순 정렬 (1 -> 38)
    const sorted = [...PROJECTS].filter(p => p.id !== 39).sort((a, b) => a.id - b.id);
    const isMobile = window.innerWidth <= 768;

    function buildMagazineCardHtml(p, index) {
        const shortTitle = p.title.replace('순두부 ','').replace('순두부','');
        return `
            <div class="magazine-card" onclick="openFocusStage(${p.id})">
                <div class="magazine-card-img" style="background-image: url('${getBasePath() + encodeURI(p.img)}');"></div>
                <div class="magazine-card-overlay">
                    <div class="magazine-gold-frame">
                        <div class="corner-deco top-left"></div>
                        <div class="corner-deco top-right"></div>
                        <div class="corner-deco bottom-left"></div>
                        <div class="corner-deco bottom-right"></div>
                    </div>
                    <div class="magazine-content">
                        <div class="magazine-vol">RECIPE FILE // VOL.${p.id}</div>
                        <h3 class="serif magazine-title">${shortTitle}</h3>
                    </div>
                </div>
            </div>`;
    }

    function buildBookHtml(p) {
        const colors = getBookSpineColors(p);
        const shortTitle = p.title.replace('순두부 ','').replace('순두부','');
        return `
            <div class="magic-book" onclick="openFocusStage(${p.id})" title="VOL.${p.id} ${p.title}"
                 style="--spine1:${colors.spine1};--spine2:${colors.spine2};--book-text:${colors.textColor};--book-accent:${colors.accentColor};">
                <div class="book-spine">
                    <div class="book-vol">VOL.${p.id}</div>
                    <div class="book-title-spine">${shortTitle}</div>
                    <div class="book-deco">✦</div>
                </div>
                <div class="book-cover">
                    <div class="book-cover-inner">
                        <div class="book-cover-vol">Vol.${p.id}</div>
                        <div class="book-cover-title">${shortTitle}</div>
                    </div>
                </div>
            </div>`;
    }

    window.slideMagazine = function(direction) {
        const track = document.getElementById('magazine-track');
        if (!track) return;
        const card = track.firstElementChild;
        if (!card) return;
        const cardWidth = card.offsetWidth;
        const trackStyle = window.getComputedStyle(track);
        const gap = parseFloat(trackStyle.columnGap) || parseFloat(trackStyle.gap) || 0;
        const step = cardWidth + gap;
        
        if (direction === 'left') {
            track.scrollBy({ left: -step, behavior: 'smooth' });
        } else {
            track.scrollBy({ left: step, behavior: 'smooth' });
        }
    };

    if (isMobile) {
        // 모바일: 38권 전체를 매거진 스프레드 카드로 렌더링 (순서: Vol.1 -> Vol.38)
        const cardsHtml = sorted.map((p, idx) => buildMagazineCardHtml(p, idx)).join('');
        
        section.innerHTML = `
            <div class="bookshelf-wrapper magazine-mode">
                <!-- 헤더 -->
                <div class="bookshelf-header">
                    <h2 class="serif bookshelf-title">실패없는 베이킹노트</h2>
                </div>

                <!-- 매거진 무대 -->
                <div class="bookshelf-scene">
                    <div class="magazine-container">
                        <!-- 터치 보조용 왼쪽 화살표 -->
                        <button class="magazine-nav-btn magazine-nav-left" onclick="slideMagazine('left')">
                            <i class="fa-solid fa-chevron-left"></i>
                        </button>

                        <!-- 가로 스냅 트랙 -->
                        <div class="magazine-track" id="magazine-track">
                            ${cardsHtml}
                        </div>

                        <!-- 터치 보조용 오른쪽 화살표 -->
                        <button class="magazine-nav-btn magazine-nav-right" onclick="slideMagazine('right')">
                            <i class="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                </div>

                <!-- 페이지 카운터 -->
                <div class="magazine-counter" id="magazine-counter">
                    Vol.${sorted[0] ? sorted[0].id : 1} / 38
                </div>

                <!-- 푸터 -->
                <footer style="margin-top:40px; text-align:center; opacity:0.4;">
                    <p class="copy">&copy; 2025 PROJECT DUBU - All Rights Reserved.</p>
                </footer>
            </div>
        `;

        // 가로 슬라이드 스크롤 리스너 바인딩 (Vol.X / 38 실시간 업데이트)
        setTimeout(() => {
            const track = document.getElementById('magazine-track');
            const counter = document.getElementById('magazine-counter');
            if (track && counter) {
                track.addEventListener('scroll', () => {
                    const card = track.firstElementChild;
                    if (!card) return;
                    const cardWidth = card.offsetWidth;
                    const trackStyle = window.getComputedStyle(track);
                    const gap = parseFloat(trackStyle.columnGap) || parseFloat(trackStyle.gap) || 0;
                    const index = Math.round(track.scrollLeft / (cardWidth + gap));
                    
                    const safeIndex = Math.max(0, Math.min(sorted.length - 1, index));
                    const activeProject = sorted[safeIndex];
                    if (activeProject) {
                        counter.innerText = `Vol.${activeProject.id} / 38`;
                    }
                });
            }
        }, 100);

        setTimeout(() => {
            recalculateBookshelfBounds();
        }, 50);

    } else {
        // 데스크탑: 기존 페이지 네비게이션 방식 16권씩 렌더링 유지
        const totalPages = Math.ceil(sorted.length / 16);

        // 2. 현재 페이지 보정
        if (bookshelfState.currentPage < 1) bookshelfState.currentPage = 1;
        if (bookshelfState.currentPage > totalPages) bookshelfState.currentPage = totalPages;

        // 3. 현재 페이지의 16권(2단 * 8권) 슬라이싱
        const startIndex = (bookshelfState.currentPage - 1) * 16;
        const pageBooks = sorted.slice(startIndex, startIndex + 16);

        const row0Books = pageBooks.slice(0, 8); // 상단 선반 (최대 8권)
        const row1Books = pageBooks.slice(8, 16); // 하단 선반 (최대 8권)

        const row0Html = row0Books.map(buildBookHtml).join('');
        const row1Html = row1Books.map(buildBookHtml).join('');

        // 화살표 활성/비활성 플래그
        const isFirstPage = bookshelfState.currentPage === 1;
        const isLastPage = bookshelfState.currentPage === totalPages;

        section.innerHTML = `
            <div class="bookshelf-wrapper">
                <!-- 헤더 -->
                <div class="bookshelf-header">
                    <div class="bookshelf-tag">RECIPE ARCHIVE</div>
                    <h2 class="serif bookshelf-title">실패없는 베이킹노트</h2>
                    <p class="bookshelf-hint">🚪 앤티크 양옆 화살표를 눌러 서가 페이지를 넘겨보세요</p>
                </div>

                <!-- 책장 무대 -->
                <div class="bookshelf-scene">
                    <!-- 왼쪽 화살표 (1페이지면 비활성) -->
                    <button class="shelf-nav-btn shelf-nav-left left-arrow ${isFirstPage ? 'disabled' : ''}" 
                            onclick="scrollBookshelf('left')" 
                            style="${isFirstPage ? 'opacity: 0.2; pointer-events: none;' : ''}">
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>

                    <!-- 책장 프레임 -->
                    <div class="bookshelf-frame" id="bookshelf-frame">
                        <!-- 중앙 페이지 토스트 -->
                        <div id="bookshelf-toast" class="bookshelf-toast">PAGE ${bookshelfState.currentPage} / ${totalPages}</div>

                        <!-- 별빛 -->
                        <div class="shelf-stars">
                            <div class="star" style="top:8%;left:12%;width:2px;height:2px;animation-delay:0s;"></div>
                            <div class="star" style="top:18%;left:55%;width:1.5px;height:1.5px;animation-delay:0.8s;"></div>
                            <div class="star" style="top:55%;left:82%;width:2px;height:2px;animation-delay:0.4s;"></div>
                            <div class="star" style="top:75%;left:28%;width:1.5px;height:1.5px;animation-delay:1.2s;"></div>
                            <div class="star" style="top:40%;left:68%;width:1px;height:1px;animation-delay:0.6s;"></div>
                        </div>

                        <!-- 선반 2개 -->
                        <div class="shelf-row" id="shelf-row-1">
                            <div class="shelf-books" id="shelf-books-0">${row0Html}</div>
                            <div class="shelf-plank"></div>
                        </div>
                        <div class="shelf-row" id="shelf-row-2">
                            <div class="shelf-books" id="shelf-books-1">${row1Html}</div>
                            <div class="shelf-plank"></div>
                        </div>

                        <!-- 책장 바닥 -->
                        <div class="shelf-floor"></div>
                    </div>

                    <!-- 오른쪽 화살표 (마지막 페이지면 비활성) -->
                    <button class="shelf-nav-btn shelf-nav-right right-arrow ${isLastPage ? 'disabled' : ''}" 
                            onclick="scrollBookshelf('right')" 
                            style="${isLastPage ? 'opacity: 0.2; pointer-events: none;' : ''}">
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                </div>

                <!-- 페이지 인디케이터 -->
                <div class="shelf-page-info serif">- PAGE ${bookshelfState.currentPage} / ${totalPages} -</div>
                <div class="shelf-dots-container">
                    ${Array.from({ length: totalPages }, (_, i) => {
                        const pageNum = i + 1;
                        const isActive = pageNum === bookshelfState.currentPage;
                        return `<span class="shelf-dot ${isActive ? 'active' : ''}" onclick="goToBookshelfPage(${pageNum})"></span>`;
                    }).join('')}
                </div>

                <!-- 푸터 -->
                <footer style="margin-top:25px; text-align:center; opacity:0.4;">
                    <p class="copy">&copy; 2025 PROJECT DUBU - All Rights Reserved.</p>
                </footer>
            </div>
        `;

        // 강제 정렬 동기화 및 휠 리스너 바인딩, 페이지 전환 토스트 트리거
        setTimeout(() => {
            recalculateBookshelfBounds();
            bindBookshelfWheelEvent();

            const toast = document.getElementById('bookshelf-toast');
            if (toast) {
                toast.classList.remove('show');
                void toast.offsetWidth; // reflow 트리거하여 CSS 애니메이션 초기화
                toast.classList.add('show');
            }
        }, 50);
    }
}

// ==========================================================================
// 룩북 데이터베이스 및 카테고리 테마 정의
// ==========================================================================
const CATEGORY_THEMES = {
    creamy:    { color: '#00ffcc', rgb: '0, 255, 204' },
    fudgy:     { color: '#ffaa00', rgb: '255, 170, 0' },
    cloud:     { color: '#bd00ff', rgb: '189, 0, 255' },
    teatime:   { color: '#00a2ff', rgb: '0, 162, 255' },
    nostalgia: { color: '#ff0066', rgb: '255, 0, 102' },
    soymilk:   { color: '#a2ff00', rgb: '162, 255, 0' },
    gift:      { color: '#ff5e00', rgb: '255, 94, 0' }
};

const LOOKBOOK_DB = {
    1: {
        title: "순두부 크림치즈",
        subtitle: "RECIPE ARCHIVE // Vol.01",
        images: [
            "1. 순두부크림치즈_완/5-1.jpg",
            "1. 순두부크림치즈_완/3.jpg",
            "1. 순두부크림치즈_완/5-3.jpg",
            "1. 순두부크림치즈_완/5-2.jpg"
        ],
        stickiness: 40,
        emulsification: 95,
        density: 80,
        desc: "순두부·크림치즈 고온 유화. 독보적인 <span class='lookbook-highlight'>실크 스프레드 텍스처</span> 완성.",
        processHeader: "[PROCESS MONITORING]",
        loaderLabel: "HEATING IN PROGRESS...",
        loaderTemp: "TEMP: 80°C",
        loaderPercent: 95,
        processText: "약불 3분 가열로 <span class='lookbook-highlight'>전분 완벽 호화</span>. 1시간 냉장 숙성으로 <span class='lookbook-highlight'>꾸덕함 극대화</span>.",
        label1: "재료 혼합",
        label2: "약불 데우기",
        completeTitle: "순두부 크림치즈 완성",
        drinks: ["따뜻한 베이글", "바삭한 크래커", "홍차", "아메리카노"]
    },
    2: {
        title: "순두부 크림치즈 티라미수",
        subtitle: "RECIPE ARCHIVE // Vol.02",
        images: [
            "2. 순두부크림치즈티라미수_완/5-3.jpg",
            "2. 순두부크림치즈티라미수_완/5-4.jpg",
            "2. 순두부크림치즈티라미수_완/3.jpg",
            "2. 순두부크림치즈티라미수_완/4-1.jpg",
            "2. 순두부크림치즈티라미수_완/6-2.jpg"
        ],
        stickiness: 50,
        emulsification: 92,
        density: 85,
        desc: "<span class='lookbook-highlight'>순두부 마스카포네 크림</span>과 촉촉한 에스프레소 시트가 조화되어, 깊은 <span class='lookbook-highlight'>레이어드 텍스처</span>를 완성합니다.",
        processHeader: "[PROCESS MONITORING]",
        loaderLabel: "CHILLING IN PROGRESS...",
        loaderTemp: "TEMP: 4℃",
        loaderPercent: 92,
        processText: "에스프레소 시트 위에 <span class='lookbook-highlight'>순두부 마스카포네 크림</span>을 교차로 쌓아 올린 후, <span class='lookbook-highlight'>차갑게 냉장 굳힘</span>하여 맛을 완성합니다.",
        label1: "크림 배합",
        label2: "레이어 적층",
        completeTitle: "순두부 크림치즈 티라미수 완성",
        drinks: ["콜드브루 커피", "진한 아메리카노", "에스프레소", "루이보스티"]
    },
    3: {
        title: "순두부 바스크 치즈케이크",
        subtitle: "RECIPE ARCHIVE // Vol.03",
        images: [
            "3. 순두부바스크치즈케이크_완/KakaoTalk_20250618_084702444.jpg",
            "3. 순두부바스크치즈케이크_완/KakaoTalk_20250618_084702444_02.jpg",
            "3. 순두부바스크치즈케이크_완/KakaoTalk_20250618_084702444_03.jpg",
            "3. 순두부바스크치즈케이크_완/KakaoTalk_20250618_084702444_04.jpg"
        ],
        stickiness: 75,
        emulsification: 90,
        density: 92,
        desc: "<span class='lookbook-highlight'>순두부 크림 반죽</span>이 고온에서 빠르게 구워져, 바스크 특유의 스모키함과 <span class='lookbook-highlight'>크리미한 단면</span>을 완성합니다.",
        processHeader: "[PROCESS MONITORING]",
        loaderLabel: "HIGH-TEMP BAKING...",
        loaderTemp: "TEMP: 220℃",
        loaderPercent: 90,
        processText: "<span class='lookbook-highlight'>220℃ 고온 오븐</span>에서 표면을 태우듯 굽고, <span class='lookbook-highlight'>한 김 식힌 뒤 냉장 숙성</span>하여 치즈케이크의 밀착된 식감을 살립니다.",
        label1: "고온 베이킹",
        label2: "오븐 냉각",
        completeTitle: "순두부 바스크 치즈케이크 완성",
        drinks: ["아메리카노", "드라이 와인", "루이보스티", "카페라떼"]
    },
    4: {
        title: "순두부 퍼지 브라우니",
        subtitle: "RECIPE ARCHIVE // Vol.04",
        images: [
            "4. 순두부퍼지브라우니_완/KakaoTalk_20250619_145808456.jpg",
            "4. 순두부퍼지브라우니_완/KakaoTalk_20250619_145808456_03.jpg",
            "4. 순두부퍼지브라우니_완/KakaoTalk_20250619_145808456_01.jpg",
            "4. 순두부퍼지브라우니_완/KakaoTalk_20250619_145808456_02.jpg",
            "4. 순두부퍼지브라우니_완/KakaoTalk_20250619_190927296_01.jpg"
        ],
        stickiness: 90,
        emulsification: 88,
        density: 96,
        desc: "<span class='lookbook-highlight'>순두부 반죽</span>과 다크 초콜릿이 묵직하게 결합되어, 입안에 진하게 밀착되는 <span class='lookbook-highlight'>꾸덕한 퍼지 질감</span>을 구현합니다.",
        processHeader: "[PROCESS MONITORING]",
        loaderLabel: "MELTING & BAKING...",
        loaderTemp: "TEMP: 165℃",
        loaderPercent: 88,
        processText: "중탕으로 녹인 다크 초콜릿에 <span class='lookbook-highlight'>물기를 뺀 순두부</span>를 혼합해 <span class='lookbook-highlight'>오븐에서 촉촉하게</span> 구워내어 꾸덕함을 완성합니다.",
        label1: "초콜릿 멜팅",
        label2: "정밀 블렌딩",
        completeTitle: "순두부 퍼지 브라우니 완성",
        drinks: ["따뜻한 아메리카노", "흰 우유", "카페라떼", "허브티"]
    },
    5: {
        title: "순두부 황치즈 휘낭시에",
        subtitle: "RECIPE ARCHIVE // Vol.05",
        images: [
            "5. 순두부황치즈휘낭시에_완/KakaoTalk_20250623_175152559.jpg",
            "5. 순두부황치즈휘낭시에_완/KakaoTalk_20250623_175152559_02.jpg",
            "5. 순두부황치즈휘낭시에_완/KakaoTalk_20250623_175152559_06.jpg",
            "5. 순두부황치즈휘낭시에_완/KakaoTalk_20250623_175152559_07.jpg"
        ],
        stickiness: 60,
        emulsification: 94,
        density: 82,
        desc: "<span class='lookbook-highlight'>황치즈가루</span>와 순두부 베이스가 빈틈없이 어우러져, 겉은 바삭하고 속은 쫀득한 <span class='lookbook-highlight'>단짠 휘낭시에</span>를 완성합니다.",
        processHeader: "[PROCESS MONITORING]",
        loaderLabel: "FINANCIER BAKING...",
        loaderTemp: "TEMP: 180℃",
        loaderPercent: 94,
        processText: "휘낭시에 틀에 반죽을 <span class='lookbook-highlight'>적정량 팬닝</span>한 뒤, <span class='lookbook-highlight'>180℃ 오븐</span>에서 노릇하게 구워 황치즈의 고소한 향을 극대화합니다.",
        label1: "팬닝 과정",
        label2: "오븐 베이킹",
        completeTitle: "순두부 황치즈 휘낭시에 완성",
        drinks: ["따뜻한 아메리카노", "보리차", "흰 우유", "아이스 라떼"]
    },
    39: {
        title: "순두부 흑임자 테린",
        subtitle: "RECIPE ARCHIVE // Vol.39",
        images: [
            "40. 순두부 흑임자테린/assets/01.png",
            "40. 순두부 흑임자테린/assets/07.png",
            "40. 순두부 흑임자테린/assets/baking_shot.png",
            "40. 순두부 흑임자테린/assets/lb_aging_new.png",
            "40. 순두부 흑임자테린/assets/08.png"
        ],
        stickiness: 95,
        emulsification: 90,
        density: 98,
        desc: "<span class='lookbook-highlight'>순두부</span>와 <span class='lookbook-highlight'>흑임자</span>가 정밀하게 유화되어, 독보적인 <span class='lookbook-highlight'>밀착 텍스처</span>를 완성합니다.",
        processHeader: "[PROCESS MONITORING]",
        loaderLabel: "BAKING IN PROGRESS...",
        loaderTemp: "TEMP: 25℃",
        loaderPercent: 100,
        processText: "<span class='lookbook-highlight'>140℃ 저온 스팀 중탕</span>으로 구워내 수분을 완전 봉인한 뒤, <span class='lookbook-highlight'>24시간 냉장 숙성</span>으로 흑임자의 <span class='lookbook-highlight'>극대화된 꾸덕함</span>을 완성합니다.",
        label1: "중탕 베이킹",
        label2: "하루의 숙성",
        completeTitle: "순두부 흑임자 테린의 완성",
        drinks: ["아메리카노", "따뜻한 녹차", "구수한 우롱차", "카페 라떼"]
    }
};

let lookbookCurrentPage = 1;
const lookbookTotalPages = 4;
let currentLookbookRecipeId = 39;

function openLookbook(recipeId) {
    recipeId = Number(recipeId);
    
    // 1그룹(1~5) 및 39번 이외의 레시피는 준비중 처리
    const allowedIds = [1, 2, 3, 4, 5, 39];
    if (!allowedIds.includes(recipeId)) {
        alert('Vol.' + recipeId + ' 레시피 룩북은 준비 중입니다. 1그룹(Vol.1~5)과 Vol.39(흑임자테린) 룩북을 감상해 보세요!');
        return;
    }

    const recipe = PROJECTS.find(p => p.id === recipeId);
    if (!recipe) return;

    currentLookbookRecipeId = recipeId;
    const dbData = LOOKBOOK_DB[recipeId];
    if (!dbData) return;

    // 기존 상세 모달 찾기 및 페이드아웃
    const focusOverlay = document.getElementById('focus-modal-overlay');
    if (focusOverlay) {
        focusOverlay.classList.remove('active');
        setTimeout(() => {
            focusOverlay.style.display = 'none';
        }, 400);
    }

    // 가상 경로 연산을 위한 물리적 base path
    let currentPath = window.location.pathname;
    const lookbookIdx = currentPath.indexOf('/lookbook/');
    if (lookbookIdx !== -1) {
        currentPath = currentPath.substring(0, lookbookIdx + 1);
    } else {
        currentPath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
    }
    const lookbookBasePath = window.location.protocol === 'file:' 
        ? currentPath
        : window.location.origin + currentPath;

    // 가상 라우팅 설정
    history.pushState({ page: 'lookbook', id: recipeId }, '', '/lookbook/' + recipeId);

    // 오버레이 동적 생성
    let lookbookOverlay = document.getElementById('lookbook-overlay');
    if (lookbookOverlay) lookbookOverlay.remove();

    lookbookOverlay = document.createElement('div');
    lookbookOverlay.id = 'lookbook-overlay';
    
    // 페어링 음료 HTML 빌드
    const drinksHtml = dbData.drinks.map(d => {
        let iconClass = "fa-solid fa-mug-hot";
        if (d.includes("차") || d.includes("티")) iconClass = "fa-solid fa-leaf";
        else if (d.includes("와인")) iconClass = "fa-solid fa-glass-wine";
        else if (d.includes("크래커") || d.includes("베이글")) iconClass = "fa-solid fa-bread-slice";
        else if (d.includes("우유")) iconClass = "fa-solid fa-glass-water";
        return `<span class="drink-tag"><i class="${iconClass}"></i> ${d}</span>`;
    }).join('');

    lookbookOverlay.innerHTML = `
        <div class="lookbook-container">
            <!-- 10개 단위 퀵 아카이브 내비게이터 -->
            <div class="lookbook-quick-nav"></div>

            <!-- 럭셔리 네온 테크 라인 프레임 -->
            <div class="lookbook-tech-frame"></div>

            <button class="lookbook-close-btn" onclick="closeLookbook()">&times;</button>
            
            <button class="lookbook-nav-btn lookbook-nav-left" onclick="changeLookbookPage(-1)"><i class="fa-solid fa-chevron-left"></i></button>
            <button class="lookbook-nav-btn lookbook-nav-right" onclick="changeLookbookPage(1)"><i class="fa-solid fa-chevron-right"></i></button>
            
            <div class="lookbook-slider">
                <!-- 1페이지: 완성샷 풀스크린 + 제목 오버레이 하단 이동 -->
                <div class="lookbook-slide active" data-page="1">
                    <div class="lookbook-bg-slide" style="background-image: url('${lookbookBasePath}${dbData.images[0]}'); filter: blur(12px) brightness(0.35);"></div>
                    
                    <div class="lookbook-3d-card-frame">
                        <div class="lookbook-3d-card-inner">
                            <div class="lookbook-card-bg" style="background-image: url('${lookbookBasePath}${dbData.images[0]}');"></div>
                            <div class="lookbook-card-fg" style="background-image: url('${lookbookBasePath}${dbData.images[0]}');"></div>
                            <div class="tech-corner top-left"></div>
                            <div class="tech-corner top-right"></div>
                            <div class="tech-corner bottom-left"></div>
                            <div class="tech-corner bottom-right"></div>
                        </div>
                    </div>

                    <div class="lookbook-tech-scan-panel">
                        <span class="lookbook-subtitle" style="font-family: 'Playfair Display', serif; font-size: 1.1rem; letter-spacing: 0.25em; color: #a0aec0; display: block; margin-bottom: 8px;">${dbData.subtitle}</span>
                        <h1 class="lookbook-tech-title" style="margin: 0; font-size: 2.2rem; color: #fff; text-shadow: 0 0 10px rgba(var(--lookbook-theme-color-rgb), 0.35);">${dbData.title}</h1>
                    </div>
                </div>
                
                <!-- 2페이지: 단면 또는 클로즈업 풀스크린 + TEXTURE 데이터 하단 최소화 -->
                <div class="lookbook-slide" data-page="2">
                    <div class="lookbook-bg-slide" style="background-image: url('${lookbookBasePath}${dbData.images[1]}'); filter: blur(12px) brightness(0.35);"></div>
                    
                    <div class="lookbook-3d-card-frame">
                        <div class="lookbook-3d-card-inner">
                            <div class="lookbook-card-bg" style="background-image: url('${lookbookBasePath}${dbData.images[1]}');"></div>
                            <div class="lookbook-card-fg" style="background-image: url('${lookbookBasePath}${dbData.images[1]}');"></div>
                            <div class="tech-corner top-left"></div>
                            <div class="tech-corner top-right"></div>
                            <div class="tech-corner bottom-left"></div>
                            <div class="tech-corner bottom-right"></div>
                        </div>
                    </div>
                    
                    <div class="lookbook-hud-bottom-panel">
                        <div class="hud-header">[TEXTURE ANALYSIS]</div>
                        <div class="hud-content-row">
                            <div class="hud-metric">
                                <span class="label">찰기 (STICKINESS)</span>
                                <div class="bar-bg"><div class="bar-fill" style="width: ${dbData.stickiness}%;"></div></div>
                                <span class="value">0%</span>
                            </div>
                            <div class="hud-metric">
                                <span class="label">유화도 (EMULSIFICATION)</span>
                                <div class="bar-bg"><div class="bar-fill" style="width: ${dbData.emulsification}%;"></div></div>
                                <span class="value">0%</span>
                            </div>
                            <div class="hud-metric">
                                <span class="label">밀도 (DENSITY)</span>
                                <div class="bar-bg"><div class="bar-fill" style="width: ${dbData.density}%;"></div></div>
                                <span class="value">0%</span>
                            </div>
                        </div>
                        <p class="hud-desc">${dbData.desc}</p>
                    </div>
                </div>
                
                <!-- 3페이지: 두 번째 완성샷 풀스크린 + PROCESS 데이터 하단 최소화 -->
                <div class="lookbook-slide" data-page="3">
                    <div class="lookbook-bg-slide" style="background-image: url('${lookbookBasePath}${dbData.images[2]}'); filter: blur(12px) brightness(0.35);"></div>
                    
                    <div class="lookbook-3d-card-frame">
                        <div class="lookbook-3d-card-inner">
                            <div class="lookbook-card-bg" style="background-image: url('${lookbookBasePath}${dbData.images[2]}');"></div>
                            <div class="lookbook-card-fg" style="background-image: url('${lookbookBasePath}${dbData.images[2]}');"></div>
                            <div class="tech-corner top-left"></div>
                            <div class="tech-corner top-right"></div>
                            <div class="tech-corner bottom-left"></div>
                            <div class="tech-corner bottom-right"></div>
                        </div>
                    </div>
                    
                    <div class="lookbook-hud-bottom-panel">
                        <div class="hud-header">${dbData.processHeader}</div>
                        <div class="hud-content-row">
                            <div class="hud-process-loader">
                                <span class="loader-label">${dbData.loaderLabel}</span>
                                <div class="loader-bar-bg"><div class="loader-bar-fill"></div></div>
                                <div class="loader-stats" style="display:flex; justify-content:space-between; margin-top:8px;">
                                    <span class="loader-temp-val">${dbData.loaderTemp.startsWith('TEMP:') ? 'TEMP: 25℃' : dbData.loaderTemp.replace(/[0-9]+/g, '0')}</span>
                                    <span class="loader-percentage">0%</span>
                                </div>
                            </div>
                        </div>
                        <p class="hud-desc">${dbData.processText}</p>
                    </div>
                </div>
                
                <!-- 4페이지: 플레이팅샷 풀스크린 + 페어링 문구 하단 오버레이 -->
                <div class="lookbook-slide" data-page="4">
                    <div class="lookbook-bg-slide" style="background-image: url('${lookbookBasePath}${dbData.images[3]}'); filter: blur(12px) brightness(0.35);"></div>
                    
                    <div class="lookbook-3d-card-frame">
                        <div class="lookbook-3d-card-inner">
                            <div class="lookbook-card-bg" style="background-image: url('${lookbookBasePath}${dbData.images[3]}');"></div>
                            <div class="lookbook-card-fg" style="background-image: url('${lookbookBasePath}${dbData.images[3]}');"></div>
                            <div class="tech-corner top-left"></div>
                            <div class="tech-corner top-right"></div>
                            <div class="tech-corner bottom-left"></div>
                            <div class="tech-corner bottom-right"></div>
                        </div>
                    </div>
                    
                    <div class="lookbook-hud-bottom-panel lookbook-complete-panel">
                        <div class="hud-header">[RECIPE COMPLETED]</div>
                        <div class="hud-content-row complete-row">
                            <h2 class="complete-title-hud">${dbData.completeTitle}</h2>
                            <div class="pairing-drinks-hud">
                                <span class="pairing-label">RECOMMENDED PAIRING:</span>
                                ${drinksHtml}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="lookbook-dots">
                <span class="lookbook-dot active" onclick="goLookbookPage(1)"></span>
                <span class="lookbook-dot" onclick="goLookbookPage(2)"></span>
                <span class="lookbook-dot" onclick="goLookbookPage(3)"></span>
                <span class="lookbook-dot" onclick="goLookbookPage(4)"></span>
            </div>
        </div>
    `;
    document.body.appendChild(lookbookOverlay);

    // 카테고리 고유 테마 색상 연동
    applyCategoryTheme(recipe);

    // 10개 단위 퀵 아카이브 내비게이터 렌더링
    renderQuickNavigator(recipeId);

    lookbookCurrentPage = 1;
    updateLookbookUI();

    // 페이드인 활성화
    setTimeout(() => {
        lookbookOverlay.classList.add('active');
    }, 50);

    // 이벤트 및 휠 바인딩
    initLookbookEvents();
}

function applyCategoryTheme(recipe) {
    const defaultTheme = { color: '#00ffcc', rgb: '0, 255, 204' };
    let theme = defaultTheme;
    if (recipe && recipe.categories && recipe.categories.length > 0) {
        for (const cat of recipe.categories) {
            if (CATEGORY_THEMES[cat]) {
                theme = CATEGORY_THEMES[cat];
                break;
            }
        }
    }
    const overlay = document.getElementById('lookbook-overlay');
    if (overlay) {
        overlay.style.setProperty('--lookbook-theme-color', theme.color);
        overlay.style.setProperty('--lookbook-theme-color-rgb', theme.rgb);
    }
}

function updateLookbookUI() {
    const slides = document.querySelectorAll('.lookbook-slide');
    const dots = document.querySelectorAll('.lookbook-dot');
    
    slides.forEach(slide => {
        const pNum = Number(slide.getAttribute('data-page'));
        slide.className = 'lookbook-slide';
        if (pNum === lookbookCurrentPage) {
            slide.classList.add('active');
        } else if (pNum < lookbookCurrentPage) {
            slide.classList.add('prev');
        } else {
            slide.classList.add('next');
        }
    });

    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx + 1 === lookbookCurrentPage);
    });

    // 화살표 활성/비활성 제어
    const leftBtn = document.querySelector('.lookbook-nav-left');
    const rightBtn = document.querySelector('.lookbook-nav-right');
    if (leftBtn) leftBtn.classList.toggle('disabled', lookbookCurrentPage === 1);
    if (rightBtn) rightBtn.classList.toggle('disabled', lookbookCurrentPage === lookbookTotalPages);

    // ─── 쿡방 HUD 테크니컬 실시간 카운트업 모션 제어 ───
    const dbData = LOOKBOOK_DB[currentLookbookRecipeId];
    if (!dbData) return;

    if (lookbookCurrentPage === 2) {
        const valElements = document.querySelectorAll('.hud-metric .value');
        const fillElements = document.querySelectorAll('.hud-metric .bar-fill');
        
        fillElements.forEach((bar, idx) => {
            const targetWidth = idx === 0 ? dbData.stickiness : (idx === 1 ? dbData.emulsification : dbData.density);
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = targetWidth + '%';
                bar.style.transition = 'width 1.2s cubic-bezier(0.25, 1, 0.5, 1)';
            }, 50);
        });

        if (valElements.length >= 3) {
            animateNumber(valElements[0], 0, dbData.stickiness, 1200, '%');
            animateNumber(valElements[1], 0, dbData.emulsification, 1200, '%');
            animateNumber(valElements[2], 0, dbData.density, 1200, '%');
        }
    } else if (lookbookCurrentPage === 3) {
        const percentageEl = document.querySelector('.hud-process-loader .loader-percentage');
        const tempEl = document.querySelector('.hud-process-loader .loader-temp-val');
        const barFillEl = document.querySelector('.hud-process-loader .loader-bar-fill');
        
        if (percentageEl) {
            animateNumber(percentageEl, 0, dbData.loaderPercent, 1500, '%');
        }
        if (barFillEl) {
            barFillEl.style.width = '0%';
            setTimeout(() => {
                barFillEl.style.width = dbData.loaderPercent + '%';
                barFillEl.style.transition = 'width 1.5s cubic-bezier(0.25, 1, 0.5, 1)';
            }, 50);
        }
        if (tempEl) {
            if (dbData.loaderTemp.startsWith('TEMP:')) {
                const targetTemp = parseInt(dbData.loaderTemp.replace(/[^0-9]/g, '')) || 0;
                animateNumber(tempEl, 25, targetTemp, 1500, '℃', 'TEMP: ');
            } else {
                tempEl.innerText = dbData.loaderTemp;
            }
        }
    }
}

function renderQuickNavigator(currentRecipeId, forcedGroupIdx = null) {
    currentRecipeId = Number(currentRecipeId);
    const quickNavEl = document.querySelector('.lookbook-quick-nav');
    if (!quickNavEl) return;

    // 10개 단위 그룹 정의
    const groups = [
        { label: "Vol.1-10", start: 1, end: 10 },
        { label: "Vol.11-20", start: 11, end: 20 },
        { label: "Vol.21-30", start: 21, end: 30 },
        { label: "Vol.31-39", start: 31, end: 39 }
    ];

    // 현재 레시피가 속한 그룹 또는 강제 지정된 그룹 찾기
    let activeGroupIdx = forcedGroupIdx !== null 
        ? forcedGroupIdx 
        : groups.findIndex(g => currentRecipeId >= g.start && currentRecipeId <= g.end);
    if (activeGroupIdx === -1) activeGroupIdx = 0; // 예외 방어

    // 셀렉트 박스 옵션 HTML 빌드
    const optionsHtml = groups.map((g, idx) => {
        return `<option value="${idx}" ${idx === activeGroupIdx ? 'selected' : ''}>${g.label}</option>`;
    }).join('');

    // 현재 활성화된 그룹의 레시피 목록 HTML 빌드
    const activeGroup = groups[activeGroupIdx];
    const itemsHtml = [];
    
    for (let id = activeGroup.start; id <= activeGroup.end; id++) {
        const recipe = PROJECTS.find(p => p.id === id);
        if (!recipe) continue;

        const isCurrent = id === currentRecipeId;
        const allowedIds = [1, 2, 3, 4, 5, 39];
        const isReady = allowedIds.includes(id);

        itemsHtml.push(`
            <button class="lookbook-quick-btn ${isCurrent ? 'active' : ''} ${!isReady ? 'disabled' : ''}"
                    onclick="onQuickRecipeClick(${id}, ${isReady})"
                    title="${recipe.title}">
                Vol.${id}
            </button>
        `);
    }

    quickNavEl.innerHTML = `
        <select class="lookbook-quick-group-select" onchange="onQuickGroupSelectChange(this, ${currentRecipeId})">
            ${optionsHtml}
        </select>
        <div class="lookbook-quick-recipe-list">
            ${itemsHtml.join('')}
        </div>
    `;
}

function onQuickGroupSelectChange(selectEl, currentRecipeId) {
    const groupIdx = Number(selectEl.value);
    renderQuickNavigator(currentRecipeId, groupIdx);
}

function onQuickRecipeClick(recipeId, isReady) {
    if (!isReady) {
        alert('Vol.' + recipeId + ' 레시피 룩북은 준비 중입니다. 1그룹(Vol.1~5)과 Vol.39(흑임자테린) 룩북을 감상해 보세요!');
        return;
    }
    openLookbook(recipeId);
}

// requestAnimationFrame 기반 부드러운 숫자 업 카운팅 모션 함수
function animateNumber(element, start, end, duration, suffix = '', prefix = '') {
    if (!element) return;
    let startTime = null;
    function update(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.innerText = prefix + current + suffix;
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.innerText = prefix + end + suffix;
        }
    }
    requestAnimationFrame(update);
}

function changeLookbookPage(dir) {
    const target = lookbookCurrentPage + dir;
    if (target >= 1 && target <= lookbookTotalPages) {
        lookbookCurrentPage = target;
        updateLookbookUI();
    }
}

function goLookbookPage(pageNum) {
    if (pageNum >= 1 && pageNum <= lookbookTotalPages) {
        lookbookCurrentPage = pageNum;
        updateLookbookUI();
    }
}

// ✕ 닫기 동작 중복 차단 플래그
let isClosingLookbook = false;

function closeLookbook(isFromPopstate = false) {
    const lookbookOverlay = document.getElementById('lookbook-overlay');
    if (!lookbookOverlay || isClosingLookbook) return;

    isClosingLookbook = true;
    lookbookOverlay.classList.remove('active');
    lookbookOverlay.classList.add('closing');
    
    // popstate가 아닐 때에만 브라우저 뒤로가기 실행 (가상 라우팅 원복)
    if (window.location.pathname.includes('/lookbook/')) {
        history.replaceState({ page: 'home' }, '', '/');
    } else if (!isFromPopstate) {
        history.back();
    }

    setTimeout(() => {
        lookbookOverlay.remove();
        isClosingLookbook = false;
        // 숨겨두었던 원래 상세화면 복귀
        const focusOverlay = document.getElementById('focus-modal-overlay');
        if (focusOverlay) {
            focusOverlay.style.display = 'flex';
            setTimeout(() => {
                focusOverlay.classList.add('active');
            }, 50);
        } else {
            // 새로고침이나 URL 직접 입력으로 상세 모달이 없는 경우, 동적으로 39번 상세 모달 렌더링
            openFocusStage(39);
        }
    }, 600);
}

// 휠 및 키보드 이벤트 바인딩
let lookbookWheelDebounce = false;

function initLookbookEvents() {
    // 휠 감지
    const overlay = document.getElementById('lookbook-overlay');
    if (!overlay) return;

    overlay.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (lookbookWheelDebounce) return;
        
        lookbookWheelDebounce = true;
        if (e.deltaY > 0) {
            changeLookbookPage(1);
        } else {
            changeLookbookPage(-1);
        }

        setTimeout(() => {
            lookbookWheelDebounce = false;
        }, 800); // 휠 리스너 디바운스
    }, { passive: false });

    // 키보드 감지
    const handleKeyDown = (e) => {
        if (!document.getElementById('lookbook-overlay')) {
            document.removeEventListener('keydown', handleKeyDown);
            return;
        }
        if (e.key === 'ArrowRight') {
            changeLookbookPage(1);
        } else if (e.key === 'ArrowLeft') {
            changeLookbookPage(-1);
        } else if (e.key === 'Escape') {
            closeLookbook();
        }
    };
    document.addEventListener('keydown', handleKeyDown);
}

// popstate 리스너 등록 (뒤로가기 시 룩북 및 화보북 닫기 연동)
window.addEventListener('popstate', (e) => {
    const lookbookOverlay = document.getElementById('lookbook-overlay');
    if (lookbookOverlay) {
        closeLookbook(true);
    }
    const artbookOverlay = document.getElementById('artbook-viewer-overlay');
    if (artbookOverlay) {
        closeArtbookViewer(true);
    }
});

// ==========================================================================
// 8. 디저트 화보북 단독 뷰어 시스템 (v16.0 - 방식 B 단독 화면)
// ==========================================================================
async function openArtbookViewer() {
    // 기존 화보 뷰어가 열려 있다면 제거
    let viewer = document.getElementById('artbook-viewer-overlay');
    if (viewer) viewer.remove();

    // 메인 페이지의 모든 본문 요소(header, section)를 숨겨서 완전한 단독 화면으로 만듭니다.
    document.querySelectorAll('header, section').forEach(el => {
        el.style.display = 'none';
    });

    viewer = document.createElement('div');
    viewer.id = 'artbook-viewer-overlay';
    document.body.appendChild(viewer);
    document.body.style.overflow = 'hidden';

    // 가상 라우팅 (디저트 화보집 전용 경로)
    history.pushState({ page: 'artbook' }, '', getBasePath() + 'artbook');

    // 페이드인 클래스 추가
    setTimeout(() => {
        viewer.classList.add('active');
    }, 50);

    // 로딩 인디케이터 렌더링
    viewer.innerHTML = `
        <div class="artbook-loading-container">
            <div class="artbook-spinner"></div>
            <p class="artbook-loading-text">화보집 아카이브 불러오는 중...</p>
        </div>
    `;

    try {
        // API fetch 호출 대신 정적 PHOTOBOOKS 데이터 참조로 교체 (GitHub Pages 전환)
        const activePhotobooks = Object.entries(PHOTOBOOKS).map(([recipeId, val]) => ({
            folder: val.folder,
            images: val.images
        }));

        // 화보집 그리드 메인 렌더링
        renderArtbookMainGrid(viewer, activePhotobooks);
    } catch (error) {
        console.error('화보집 스캔 에러:', error);
        viewer.innerHTML = `
            <div class="artbook-error-container">
                <p class="artbook-error-text">화보집 아카이브를 불러오지 못했습니다.</p>
                <div class="artbook-error-btns">
                    <button class="artbook-retry-btn" onclick="openArtbookViewer()">다시 시도</button>
                    <button class="artbook-close-btn-error" onclick="closeArtbookViewer(false, true)">&times; 닫기</button>
                </div>
            </div>
        `;
    }

    initArtbookEvents();
}

function renderArtbookMainGrid(viewer, activePhotobooks) {
    function cleanFolderName(name) {
        if (!name) return '';
        return name.replace('_완', '').trim();
    }

    // 화보 활성화 여부를 사전에 가중치로 주어 PROJECTS 정렬
    const sortedProjects = [...PROJECTS].sort((a, b) => {
        const folderPartA = a.path ? a.path.split('/')[0] : '';
        const cleanFolderA = cleanFolderName(folderPartA);
        const isActiveA = activePhotobooks.some(d => cleanFolderName(d.folder) === cleanFolderA);

        const folderPartB = b.path ? b.path.split('/')[0] : '';
        const cleanFolderB = cleanFolderName(folderPartB);
        const isActiveB = activePhotobooks.some(d => cleanFolderName(d.folder) === cleanFolderB);

        if (isActiveA && !isActiveB) return -1;
        if (!isActiveA && isActiveB) return 1;
        return 0; // 활성화 여부가 같으면 기존 순서 유지
    });

    let gridHtml = `
        <div class="artbook-viewer-container">
            <!-- 우측 상단 닫기 버튼 -->
            <button class="artbook-close-btn" onclick="closeArtbookViewer()">&times;</button>
            
            <div class="artbook-header">
                <h1 class="artbook-title serif">DESSERT ARTBOOK</h1>
                <p class="artbook-subtitle">프로젝트 두부 프리미엄 디지털 화보집 아카이브</p>
            </div>

            <div class="artbook-grid-wrapper">
                <div class="artbook-grid">
    `;

    sortedProjects.forEach(p => {
        const folderPart = p.path ? p.path.split('/')[0] : '';
        const cleanFolder = cleanFolderName(folderPart);
        
        // activePhotobooks에서 매칭되는 실제 폴더명 찾기
        const matchedBook = activePhotobooks.find(d => cleanFolderName(d.folder) === cleanFolder);
        const isActive = !!matchedBook;

        let imgUrl = '';
        let cardClass = 'artbook-card-item';
        let onClickAttr = '';
        let visualStyle = '';

        if (isActive) {
            const matchedDir = matchedBook.folder;
            const images = matchedBook.images;
            imgUrl = getBasePath() + encodeURI(`${matchedDir}/화보집/${images[0]}`);
            cardClass += ' active-card';
            // 임시로 클릭 시 얼럿 처리 (3단계에서 슬라이더 모달 연결 예정)
            const imgsJson = JSON.stringify(images).replace(/"/g, '&quot;');
            onClickAttr = `onclick="openArtbookSlider(this, ${p.id}, '${matchedDir}', ${imgsJson})"`;
            
            const bgColors = {
                39: '#452c50', // 순두부 자색고구마 롤치즈스콘
                38: '#251810', // 순두부 르뱅쿠키
                37: '#2c220b', // 레몬포슈에케익
                36: '#36231a', // 순두부 찜케익
                35: '#2a1f14', // 콩물파운드케익
                34: '#f0ede8', // 흑임자테린
                32: '#321a22', // 순두부 화이트바크초콜릿
                33: '#1b2a1e', // 순두부 쑥 찰떡브라우니
                30: '#251c14', // 순두부 모찌떡케이크
                27: '#2a1810', // 초코마들렌
                24: '#2e1b10', // 순두부 찰떡파이
                25: '#221109', // 순두부 미니초코케익
                26: '#2f2608', // 순두부 레몬마들렌
                28: '#1a2c1d', // 순두부 녹차요거트파운드케익
                29: '#2d261e', // 순두부 얼그레이그릭스콘
                22: '#101726', // 순두부 눈꽃컵케이크
                21: '#241b15', // 순두부 3종케익
                20: '#1d1007', // 순두부 초코번트케익
                19: '#2e2509', // 순두부 레몬번트케익
                18: '#2a1215', // 순두부 블랙포레스트 컵케익
                17: '#1a100a', // 순두부 부쉬드노엘
                16: '#1a2b23', // 순두부 슈톨렌
                15: '#291a0c', // 순두부 단호박 찹쌀빵
                14: '#22160d', // 순두부 밤파운드케이크
                13: '#281b0b', // 순두부 단호박바스크치즈케이크
                12: '#2c241d', // 순두부 크림치즈롤케익
                11: '#291e11', // 순두부 치즈스콘
                10: '#332912', // 순두부 레몬케이크
                9: '#22120b',  // 순두부 브라우니쿠키
                8: '#321b15',  // 순두부 찹쌀모찌 케이크
                7: '#2b2017',  // 순두부 크림치즈쿠키
                6: '#1a2022',  // 순두부 얼그레이케익
                5: '#2c1b0c',  // 순두부 황치즈휘낭시에
                4: '#180b06',  // 순두부 퍼지브라우니
                3: '#201510',  // 순두부 바스크치즈케이크
                2: '#1c120c',  // 순두부 크림치즈 티라미수
                1: '#252421'   // 순두부 크림치즈
            };
            const bgColor = bgColors[p.id] || '#0e1015';
            visualStyle = `background-image: url('${imgUrl}'); background-size: contain; background-repeat: no-repeat; background-position: center; background-color: ${bgColor};`;
        } else {
            // 비활성(준비중)인 경우 디저트의 기본 이미지(p.img)를 백그라운드로 보여줌
            imgUrl = p.img ? getBasePath() + encodeURI(`${p.img}`) : '';
            cardClass += ' pending-card';
            visualStyle = `background-image: url('${imgUrl}');`;
        }

        gridHtml += `
            <div class="${cardClass}" ${onClickAttr}>
                <div class="artbook-card-visual" style="${visualStyle}">
                    ${!isActive ? `
                        <div class="pending-overlay">
                            <span class="pending-text">화보 준비중</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    });

    gridHtml += `
                </div>
            </div>
            
            <div class="artbook-viewer-footer">
                <p class="viewer-footer-text">&copy; 2025 PROJECT DUBU - All Rights Reserved.</p>
            </div>
        </div>
    `;
    viewer.innerHTML = gridHtml;
}

function closeArtbookViewer(isFromPopstate = false) {
    const viewer = document.getElementById('artbook-viewer-overlay');
    if (!viewer) return;

    // 메인 페이지의 모든 본문 요소(header, section)를 다시 보이도록 복원합니다.
    document.querySelectorAll('header, section').forEach(el => {
        el.style.display = '';
    });

    viewer.classList.remove('active');
    document.body.style.overflow = '';

    if (window.location.pathname.endsWith('/artbook')) {
        history.replaceState({ page: 'home' }, '', getBasePath());
    } else if (!isFromPopstate) {
        history.back(); // 가상 라우팅 원복
    }

    setTimeout(() => {
        viewer.remove();
        // 원래 화면으로 왔을 때 3D 책장이나 레이아웃 정렬을 수동 트리거하여 정밀 원복
        if (typeof recalculateBookshelfBounds === 'function') {
            recalculateBookshelfBounds();
        }
    }, 600);
}

function viewRecipeFromArtbook(recipeId) {
    closeArtbookViewer();
    setTimeout(() => {
        openFocusStage(recipeId);
    }, 200);
}

let artbookSliderCurrentPage = 1;
let isClosingArtbookSlider = false;
let artbookSliderWheelDebounce = false;

function openArtbookSlider(cardEl, recipeId, folderName, images) {
    // 1. 모든 카드의 selected-card 클래스 제거 및 클릭된 카드 추가
    document.querySelectorAll('.artbook-card-item').forEach(card => {
        card.classList.remove('selected-card');
    });
    if (cardEl) {
        cardEl.classList.add('selected-card');
    }

    // 2. 메인 그리드 컨테이너 페이드아웃
    const mainContainer = document.querySelector('.artbook-viewer-container');
    if (mainContainer) {
        mainContainer.classList.add('fade-out');
    }

    // 3. 디저트별 배경색 매핑
    const bgColors = {
        39: '#452c50', // 순두부 자색고구마 롤치즈스콘
        38: '#251810', // 순두부 르뱅쿠키
        37: '#2c220b', // 레몬포슈에케익
        35: '#2a1f14', // 콩물파운드케익
        34: '#f0ede8', // 흑임자테린
        30: '#251c14', // 순두부 모찌떡케이크
        27: '#2a1810', // 초코마들렌
        22: '#101726', // 순두부 눈꽃컵케이크
        21: '#241b15', // 순두부 3종케익
        20: '#1d1007', // 순두부 초코번트케익
        19: '#2e2509', // 순두부 레몬번트케익
        18: '#2a1215', // 순두부 블랙포레스트 컵케익
        17: '#1a100a', // 순두부 부쉬드노엘
        16: '#1a2b23', // 순두부 슈톨렌
        15: '#291a0c', // 순두부 단호박 찹쌀빵
        14: '#22160d', // 순두부 밤파운드케이크
        13: '#281b0b', // 순두부 단호박바스크치즈케이크
        12: '#2c241d', // 순두부 크림치즈롤케익
        11: '#291e11', // 순두부 치즈스콘
        10: '#332912', // 순두부 레몬케이크
        9: '#22120b',  // 순두부 브라우니쿠키
        8: '#321b15',  // 순두부 찹쌀모찌 케이크
        7: '#2b2017',  // 순두부 크림치즈쿠키
        6: '#1a2022',  // 순두부 얼그레이케익
        5: '#2c1b0c',  // 순두부 황치즈휘낭시에
        4: '#180b06',  // 순두부 퍼지브라우니
        3: '#201510',  // 순두부 바스크치즈케이크
        2: '#1c120c',  // 순두부 크림치즈 티라미수
        1: '#252421'   // 순두부 크림치즈
    };
    const bgColor = bgColors[recipeId] || '#08090b';

    // 4. 슬라이더 오버레이 동적 생성
    let sliderOverlay = document.getElementById('artbook-slider-overlay');
    if (sliderOverlay) sliderOverlay.remove();

    sliderOverlay = document.createElement('div');
    sliderOverlay.id = 'artbook-slider-overlay';
    document.body.appendChild(sliderOverlay);

    // 5. 슬라이더 HTML 템플릿 빌드 (텍스트 오버레이 완전 배제)
    sliderOverlay.innerHTML = `
        <div class="artbook-slider-container">
            <button class="artbook-slider-close-btn" onclick="closeArtbookSlider()">&times;</button>
            
            <button class="artbook-slider-nav-btn artbook-slider-nav-left" onclick="changeArtbookSliderPage(-1)">
                <i class="fa-solid fa-chevron-left"></i>
            </button>
            <button class="artbook-slider-nav-btn artbook-slider-nav-right" onclick="changeArtbookSliderPage(1)">
                <i class="fa-solid fa-chevron-right"></i>
            </button>
            
            <div class="artbook-slide-item active" data-slide="1" style="background-image: url('${getBasePath() + encodeURI(`${folderName}/화보집/${images[0]}`)}'); background-color: ${bgColor};">
                <img src="${getBasePath() + encodeURI(`${folderName}/화보집/${images[0]}`)}" class="mobile-artbook-img" alt="">
            </div>
            <div class="artbook-slide-item" data-slide="2" style="background-image: url('${getBasePath() + encodeURI(`${folderName}/화보집/${images[1]}`)}'); background-color: ${bgColor};">
                <img src="${getBasePath() + encodeURI(`${folderName}/화보집/${images[1]}`)}" class="mobile-artbook-img" alt="">
            </div>
            <div class="artbook-slide-item" data-slide="3" style="background-image: url('${getBasePath() + encodeURI(`${folderName}/화보집/${images[2]}`)}'); background-color: ${bgColor};">
                <img src="${getBasePath() + encodeURI(`${folderName}/화보집/${images[2]}`)}" class="mobile-artbook-img" alt="">
            </div>
            
            <div class="artbook-slider-dots">
                <span class="artbook-slider-dot active" onclick="goArtbookSliderPage(1)"></span>
                <span class="artbook-slider-dot" onclick="goArtbookSliderPage(2)"></span>
                <span class="artbook-slider-dot" onclick="goArtbookSliderPage(3)"></span>
            </div>
        </div>
    `;

    artbookSliderCurrentPage = 1;
    isClosingArtbookSlider = false;

    // 6. 페이드인 활성화
    setTimeout(() => {
        sliderOverlay.classList.add('active');
        updateArtbookSliderUI();
    }, 50);

    // 7. 이벤트 바인딩
    initArtbookSliderEvents();
}

function updateArtbookSliderUI() {
    console.log(`[ArtbookSlider] Updating UI. Current Page: ${artbookSliderCurrentPage}`);
    const slides = document.querySelectorAll('.artbook-slide-item');
    const dots = document.querySelectorAll('.artbook-slider-dot');
    
    slides.forEach(slide => {
        const slideNum = Number(slide.getAttribute('data-slide'));
        slide.className = 'artbook-slide-item';
        if (slideNum === artbookSliderCurrentPage) {
            slide.classList.add('active');
        } else if (slideNum < artbookSliderCurrentPage) {
            slide.classList.add('prev');
        } else {
            slide.classList.add('next');
        }
        console.log(`[ArtbookSlider] Slide ${slideNum} classes: "${slide.className}"`);
    });

    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx + 1 === artbookSliderCurrentPage);
    });

    // 좌우 버튼 비활성화 처리
    const leftBtn = document.querySelector('.artbook-slider-nav-left');
    const rightBtn = document.querySelector('.artbook-slider-nav-right');
    if (leftBtn) leftBtn.classList.toggle('disabled', artbookSliderCurrentPage === 1);
    if (rightBtn) rightBtn.classList.toggle('disabled', artbookSliderCurrentPage === 3);
}

function changeArtbookSliderPage(dir) {
    console.log(`[ArtbookSlider] Request page change direction: ${dir}`);
    const target = artbookSliderCurrentPage + dir;
    if (target >= 1 && target <= 3) {
        artbookSliderCurrentPage = target;
        updateArtbookSliderUI();
    } else {
        console.log(`[ArtbookSlider] Page change ignored. Target ${target} out of range (1-3).`);
    }
}

function goArtbookSliderPage(pageNum) {
    console.log(`[ArtbookSlider] Request jump to page: ${pageNum}`);
    if (pageNum >= 1 && pageNum <= 3) {
        artbookSliderCurrentPage = pageNum;
        updateArtbookSliderUI();
    }
}

function closeArtbookSlider() {
    const sliderOverlay = document.getElementById('artbook-slider-overlay');
    if (!sliderOverlay || isClosingArtbookSlider) return;

    isClosingArtbookSlider = true;
    sliderOverlay.classList.remove('active');

    // 메인 그리드 컨테이너 페이드인 원복
    const mainContainer = document.querySelector('.artbook-viewer-container');
    if (mainContainer) {
        mainContainer.classList.remove('fade-out');
    }

    setTimeout(() => {
        sliderOverlay.remove();
        isClosingArtbookSlider = false;
    }, 600);
}

function initArtbookSliderEvents() {
    const overlay = document.getElementById('artbook-slider-overlay');
    if (!overlay) return;

    // 1. 마우스 휠 이벤트 감지
    overlay.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (artbookSliderWheelDebounce) return;
        
        artbookSliderWheelDebounce = true;
        if (e.deltaY > 0) {
            changeArtbookSliderPage(1);
        } else {
            changeArtbookSliderPage(-1);
        }

        setTimeout(() => {
            artbookSliderWheelDebounce = false;
        }, 600); // 휠 디바운스
    }, { passive: false });

    // 2. 키보드 이벤트 감지
    const handleKeyDown = (e) => {
        if (!document.getElementById('artbook-slider-overlay')) {
            document.removeEventListener('keydown', handleKeyDown);
            return;
        }
        if (e.key === 'ArrowRight') {
            changeArtbookSliderPage(1);
        } else if (e.key === 'ArrowLeft') {
            changeArtbookSliderPage(-1);
        } else if (e.key === 'Escape') {
            closeArtbookSlider();
        }
    };
    document.addEventListener('keydown', handleKeyDown);
}

// 글로벌 인라인 핸들러 에러 방지를 위한 window 명시적 바인딩
window.openArtbookSlider = openArtbookSlider;
window.changeArtbookSliderPage = changeArtbookSliderPage;
window.goArtbookSliderPage = goArtbookSliderPage;
window.closeArtbookSlider = closeArtbookSlider;

function initArtbookEvents() {
    const handleKeyDown = (e) => {
        if (!document.getElementById('artbook-viewer-overlay')) {
            document.removeEventListener('keydown', handleKeyDown);
            return;
        }
        if (e.key === 'Escape') {
            closeArtbookViewer();
        }
    };
    document.addEventListener('keydown', handleKeyDown);
}

