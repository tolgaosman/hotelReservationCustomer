const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('src/app/[lang]', (filePath) => {
  if (!filePath.endsWith('page.tsx')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('import { tr } from "@/lib/dictionary"')) {
    content = content.replace('import { tr } from "@/lib/dictionary"', 'import { getDictionary } from "@/lib/dictionary"');
    
    // Replace export const metadata: Metadata = { title: `${tr.xxx} ...` }
    // with export async function generateMetadata({ params: { lang } }: any): Promise<Metadata> { const tr = await getDictionary(lang); return { title: ... } }
    
    const metadataRegex = /export const metadata:\s*Metadata\s*=\s*({[^}]*});/g;
    content = content.replace(metadataRegex, (match, p1) => {
      return `export async function generateMetadata({ params }: { params: Promise<{ lang: string }> | { lang: string } }): Promise<Metadata> {\n  const resolvedParams = await params;\n  const tr = await getDictionary(resolvedParams.lang as any);\n  return ${p1};\n}`;
    });

    // Replace export default function Page() {
    // or export default async function Page() {
    // and inject params and `const tr = await getDictionary(lang);`
    
    content = content.replace(/(export default (?:async )?function [a-zA-Z0-9_]+\s*\(\s*(?:\{[^}]*\}\s*)?\)\s*\{)/g, (match) => {
      // If it doesn't already have params, we add it. 
      // But it might already have it: export default async function RoomPage({ params }: { params: { slug: string } })
      if (match.includes("params")) {
        // If it already has params, we just inject the dictionary line inside
        // We'll do a simpler replacement below
        return match; 
      }
      return match.replace(/\(\s*\)/, "({ params }: { params: Promise<{ lang: string }> | { lang: string } })").replace("{", "{\n  const resolvedParams = await params;\n  const tr = await getDictionary(resolvedParams.lang as any);");
    });
    
    // Handle cases where it already had params (like odalar/[slug]/page.tsx)
    // export default async function RoomPage({ params }: { params: { slug: string } }) {
    if (content.includes("export default async function RoomPage({") || content.includes("params")) {
      content = content.replace(/(export default (?:async )?function [a-zA-Z0-9_]+\s*\(\{\s*params[^{]*\{[^}]*\}[^)]*\)\s*\{)/g, "$1\n  const resolvedParams = await params;\n  const tr = await getDictionary(resolvedParams.lang as any);");
    }

    // Since we added await to generateMetadata and the component, we must make sure the component is async if it wasn't.
    content = content.replace(/export default function/, "export default async function");

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Refactored Server Component ${filePath}`);
  }
});
