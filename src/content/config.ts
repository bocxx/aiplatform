import { defineCollection, z } from 'astro:content';
import { cldAssetsLoader } from 'astro-cloudinary/loaders';
import { glob } from 'astro/loaders';
import { CATEGORIES } from '../content/categories';

const newsArticles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/articles" }),
  schema: () =>
    z.object({
      title: z.string().max(80),
      description: z.string(),
      slug: z.string().optional(),
      pubDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      lastModified: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      heroImage: z.string(),
      category: z.enum(CATEGORIES.map(cat => cat.name) as [string, ...string[]]), 
      tags: z.array(z.string()),
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
