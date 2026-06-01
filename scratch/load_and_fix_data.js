const fs = require('fs');

async function run() {
  const pBlock = fs.readFileSync('C:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\scratch\\extracted_projects.js', 'utf8');
  const tBlock = fs.readFileSync('C:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\scratch\\extracted_themes.js', 'utf8');
  const iBlock = fs.readFileSync('C:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\scratch\\extracted_ingredients.js', 'utf8');
  const sBlock = fs.readFileSync('C:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\scratch\\extracted_steps.js', 'utf8');

  function cleanJsContent(code) {
    let cleaned = code;
    const keys = ["id", "title", "noOven", "noFlour", "noButter", "oneBowl", "desc", "path", "img", "calcPath", "isInteractive", "blogUrl", "categories", "pairing", "time", "emotionalQuote", "troubleShoot", "isNew"];
    
    keys.forEach(k => {
      const regex1 = new RegExp(`(true|false|"[^"]*")\\s*\\n\\s*"${k}"\\s*:`, 'g');
      cleaned = cleaned.replace(regex1, (match, p1) => `${p1},\n        "${k}":`);
      const regex2 = new RegExp(`(true|false|"[^"]*")\\s*\\n\\s*${k}\\s*:`, 'g');
      cleaned = cleaned.replace(regex2, (match, p1) => `${p1},\n        "${k}":`);
    });
    return cleaned;
  }

  // 1. PROJECTS
  try {
    let PROJECTS = eval(cleanJsContent(pBlock));
    console.log(`Evaluated PROJECTS successfully! Length: ${PROJECTS.length}`);
  } catch (e) {
    console.log(`PROJECTS eval failed: ${e.message}`);
  }

  // 2. THEMES
  try {
    let THEMES = eval(cleanJsContent(tBlock));
    console.log(`Evaluated THEMES successfully! Length: ${THEMES.length}`);
  } catch (e) {
    console.log(`THEMES eval failed: ${e.message}`);
  }

  // 3. INGREDIENT_DICT
  try {
    let INGREDIENT_DICT = eval("(" + cleanJsContent(iBlock) + ")");
    console.log(`Evaluated INGREDIENT_DICT successfully! Keys: ${Object.keys(INGREDIENT_DICT).length}`);
  } catch (e) {
    console.log(`INGREDIENT_DICT eval failed: ${e.message}`);
    // write iBlock copy to debug
    fs.writeFileSync('C:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\scratch\\debug_ingredients.js', cleanJsContent(iBlock), 'utf8');
  }

  // 4. RECIPE_STEPS_DB
  try {
    let RECIPE_STEPS_DB = eval("(" + cleanJsContent(sBlock) + ")");
    console.log(`Evaluated RECIPE_STEPS_DB successfully! Keys: ${Object.keys(RECIPE_STEPS_DB).length}`);
  } catch (e) {
    console.log(`RECIPE_STEPS_DB eval failed: ${e.message}`);
    fs.writeFileSync('C:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\scratch\\debug_steps.js', cleanJsContent(sBlock), 'utf8');
  }
}

run().catch(console.error);
