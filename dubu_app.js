// 프로젝트 두부: 포털 핵심 애플리케이션 스크립트 (v16.0 Rebranding)

let heroSlideIndex = 0;
let activeFocusRecipeId = null;
let currentTab = 'calc';

// ==========================================================================
// 1. 초기화 및 페이지 로드
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
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

    // 최초 진입 시 URL 라우팅 처리 (/lookbook/39 대응)
    const initPath = window.location.pathname;
    if (initPath.includes('/lookbook/39')) {
        setTimeout(() => {
            openFocusStage(39);
            setTimeout(() => {
                openLookbook(39);
            }, 150);
        }, 300);
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
                    <img src="${theme.img}" alt="${theme.title}" loading="lazy"
                         onerror="this.parentNode.style.background='#f0ece5'">
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

    // 1. 크리스마스 / 성탄절 (짙은 에메랄드 고딕 그린 + 리치 골드)
    const isChristmas = 
        path.includes('성탄절') || 
        path.includes('크리스마스') || 
        title.includes('슈톨렌') || 
        title.includes('부쉬드노엘') || 
        title.includes('블랙포레스트') || 
        title.includes('눈꽃') || 
        [20, 21, 22, 23, 24, 25, 26].includes(id);

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
        [4, 15, 18, 9].includes(id);

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
        [37, 30, 31, 32].includes(id);

    if (isRomantic) {
        if (id === 37 || id === 30) {
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
        [41, 39, 38, 17, 16, 33, 8, 35, 12, 11].includes(id);

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
        <!-- 책 바깥 우측 상단 닫기 버튼 -->
        <button class="focus-overlay-close" onclick="closeFocusStage()" style="z-index: 10600;">&times;</button>

        <div id="focus-modal-board" class="atelier-focus-board magic-book-theme" style="
            --magic-book-color: ${theme.themeColor};
            --magic-book-glow: ${theme.themeGlow};
            --magic-book-accent: ${theme.accentColor};">

            <!-- 왼쪽 페이지: 요리 화보 및 한마디 -->
            <div class="focus-stage-left">
                <div class="focus-tag-top" style="font-family:'Playfair Display',serif; font-weight:600; letter-spacing:2px;">RECIPE FILE // Vol.${recipe.id}</div>
                <div class="focus-img-wrapper" style="height:62%; margin-top:20px; border-radius:14px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.5);">
                    <img src="${recipe.img}" alt="${recipe.title}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='assets/default_dubu.jpg'">
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
                    <span id="focus-recipe-difficulty" class="focus-diff-pill" style="border-color:${theme.themeColor}; background:${theme.themeGlow}; color:${theme.themeColor};">
                        <i class="fa-solid fa-box-open"></i> 분량: ${meta.difficulty}
                    </span>
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
                    <button class="action-btn share-btn" onclick="openLookbook(${recipe.id})" style="background:#3a6958; color:#fff;">
                        <i class="fa-solid fa-book-open"></i> 룩북보기
                    </button>
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
    41: { template: "찜케이크 1호 {x}개 분량 🧧", baseCount: 1 },
    40: { template: "오란다 대 틀 {x}개 분량 🍞", baseCount: 3 },
    39: { template: "오란다 대 틀 {x}개 분량 🖤", baseCount: 1 },
    38: { template: "쑥 찰떡브라우니 {x}판 분량 🌿", baseCount: 1 },
    37: { template: "화이트 바크초콜릿 {x}판 분량 🍫", baseCount: 1 },
    36: { template: "티라미수 푸딩 {x}컵 분량 🍮", baseCount: 2 },
    35: { template: "모찌떡 케이크 {x}호 1개 분량 🎂", baseCount: 1 },
    34: { template: "얼그레이그릭스콘 {x}개 분량 🍪", baseCount: 6 },
    33: { template: "오란다 대 팬 {x}개 분량 🍵", baseCount: 3 },
    32: { template: "마들렌 틀 {x}개 분량 🍫", baseCount: 12 },
    31: { template: "마들렌 틀 {x}개 분량 🍋", baseCount: 12 },
    30: { template: "실리콘 틀 {x}개 분량 🍫", baseCount: 8 },
    29: { template: "찰떡파이 {x}판 분량 🥧", baseCount: 1 },
    28: { template: "시나몬롤 {x}개 분량 🍥", baseCount: 6 },
    27: { template: "머핀 틀 {x}개 분량 🧁", baseCount: 6 },
    26: { template: "오란다 대 틀 {x}개 분량 🍓", baseCount: 3 },
    25: { template: "번트틀 {x}개 분량 🍫", baseCount: 1 },
    24: { template: "번트틀 {x}개 분량 🍋", baseCount: 1 },
    23: { template: "원형 컵 {x}개 분량 🍒", baseCount: 4 },
    22: { template: "정사각 팬 {x}판 분량 🍫", baseCount: 1 },
    21: { template: "슈톨렌 {x}개 분량 🎄", baseCount: 2 },
    19: { template: "실리콘 오발틀 {x}개 분량 🎃", baseCount: 8 },
    17: { template: "오란다 대자 팬 {x}개 분량 🌰", baseCount: 2 },
    16: { template: "원형 1호틀 {x}개 분량 🎃", baseCount: 1 },
    10: { template: "브라우니쿠키 {x}개 분량 🍪", baseCount: 8 }
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
    const diffPill = board ? board.querySelector('#focus-recipe-difficulty') : null;
    if (diffPill) {
        diffPill.innerHTML = `<i class="fa-solid fa-box-open"></i> 분량: ${yieldText}`;
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
    let difficulty = "보통 🟡";
    
    // 만약 BASE_YIELDS에 해당 레시피의 기본 분량 템플릿이 정의되어 있다면 1배율 텍스트로 초기 세팅
    if (typeof BASE_YIELDS !== 'undefined' && BASE_YIELDS[recipeId]) {
        difficulty = getDynamicYieldText(recipeId, 1);
    }

    let bakingTip = "오븐 예열 170℃ / 25분";
    let cheers = "오늘 내 손끝으로 빚는 건강한 두부 베이킹, 설레는 시작입니다! ✨";

    if (recipe) {
        if (recipe.id === 41) {
            bakingTip = "물이 끓는 찜기 중불 / 50분 (뜸 10분)";
            cheers = "케이크처럼 폭신하지만 떡처럼 쫀득함이 살아있는 단팥 찜케이크! 🧧";
        } else if (recipe.id === 40) {
            bakingTip = "180°C 예열 → 170°C / 40분 (콩물 마무리 + 하루 숙성 권장)";
            cheers = "다음 날이 진짜입니다! 하루 숙성 후 먹는 그 촉촉함과 고소함은 레시피의 진짜 얼굴이에요. ☀️";
        } else if (recipe.id === 39) {
            bakingTip = "중탕 예열 140℃ / 140℃ 60분 (뜸 10분)";
            cheers = "순두부 물기를 짜지 않고 그대로 사용하여, 촉촉함과 꾸덕함이 극대화되는 특별한 레시피입니다. 🖤";
        } else if (recipe.id === 38) {
            bakingTip = "오븐 예열 180℃ / 160℃ 30~35분";
            cheers = "향긋한 쑥과 찰기가 만든 한국적 쫀득함! 부모님 선물용 부동의 1위 레시피랍니다. 🌿";
        } else if (recipe.id === 37) {
            bakingTip = "오븐 예열 165℃ / 25분";
            cheers = "단 한 방울의 수분도 허용하지 않는 수분 박멸 비법으로 완성하는 극강의 바삭함! 💝";
        } else if (recipe.id === 36) {
            bakingTip = "냉장실 냉각 / 4시간";
            cheers = "사르르 사그라지는 두부 크림의 극상 부드러움! 컵에 소복히 담으면 더욱 기쁩니다. 🍮";
        } else if (recipe.id === 35) {
            bakingTip = "오븐 예열 180℃ / 160℃ 50~55분";
            cheers = "명절의 기품을 한껏 높여주는 굳지 않는 비법 모찌떡케이크, 정성으로 완성해 보아요! 🧧";
        } else if (recipe.id === 17) {
            bakingTip = "오븐 예열 180℃ / 170℃ 40분";
            cheers = "달콤하고 고소한 밤이 콕콕 박혀 더욱 풍요로운 맛! 가을 감성을 가득 담아 구워내는 영양 만점 순두부 파운드케이크입니다. 🌰";
        }
    }
    return { difficulty, bakingTip, cheers };
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

    const modal = document.createElement('div');
    modal.id = 'recipe-card-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex; align-items: center; justify-content: center;
        z-index: 11000; opacity: 0; transition: opacity 0.3s ease;
    `;

    modal.innerHTML = `
        <div style="background: #FDFBF4; width: 95%; max-width: 400px; border-radius: 20px; padding: 25px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); transform: translateY(30px); transition: transform 0.3s ease; border: 2px solid #E8DCC4; position: relative;">
            <div style="text-align: center; margin-bottom: 15px; position: relative; padding-top: 10px;">
                <span style="font-size: 0.76rem; color: #7F8C8D; letter-spacing: 2.5px; font-weight: 700; display: block;">PROJECT DUBU</span>
                <button onclick="closeRecipeCardModal()" style="position: absolute; right: -10px; top: -5px; background: none; border: none; font-size: 1.5rem; color: #7F8C8D; cursor: pointer; outline: none;">&times;</button>
            </div>
            
            <div style="border-radius: 12px; overflow: hidden; height: 160px; margin-bottom: 15px; border: 1px solid #E8DCC4;">
                <img src="${img}" style="width: 100%; height: 100%; object-fit: cover;">
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
    alert(`💾 [레시피 저장 완료]\n\n"${title}" 맞춤 레시피 카드가 이미지 파일(PNG)로 다운로드 폴더에 저장되었습니다. 필요할 때 편하게 열어보며 베이킹에 활용해 보세요!`);
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

    const activeRecipes = [
        {
            id: 37,
            title: "순두부 화이트바크초콜릿",
            img: "36. 순두부화이트바크초콜릿_완/0.jpg",
            creatorsNote: "순두부 시트 위에 화이트 커버춰를 부어 피스타치오와 스프링클로 장식해 굳히는 바크 초콜릿.",
            themeColor: "#C25D7E",
            themeGlow: "rgba(194, 93, 126, 0.15)",
            accentColor: "#F48FB1"
        },
        {
            id: 38,
            title: "순두부 쑥 찰떡브라우니",
            img: "39. 순두부 쑥 찰떡브라우니_화보북 여기서부터/assets/0.jpg",
            creatorsNote: "찹쌀가루 없이 완성한 반전의 찰기! 향긋한 쑥 반죽과 콩고물의 고소한 동행.",
            themeColor: "#4E6B56",
            themeGlow: "rgba(78, 107, 86, 0.15)",
            accentColor: "#A5D6A7"
        },
        {
            id: 39,
            title: "순두부 흑임자 테린",
            img: "40. 순두부 흑임자테린/assets/08.png",
            creatorsNote: "오븐 중탕 공법으로 진하고 크리미하게 구워낸, 다음날 더 고소한 흑임자 테린.",
            themeColor: "#4A4F54",
            themeGlow: "rgba(74, 79, 84, 0.15)",
            accentColor: "#78909C"
        },
        {
            id: 40,
            title: "순두부 콩물 파운드케익",
            img: "41. 순두부콩물 파운드케익_완/순두부 콩물 파운드케익 (0).png",
            creatorsNote: "순두부와 콩물을 함께 갈아 고소하고 촉촉하게 완성한 웰빙 파운드케익.",
            themeColor: "#7B6F55",
            themeGlow: "rgba(123, 111, 85, 0.15)",
            accentColor: "#F5E6C8"
        },
        {
            id: 41,
            title: "순두부 모찌 찜케이크",
            img: "42. 순두부 찜케익/순두부 찜케익 (0).jpg",
            creatorsNote: "물기 안 짠 순두부를 우유, 오일과 갈아 찹쌀가루 및 팥앙금을 얹어 쪄낸 쫀득 촉촉한 찜케이크.",
            themeColor: "#5A3816",
            themeGlow: "rgba(90, 56, 22, 0.15)",
            accentColor: "#EAD7A8",
            isNew: true
        },
        {
            id: 'coming-soon',
            title: "순두부 레몬파운드케익",
            comingSoonSubtitle: "Vol.42 Coming Soon",
            img: "",
            creatorsNote: "상큼한 레몬 글레이즈와 고소한 순두부 시트가 어우러진 레몬 파운드케익이 곧 공개됩니다.",
            themeColor: "#2C3E50",
            themeGlow: "rgba(44, 62, 80, 0.2)",
            accentColor: "#95A5A6",
            isComingSoon: true
        }
    ];

    const maxId = Math.max(...activeRecipes.filter(r => typeof r.id === 'number').map(r => r.id));
    const comingSoonVol = maxId + 1;
    const comingSoonItem = activeRecipes.find(r => r.id === 'coming-soon');
    if (comingSoonItem) {
        comingSoonItem.title = "순두부 레몬파운드케익";
        comingSoonItem.comingSoonSubtitle = `Vol.${comingSoonVol} Coming Soon`;
    }

    const specsData = {
        41: { texture: "쫀득하고 촉촉함", wellness: "No밀가루, No버터, No오븐", method: "찜기 50분 찌기" },
        40: { texture: "고소하고 촉촉함", wellness: "진한 콩물, 하루 숙성 비법", method: "170℃ 오븐 구움" },
        39: { texture: "꾸덕함", wellness: "No밀가루, No버터", method: "140℃ 오븐 중탕" },
        38: { texture: "쫀득함", wellness: "No버터, 비건 지향", method: "160℃ 오븐 구움" },
        37: { texture: "바삭하고 달콤함", wellness: "No버터, 볶은 순두부", method: "165℃ 오븐 구움" }
    };

    container.innerHTML = activeRecipes.map((p, idx) => {
        const shortTitle = p.isComingSoon ? `Vol.${comingSoonVol} 커밍순` : p.title.replace("순두부 ", "").trim();
        const specs = specsData[p.id] || { texture: "???", wellness: "???", method: "???" };

        const bgStyle = p.isComingSoon 
            ? `background: linear-gradient(135deg, #1A1C1E 0%, #0D0E10 100%); display: flex; align-items: center; justify-content: center; flex-direction: column;` 
            : `background-image: url('${p.img}');`;

        const comingSoonOverlay = p.isComingSoon 
            ? `<div class="coming-soon-glowing-core" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align:center; padding:0 10px;">
                <i class="fa-solid fa-lock" style="font-size: 2.2rem; color: var(--accent-color); filter: drop-shadow(0 0 12px var(--theme-color)); margin-bottom: 12px; opacity: 0.85; animation: pulseGlow 2s infinite ease-in-out;"></i>
                <span style="color:#e5dcd3; font-size:1.1rem; font-weight:700; font-family:'Noto Serif KR',serif; margin-bottom:6px;">${p.title}</span>
                <span class="coming-soon-text-en font-serif" style="color: #95A5A6; font-size: 0.72rem; letter-spacing: 2px; margin-bottom: 2px;">COMING SOON</span>
                <span class="coming-soon-text-ko" style="color: #7F8C8D; font-size: 0.78rem;">비밀의 문이 곧 열립니다</span>
               </div>`
            : '';

        const titleHtml = p.isComingSoon 
            ? `<h3 class="serif showcase-title" style="color: #7f8c8d;">${p.comingSoonSubtitle || 'Coming Soon'}</h3>`
            : `<h3 class="serif showcase-title">${p.title}${p.isNew ? ` <span style="display: inline-block; background: #FF3D71; color: white; font-family: var(--font-playfair), serif; font-weight: 700; font-size: 0.65rem; padding: 2px 8px; border-radius: 20px; vertical-align: middle; margin-left: 10px; box-shadow: 0 0 10px rgba(255, 61, 113, 0.4); text-transform: uppercase; letter-spacing: 0.5px;">NEW</span>` : ''}</h3>`;

        const metaText = p.isComingSoon ? "RECIPE FILE // COMING SOON" : `RECIPE FILE // Vol.${p.id}`;
        const actionBtnText = p.isComingSoon ? `공개 예정 <i class="fa-solid fa-lock" style="margin-left: 5px;"></i>` : `상세보기 <i class="fa-solid fa-chevron-right" style="margin-left: 5px;"></i>`;

        return `
            <div class="accordion-slice ${p.isComingSoon ? 'coming-soon-slice' : ''}" 
                 style="${bgStyle} --theme-color: ${p.themeColor}; --theme-glow: ${p.themeGlow}; --accent-color: ${p.accentColor};" 
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
        const validRecipes = activeRecipes.filter(r => typeof r.id === 'number');
        if (validRecipes.length > 0) {
            const maxRecipe = validRecipes.reduce((max, curr) => curr.id > max.id ? curr : max, validRecipes[0]);
            const targetSlice = container.querySelector(`[data-vol="${maxRecipe.id}"]`);
            if (targetSlice) {
                targetSlice.style.flex = '5.4';
                targetSlice.classList.add('active-expanded');
            }
        } else {
            const firstSlice = container.querySelector('.accordion-slice');
            if (firstSlice) {
                firstSlice.style.flex = '5.4';
                firstSlice.classList.add('active-expanded');
            }
        }
    }, 50);
}

function handleSliceClick(event, projectId) {
    const slice = event.currentTarget;
    const isButton = event.target.closest('.editorial-action-box') || event.target.closest('.action-btn');
    const isHovered = slice.classList.contains('active-expanded');

    if (isButton || isHovered) {
        if (projectId === 'coming-soon') {
            const vol = slice.getAttribute('data-vol') || '41';
            alert(`🔒 Vol.${vol} 레시피는 업데이트 예정입니다.\n\n프로젝트 두부의 새로운 컬렉션 소식을 기대해 주세요! 🖤`);
            return;
        }
        openFocusStage(projectId);
    } else {
        document.querySelectorAll('.accordion-slice').forEach(s => {
            if (s !== slice) {
                s.style.flex = '1';
                s.classList.remove('active-expanded');
            }
        });
        slice.style.flex = '5.4';
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
    overlay.style.cssText = `background: ${pal.bg}; color: ${pal.text};`;
    overlay.onclick = (e) => { if (e.target === overlay) closeThemeModal(); };

    const recipesCount = (theme.recipes || []).length;
    const maxIndex = recipesCount > 4 ? recipesCount - 4 : 0;
    const showButtons = recipesCount > 4;

    const recipesHtml = (theme.recipes || []).map(recipe => {
        const imgSrc = recipe.img || '';
        const displayTitle = recipe.title.replace('순두부 ', '');
        return `
            <div class="theme-recipe-card" onclick="openFocusStage(${recipe.id});">
                <div class="theme-recipe-card-img-wrapper">
                    <img src="${imgSrc}" alt="${recipe.title}" loading="lazy" onerror="this.parentNode.style.background='#f0f0f0'">
                    <div class="theme-recipe-card-vol" style="color:${pal.text};">${recipe.vol}</div>
                </div>
                <div class="theme-recipe-card-info" style="background:${pal.cardBg};">
                    <p class="theme-recipe-card-title" style="color:${pal.text};">${displayTitle}</p>
                    <span class="theme-recipe-card-icon" style="color:${pal.accent};"><i class="fa-solid fa-chevron-right"></i></span>
                </div>
            </div>`;
    }).join('');

    overlay.innerHTML = `
        <button class="theme-modal-close-btn" onclick="closeThemeModal()" style="color:${pal.subtext};">&times;</button>
        <div class="theme-modal-header">
            <div class="theme-modal-tag" style="color:${pal.subtext};">${theme.icon} ${theme.tag}</div>
            <h2 class="theme-modal-title serif" style="color:${pal.text};">${theme.title}</h2>
            <p class="theme-modal-desc" style="color:${pal.subtext};">${theme.desc}</p>
        </div>
        <div class="theme-modal-carousel-wrapper">
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
            
            ${showButtons ? `
            <button class="theme-slider-btn next" onclick="slideTheme(1, ${maxIndex})" style="color: ${pal.text};">
                <i class="fa-solid fa-circle-chevron-right"></i>
            </button>
            ` : ''}
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    setTimeout(() => overlay.classList.add('active'), 30);
}

function closeThemeModal() {
    const overlay = document.getElementById('theme-modal-overlay');
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => overlay.remove(), 400);
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

    // 1. 오래된 순 정렬 (1 -> 40)
    const sorted = [...PROJECTS].sort((a, b) => a.id - b.id);
    const totalPages = Math.ceil(sorted.length / 16);

    // 2. 현재 페이지 보정
    if (bookshelfState.currentPage < 1) bookshelfState.currentPage = 1;
    if (bookshelfState.currentPage > totalPages) bookshelfState.currentPage = totalPages;

    // 3. 현재 페이지의 16권(2단 * 8권) 슬라이싱
    const startIndex = (bookshelfState.currentPage - 1) * 16;
    const pageBooks = sorted.slice(startIndex, startIndex + 16);

    const row0Books = pageBooks.slice(0, 8); // 상단 선반 (최대 8권)
    const row1Books = pageBooks.slice(8, 16); // 하단 선반 (최대 8권)

    // 마법 기호 목록
    const magicSymbols = ['⚜', '✦', '🜚', '🝎', '🜔', '🕮', '🜏', '🝔', '✺', '🜛'];

    function buildBookHtml(p) {
        const colors = getBookSpineColors(p);
        const shortTitle = p.title.replace('순두부 ','').replace('순두부','');
        const magicSymbol = magicSymbols[p.id % magicSymbols.length];
        return `
            <div class="magic-book" onclick="openFocusStage(${p.id})" title="VOL.${p.id} ${p.title}"
                 style="--spine1:${colors.spine1}; --spine2:${colors.spine2}; --book-text:${colors.textColor}; --book-accent:${colors.accentColor};">
                <div class="book-spine">
                    <span class="book-vol">VOL.${p.id}</span>
                    <span class="book-title-spine">${shortTitle}</span>
                    <span class="book-deco">${magicSymbol}</span>
                </div>
            </div>`;
    }

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
                <div class="footer-logo serif">PROJECT DUBU</div>
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

let lookbookCurrentPage = 1;
const lookbookTotalPages = 4;

function openLookbook(recipeId) {
    recipeId = Number(recipeId);
    const recipe = PROJECTS.find(p => p.id === recipeId);
    if (!recipe) return;

    // Vol.39 흑임자 테린 전용 풀스크린 화보집 파일럿 구현
    if (recipeId === 39) {
        // 1. 기존 상세 모달 찾기 및 페이드아웃
        const focusOverlay = document.getElementById('focus-modal-overlay');
        if (focusOverlay) {
            focusOverlay.classList.remove('active');
            setTimeout(() => {
                focusOverlay.style.display = 'none';
            }, 400);
        }

        // 가상 경로 변경 전에 실제 물리적 base path 연산
        // 주소창에 /lookbook/이 들어있는 상태에서 새로고침이 되더라도 실제 루트 경로를 찾을 수 있도록 보정
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

        // 2. 가상 라우팅 설정 (/lookbook/39)
        history.pushState({ page: 'lookbook', id: 39 }, '', '/lookbook/39');

        // 3. 풀스크린 룩북 오버레이 동적 생성
        let lookbookOverlay = document.getElementById('lookbook-overlay');
        if (lookbookOverlay) lookbookOverlay.remove();

        lookbookOverlay = document.createElement('div');
        lookbookOverlay.id = 'lookbook-overlay';
        lookbookOverlay.innerHTML = `
            <div class="lookbook-container">
                <!-- 럭셔리 네온 테크 라인 프레임 -->
                <div class="lookbook-tech-frame"></div>

                <button class="lookbook-close-btn" onclick="closeLookbook()">&times;</button>
                
                <button class="lookbook-nav-btn lookbook-nav-left" onclick="changeLookbookPage(-1)"><i class="fa-solid fa-chevron-left"></i></button>
                <button class="lookbook-nav-btn lookbook-nav-right" onclick="changeLookbookPage(1)"><i class="fa-solid fa-chevron-right"></i></button>
                
                <div class="lookbook-slider">
                    <!-- 1페이지: 메인 완성샷 풀스크린 + 상단 테크 스캔 패널 -->
                    <div class="lookbook-slide active" data-page="1">
                        <div class="lookbook-bg-slide" style="background-image: url('${lookbookBasePath}40. 순두부 흑임자테린/assets/01.png');">
                            <div class="lookbook-tech-scan-panel">
                                <div class="rec-indicator"><span class="rec-dot"></span> LIVE REC</div>
                                <h1 class="lookbook-tech-title">Vol.39 순두부 흑임자 테린</h1>
                                <div class="cam-specs">60 FPS // UHD 4K // COMPLETED</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 2페이지: 단면 컷 + [TEXTURE ANALYSIS] 인포그래픽 패널 -->
                    <div class="lookbook-slide" data-page="2">
                        <div class="lookbook-detail-container">
                            <div class="lookbook-detail-img-frame">
                                <img src="${lookbookBasePath}40. 순두부 흑임자테린/assets/07.png" alt="흑임자테린 단면">
                            </div>
                            <div class="lookbook-tech-panel">
                                <div class="lookbook-panel-header">[TEXTURE ANALYSIS]</div>
                                <div class="lookbook-panel-content">
                                    <div class="lookbook-analysis-item">
                                        <span class="label">찰기 (STICKINESS)</span>
                                        <div class="bar-bg"><div class="bar-fill" style="width: 95%;"></div></div>
                                        <span class="value">0%</span>
                                    </div>
                                    <div class="lookbook-analysis-item">
                                        <span class="label">유화도 (EMULSIFICATION)</span>
                                        <div class="bar-bg"><div class="bar-fill" style="width: 90%;"></div></div>
                                        <span class="value">0%</span>
                                    </div>
                                    <div class="lookbook-analysis-item">
                                        <span class="label">밀도 (DENSITY)</span>
                                        <div class="bar-bg"><div class="bar-fill" style="width: 98%;"></div></div>
                                        <span class="value">0%</span>
                                    </div>
                                    <p class="lookbook-analysis-desc">
                                        <span class="lookbook-highlight">순두부</span>의 풍부한 수분과 <span class="lookbook-highlight">흑임자</span>가 정밀하게 유화되어, 빵보다 쫀득하고 푸딩보다 묵직한 극한의 <span class="lookbook-highlight">밀착 텍스처</span>를 구현합니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 3페이지: 2분할 컷 + [PROCESS MONITORING: 140℃ STEAM BAKING] -->
                    <div class="lookbook-slide" data-page="3">
                        <div class="lookbook-note-container">
                            <div class="lookbook-note-images">
                                <div class="lookbook-note-img-half" style="background-image: url('${lookbookBasePath}40. 순두부 흑임자테린/assets/baking_shot.png');">
                                    <div class="lookbook-img-label">140℃ 중탕 베이킹</div>
                                </div>
                                <div class="lookbook-note-img-half" style="background-image: url('${lookbookBasePath}40. 순두부 흑임자테린/assets/lb_aging_new.png');">
                                    <div class="lookbook-img-label">하루의 숙성</div>
                                </div>
                            </div>
                            <div class="lookbook-tech-panel">
                                <div class="lookbook-panel-header">[PROCESS MONITORING: 140℃ STEAM BAKING]</div>
                                <div class="lookbook-panel-content">
                                    <div class="lookbook-process-loader">
                                        <div class="loader-label">SYSTEM STEAM BAKING IN PROGRESS...</div>
                                        <div class="loader-bar-bg"><div class="loader-bar-fill"></div></div>
                                        <div class="loader-stats" style="display:flex; justify-content:space-between; margin-top:8px;">
                                            <span class="loader-temp-val">TEMP: 25℃</span>
                                            <span class="loader-percentage">0%</span>
                                        </div>
                                    </div>
                                    <p class="lookbook-note-text" style="margin-top: 22px;">
                                        <span class="lookbook-highlight">140℃ 저온 스팀 중탕</span>으로 구워내 수분을 완전 봉인한 뒤, <span class="lookbook-highlight">24시간 냉장 숙성</span>으로 흑임자의 <span class="lookbook-highlight">극대화된 꾸덕함</span>을 완성합니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 4페이지: 피날레 플레이트 + [RECIPE SYSTEM: COMPLETE] 패널 (좌우 분리형 레이아웃) -->
                    <div class="lookbook-slide" data-page="4">
                        <div class="lookbook-detail-container">
                            <!-- 좌측 완성 요리 이미지 카드 프레임 (네온 코너 브래킷 탑재) -->
                            <div class="lookbook-complete-img-frame">
                                <img src="${lookbookBasePath}40. 순두부 흑임자테린/assets/08.png" alt="순두부 흑임자 테린 완결">
                                <div class="tech-corner top-left"></div>
                                <div class="tech-corner top-right"></div>
                                <div class="tech-corner bottom-left"></div>
                                <div class="tech-corner bottom-right"></div>
                            </div>
                            
                            <!-- 우측 완결 HUD 팝업 패널 -->
                            <div class="lookbook-tech-complete-panel">
                                <!-- 테크 브래킷 코너 디자인 디테일 -->
                                <div class="tech-corner top-left"></div>
                                <div class="tech-corner top-right"></div>
                                <div class="tech-corner bottom-left"></div>
                                <div class="tech-corner bottom-right"></div>
                                
                                <div class="complete-header">[RECIPE SYSTEM: COMPLETE]</div>
                                <div class="complete-body">
                                    <div class="complete-icon">
                                        <i class="fa-solid fa-check"></i>
                                    </div>
                                    <h2 class="complete-title">순두부 흑임자 테린 완결</h2>
                                    <div class="complete-pairing-section">
                                        <div class="pairing-title">RECOMMENDED PAIRING DRINK</div>
                                        <div class="pairing-drinks">
                                            <span class="drink-tag"><i class="fa-solid fa-mug-hot"></i> 아메리카노</span>
                                            <span class="drink-tag"><i class="fa-solid fa-leaf"></i> 따뜻한 녹차</span>
                                            <span class="drink-tag"><i class="fa-solid fa-mug-saucer"></i> 구수한 우롱차</span>
                                            <span class="drink-tag"><i class="fa-solid fa-glass-water"></i> 카페 라떼</span>
                                        </div>
                                    </div>
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

        lookbookCurrentPage = 1;
        updateLookbookUI();
        playSoundFocus();

        // 4. 페이드인 활성화
        setTimeout(() => {
            lookbookOverlay.classList.add('active');
        }, 50);

        // 5. 이벤트 및 휠 바인딩
        initLookbookEvents();
    } else {
        // 기존 룩북보기는 다른 레시피의 경우 새 탭 연결
        if (recipe.path) {
            window.open(recipe.path, '_blank');
        } else {
            alert('룩북 페이지 준비 중입니다.');
        }
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
    if (lookbookCurrentPage === 2) {
        const valElements = document.querySelectorAll('.lookbook-analysis-item .value');
        if (valElements.length >= 3) {
            animateNumber(valElements[0], 0, 95, 1200, '%');
            animateNumber(valElements[1], 0, 90, 1200, '%');
            animateNumber(valElements[2], 0, 98, 1200, '%');
        }
    } else if (lookbookCurrentPage === 3) {
        const percentageEl = document.querySelector('.lookbook-process-loader .loader-percentage');
        const tempEl = document.querySelector('.lookbook-process-loader .loader-temp-val');
        if (percentageEl) {
            animateNumber(percentageEl, 0, 100, 1500, '%');
        }
        if (tempEl) {
            animateNumber(tempEl, 25, 140, 1500, '℃', 'TEMP: ');
        }
    }
}

// requestAnimationFrame 기반 부드러운 숫자 업 카운팅 모션 함수
function animateNumber(element, start, end, duration, suffix = '', prefix = '') {
    if (!element) return;
    let startTime = null;
    let lastValue = start;
    function update(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.innerText = prefix + current + suffix;

        if (current !== lastValue) {
            playSoundCount();
            lastValue = current;
        }

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
        playSoundTick();
    }
}

function goLookbookPage(pageNum) {
    if (pageNum >= 1 && pageNum <= lookbookTotalPages) {
        lookbookCurrentPage = pageNum;
        updateLookbookUI();
        playSoundTick();
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
    playSoundTick();
    
    // popstate가 아닐 때에만 브라우저 뒤로가기 실행 (가상 라우팅 원복)
    if (!isFromPopstate) {
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

// ==========================================================================
// Web Audio API 기반 쿡방 테크니컬 효과음 신시사이저
// ==========================================================================
let audioCtx = null;
let lastSoundTime = 0;

function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
}

// 페이지 전환 시 경쾌한 스위치 틱! 소리
function playSoundTick() {
    try {
        const ctx = getAudioContext();
        if (ctx.state === 'suspended') {
            ctx.resume();
        }
        if (ctx.state === 'suspended') return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.06);

        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.06);

        osc.start();
        osc.stop(ctx.currentTime + 0.06);
    } catch (e) {
        console.warn('Audio playSoundTick failed:', e);
    }
}

// 1페이지 오프닝 카메라 초점(지이잉) + 삐빅 셔터 효과음
function playSoundFocus() {
    try {
        const ctx = getAudioContext();
        if (ctx.state === 'suspended') {
            ctx.resume();
        }
        if (ctx.state === 'suspended') return;

        // 1. 오토포커싱 지이잉 소리 (가상 모터음)
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.connect(gain1);
        gain1.connect(ctx.destination);

        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(120, ctx.currentTime);
        osc1.frequency.linearRampToValueAtTime(320, ctx.currentTime + 0.4);

        gain1.gain.setValueAtTime(0.02, ctx.currentTime);
        gain1.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.4);

        osc1.start();
        osc1.stop(ctx.currentTime + 0.4);

        // 2. 삐빅 초점 고정 신호음 (오픈 후 0.4초 뒤에 재생)
        setTimeout(() => {
            try {
                const osc2 = ctx.createOscillator();
                const gain2 = ctx.createGain();
                osc2.connect(gain2);
                gain2.connect(ctx.destination);

                osc2.type = 'sine';
                osc2.frequency.setValueAtTime(1000, ctx.currentTime);
                osc2.frequency.setValueAtTime(1000, ctx.currentTime + 0.08);

                gain2.gain.setValueAtTime(0.03, ctx.currentTime);
                gain2.gain.setValueAtTime(0.03, ctx.currentTime + 0.08);
                gain2.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.16);

                osc2.start();
                osc2.stop(ctx.currentTime + 0.16);
            } catch(err){}
        }, 400);

    } catch (e) {
        console.warn('Audio playSoundFocus failed:', e);
    }
}

// 2, 3페이지 수치 카운트업 테크니컬 스캔음
function playSoundCount() {
    try {
        const now = Date.now();
        if (now - lastSoundTime < 45) return; // 45ms 간격 제어
        lastSoundTime = now;

        const ctx = getAudioContext();
        if (ctx.state === 'suspended') return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(2200, ctx.currentTime); // 매우 높은 주파수의 짧은 비프

        gain.gain.setValueAtTime(0.012, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.02);

        osc.start();
        osc.stop(ctx.currentTime + 0.02);
    } catch (e) {
        // 실패 시 침묵
    }
}

// 사용자 첫 상호작용 시 AudioContext 활성화 바인딩
document.addEventListener('click', () => {
    try {
        const ctx = getAudioContext();
        if (ctx && ctx.state === 'suspended') {
            ctx.resume();
        }
    } catch(e){}
}, { once: true });

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

// popstate 리스너 등록 (뒤로가기 시 룩북 닫기 연동)
window.addEventListener('popstate', (e) => {
    const lookbookOverlay = document.getElementById('lookbook-overlay');
    if (lookbookOverlay) {
        // 현재 브라우저 히스토리 상태가 룩북이 아니라면 닫기 수행
        closeLookbook(true);
    }
});

