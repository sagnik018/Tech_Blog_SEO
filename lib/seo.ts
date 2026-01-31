import { SEOData, Article } from './types'

export function generateArticleSEO(article: Article): SEOData {
  return {
    title: article.title,
    description: article.excerpt,
    keywords: [
      ...article.tags,
      article.category,
      ...article.category.split('-'),
      'tech blog',
      'tutorial',
      'programming'
    ],
    ogImage: article.coverImage || '/og-image.png',
    canonical: `https://tech-blog.vercel.app/articles/${article.slug}`,
  }
}

export function generateCategorySEO(category: string): SEOData {
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')
  
  return {
    title: `${categoryTitle} Articles - Tech Blog`,
    description: `Explore the latest ${categoryTitle} articles, tutorials, and insights from industry experts.`,
    keywords: [
      category,
      ...category.split('-'),
      `${category} tutorials`,
      `${category} articles`,
      'tech blog',
      'programming'
    ],
    ogImage: '/og-image.png',
    canonical: `https://tech-blog.vercel.app/categories/${category}`,
  }
}

export function generateSearchSEO(query: string): SEOData {
  return {
    title: `Search Results for "${query}" - Tech Blog`,
    description: `Find articles matching "${query}" on Tech Blog. Discover tutorials, insights, and tech news.`,
    keywords: [
      query,
      'search',
      'tech blog',
      'articles',
      'tutorials'
    ],
    ogImage: '/og-image.png',
    canonical: `https://tech-blog.vercel.app/search?q=${encodeURIComponent(query)}`,
  }
}

export function generateHomeSEO(): SEOData {
  return {
    title: 'Tech Blog - Latest Technology Insights & Tutorials',
    description: 'Stay updated with the latest technology trends, tutorials, and insights from industry experts. Discover articles on web development, AI, mobile development, and more.',
    keywords: [
      'tech blog',
      'technology',
      'programming',
      'web development',
      'AI',
      'machine learning',
      'mobile development',
      'devops',
      'tutorials',
      'software engineering'
    ],
    ogImage: '/og-image.png',
    canonical: 'https://tech-blog.vercel.app',
  }
}

export function generateStructuredData(article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage || 'https://tech-blog.vercel.app/og-image.png',
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      email: article.author.email,
      image: article.author.avatar,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tech Blog',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tech-blog.vercel.app/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://tech-blog.vercel.app/articles/${article.slug}`,
    },
    keywords: article.tags.join(', '),
    articleSection: article.category,
    wordCount: Math.floor(article.readingTime * 200), // Average reading speed
  }
}

export function generateBreadcrumbStructuredData(breadcrumbs: Array<{
  name: string
  url: string
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
}

export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tech Blog',
    description: 'Your trusted source for the latest technology insights, tutorials, and industry trends.',
    url: 'https://tech-blog.vercel.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://tech-blog.vercel.app/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tech Blog',
      url: 'https://tech-blog.vercel.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tech-blog.vercel.app/logo.png',
        width: 512,
        height: 512,
      },
    },
  }
}

export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Tech Blog',
    description: 'Your trusted source for the latest technology insights, tutorials, and industry trends.',
    url: 'https://tech-blog.vercel.app',
    logo: {
      '@type': 'ImageObject',
      url: 'https://tech-blog.vercel.app/logo.png',
      width: 512,
      height: 512,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'contact@tech-blog.vercel.app',
    },
    sameAs: [
      'https://twitter.com/techblog',
      'https://github.com/techblog',
      'https://linkedin.com/company/techblog',
    ],
  }
}

export function getMetaTags(seoData: SEOData) {
  const tags: any[] = [
    { title: seoData.title },
    { name: 'description', content: seoData.description },
    { name: 'keywords', content: seoData.keywords.join(', ') },
  ]

  if (seoData.ogImage) {
    tags.push(
      { property: 'og:image', content: seoData.ogImage },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: seoData.title }
    )
  }

  if (seoData.canonical) {
    tags.push({ rel: 'canonical', href: seoData.canonical })
  }

  if (seoData.noindex) {
    tags.push({ name: 'robots', content: 'noindex' })
  }

  if (seoData.nofollow) {
    tags.push({ name: 'robots', content: 'nofollow' })
  }

  return tags
}
