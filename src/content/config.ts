import { defineCollection, z } from 'astro:content';

const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '日期须为 YYYY-MM-DD').refine(value => {
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}, '请填写有效日期');

const shared = {
  title: z.string().trim().min(1),
  demo: z.boolean().default(true),
  featured: z.boolean().default(false),
  tags: z.array(z.string().trim().min(1)).default([]).transform(tags => [...new Set(tags)]),
  updated: date.optional(),
};

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    ...shared,
    src: z.string().optional(),
    date,
    excerpt: z.string().min(1),
    read: z.string(),
  }),
});

const essays = defineCollection({
  type: 'content',
  schema: z.object({
    ...shared,
    date,
    excerpt: z.string().min(1),
    read: z.string(),
  }),
});

const projectLink = z.object({
  kind: z.enum(['source', 'demo', 'download']),
  url: z.string().trim().url().refine(value => ['https:', 'http:'].includes(new URL(value).protocol), '项目地址只支持 http / https'),
  verified: z.boolean().default(false),
});

const works = defineCollection({
  type: 'content',
  schema: z.object({
    ...shared,
    desc: z.string().min(1),
    cls: z.string(),
    date: date.optional(),
    platforms: z.array(z.string()).default([]),
    links: z.array(projectLink).default([]).refine(links => new Set(links.map(link => link.kind)).size === links.length, '源码、体验、下载各维护一个地址'),
    order: z.number().finite(),
  }),
});

export const collections = { notes, essays, works };
