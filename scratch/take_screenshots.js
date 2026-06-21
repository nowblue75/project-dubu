const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch();
    
    // 1. 데스크탑 책장 캡처 (1280x1024)
    let page = await browser.newPage({ viewport: { width: 1280, height: 1024 } });
    await page.goto('http://localhost:8080/#archive');
    await page.waitForTimeout(2000); // 렌더링 및 트랜지션 대기
    await page.screenshot({ path: 'C:/Users/USER/.gemini/antigravity/brain/2fb671e4-82f0-4f72-b064-4abc1e20b32d/desktop_bookshelf.png' });
    console.log('Desktop bookshelf captured');
    await page.close();

    // 2. 모바일 책장 캡처 (390x844)
    page = await browser.newPage({
        viewport: { width: 390, height: 844 },
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1',
        isMobile: true
    });
    await page.goto('http://localhost:8080/#archive');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'C:/Users/USER/.gemini/antigravity/brain/2fb671e4-82f0-4f72-b064-4abc1e20b32d/mobile_bookshelf.png' });
    console.log('Mobile bookshelf captured');
    await page.close();

    // 3. 데스크탑 쇼케이스(아코디언) 캡처
    page = await browser.newPage({ viewport: { width: 1280, height: 1024 } });
    await page.goto('http://localhost:8080/#showcase');
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'C:/Users/USER/.gemini/antigravity/brain/2fb671e4-82f0-4f72-b064-4abc1e20b32d/desktop_showcase.png' });
    console.log('Desktop showcase captured');
    await page.close();

    // 4. 모바일 쇼케이스 캡처
    page = await browser.newPage({
        viewport: { width: 390, height: 844 },
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1',
        isMobile: true
    });
    await page.goto('http://localhost:8080/#showcase');
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'C:/Users/USER/.gemini/antigravity/brain/2fb671e4-82f0-4f72-b064-4abc1e20b32d/mobile_showcase.png' });
    console.log('Mobile showcase captured');
    await page.close();

    await browser.close();
})();
