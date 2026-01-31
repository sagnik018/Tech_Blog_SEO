export type Category = 
  | 'web-development'
  | 'ai-ml'
  | 'mobile-dev'
  | 'devops'
  | 'security'
  | 'blockchain'
  | 'cloud-computing'
  | 'data-science'
  | 'ui-ux'
  | 'database'

export interface Author {
  id: string
  name: string
  email: string
  bio?: string
  avatar?: string
  social?: {
    twitter?: string
    github?: string
    linkedin?: string
  }
}

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage?: string
  category: Category
  tags: string[]
  author: Author
  publishedAt: string
  updatedAt: string
  readingTime: number
  views: number
  likes: number
  comments: number
  featured: boolean
  status: 'draft' | 'published' | 'archived'
}

export interface SearchResult {
  articles: Article[]
  total: number
  page: number
  limit: number
}

export interface PaginationInfo {
  currentPage: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
  totalItems: number
  itemsPerPage: number
}

export interface NewsletterSubscription {
  email: string
  name?: string
  preferences: {
    categories: Category[]
    frequency: 'daily' | 'weekly' | 'monthly'
  }
  subscribedAt: string
  isActive: boolean
}

export interface Comment {
  id: string
  articleId: string
  author: {
    name: string
    email: string
    avatar?: string
  }
  content: string
  createdAt: string
  updatedAt: string
  parentId?: string
  replies?: Comment[]
  likes: number
  isApproved: boolean
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
  submittedAt: string
}

export interface SiteStats {
  totalArticles: number
  totalViews: number
  totalComments: number
  totalSubscribers: number
  topCategories: Array<{
    category: Category
    count: number
  }>
  recentActivity: Array<{
    type: 'article' | 'comment' | 'like'
    title: string
    timestamp: string
  }>
}

export interface SEOData {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  canonical?: string
  noindex?: boolean
  nofollow?: boolean
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  errors?: string[]
}

export interface ApiError {
  code: string
  message: string
  details?: any
}
