const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'src', 'app', '[lang]');

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('page.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');

            // Fix metadata
            if (content.includes('export const metadata: Metadata = {') && content.includes('tr.')) {
                // Find the metadata block
                const match = content.match(/export const metadata: Metadata = \{([\s\S]*?)\};/);
                if (match) {
                    const block = match[1];
                    const replacement = `export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const tr = await getDictionary(params.lang as any);
  return {${block}};
}`;
                    content = content.replace(match[0], replacement);
                }
            }
            
            // Fix remaining tr errors inside the component, but we already have getDictionary
            fs.writeFileSync(fullPath, content);
            console.log(`Fixed metadata in ${fullPath}`);
        } else if (fullPath.endsWith('layout.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('params: { lang }')) {
                content = content.replace(
`export default async function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {`,
`export default async function RootLayout(props: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const params = await props.params;
  const { lang } = params;
`
                );
                fs.writeFileSync(fullPath, content);
                console.log(`Fixed layout in ${fullPath}`);
            }
        }
    }
}

processDirectory(appDir);
