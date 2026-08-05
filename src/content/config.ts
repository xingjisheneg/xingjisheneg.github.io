import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    src: z.string().optional(),
    date: z.string(),
    excerpt: z.string(),
    tags: z.array(z.string()),
    read: z.string(),
  }),
});

const essays = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string(),
    tags: z.array(z.string()),
    read: z.string(),
  }),
});

const works = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    desc: z.string(),
    cls: z.string(),
    links: z.array(z.string()),
    order: z.number(),
  }),
});

export const collections = { notes, essays, works };
