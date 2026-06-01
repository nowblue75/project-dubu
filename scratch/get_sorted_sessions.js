const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\USER\\.gemini\\antigravity\\brain';
const dirs = fs.readdirSync(brainDir);
const sessions = [];

dirs.forEach(dir => {
    const logPath = path.join(brainDir, dir, '.system_generated', 'logs', 'transcript.jsonl');
    if (!fs.existsSync(logPath)) return;

    // Check if it has dubu file activity
    const content = fs.readFileSync(logPath, 'utf8');
    if (!content.includes('dubu_app.js') && !content.includes('dubu_data.js')) return;

    // Find the first line to get creation timestamp
    const lines = content.split('\n');
    let createdAt = null;
    for (const line of lines) {
        if (!line.trim()) continue;
        try {
            const log = JSON.parse(line);
            if (log.created_at) {
                createdAt = new Date(log.created_at);
                break;
            }
        } catch (e) {}
    }

    // Default to stats birthtime if no timestamp found
    if (!createdAt) {
        createdAt = fs.statSync(logPath).birthtime;
    }

    sessions.push({
        id: dir,
        createdAt: createdAt,
        size: fs.statSync(logPath).size
    });
});

// Sort by creation time ascending (chronological order)
sessions.sort((a, b) => a.createdAt - b.createdAt);

console.log('--- Chronological Sessions Touching Dubu Files ---');
sessions.forEach((s, idx) => {
    console.log(`[${idx+1}] Session: ${s.id} | Created: ${s.createdAt.toISOString()} | Log Size: ${s.size} bytes`);
});
