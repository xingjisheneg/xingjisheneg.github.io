import { getCollection, type CollectionEntry } from 'astro:content';

export type Section = 'notes' | 'essays' | 'works';
export type Entry = CollectionEntry<'notes'> | CollectionEntry<'essays'> | CollectionEntry<'works'>;
export const sectionLabels: Record<Section, string> = { notes: '札记', essays: '随笔', works: '作品' };

function stableOrder(a: Entry, b: Entry) {
  const first = `${a.collection}/${a.slug}`;
  const second = `${b.collection}/${b.slug}`;
  return first < second ? -1 : first > second ? 1 : 0;
}

export function byDate(a: Entry, b: Entry) {
  return (b.data.date || '').localeCompare(a.data.date || '') || stableOrder(a, b);
}

export function byAuthorOrder(a: Entry, b: Entry) {
  if (a.collection === 'works' && b.collection === 'works') return a.data.order - b.data.order || stableOrder(a, b);
  return byDate(a, b);
}

export async function getSectionEntries(section: Section): Promise<Entry[]> {
  const entries = await getCollection(section);
  return entries.sort(section === 'works' ? byAuthorOrder : byDate);
}

export async function getAllEntries(): Promise<Entry[]> {
  const groups = await Promise.all([getSectionEntries('notes'), getSectionEntries('essays'), getSectionEntries('works')]);
  return groups.flat();
}

export function homeSelection(entries: Entry[]) {
  const sorted = [...entries].sort((a, b) => {
    if (!a.data.date && !b.data.date) return byAuthorOrder(a, b);
    return byDate(a, b);
  });
  return [...sorted.filter(entry => entry.data.featured), ...sorted.filter(entry => !entry.data.featured)].slice(0, 3);
}

export function entryURL(entry: Entry) {
  return `/${entry.collection}/${entry.slug}/`;
}

export function tagURL(tag: string) {
  return `/tags/?${new URLSearchParams({ tag: tag.trim(), section: 'all', page: '1' })}`;
}

export function entrySummary(entry: Entry) {
  return entry.collection === 'works' ? entry.data.desc : entry.data.excerpt;
}

export function displayTitle(title: string, demo: boolean) {
  return demo ? `【演示内容】${title}` : title;
}

export function displayDescription(description: string, demo: boolean) {
  return demo ? `演示内容，非已核实的个人经历或项目成果。${description}` : description;
}

export function toSearchRecord(entry: Entry) {
  return {
    title: entry.data.title,
    src: entry.collection === 'notes' ? entry.data.src || '' : '',
    excerpt: entrySummary(entry),
    body: entry.body,
    tags: entry.data.tags,
    section: entry.collection,
    sectionLabel: sectionLabels[entry.collection],
    url: entryURL(entry),
    date: entry.data.date || '',
    demo: entry.data.demo,
  };
}
