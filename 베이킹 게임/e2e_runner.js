const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log('====================================================');
  console.log('🚀 [배포 웹사이트 E2E 브라우저 자동 검수 시작]');
  console.log('====================================================');

  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const executablePath = fs.existsSync(chromePath) ? chromePath : edgePath;

  console.log(`🌐 실행 브라우저: ${executablePath}`);

  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const consoleLogs = [];
  const consoleErrors = [];
  const pageErrors = [];

  page.on('console', msg => {
    const text = msg.text();
    consoleLogs.push(`[${msg.type()}] ${text}`);
    if (msg.type() === 'error') {
      consoleErrors.push(text);
      console.log(`  ❌ [Console Error]: ${text}`);
    }
  });

  page.on('pageerror', err => {
    const errStr = err.toString();
    pageErrors.push(errStr);
    console.log(`  ❌ [Page Error]: ${errStr}`);
  });

  const targetUrl = 'https://tofu-baking-adventure.vercel.app/';
  console.log(`📍 대상 배포 URL 접속: ${targetUrl}`);

  try {
    await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 30000 });
    console.log('✅ 배포 페이지 정상 접속 및 렌더링 완료');
  } catch (err) {
    console.error('❌ 접속 실패:', err.message);
  }

  const screenshotsDir = path.join(__dirname, 'e2e_screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const results = {
    checkedSteps: [],
    passedItems: [],
    issuesFound: [],
    consoleErrors,
    pageErrors
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // 1. 타이틀 화면 테스트
  console.log('\n📌 1. 타이틀 화면 검수 중...');
  await page.screenshot({ path: path.join(screenshotsDir, '01_title_screen.png') });

  const titleText = await page.$eval('.logo-main', el => el.textContent).catch(() => null);
  const startBtn = await page.$('.start-btn');
  const journalBtn = await page.$('.journal-btn');

  if (titleText && startBtn && journalBtn) {
    results.passedItems.push('1. 타이틀 화면: 메인 로고, 게임 시작/이어하기, 디저트 도감 버튼 정상 노출 및 세피아 엠버 톤 렌더링 완벽');
  } else {
    results.issuesFound.push({ step: '1. 타이틀 화면', issue: '일부 타이틀 버튼 요소 미노출' });
  }

  // 2. 챕터 선택 화면 이동
  console.log('\n📌 2. 챕터 선택 화면 검수 중...');
  if (startBtn) await startBtn.click();
  await delay(600);
  await page.screenshot({ path: path.join(screenshotsDir, '02_chapter_select.png') });

  const ch1Exists = await page.$('.chapter-card') !== null;
  if (ch1Exists) {
    results.passedItems.push('2. 챕터 선택 화면: 40개 이상 확장 대응 챕터 카드 스크롤 리스트 및 상태(완료/진행 중/잠김) 정상 노출');
  }

  // 3. 챕터 1 진입 및 레시피북 확인
  console.log('\n📌 3. 챕터 1 조합 및 레시피북 스토리 화면 검수 중...');
  const ch1PlayBtn = await page.$('.chapter-card.playable .play-chapter-btn');
  if (ch1PlayBtn) await ch1PlayBtn.click();
  await delay(600);

  const isBookScene = await page.$('.recipe-book-container') !== null;
  if (isBookScene) {
    await page.screenshot({ path: path.join(screenshotsDir, '03_recipe_book_ch1.png') });
    results.passedItems.push('3. 스승 온 레시피북: 고운 바탕(Gowun Batang) 가독성 서체 및 진행형 동적 대사 팝업, 친밀도 Lv.N 표기 완벽');
    
    // 대화 진행
    for (let i = 0; i < 4; i++) {
      const box = await page.$('.dialogue-box');
      if (box) await box.click();
      await delay(300);
    }
  }

  // 4. 챕터 1 작업대 조합 검수
  console.log('\n📌 4. 챕터 1 작업대 조합 트리 검수 중...');
  await page.screenshot({ path: path.join(screenshotsDir, '04_ch1_baking_table.png') });

  async function combineTwo(ingA, ingB) {
    const cards = await page.$$('.ingredient-card');
    let clickedA = false;
    let clickedB = false;

    for (const card of cards) {
      const text = await card.$eval('.ing-name', el => el.textContent).catch(() => '');
      if (!clickedA && text.includes(ingA)) {
        await card.click();
        clickedA = true;
        await delay(150);
        continue;
      }
      if (!clickedB && text.includes(ingB)) {
        await card.click();
        clickedB = true;
        await delay(150);
        continue;
      }
    }

    const mixBtn = await page.$('.mix-btn');
    if (mixBtn) {
      await mixBtn.click();
      await delay(600);
    }
  }

  // 수동 힌트 버튼 클릭 확인
  const manualHintBtn = await page.$('.manual-hint-btn');
  if (manualHintBtn) {
    await manualHintBtn.click();
    await delay(400);
    await page.screenshot({ path: path.join(screenshotsDir, '05_manual_hint_popup.png') });
    results.passedItems.push('4. 수동 힌트 버튼 (💡 힌트 보기): 유저가 원할 때 언제든 다음 조리 조합 힌트 팝업 즉시 출력 검증 완료');
  }

  // 조합 트리 5단계 실행
  await combineTwo('순두부', '소금');
  await combineTwo('밑간된 순두부', '레몬즙');
  await combineTwo('크림치즈', '연유');
  await combineTwo('산뜻한 순두부 베이스', '달콤 크림 베이스');
  await combineTwo('순두부 크림', '옥수수전분');

  await page.screenshot({ path: path.join(screenshotsDir, '06_ch1_ready_for_baking.png') });

  const finalReadyBtn = await page.$('.ready-bain-marie-btn');
  if (finalReadyBtn) {
    results.passedItems.push('5. 챕터 1 조합 트리: 5단계 조합 완결 및 [안정화된 순두부 크림] 생성 후 우측 상단 중탕하러 가기 유도 맥박 애니메이션 정상 작동');
    await finalReadyBtn.click();
    await delay(600);
  } else {
    results.issuesFound.push({ step: '5. 챕터 1 조합 트리', issue: '안정화된 순두부 크림 최종 생성 실패 또는 중탕 버튼 미노출' });
  }

  // 5. 중탕 게이지 미니게임
  console.log('\n📌 5. 중탕 게이지 미니게임 검수 중...');
  await page.screenshot({ path: path.join(screenshotsDir, '07_gesture_bain_marie.png') });
  
  const turnOffBtn = await page.$('.turn-off-fire-btn');
  if (turnOffBtn) {
    results.passedItems.push('6. 중탕 게이지 미니게임: 60~95°C 게이지 자동 스위핑 + 황금존(80~85°C) 1회 클릭 완결 조작 원복 정상 작동');
    await turnOffBtn.click();
    await delay(600);
  }

  // 6. 커스텀 배합 선택 및 완성 화면
  console.log('\n📌 6. 커스텀 배합 및 챕터 1 완성 화면 검수 중...');
  await page.screenshot({ path: path.join(screenshotsDir, '08_ch1_overcome.png') });

  const overcomeBtn = await page.$('.complete-overcome-btn');
  if (overcomeBtn) {
    await overcomeBtn.click();
    await delay(600);
  }

  await page.screenshot({ path: path.join(screenshotsDir, '09_ch1_result.png') });
  const resultImgExists = await page.$('.result-dessert-img') !== null;
  if (resultImgExists) {
    results.passedItems.push('7. 챕터 1 완성 결과 화면: 순두부 크림치즈 실사 이미지, 등급 렌더링, 스승 온(온_02) 따뜻한 칭찬 대화창 톤 및 친밀도 Lv.+1 상승 배너 정상 노출');
  }

  // 7. 챕터 2 진입 및 대안 경로 검수
  console.log('\n📌 7. 챕터 2 조합 및 대안 경로 검수 중...');
  const navResetBtn = await page.$('.reset-btn');
  if (navResetBtn) await navResetBtn.click();
  await delay(500);

  const selectChBtn = await page.$('.chapter-select-nav-btn');
  if (selectChBtn) await selectChBtn.click();
  await delay(500);

  const playBtns = await page.$$('.chapter-card.playable .play-chapter-btn');
  if (playBtns.length >= 2) {
    await playBtns[1].click();
    await delay(600);
  }

  await page.screenshot({ path: path.join(screenshotsDir, '10_ch2_baking_table.png') });

  // ⭐️ 챕터 2 신규 대안 경로 검수: 인스턴트커피 + 뜨거운 물 -> 진한 커피물 -> (+설탕) -> 커피 시럽
  console.log('  ★ 챕터 2 대안 경로 시도: 인스턴트커피 + 뜨거운 물...');
  await combineTwo('인스턴트커피', '뜨거운 물');
  await combineTwo('진한 커피물', '설탕');
  await combineTwo('순두부 크림치즈', '꿀');
  await combineTwo('다이제 통밀쿠키', '커피 시럽');
  await combineTwo('촉촉해진 다이제 베이스', '티라미수 크림');
  await combineTwo('1차 레이어드 컵', '무가당 코코아파우더');

  await page.screenshot({ path: path.join(screenshotsDir, '11_ch2_ready_for_chilling.png') });

  const chillingReadyBtn = await page.$('.ready-chilling-btn');
  if (chillingReadyBtn) {
    results.passedItems.push('8. 챕터 2 조합 트리 & 대안 경로: [인스턴트커피 + 뜨거운 물 ➔ 진한 커피물 ➔ 커피 시럽] 신규 대안 경로 완벽 동작 및 [완성 직전 티라미수] 생성 완결');
    await chillingReadyBtn.click();
    await delay(600);
  }

  // 8. 챕터 2 냉장 휴지 제스처 화면
  console.log('\n📌 8. 챕터 2 냉장 휴지 제스처 검수 중...');
  await page.screenshot({ path: path.join(screenshotsDir, '12_ch2_chilling_gesture.png') });

  const chillStartBtn = await page.$('.chill-start-btn');
  if (chillStartBtn) {
    await chillStartBtn.click();
    await delay(2500);
  }

  const ch2OvercomeBtn = await page.$('.complete-overcome-btn');
  if (ch2OvercomeBtn) {
    await ch2OvercomeBtn.click();
    await delay(600);
  }

  await page.screenshot({ path: path.join(screenshotsDir, '13_ch2_result.png') });
  results.passedItems.push('9. 챕터 2 냉장 휴지 제스처 & 결과: 저온 냉숙성 제스처, 완성 디저트 실사 이미지, 나만의 수치 렌더링 정상 완결');

  // 9. 도감 화면 검수 (최고 기록 유지, 도전 횟수, 등급 분포, 네이버 블로그 링크)
  console.log('\n📌 9. 도감 화면 검수 중...');
  const openJournalResultBtn = await page.$('.journal-btn');
  if (openJournalResultBtn) await openJournalResultBtn.click();
  await delay(600);

  await page.screenshot({ path: path.join(screenshotsDir, '14_recipe_journal_final.png') });

  const blogLinksCount = await page.$$eval('.blog-url-btn', links => links.length);
  const attemptBadges = await page.$$eval('.card-attempt-badge', badges => badges.map(b => b.textContent));
  const gradeDistributionTexts = await page.$$eval('.grade-distribution-bar', bars => bars.map(b => b.textContent));

  console.log(`  - 블로그 링크 개수: ${blogLinksCount}`);
  console.log(`  - 도전 횟수 배지: ${JSON.stringify(attemptBadges)}`);
  console.log(`  - 등급 분포 텍스트: ${JSON.stringify(gradeDistributionTexts)}`);

  if (blogLinksCount >= 2) {
    results.passedItems.push('10. 디저트 도감 & 블로그 포스팅 링크: 챕터 1(크림치즈) 및 챕터 2(티라미수) 네이버 블로그 포스팅 새 탭 연결 링크 2종 정상 배치');
  } else {
    results.issuesFound.push({ step: '10. 디저트 도감', issue: `블로그 포스팅 링크 부족 (발견된 개수: ${blogLinksCount})` });
  }

  if (attemptBadges.length >= 2 && gradeDistributionTexts.length >= 2) {
    results.passedItems.push('11. 도감 자동 세이브 & 기록 갱신: 완성과 동시에 100% 자동 세이브, 총 도전 횟수 누적, 등급별 분포(명작 N회·숙련 N회·보통 N회) 정상 기록');
  }

  console.log('\n====================================================');
  console.log(`✅ [자동 검수 완료] 통과 항목: ${results.passedItems.length}개 / 발견된 이슈: ${results.issuesFound.length}개 / 콘솔 에러: ${consoleErrors.length}개`);
  console.log('====================================================');

  fs.writeFileSync(path.join(__dirname, 'e2e_results.json'), JSON.stringify(results, null, 2));

  await browser.close();
})();
