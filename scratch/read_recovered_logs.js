const fs = require('fs');

async function run() {
  const logFile = 'C:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\recovered_39_logs.txt';
  if (!fs.existsSync(logFile)) {
    console.log("File not found");
    return;
  }
  
  // read as utf16le
  const content = fs.readFileSync(logFile, 'utf16le');
  console.log(`Read ${content.length} characters from UTF-16LE file.`);
  
  // Print first 500 characters
  console.log("=== FIRST 500 CHARACTERS ===");
  console.log(content.substring(0, 500));

  // Write a UTF-8 copy in scratch directory to easily view
  fs.writeFileSync('C:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\scratch\\recovered_39_utf8.txt', content, 'utf8');
  console.log("Saved UTF-8 copy to scratch\\recovered_39_utf8.txt");
}

run().catch(console.error);
