import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export const getAllArticles = async (): Promise<CollectionEntry<'articles'>[]> => {
  return await getCollection('articles', ({ data }) => !data.draft);
};

export const getFeaturedArticles = async (): Promise<CollectionEntry<'articles'>[]> => {
  return await getCollection('articles', ({ data }) => !data.draft && data.featured);
};

export const getArticlesByCategory = async (category: string): Promise<CollectionEntry<'articles'>[]> => {
  return await getCollection('articles', ({ data }) => !data.draft && data.category === category);
};

export const getCategories = async (): Promise<string[]> => {
  const articles = await getAllArticles();
  const categories = new Set(articles.map(article => article.data.category));
  return Array.from(categories);
};
