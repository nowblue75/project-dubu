const fs = require('fs');
const path = require('path');

const logFiles = [
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\e5eec926-7fec-4ca8-93a2-119ff04bc302\\.system_generated\\logs\\transcript.jsonl',
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\9b48c1a4-cd5c-40db-8d58-872f65caa33f\\.system_generated\\logs\\transcript.jsonl',
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\ac23fb61-c55d-4de3-a56e-fa0ff0b0801b\\.system_generated\\logs\\transcript.jsonl',
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\6e088353-7f9c-4c27-8f69-f6a552f98d8f\\.system_generated\\logs\\transcript.jsonl',
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\a8fc305f-0184-4d04-8007-ba57fe73ad17\\.system_generated\\logs\\transcript.jsonl',
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\48e4b924-3036-4882-954e-eb5eed9b607d\\.system_generated\\logs\\transcript.jsonl',
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\c75feb6e-aded-4304-970d-a9831cf6b917\\.system_generated\\logs\\transcript.jsonl',
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\606129b3-ef74-4f61-b166-9901f38f3b49\\.system_generated\\logs\\transcript.jsonl',
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\5a18828b-4933-4ed1-8fcf-f9217d64c13d\\.system_generated\\logs\\transcript.jsonl',
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\fe3ba6c6-dfb9-48ac-bf2c-e5807e93ce07\\.system_generated\\logs\\transcript.jsonl'
];

async function run() {
  let appViews = [];
  let dataViews = [];

  logFiles.forEach(logFile => {
    if (!fs.existsSync(logFile)) return;
    const sessionName = path.basename(path.dirname(path.dirname(logFile)));
    
    const content = fs.readFileSync(logFile, 'utf8');
    const lines = content.split('\n');
    
    lines.forEach((line, idx) => {
      if (!line.trim()) return;
      try {
        const obj = JSON.parse(line);
        if (obj.type === 'VIEW_FILE' && obj.status === 'DONE' && obj.content) {
          const logContent = obj.content;
          const filePathMatch = logContent.match(/File Path: `file:\/\/\/(.*)`/i);
          if (filePathMatch) {
            const filePath = filePathMatch[1].toLowerCase();
            const isApp = filePath.includes('dubu_app.js');
            const isData = filePath.includes('dubu_data.js');
            if (isApp || isData) {
              // Extract StartLine and EndLine if specified
              // Look for "Showing lines X to Y" in content
              const showMatch = logContent.match(/Showing lines (\d+) to (\d+)/);
              const startLine = showMatch ? parseInt(showMatch[1], 10) : 1;
              const endLine = showMatch ? parseInt(showMatch[2], 10) : null;
              
              const isTruncated = logContent.includes('<truncated') || logContent.includes('truncated bytes');
              
              const record = {
                session: sessionName,
                step: obj.step_index,
                start: startLine,
                end: endLine,
                isTruncated,
                length: logContent.length,
                logFile
              };
              
              if (isApp) appViews.push(record);
              else dataViews.push(record);
            }
          }
        }
      } catch (e) {}
    });
  });

  console.log("=== DUBU_APP.JS VIEW_FILE CALLS ===");
  appViews.forEach(v => {
    console.log(`Session: ${v.session}, Step: ${v.step}, Lines: ${v.start} to ${v.end}, Truncated: ${v.isTruncated}, CharLength: ${v.length}`);
  });

  console.log("\n=== DUBU_DATA.JS VIEW_FILE CALLS ===");
  dataViews.forEach(v => {
    console.log(`Session: ${v.session}, Step: ${v.step}, Lines: ${v.start} to ${v.end}, Truncated: ${v.isTruncated}, CharLength: ${v.length}`);
  });
}

run().catch(console.error);
