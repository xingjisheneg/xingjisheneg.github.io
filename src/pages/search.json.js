import { getCollection } from 'astro:content';

export async function GET() {
  const notes = await getCollection('notes');
  const essays = await getCollection('essays');
  const works = await getCollection('works');

  const items = [
    ...notes.map(n => ({
      title: n.data.title,
      src: n.data.src || '',
      excerpt: n.data.excerpt,
      tags: n.data.tags,
      section: 'notes',
      sectionLabel: '札记',
      url: `/notes/${n.slug}/`,
      date: n.data.date,
    })),
    ...essays.map(e => ({
      title: e.data.title,
      src: '',
      excerpt: e.data.excerpt,
      tags: e.data.tags,
      section: 'essays',
      sectionLabel: '随笔',
      url: `/essays/${e.slug}/`,
      date: e.data.date,
    })),
    ...works.map(w => ({
      title: w.data.title,
      src: '',
      excerpt: w.data.desc,
      tags: [],
      section: 'works',
      sectionLabel: '作品',
      url: `/works/${w.slug}/`,
      date: '',
    })),
  ];

  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json' },
  });
}
