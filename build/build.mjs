// Generates every HTML page from build/data.mjs. Run: node build/build.mjs
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homePage, servicesIndexPage, servicePage, galleryPage, accessibilityPage, notFoundPage, SERVICES, SITE } from './templates.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = (rel, html) => {
  const p = resolve(root, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, html);
};

if (existsSync(resolve(root, 'services'))) rmSync(resolve(root, 'services'), { recursive: true });

out('index.html', homePage());
out('services/index.html', servicesIndexPage());
for (const s of SERVICES) out(`services/${s.slug}.html`, servicePage(s));
out('gallery.html', galleryPage());
out('accessibility.html', accessibilityPage());
out('404.html', notFoundPage());

const today = new Date().toISOString().slice(0, 10);
const urls = ['/', '/services', '/gallery', '/accessibility', ...SERVICES.map((s) => `/services/${s.slug}`)];
out('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE.url}${u}</loc><lastmod>${today}</lastmod><changefreq>${u === '/' ? 'weekly' : 'monthly'}</changefreq><priority>${u === '/' ? '1.0' : u === '/services' ? '0.9' : '0.7'}</priority></url>`).join('\n')}
</urlset>
`);
out('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE.url}/sitemap.xml\n`);

console.log(`Built ${urls.length} pages.`);
