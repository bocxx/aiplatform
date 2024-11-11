// pages/api/articles/[category].ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Add this line to specify that this route should be server-rendered
export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const { category } = params;
    const ITEMS_PER_PAGE = 6;

    const allArticles = await getCollection('articles', ({ data }) => {
      return !data.draft && data.category.toLowerCase() === category?.toLowerCase();
    });

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedArticles = allArticles.slice(startIndex, endIndex);
    const hasMore = allArticles.length > endIndex;

    // Return both the articles and a new loading trigger if there are more articles
    const articlesHtml = await generateArticlesHtml(paginatedArticles);
    const nextPage = page + 1;
    
    let responseHtml = articlesHtml;
    
    if (hasMore) {
      responseHtml += `
        <div
          hx-get="/api/articles/${category}?page=${nextPage}"
          hx-trigger="revealed"
          hx-swap="afterend"
          hx-indicator=".loading-indicator"
          class="loading-trigger"
        >
          <div class="loading-indicator" style="display: none;">
            <span class="loading">Loading more articles...</span>
          </div>
        </div>
      `;
    }

    return new Response(responseHtml, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error in API route:', error);
    return new Response('Error loading articles', { status: 500 });
  }
};

// Helper function to generate HTML for articles
async function generateArticlesHtml(articles: any[]) {
  // You'll need to replicate your ArticleGrid component's HTML structure here
  return articles.map(article => `
    <article class="article-card">
      <h2>${article.data.title}</h2>
      <!-- Add other article content here -->
    </article>
  `).join('');
}