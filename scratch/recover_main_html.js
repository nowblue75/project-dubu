const fs = require('fs');
const path = require('path');

const sessions = [
    '2fb671e4-82f0-4f72-b064-4abc1e20b32d', // 현재 세션
    'fe3ba6c6-dfb9-48ac-bf2c-e5807e93ce07', // 이전 복구 세션
    '606129b3-ef74-4f61-b166-9901f38f3b49'  // 데이터 업데이트 세션
];

sessions.forEach(sessId => {
    const logFilePath = `C:\\Users\\USER\\.gemini\\antigravity\\brain\\${sessId}\\.system_generated\\logs\\transcript.jsonl`;
    if (!fs.existsSync(logFilePath)) {
        console.log(`[Session Not Found] ${sessId}`);
        return;
    }
    
    console.log(`Scanning session: ${sessId}`);
    const content = fs.readFileSync(logFilePath, 'utf8');
    const lines = content.split('\n');
    
    for (const line of lines) {
        if (!line.trim()) continue;
        try {
            const log = JSON.parse(line);
            
            // 1. write_to_file 확인
            if (log.tool_calls) {
                for (const call of log.tool_calls) {
                    if (call.name === 'write_to_file') {
                        const targetFile = call.args?.TargetFile || '';
                        if (targetFile.endsWith('index.html') && !targetFile.includes('이벤트') && !targetFile.includes('완') && !targetFile.includes('찰떡브라우니')) {
                            const codeContent = call.args?.CodeContent || '';
                            if (codeContent.includes('atelier-focus-overlay') || codeContent.includes('focus-recipe-title')) {
                                console.log(`[FOUND in write_to_file] Session: ${sessId}, File: ${targetFile}, Size: ${codeContent.length}`);
                                fs.writeFileSync(path.join(__dirname, `index_recovered_${sessId}.html`), codeContent, 'utf8');
                            }
                        }
                    }
                }
            }
        } catch(e) {}
    }
});
