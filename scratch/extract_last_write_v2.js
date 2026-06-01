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
  let globalAppWrites = [];
  let globalDataWrites = [];

  logFiles.forEach(logFile => {
    if (!fs.existsSync(logFile)) return;
    
    // UUID is 3 levels up from transcript.jsonl
    // Path format: .../brain/UUID/.system_generated/logs/transcript.jsonl
    const parts = logFile.split(path.sep);
    // Find brain index
    const brainIdx = parts.findIndex(p => p.toLowerCase() === 'brain');
    let sessionName = 'unknown';
    if (brainIdx !== -1 && brainIdx + 1 < parts.length) {
      sessionName = parts[brainIdx + 1];
    }
    
    const content = fs.readFileSync(logFile, 'utf8');
    const lines = content.split('\n');
    
    lines.forEach((line, idx) => {
      if (!line.trim()) return;
      try {
        const obj = JSON.parse(line);
        if (obj.tool_calls && obj.tool_calls.length > 0) {
          obj.tool_calls.forEach(tc => {
            const file = (tc.args?.TargetFile || '').toLowerCase();
            const name = tc.name;
            if (file.includes('dubu_app.js')) {
              if (name === 'default_api:write_to_file' || name === 'write_to_file') {
                globalAppWrites.push({ session: sessionName, step: obj.step_index, length: tc.args.CodeContent.length, content: tc.args.CodeContent });
              }
            } else if (file.includes('dubu_data.js')) {
              if (name === 'default_api:write_to_file' || name === 'write_to_file') {
                globalDataWrites.push({ session: sessionName, step: obj.step_index, length: tc.args.CodeContent.length, content: tc.args.CodeContent });
              }
            }
          });
        }
      } catch (e) {}
    });
  });

  console.log(`=== DUBU_APP.JS GLOBAL WRITE SESSIONS ===`);
  globalAppWrites.forEach((w, idx) => {
    console.log(`[${idx+1}] Session: ${w.session}, Step: ${w.step}, Length: ${w.length} chars`);
  });

  console.log(`\n=== DUBU_DATA.JS GLOBAL WRITE SESSIONS ===`);
  globalDataWrites.forEach((w, idx) => {
    console.log(`[${idx+1}] Session: ${w.session}, Step: ${w.step}, Length: ${w.length} chars`);
  });

  // Save the absolute last write files
  if (globalAppWrites.length > 0) {
    const lastW = globalAppWrites[globalAppWrites.length - 1];
    fs.writeFileSync('C:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\scratch\\absolute_last_app.js', lastW.content, 'utf8');
    console.log(`\nSaved absolute last app.js from Session ${lastW.session} Step ${lastW.step} to scratch\\absolute_last_app.js`);
  }
  if (globalDataWrites.length > 0) {
    const lastW = globalDataWrites[globalDataWrites.length - 1];
    fs.writeFileSync('C:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\scratch\\absolute_last_data.js', lastW.content, 'utf8');
    console.log(`Saved absolute last data.js from Session ${lastW.session} Step ${lastW.step} to scratch\\absolute_last_data.js`);
  }
}

run().catch(console.error);
