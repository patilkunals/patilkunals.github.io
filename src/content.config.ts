import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const listOrText = z.union([z.array(z.string()), z.string()]).optional();

const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './portfolio' }),
  schema: z.object({
    title: z.string().optional(),
    summary: z.string().optional(),
    description: z.string().optional(),
    type: z.string().optional(),
    category: z.string().optional(),
    tags: listOrText,
    links: listOrText,
    related: listOrText,
    coverImage: z.string().optional(),
    cover: z.string().optional(),
    created: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    status: z.string().optional(),
    visibility: z.string().optional(),
    owner: z.string().optional(),
    version: z.union([z.string(), z.number()]).optional(),
  }),
});

const resume = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './resume' }),
  schema: z.object({
    title: z.string().optional(),
    summary: z.string().optional(),
    type: z.string().optional(),
    category: z.string().optional(),
    tags: listOrText,
    created: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    status: z.string().optional(),
    visibility: z.string().optional(),
    owner: z.string().optional(),
    version: z.union([z.string(), z.number()]).optional(),
  }),
});

const webpages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './webpages' }),
  schema: z.object({
    title: z.string().optional(),
    summary: z.string().optional(),
    description: z.string().optional(),
    type: z.string().optional(),
    category: z.string().optional(),
    tags: listOrText,
    created: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    status: z.string().optional(),
    visibility: z.string().optional(),
    owner: z.string().optional(),
    version: z.union([z.string(), z.number()]).optional(),
  }),
});

export const collections = {
  portfolio,
  resume,
  webpages,
};
