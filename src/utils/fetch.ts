import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

// Function to get all articles, excluding drafts
export const getAllArticles = async (): Promise<CollectionEntry<'articles'>[]> => {
  return await getCollection('articles', ({ data }) => !data.draft);
};

// Function to fetch all articles, can be expanded for additional logic
export const fetchAllArticles = async (): Promise<CollectionEntry<'articles'>[]> => {
  return await getAllArticles();
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

export const getLatestArticleFromEachCategory = async (): Promise<CollectionEntry<'articles'>[]> => {
  const articles = await getAllArticles();
  
  // Group articles by category
  const articlesByCategory = articles.reduce((acc, article) => {
    const category = article.data.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(article);
    return acc;
  }, {} as Record<string, CollectionEntry<'articles'>[]>);

  // Get the latest article from each category
  const latestArticles = Object.values(articlesByCategory).map(categoryArticles => {
    return categoryArticles.sort((a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime())[0];
  });

  return latestArticles;
};
