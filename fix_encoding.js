const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'frontend', 'src');

function traverseAndReplace(currentDir) {
  const files = fs.readdirSync(currentDir);
  for (const file of files) {
    const fullPath = path.join(currentDir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      traverseAndReplace(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      // Fix cases like '?14,999' or >?5,499< or -?14
      content = content.replace(/(['">-])\?(\d[\d,]*)/g, "$1₹$2");
      // Fix cases like >?{
      content = content.replace(/>\?\{/g, ">₹{");
      // Fix cases like -?{
      content = content.replace(/-\?\{/g, "-₹{");
      // Fix cases like ('?')
      content = content.replace(/\('\?'\)/g, "('₹')");
      // Fix cases like (Base Price (?))
      content = content.replace(/\(\?\)/g, "(₹)");
      // Fix tickFormatter={v => '?' +
      content = content.replace(/'\?' \+/g, "'₹' +");
      
      // Also catch any remaining â‚¹ or ,1 if they somehow survived
      content = content.replace(/â‚¹/g, "₹");
      content = content.replace(/,1(\d)/g, "₹$1");
      
      if (originalContent !== content) {
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

traverseAndReplace(dir);
console.log("Encoding fix completed again.");
