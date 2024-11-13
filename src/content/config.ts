import { defineCollection, z } from 'astro:content';
import { cldAssetsLoader } from 'astro-cloudinary/loaders';
import { glob } from 'astro/loaders';
import { CATEGORIES } from '../content/categories';

const newsArticles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/articles" }),
  schema: () =>
    z.object({
      title: z.string().max(80),
      description: z.string(),  // Required
      slug: z.string().optional(),
      pubDate: z.coerce.date(), // Required but will coerce string to date
      lastModified: z.coerce.date(), // Required but will coerce string to date
      heroImage: z.string(),
      category: z.enum(CATEGORIES.map(cat => cat.name) as [string, ...string[]]),
      tags: z.array(z.string()), // Required
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
      trending: z.boolean().default(false)
    })
});




export const collections = {
  'articles': newsArticles,
  'myAssets': defineCollection({
    loader: cldAssetsLoader({
      limit: 2,
      folder: 'ainews' 
    })
  })
};
