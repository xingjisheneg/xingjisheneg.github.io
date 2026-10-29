import { getAllEntries, entryURL } from '../content-utils';
import { site } from '../config';

export async function GET(context) {
  const base = context.site || `https://${site.domain}/`;
  const entries = await getAllEntries();
  const pages = [
    ...['/', '/notes/', '/essays/', '/works/', '/about/', '/search/', '/tags/'].map(url => ({ url })),
    ...entries.map(item => ({ url: entryURL(item), lastmod: item.data.updated })),
  ];
  const escapeXML = value => value.replace(/[<>&"']/g, character => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[character]);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url><loc>${escapeXML(new URL(page.url, base).href)}</loc>${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}</url>`).join('\n')}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
