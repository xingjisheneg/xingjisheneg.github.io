import { getCollection } from 'astro:content';
import { site } from '../config';

export async function GET(context) {
  const BASE = context.site?.href?.replace(/\/$/, '') || `https://${site.domain}`;

  // 静态页面
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/essays', priority: '0.8', changefreq: 'weekly' },
    { url: '/works', priority: '0.8', changefreq: 'monthly' },
    { url: '/about', priority: '0.6', changefreq: 'monthly' },
    { url: '/search', priority: '0.4', changefreq: 'yearly' },
  ];

  // 札记详情页
  const notes = await getCollection('notes');
  const notePages = notes.map(n => ({
    url: `/notes/${n.slug}/`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: n.data.date,
  }));

  // 随笔详情页
  const essays = await getCollection('essays');
  const essayPages = essays.map(e => ({
    url: `/essays/${e.slug}/`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: e.data.date,
  }));

  // 作品详情页
  const works = await getCollection('works');
  const workPages = works.map(w => ({
    url: `/works/${w.slug}/`,
    priority: '0.6',
    changefreq: 'yearly',
  }));

  const allPages = [...staticPages, ...notePages, ...essayPages, ...workPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(p => {
  const loc = `${BASE}${p.url}`;
  const lm = p.lastmod ? `\n    <lastmod>${p.lastmod}</lastmod>` : '';
  return `  <url>
    <loc>${loc}</loc>${lm}
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
