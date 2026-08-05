import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { rss as rssCfg } from '../config';

export async function GET(context) {
  const notes = (await getCollection('notes')).sort((a,b) => b.data.date.localeCompare(a.data.date));
  const essays = (await getCollection('essays')).sort((a,b) => b.data.date.localeCompare(a.data.date));
  const all = [
    ...notes.map(n => ({ ...n.data, section: 'notes', slug: n.slug })),
    ...essays.map(e => ({ ...e.data, section: 'essays', slug: e.slug })),
  ].sort((a,b) => b.date.localeCompare(a.date));

  return rss({
    title: rssCfg.title,
    description: rssCfg.description,
    site: context.site,
    items: all.map(item => ({
      title: item.title,
      pubDate: new Date(item.date),
      description: item.excerpt,
      link: `/${item.section}/${item.slug}/`,
    })),
  });
}
