const { chromium } = require('playwright');

(async () => {
    // 1. 브라우저 실행 및 페이지 생성
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1280, height: 1024 } });
    
    // 2. 로컬 개발 서버 주소로 진입
    console.log("Navigating to local server http://localhost:8080");
    await page.goto('http://localhost:8080/');
    await page.waitForTimeout(2000);
    
    // 3. openFocusStage(37) 호출하여 37번 레시피 상세 모달 열기
    console.log("Opening recipe detail stage for recipe ID 37");
    await page.evaluate(() => {
        openFocusStage(37);
    });
    await page.waitForTimeout(2000); // 모달 트랜지션 대기
    
    // 4. 소장하기 버튼 (#focus-btn-download) 클릭 트리거
    console.log("Clicking recipe download button");
    await page.click('#focus-btn-download');
    await page.waitForTimeout(2000); // 팝업 모달 트랜지션 대기
    
    // 5. 스크린샷 캡처 및 저장
    const outputPath = 'C:/Users/USER/.gemini/antigravity/brain/2fb671e4-82f0-4f72-b064-4abc1e20b32d/recipe_popup_above_modal_local.png';
    await page.screenshot({ path: outputPath });
    console.log("Screenshot saved to " + outputPath);
    
    await browser.close();
})();
