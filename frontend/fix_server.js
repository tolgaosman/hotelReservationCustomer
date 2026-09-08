const fs = require('fs');
const path = require('path');

const files = [
  "src/app/[lang]/restoran/page.tsx",
  "src/app/[lang]/rezervasyon/page.tsx",
  "src/app/[lang]/profil/page.tsx",
  "src/app/[lang]/odalar/page.tsx",
  "src/app/[lang]/odalar/[slug]/page.tsx",
  "src/app/[lang]/kvkk/page.tsx",
  "src/app/[lang]/kosullar/page.tsx",
  "src/app/[lang]/iletisim/page.tsx",
  "src/app/[lang]/bilgi/page.tsx",
  "src/app/[lang]/galeri/page.tsx",
  "src/app/[lang]/(auth)/register/page.tsx",
  "src/app/[lang]/(auth)/login/page.tsx"
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Fix the broken function signature
  const brokenSignatureMatch = content.match(/export default async function\s+[A-Za-z0-9_]+\(\{\s*const resolvedParams = await params;\s*const tr = await getDictionary\(resolvedParams\.lang as any\);\s*params\s*\}\s*:\s*\{\s*params:\s*Promise<\{\s*lang:\s*string\s*\}>\s*\|\s*\{\s*lang:\s*string\s*\}\s*\}\)\s*\{/);
  
  if (brokenSignatureMatch) {
    const originalFuncName = brokenSignatureMatch[0].match(/function\s+([A-Za-z0-9_]+)/)[1];
    content = content.replace(brokenSignatureMatch[0], `export default async function ${originalFuncName}({ params }: { params: Promise<{ lang: string }> }) {\n  const resolvedParams = await params;\n  const tr = await getDictionary(resolvedParams.lang as any);`);
  }

  // Fix metadata if it was modified correctly
  content = content.replace(/\{ params \}: \{ params: Promise<\{ lang: string \}> \| \{ lang: string \} \}/g, "{ params }: { params: Promise<{ lang: string }> }");

  // Fix slug page metadata manually if it has tr.brand.name
  if (file.includes('[slug]')) {
    // metadata is export async function generateMetadata({ params }: RoomPageProps): Promise<Metadata>
    if (content.includes('export async function generateMetadata') && content.includes('tr.brand.name') && !content.includes('const tr = await getDictionary')) {
      content = content.replace(
        /export async function generateMetadata[^]+?\{[^]+?return \{ title:[^]+?\};?\n\}/m,
        `export async function generateMetadata({ params }: RoomPageProps): Promise<Metadata> {\n  const { slug, lang } = (await params) as any;\n  const tr = await getDictionary(lang);\n  const room = await getRoom(slug);\n  return { title: room ? \`\${room.title} — \${tr.brand.name}\` : tr.brand.name };\n}`
      );
    }
    
    // fix RoomDetailPage
    if (content.includes('export default async function RoomDetailPage({ params }: RoomPageProps) {') && !content.includes('const tr = await getDictionary')) {
      content = content.replace('export default async function RoomDetailPage({ params }: RoomPageProps) {', 'export default async function RoomDetailPage({ params }: RoomPageProps) {\n  const { slug, lang } = (await params) as any;\n  const tr = await getDictionary(lang);');
    }
  }

  // Fix galeri metadata which might be broken
  // If generateMetadata exists but doesn't have tr, we inject it.
  if (!file.includes('[slug]')) {
    if (content.includes('export const metadata: Metadata = {')) {
      // Meaning it wasn't replaced at all!
      // Like galeri, which might have spanned lines.
      content = content.replace(
        /export const metadata:\s*Metadata\s*=\s*\{[^}]+\};/g,
        (match) => {
          let inner = match.substring(match.indexOf('{'));
          return `export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {\n  const { lang } = await params;\n  const tr = await getDictionary(lang as any);\n  return ${inner}\n}`;
        }
      );
    }
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed', file);
}
