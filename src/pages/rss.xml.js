import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { rss as rssCfg } from '../config';
import { byDate, displayTitle, displayDescription, entryURL } from '../content-utils';

export async function GET(context) {
  const groups = await Promise.all([getCollection('notes'), getCollection('essays')]);
  const items = groups.flat().sort(byDate);
  return rss({
    title: rssCfg.title,
    description: rssCfg.description,
    site: context.site,
    items: items.map(item => ({
      title: displayTitle(item.data.title, item.data.demo),
      pubDate: new Date(`${item.data.date}T00:00:00Z`),
      description: displayDescription(item.data.excerpt, item.data.demo),
      link: entryURL(item),
    })),
  });
}
