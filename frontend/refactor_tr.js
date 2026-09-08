const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('src/components', (filePath) => {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('import { tr } from "@/lib/dictionary"')) {
    // Replace import
    content = content.replace('import { tr } from "@/lib/dictionary"', 'import { useDictionary } from "@/lib/DictionaryContext"');
    
    // Find where the component function starts and insert `const tr = useDictionary();`
    // This is a naive regex but works for most standard declarations:
    // export function Component(...) {
    //   const tr = useDictionary();
    content = content.replace(/(export function [a-zA-Z0-9_]+\s*\([^)]*\)(?:\s*:\s*[^{]+)?\s*\{)/g, '$1\n  const tr = useDictionary();');
    
    // Also handle const Component = (...) => {
    content = content.replace(/(export const [a-zA-Z0-9_]+\s*=\s*\([^)]*\)\s*=>\s*\{)/g, '$1\n  const tr = useDictionary();');

    // Also handle export default function (...) {
    content = content.replace(/(export default function [a-zA-Z0-9_]*\s*\([^)]*\)(?:\s*:\s*[^{]+)?\s*\{)/g, '$1\n  const tr = useDictionary();');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Refactored ${filePath}`);
  }
});
