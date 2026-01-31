import { MetadataRoute } from 'next'
import { fetchArticles } from '@/lib/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await fetchArticles()
  
  const articleEntries = articles.map((article) => ({
    url: `https://tech-blog.vercel.app/articles/${article.slug}`,
    lastModified: article.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://tech-blog.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://tech-blog.vercel.app/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://tech-blog.vercel.app/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...articleEntries,
  ]
}
