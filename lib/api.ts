import { Article, Category, SearchResult, ApiResponse, ApiError } from './types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.tech-blog.com'

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      })

      if (!response.ok) {
        const error: ApiError = await response.json().catch(() => ({
          code: 'UNKNOWN_ERROR',
          message: 'An unknown error occurred',
        }))
        
        throw new Error(error.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return {
        data,
        success: true,
      }
    } catch (error) {
      return {
        data: null as T,
        success: false,
        message: error instanceof Error ? error.message : 'Network error occurred',
      }
    }
  }

  async getArticles(options: {
    page?: number
    limit?: number
    category?: Category
    search?: string
    featured?: boolean
  } = {}): Promise<ApiResponse<SearchResult>> {
    const params = new URLSearchParams()
    
    if (options.page) params.append('page', options.page.toString())
    if (options.limit) params.append('limit', options.limit.toString())
    if (options.category) params.append('category', options.category)
    if (options.search) params.append('search', options.search)
    if (options.featured) params.append('featured', 'true')

    const endpoint = `/articles${params.toString() ? `?${params.toString()}` : ''}`
    return this.request<SearchResult>(endpoint)
  }

  async getArticle(slug: string): Promise<ApiResponse<Article>> {
    return this.request<Article>(`/articles/${slug}`)
  }

  async getArticlesByCategory(category: Category): Promise<ApiResponse<Article[]>> {
    return this.request<Article[]>(`/articles/category/${category}`)
  }

  async getFeaturedArticles(): Promise<ApiResponse<Article[]>> {
    return this.request<Article[]>('/articles/featured')
  }

  async getPopularArticles(): Promise<ApiResponse<Article[]>> {
    return this.request<Article[]>('/articles/popular')
  }

  async searchArticles(query: string): Promise<ApiResponse<SearchResult>> {
    return this.request<SearchResult>(`/articles/search?q=${encodeURIComponent(query)}`)
  }

  async getCategories(): Promise<ApiResponse<Category[]>> {
    return this.request<Category[]>('/categories')
  }

  async subscribeToNewsletter(email: string, name?: string): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email, name }),
    })
  }

  async submitContactForm(data: {
    name: string
    email: string
    subject: string
    message: string
  }): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getComments(articleId: string): Promise<ApiResponse<any[]>> {
    return this.request<any[]>(`/articles/${articleId}/comments`)
  }

  async addComment(articleId: string, comment: {
    content: string
    authorName: string
    authorEmail: string
  }): Promise<ApiResponse<any>> {
    return this.request<any>(`/articles/${articleId}/comments`, {
      method: 'POST',
      body: JSON.stringify(comment),
    })
  }

  async likeArticle(articleId: string): Promise<ApiResponse<{ likes: number }>> {
    return this.request<{ likes: number }>(`/articles/${articleId}/like`, {
      method: 'POST',
    })
  }

  async viewArticle(articleId: string): Promise<ApiResponse<{ views: number }>> {
    return this.request<{ views: number }>(`/articles/${articleId}/view`, {
      method: 'POST',
    })
  }
}

export const apiClient = new ApiClient()

export async function fetchArticles(): Promise<Article[]> {
  const response = await apiClient.getArticles({ limit: 20 })
  
  if (!response.success || !response.data) {
    return getMockArticles()
  }
  
  return response.data.articles
}

export async function fetchArticle(slug: string): Promise<Article | null> {
  const response = await apiClient.getArticle(slug)
  
  if (!response.success || !response.data) {
    return getMockArticles().find(article => article.slug === slug) || null
  }
  
  return response.data
}

export async function searchArticles(query: string): Promise<Article[]> {
  const response = await apiClient.searchArticles(query)
  
  if (!response.success || !response.data) {
    return getMockArticles().filter(article =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(query.toLowerCase())
    )
  }
  
  return response.data.articles
}

function getMockArticles(): Article[] {
  return [
    {
      id: '1',
      title: 'Getting Started with Next.js 14',
      slug: 'getting-started-nextjs-14',
      excerpt: 'Learn how to build modern web applications with Next.js 14, including the latest features and best practices.',
      content: `
        <h2>Introduction</h2>
        <p>Next.js 14 brings exciting new features that make building web applications easier and more efficient than ever before.</p>
        
        <h2>Key Features</h2>
        <ul>
          <li>Improved performance with the App Router</li>
          <li>Server Components by default</li>
          <li>Enhanced image optimization</li>
          <li>Better TypeScript support</li>
        </ul>
        
        <h2>Getting Started</h2>
        <p>To create a new Next.js 14 project, run:</p>
        <pre><code>npx create-next-app@latest my-app --typescript --tailwind --eslint</code></pre>
        
        <h2>Conclusion</h2>
        <p>Next.js 14 is a powerful framework that provides everything you need to build modern web applications.</p>
      `,
      category: 'web-development',
      tags: ['nextjs', 'react', 'javascript', 'typescript'],
      author: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        bio: 'Full-stack developer with expertise in React and Node.js',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
        social: {
          twitter: '@johndoe',
          github: 'johndoe',
          linkedin: 'johndoe'
        }
      },
      publishedAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      readingTime: 5,
      views: 1250,
      likes: 45,
      comments: 12,
      featured: true,
      status: 'published'
    },
    {
      id: '2',
      title: 'Understanding React Server Components',
      slug: 'understanding-react-server-components',
      excerpt: 'Deep dive into React Server Components and how they revolutionize the way we build React applications.',
      content: `
        <h2>What are Server Components?</h2>
        <p>React Server Components are a new type of component that run exclusively on the server.</p>
        
        <h2>Benefits</h2>
        <ul>
          <li>Zero JavaScript shipped to the client</li>
          <li>Direct access to backend resources</li>
          <li>Improved performance</li>
          <li>Smaller bundle sizes</li>
        </ul>
      `,
      category: 'web-development',
      tags: ['react', 'server-components', 'performance'],
      author: {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        bio: 'React specialist and frontend architect',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face'
      },
      publishedAt: '2024-01-10T14:30:00Z',
      updatedAt: '2024-01-10T14:30:00Z',
      readingTime: 8,
      views: 890,
      likes: 32,
      comments: 8,
      featured: false,
      status: 'published'
    },
    {
      id: '3',
      title: 'Introduction to Machine Learning with Python',
      slug: 'intro-machine-learning-python',
      excerpt: 'A comprehensive guide to getting started with machine learning using Python and popular libraries.',
      content: `
        <h2>What is Machine Learning?</h2>
        <p>Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience.</p>
        
        <h2>Getting Started with Python</h2>
        <p>Python is the most popular language for machine learning due to its simplicity and powerful libraries.</p>
        
        <h2>Essential Libraries</h2>
        <ul>
          <li>NumPy for numerical computing</li>
          <li>Pandas for data manipulation</li>
          <li>Scikit-learn for machine learning algorithms</li>
          <li>TensorFlow for deep learning</li>
        </ul>
      `,
      category: 'ai-ml',
      tags: ['python', 'machine-learning', 'data-science'],
      author: {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        bio: 'Data scientist and ML engineer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face'
      },
      publishedAt: '2024-01-08T09:15:00Z',
      updatedAt: '2024-01-08T09:15:00Z',
      readingTime: 12,
      views: 2100,
      likes: 78,
      comments: 25,
      featured: true,
      status: 'published'
    }
  ]
}
