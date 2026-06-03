const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get all commit hashes that modified dubu_data.js
const gitLog = execSync('git log --format="%H %s" -- dubu_data.js', { encoding: 'utf8' });
const commits = gitLog.trim().split('\n').map(line => {
    const spaceIdx = line.indexOf(' ');
    return {
        hash: line.substring(0, spaceIdx),
        msg: line.substring(spaceIdx + 1)
    };
});

console.log(`Found ${commits.length} commits affecting dubu_data.js`);

for (const commit of commits) {
    try {
        const fileContent = execSync(`git show ${commit.hash}:dubu_data.js`, { encoding: 'utf8' });
        
        const has36 = fileContent.includes('"36":') || fileContent.includes("'36':");
        const has37 = fileContent.includes('"37":') || fileContent.includes("'37':");
        
        console.log(`Commit ${commit.hash.substring(0, 7)} (${commit.msg}): has36=${has36}, has37=${has37}`);
        
        if (has36 || has37) {
            // Save this past content to scratch for inspection
            fs.writeFileSync(path.join(__dirname, `dubu_data_${commit.hash.substring(0, 7)}.js`), fileContent, 'utf8');
            console.log(`Saved past content to dubu_data_${commit.hash.substring(0, 7)}.js`);
        }
    } catch (e) {
        console.error(`Error processing commit ${commit.hash.substring(0, 7)}:`, e.message);
    }
}
