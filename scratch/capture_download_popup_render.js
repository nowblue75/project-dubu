const { chromium } = require('playwright');

(async () => {
    // 1. 브라우저 실행 및 페이지 생성
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1280, height: 1024 } });
    
    // 2. Render 서버 주소로 진입
    console.log("Navigating to Render server https://project-dubu.onrender.com");
    await page.goto('https://project-dubu.onrender.com/');
    
    // openFocusStage 함수가 전역에 바인딩되어 사용할 수 있을 때까지 대기 (최대 30초)
    console.log("Waiting for openFocusStage function to be defined on page...");
    await page.waitForFunction(() => typeof openFocusStage === 'function', { timeout: 30000 });
    
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
    const outputPath = 'C:/Users/USER/.gemini/antigravity/brain/2fb671e4-82f0-4f72-b064-4abc1e20b32d/recipe_popup_above_modal_render.png';
    await page.screenshot({ path: outputPath });
    console.log("Screenshot saved to " + outputPath);
    
    await browser.close();
})();
