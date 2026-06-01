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

    // 포털 대시보드 렌더링 (dubu_data.js의 PROJECTS, EVENTS 배열 사용)
    if (typeof PROJECTS !== 'undefined' && typeof EVENTS !== 'undefined') {
        renderDashboard();
    }

    // Smooth Scroll 바인딩
    document.querySelectorAll('.nav-links a').forEach(anchor => {
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
    const navLinks = document.querySelectorAll('.nav-links a');
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
// 3. 포털 대시보드 렌더링
// ==========================================================================
function renderDashboard() {
    const featuredContainer = document.getElementById('featured-container');
    const archiveContainer = document.getElementById('archive-container');
    const eventsContainer = document.getElementById('events-container');

    if (!featuredContainer || !archiveContainer || !eventsContainer) return;

    // ID 역순 정렬 (높은 숫자가 최신)
    const sortedProjects = [...PROJECTS].sort((a, b) => b.id - a.id);

    // 최신 2개는 Featured
    const featured = sortedProjects.slice(0, 2);
    // 나머지는 Archive
    const archive = sortedProjects.slice(2);

    // Featured 렌더링
    featuredContainer.innerHTML = featured.map((p, index) => `
        <a href="${p.isInteractive ? `javascript:openFocusStage(${p.id})` : p.path}" class="lookbook-card group fade-in-up" style="animation-delay: ${index * 0.2}s">
            <div class="card-img">
                <img src="${p.img}" alt="${p.title}">
            </div>
            <div class="card-body">
                <div class="card-tag">Vol. ${p.id}</div>
                <h2 class="card-title serif">${p.title}</h2>
                <p class="card-desc">${p.desc}</p>
            </div>
        </a>
    `).join('');

    // Events 렌더링
    eventsContainer.innerHTML = EVENTS.map((e, index) => `
        <${e.isReady ? `a href="${e.path}"` : 'div'} class="event-card group ${!e.isReady ? 'locked' : ''} fade-in-up" style="animation-delay: ${0.2 + (index * 0.1)}s">
            <div class="event-month">${e.month}</div>
            <div class="event-icon">${e.icon}</div>
            <div class="event-title serif">${e.title}</div>
            <div class="event-status">${e.isReady ? 'VIEW' : 'COMING SOON'}</div>
        </${e.isReady ? 'a' : 'div'}>
    `).join('');

    // Archive 렌더링
    archiveContainer.innerHTML = archive.map((p, index) => `
        <div class="archive-item fade-in-up" style="animation-delay: ${0.4 + (index * 0.05)}s">
            ${p.id}. 
            ${p.isInteractive
                ? `<a href="javascript:openFocusStage(${p.id})" class="hover:underline decoration-dotted font-semibold text-chocolate">${p.title} <span style="font-size: 0.7rem; color: var(--dubu-mint-accent);">[자동계산기]</span></a>`
                : p.blogUrl
                    ? `<a href="${p.blogUrl}" target="_blank" class="hover:underline decoration-dotted">${p.title}</a>`
                    : p.title
            }
            ${p.isInteractive && p.blogUrl ? `<a href="${p.blogUrl}" target="_blank" class="ml-2 text-[8px] uppercase tracking-widest text-[#D1C7BC] hover:text-[#1F1A17] transition-colors underline decoration-dotted">Blog</a>` : ''}
            ${p.calcPath ? `<a href="${p.calcPath}" class="ml-2 text-[10px] px-2 py-0.5 border border-[#D1C7BC] rounded-full hover:bg-[#1F1A17] hover:text-white transition-colors">자동계산기</a>` : ''}
        </div>
    `).join('');
}

// ==========================================================================
// 4. Atelier Focus Stage (몰입형 3D 계산기 및 3대 감성 탭)
// ==========================================================================
function getRecipeTheme(recipe) {
    if (!recipe) {
        return {
            themeColor: '#3a1d11',
            themeGlow: 'rgba(197, 160, 89, 0.15)',
            accentColor: '#c5a059',
            spineColor1: '#251109',
            spineColor2: '#3a1d11',
            spineTextColor: '#ebd090'
        };
    }

    const id = Number(recipe.id);
    const path = recipe.path || '';
    const categories = recipe.categories || [];
    const title = recipe.title || '';

    // 1. 크리스마스 / 성탄절
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
            themeColor: '#0e4a27',
            themeGlow: 'rgba(15, 74, 41, 0.35)',
            accentColor: '#e5a93b',
            spineColor1: '#072513',
            spineColor2: '#0e4a27',
            spineTextColor: '#ffd79e'
        };
    }

    // 2. 할로윈
    const isHalloween = 
        path.includes('할로윈') || 
        title.includes('단호박') || 
        [4, 15, 18, 9].includes(id);

    if (isHalloween) {
        return {
            themeColor: '#4d1d59',
            themeGlow: 'rgba(141, 45, 171, 0.35)',
            accentColor: '#ffd700',
            spineColor1: '#2c0e35',
            spineColor2: '#4d1d59',
            spineTextColor: '#eed5ff'
        };
    }

    // 3. 발렌타인데이 / 화이트데이 / 로맨틱 테마
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
                themeColor: '#6c1524',
                themeGlow: 'rgba(197, 43, 71, 0.22)',
                accentColor: '#fcc2cd',
                spineColor1: '#3d0a13',
                spineColor2: '#6c1524',
                spineTextColor: '#ffe6eb'
            };
        } else {
            return {
                themeColor: '#5c382f',
                themeGlow: 'rgba(224, 143, 126, 0.2)',
                accentColor: '#fcd3c1',
                spineColor1: '#361f19',
                spineColor2: '#5c382f',
                spineTextColor: '#fff0eb'
            };
        }
    }

    // 4. 설날-추석 / 명절 / 전통 감성 테마
    const isTraditional = 
        path.includes('명절') || 
        path.includes('수능') || 
        title.includes('흑임자') || 
        title.includes('쑥') || 
        title.includes('단팥') || 
        title.includes('모찌') || 
        categories.includes('nostalgia') || 
        [39, 38, 17, 16, 33, 8, 35, 12, 11].includes(id);

    if (isTraditional) {
        if (title.includes('쑥') || categories.includes('soymilk')) {
            return {
                themeColor: '#2b3d2b',
                themeGlow: 'rgba(85, 125, 85, 0.2)',
                accentColor: '#d6cba0',
                spineColor1: '#172417',
                spineColor2: '#2b3d2b',
                spineTextColor: '#e5debf'
            };
        } else {
            return {
                themeColor: '#614023',
                themeGlow: 'rgba(189, 131, 79, 0.2)',
                accentColor: '#e0c897',
                spineColor1: '#3b2512',
                spineColor2: '#614023',
                spineTextColor: '#ebdaba'
            };
        }
    }

    // 5. 카테고리별 테마
    if (categories.includes('creamy')) {
        return {
            themeColor: '#163b32',
            themeGlow: 'rgba(40, 117, 99, 0.18)',
            accentColor: '#e5d1a8',
            spineColor1: '#0a211b',
            spineColor2: '#163b32',
            spineTextColor: '#ebdcb8'
        };
    }
    if (categories.includes('cloud')) {
        return {
            themeColor: '#2c2e4f',
            themeGlow: 'rgba(84, 91, 158, 0.18)',
            accentColor: '#dfd2e5',
            spineColor1: '#181930',
            spineColor2: '#2c2e4f',
            spineTextColor: '#eae1ed'
        };
    }
    if (categories.includes('fudgy')) {
        return {
            themeColor: '#4f271a',
            themeGlow: 'rgba(145, 75, 51, 0.18)',
            accentColor: '#f0dfbe',
            spineColor1: '#2b140c',
            spineColor2: '#4f271a',
            spineTextColor: '#faedd2'
        };
    }
    if (categories.includes('teatime')) {
        return {
            themeColor: '#5c4b26',
            themeGlow: 'rgba(163, 134, 72, 0.18)',
            accentColor: '#f2e5bc',
            spineColor1: '#362b14',
            spineColor2: '#5c4b26',
            spineTextColor: '#faf3d9'
        };
    }

    return {
        themeColor: '#3a1d11',
        themeGlow: 'rgba(197, 160, 89, 0.15)',
        accentColor: '#c5a059',
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
    const overlay = document.getElementById('atelier-focus-overlay');
    if (!overlay) return;

    const theme = getRecipeTheme(recipe);

    const board = overlay.querySelector('.atelier-focus-board');
    if (board) {
        board.classList.add('magic-book-theme');
        board.style.setProperty('--magic-book-color', theme.themeColor);
        board.style.setProperty('--magic-book-glow', theme.themeGlow);
        board.style.setProperty('--magic-book-accent', theme.accentColor);
    }

    // 첫 번째 탭으로 리셋
    switchFocusTab('calc');

    // 1. 화보 세팅
    document.getElementById('focus-recipe-img').src = recipe.img;
    const titleEl = document.getElementById('focus-recipe-title');
    titleEl.innerText = recipe.title;

    if (theme) {
        titleEl.style.color = theme.themeColor;
        const diffPill = document.getElementById('focus-recipe-difficulty');
        if (diffPill) {
            diffPill.style.backgroundColor = theme.themeGlow;
            diffPill.style.color = theme.themeColor;
            diffPill.style.borderColor = theme.themeColor;
        }
    }

    // 2. 가이드 데이터 바인딩
    const meta = getRecipeMetadata(recipeId);

    const cheersEl = document.getElementById('focus-recipe-cheers');
    if (cheersEl) cheersEl.innerText = meta.cheers;

    const diffPill = document.getElementById('focus-recipe-difficulty');
    if (diffPill) diffPill.innerText = meta.difficulty;

    // 문제 해결(Q&A) 탭 바인딩
    const troubleContent = document.getElementById('focus-tab-trouble-content');
    if (troubleContent) {
        const rawTrouble = recipe.troubleShoot || "";
        let troubleHTML = "";
        if (rawTrouble.includes("Q.") && rawTrouble.includes("A.")) {
            const parts = rawTrouble.split("<br>");
            const qText = parts[0].replace("Q.", "").trim();
            const aText = parts[1] ? parts[1].replace("A.", "").trim() : "";

            troubleHTML = `
                <div class="trouble-qa-card" style="display: flex; flex-direction: column; gap: 10px;">
                    <div class="trouble-question" style="font-weight: 700; color: #D32F2F; margin-bottom: 4px; font-size: 0.88rem; display: flex; align-items: flex-start; gap: 8px;">
                        <span style="background: #E53935; color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.68rem; font-family: var(--font-playfair), serif; font-weight: 900; line-height: 1; margin-top: 2px;">Q</span>
                        <span style="word-break: keep-all; line-height: 1.4;">${qText}</span>
                    </div>
                    <div class="trouble-answer" style="background: white; border: 1px solid rgba(58, 105, 88, 0.12); border-radius: 8px; padding: 12px; font-size: 0.8rem; color: #2C3E50; line-height: 1.6; display: flex; align-items: flex-start; gap: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.02);">
                        <span style="background: var(--dubu-mint-accent); color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.68rem; font-family: var(--font-playfair), serif; font-weight: 900; line-height: 1; margin-top: 2px;">A</span>
                        <span style="word-break: keep-all; font-weight: 500;">${aText}</span>
                    </div>
                </div>
            `;
        } else {
            troubleHTML = `
                <div class="no-troubles" style="text-align: center; color: #7f8c8d; font-size: 0.85rem; padding: 20px 0; display: flex; flex-direction: column; gap: 8px; width: 100%;">
                    <i class="fa-solid fa-circle-check" style="font-size: 1.5rem; color: var(--dubu-mint-accent);"></i>
                    <span>이 레시피는 특별한 실패 유의사항이 접수되지 않았습니다. 기본 계량과 온도를 잘 지켜주시면 성공입니다!</span>
                </div>
            `;
        }
        troubleContent.innerHTML = troubleHTML;
    }

    // 3. 재료 목록 세팅 (첫 번째 재료는 내 순두부 양으로 하이라이트)
    const ingredients = INGREDIENT_DICT[recipeId] || [
        { name: "순두부 베이스", base: 100 },
        { name: "박력분 / 대체분", base: 100 },
        { name: "유기농 설탕", base: 50 }
    ];

    const anchorIngredient = ingredients[0];
    document.getElementById('focus-anchor-label').innerText = anchorIngredient.name;

    const anchorInput = document.getElementById('focus-anchor-input');
    anchorInput.value = anchorIngredient.base;
    anchorInput.setAttribute('data-base', anchorIngredient.base);

    // 순두부 앵커 체크박스 초기화
    const anchorParent = document.querySelector('.primary-anchor-box');
    if (anchorParent) {
        anchorParent.classList.remove('checked-row');
        const circle = anchorParent.querySelector('.ing-check-circle');
        if (circle) circle.classList.remove('checked');
    }

    // 나머지 재료들 리스트화
    const listContainer = document.getElementById('focus-ingredients-list');
    listContainer.innerHTML = '';

    for (let i = 1; i < ingredients.length; i++) {
        const ing = ingredients[i];
        const row = document.createElement('div');
        row.className = 'focus-ingredient-calc-row';
        row.innerHTML = `
            <div class="ing-check-circle" onclick="toggleIngCheck(this)"></div>
            <span class="focus-ing-name">${ing.name}</span>
            <div class="focus-ing-input-wrapper">
                <input type="number" class="focus-ing-input focus-sub-input" 
                       data-base="${ing.base}" 
                       value="${ing.base}" 
                       readonly>
                <span class="focus-ing-unit">g</span>
            </div>
        `;
        listContainer.appendChild(row);
    }

    // 4. 동적 순서 타임라인 빌드
    const stepsList = RECIPE_STEPS_DB[recipeId] || [
        { title: "준비하기", time: "5분", desc: "재료를 계량하고 오븐을 예열합니다." }
    ];
    const timelineContainer = document.getElementById('focus-steps-timeline');
    if (timelineContainer) {
        timelineContainer.innerHTML = stepsList.map((step, idx) => {
            return `
                <div class="timeline-step-item" data-step-idx="${idx}" onclick="toggleTimelineStepComplete(this, ${stepsList.length})">
                    <div class="step-num-circle">
                        <span class="step-num-text">${idx + 1}</span>
                        <i class="fa-solid fa-check step-check-icon" style="display: none; font-size: 0.75rem; color: white;"></i>
                    </div>
                    <div class="step-content-box">
                        <div class="step-header-row" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                            <h4 class="step-title-text" style="margin: 0; font-weight: 700; color: #3a1d11;">${step.title}</h4>
                            <span class="step-time-pill" style="font-size: 0.75rem; background: rgba(58,105,88,0.08); padding: 2px 8px; border-radius: 12px; color: #163b32;"><i class="fa-regular fa-clock"></i> ${step.time}</span>
                        </div>
                        <p class="step-desc-text" style="margin: 5px 0 0 0; font-size: 0.82rem; color: #555; line-height: 1.4;">${step.desc}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    // 진행률 게이지 리셋
    resetTimelineProgress(stepsList.length);

    // 5. 레시피 다운로드 & 공유 버튼 이벤트 바인딩
    document.getElementById('focus-btn-download').onclick = () => {
        issueRecipeCardFromFocus(recipeId, recipe.title, recipe.img, meta.difficulty, meta.bakingTip, meta.cheers);
    };

    const shareBtn = document.getElementById('focus-btn-share');
    if (shareBtn) {
        shareBtn.onclick = (e) => {
            shareRecipe(e, recipe.title);
        };
    }

    // 블로그 버튼 연동
    const blogBtn = document.getElementById('focus-btn-blog');
    if (blogBtn) {
        if (recipe.blogUrl) {
            blogBtn.href = recipe.blogUrl;
            blogBtn.style.opacity = '1';
            blogBtn.style.pointerEvents = 'auto';
            blogBtn.target = '_blank';
        } else {
            blogBtn.href = '#';
            blogBtn.style.opacity = '0.45';
            blogBtn.style.pointerEvents = 'none';
        }
    }

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function toggleIngCheck(circleEl) {
    circleEl.classList.toggle('checked');
    const parent = circleEl.closest('.focus-ingredient-calc-row') || circleEl.closest('.primary-anchor-box');
    if (parent) {
        parent.classList.toggle('checked-row');
    }
}

function switchFocusTab(tabId) {
    const tabCalcBtn = document.getElementById('btn-tab-calc');
    const tabStepsBtn = document.getElementById('btn-tab-steps');
    const tabTroubleBtn = document.getElementById('btn-tab-trouble');

    const contentCalc = document.getElementById('focus-tab-calc-content');
    const contentSteps = document.getElementById('focus-tab-steps-content');
    const contentTrouble = document.getElementById('focus-tab-trouble-content');

    if (!tabCalcBtn || !tabStepsBtn || !tabTroubleBtn || !contentCalc || !contentSteps || !contentTrouble) return;

    tabCalcBtn.classList.remove('active');
    tabStepsBtn.classList.remove('active');
    tabTroubleBtn.classList.remove('active');

    contentCalc.style.display = 'none';
    contentSteps.style.display = 'none';
    contentTrouble.style.display = 'none';

    if (tabId === 'calc') {
        tabCalcBtn.classList.add('active');
        contentCalc.style.display = 'flex';
    } else if (tabId === 'steps') {
        tabStepsBtn.classList.add('active');
        contentSteps.style.display = 'flex';
    } else if (tabId === 'trouble') {
        tabTroubleBtn.classList.add('active');
        contentTrouble.style.display = 'flex';
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
    const textEl = document.getElementById('focus-progress-text');
    const barEl = document.getElementById('focus-progress-bar');
    if (textEl && barEl) {
        textEl.innerText = `0 / ${totalSteps} 단계 완료 (0%)`;
        barEl.style.width = '0%';
    }
}

function updateTimelineProgress(timelineContainer, totalSteps) {
    const completedCount = timelineContainer.querySelectorAll('.timeline-step-item.completed').length;
    const percent = Math.round((completedCount / totalSteps) * 100);

    const textEl = document.getElementById('focus-progress-text');
    const barEl = document.getElementById('focus-progress-bar');
    if (textEl && barEl) {
        textEl.innerText = `${completedCount} / ${totalSteps} 단계 완료 (${percent}%)`;
        barEl.style.width = `${percent}%`;
    }

    if (percent === 100) {
        triggerPageConfetti();
    }
}

function closeFocusStage() {
    const overlay = document.getElementById('atelier-focus-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ==========================================================================
// 5. 역비례 & 다중 앵커 양방향 비례 연산 (Atelier Scale)
// ==========================================================================
const BASE_YIELDS = {
    40: { template: "오란다 대 틀 {x}개 분량 🍞", baseCount: 1 },
    39: { template: "찰떡브라우니 {x}판 분량 🌿", baseCount: 1 },
    36: { template: "화이트 바크초콜릿 {x}판 분량 🍫", baseCount: 1 },
    31: { template: "티라미수 {x}컵 분량 🍮", baseCount: 2 },
    28: { template: "모찌떡 케이크 {x}호 1개 분량 🎂", baseCount: 1 },
    18: { template: "코코넛 단팥구움바 {x}개 분량 🥥", baseCount: 4 }
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
    const diffPill = document.getElementById('focus-recipe-difficulty');
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
    const inputs = document.querySelectorAll('.focus-sub-input');

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
    const recipe = PROJECTS.find(p => p.id === Number(recipeId));
    let difficulty = "보통 🟡";
    let bakingTip = "오븐 예열 170℃ / 25분";
    let cheers = "오늘 내 손끝으로 빚는 건강한 두부 베이킹, 설레는 시작입니다! ✨";

    if (recipe) {
        if (recipe.id === 40) {
            difficulty = "오란다 대 3개 분량 🍞";
            bakingTip = "180°C 예열 → 170°C / 40분 (콩물 마무리 + 하루 숙성 권장)";
            cheers = "다음 날이 진짜입니다! 하루 숙성 후 먹는 그 촉촉함과 고소함은 레시피의 진짜 얼굴이에요. ☀️";
        } else if (recipe.id === 39) {
            difficulty = "오란다 대 틀 1개 분량 🍞";
            bakingTip = "중탕 예열 150℃ / 140℃ 60분 (뜸 10분)";
            cheers = "순두부 물기를 짜지 않고 그대로 사용하여, 촉촉함과 꾸덕함이 극대화되는 특별한 레시피입니다. 🖤";
        } else if (recipe.id === 38) {
            difficulty = "보통 🟡";
            bakingTip = "오븐 예열 180℃ / 160℃ 30~35분";
            cheers = "향긋한 쑥과 찰기가 만든 한국적 쫀득함! 부모님 선물용 부동의 1위 레시피랍니다. 🌿";
        } else if (recipe.id === 37) {
            difficulty = "쉬움 🟢";
            bakingTip = "오븐 예열 165℃ / 25분";
            cheers = "단 한 방울의 수분도 허용하지 않는 수분 박멸 비법으로 완성하는 극강의 바삭함! 💝";
        } else if (recipe.id === 36) {
            difficulty = "쉬움 🟢";
            bakingTip = "냉장실 냉각 / 4시간";
            cheers = "사르르 사그라지는 두부 크림의 극상 부드러움! 컵에 소복히 담으면 더욱 기쁩니다. 🍮";
        } else if (recipe.id === 35) {
            difficulty = "어려움 🔴";
            bakingTip = "오븐 예열 180℃ / 160℃ 50~55분";
            cheers = "명절의 기품을 한껏 높여주는 굳지 않는 비법 모찌떡케이크, 정성으로 완성해 보아요! 🧧";
        } else if (recipe.id === 17) {
            difficulty = "쉬움 🟢";
            bakingTip = "오븐 예열 170℃ / 25분";
            cheers = "코코넛의 바삭함과 단팥의 든든함! 가벼운 등산이나 소풍 가기 전 최고의 영양 간식입니다. 🥥";
        }
    }
    return { difficulty, bakingTip, cheers };
}

function updateDynamicBakingTip(recipeId, scale) {
    const meta = getRecipeMetadata(recipeId);
    const cheersEl = document.getElementById('focus-recipe-cheers');
    if (cheersEl) {
        cheersEl.innerText = meta.cheers;
    }
}

// ==========================================================================
// 6. 레시피 카드 발행 & 다운로드 & 공유
// ==========================================================================
function issueRecipeCardFromFocus(recipeId, title, img, difficulty, bakingTip, cheers) {
    const anchorLabel = document.getElementById('focus-anchor-label')?.innerText || '';
    const anchorInput = document.getElementById('focus-anchor-input');
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
            <div style="text-align: center; margin-bottom: 15px; position: relative;">
                <h3 style="color: #3A1D11; font-size: 1.25rem; margin: 0 0 5px 0; font-weight: 900; letter-spacing: 1px;">ATELIER RECIPE CARD</h3>
                <span style="font-size: 0.7rem; color: #7F8C8D; letter-spacing: 2px;">PROJECT DUBU</span>
                <button onclick="closeRecipeCardModal()" style="position: absolute; right: -10px; top: -10px; background: none; border: none; font-size: 1.5rem; color: #7F8C8D; cursor: pointer; outline: none;">&times;</button>
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

    const anchorLabel = document.getElementById('focus-anchor-label')?.innerText || '';
    const anchorInput = document.getElementById('focus-anchor-input');
    const anchorValue = anchorInput ? anchorInput.value : '';

    let ingredientText = '';
    if (anchorLabel && anchorValue) {
        ingredientText += `- ${anchorLabel}: ${anchorValue}g\n`;
    }

    const rows = document.querySelectorAll('.focus-ingredient-calc-row');
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

    const yieldEl = document.getElementById('focus-recipe-difficulty');
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
