const fs = require('fs');
const { execSync } = require('child_process');

async function run() {
  const currentDataPath = 'c:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\dubu_data.js';
  
  // 1. Get current projects
  let currentProjects = [];
  try {
    const content = fs.readFileSync(currentDataPath, 'utf8');
    // We can evaluate or parse the file to get PROJECTS array.
    // dubu_data.js looks like: const PROJECTS = [...]; or module.exports = ...; or similar.
    // Let's print out the match.
    // We can run a small sandbox environment.
    const sandbox = {};
    const code = content + '\nif (typeof PROJECTS !== "undefined") { global.tempProjects = PROJECTS; }';
    eval(code);
    currentProjects = global.tempProjects || [];
  } catch (e) {
    console.error("Failed to parse current dubu_data.js:", e.message);
  }

  // 2. Get 957e2c4 (April 18) version projects
  let oldProjects = [];
  try {
    const oldContent = execSync('git show 957e2c4:dubu_data.js', { encoding: 'utf8' });
    const code = oldContent + '\nif (typeof PROJECTS !== "undefined") { global.tempOldProjects = PROJECTS; }';
    eval(code);
    oldProjects = global.tempOldProjects || [];
  } catch (e) {
    console.error("Failed to parse 957e2c4 version dubu_data.js:", e.message);
  }

  console.log(`Current Version Recipes Count: ${currentProjects.length}`);
  console.log(`April 18 Version Recipes Count: ${oldProjects.length}`);

  console.log('\n--- April 18 Recipes List ---');
  oldProjects.forEach(p => console.log(`ID: ${p.id} - ${p.title}`));

  console.log('\n--- Current Recipes List ---');
  currentProjects.forEach(p => console.log(`ID: ${p.id} - ${p.title}`));

  console.log('\n--- Recipes Added Since April 18 ---');
  const oldIds = new Set(oldProjects.map(p => p.id));
  currentProjects.forEach(p => {
    if (!oldIds.has(p.id)) {
      console.log(`[NEW] ID: ${p.id} - ${p.title}`);
    }
  });

  console.log('\n--- Recipes Missing in Current (if any) ---');
  const currentIds = new Set(currentProjects.map(p => p.id));
  oldProjects.forEach(p => {
    if (!currentIds.has(p.id)) {
      console.log(`[MISSING] ID: ${p.id} - ${p.title}`);
    }
  });
}

run().catch(console.error);
