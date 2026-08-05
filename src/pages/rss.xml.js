import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const notes = (await getCollection('notes')).sort((a,b) => b.data.date.localeCompare(a.data.date));
  const essays = (await getCollection('essays')).sort((a,b) => b.data.date.localeCompare(a.data.date));
  const all = [
    ...notes.map(n => ({ ...n.data, section: 'notes', slug: n.slug })),
    ...essays.map(e => ({ ...e.data, section: 'essays', slug: e.slug })),
  ].sort((a,b) => b.date.localeCompare(a.date));

  return rss({
    title: '青灯黄卷',
    description: '青灯之下，黄卷之间，为值得重读的字句留一笔朱批。',
    site: context.site,
    items: all.map(item => ({
      title: item.title,
      pubDate: new Date(item.date),
      description: item.excerpt,
      link: `/${item.section}/${item.slug}/`,
    })),
  });
}
