const fs = require('fs');

const logFilePath = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\606129b3-ef74-4f61-b166-9901f38f3b49\\.system_generated\\logs\\transcript.jsonl';
if (!fs.existsSync(logFilePath)) {
    console.log('Log not found');
    process.exit(1);
}

const content = fs.readFileSync(logFilePath, 'utf8');
const lines = content.split('\n');

const appViews = [];
const dataViews = [];

lines.forEach((line) => {
    if (!line.trim()) return;
    try {
        const log = JSON.parse(line);
        if (log.type === 'VIEW_FILE' && log.status === 'DONE') {
            const logContent = log.content || '';
            const filePathMatch = logContent.match(/File Path: `file:\/\/\/(.*)`/i);
            if (filePathMatch) {
                const cleanPath = filePathMatch[1].replace(/\\+/g, '/').replace(/\"/g, '').toLowerCase();
                const isApp = cleanPath.includes('dubu_app.js');
                const isData = cleanPath.includes('dubu_data.js');
                if (isApp || isData) {
                    // Extract showing lines range
                    const rangeMatch = logContent.match(/Showing lines (\d+) to (\d+)/i);
                    const start = rangeMatch ? parseInt(rangeMatch[1], 10) : 1;
                    const end = rangeMatch ? parseInt(rangeMatch[2], 10) : null;
                    const info = { step: log.step_index, start, end, length: logContent.length };
                    if (isApp) appViews.push(info);
                    if (isData) dataViews.push(info);
                }
            }
        }
    } catch (e) {}
});

console.log('--- dubu_app.js VIEW_FILE logs in 606129b3 ---');
appViews.forEach(v => console.log(`Step ${v.step}: Lines ${v.start} - ${v.end} | LogContentLength: ${v.length}`));

console.log('\n--- dubu_data.js VIEW_FILE logs in 606129b3 ---');
dataViews.forEach(v => console.log(`Step ${v.step}: Lines ${v.start} - ${v.end} | LogContentLength: ${v.length}`));
