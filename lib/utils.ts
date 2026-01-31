import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Article, Category } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'just now'
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`
  }

  const diffInYears = Math.floor(diffInMonths / 12)
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text
  }
  return text.slice(0, maxLength).trim() + '...'
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function getCategoryColor(category: Category): string {
  const colors: Record<Category, string> = {
    'web-development': 'bg-blue-100 text-blue-800',
    'ai-ml': 'bg-purple-100 text-purple-800',
    'mobile-dev': 'bg-green-100 text-green-800',
    'devops': 'bg-orange-100 text-orange-800',
    'security': 'bg-red-100 text-red-800',
    'blockchain': 'bg-yellow-100 text-yellow-800',
    'cloud-computing': 'bg-indigo-100 text-indigo-800',
    'data-science': 'bg-pink-100 text-pink-800',
    'ui-ux': 'bg-teal-100 text-teal-800',
    'database': 'bg-gray-100 text-gray-800',
  }
  return colors[category] || 'bg-gray-100 text-gray-800'
}

export function getCategoryIcon(category: Category): string {
  const icons: Record<Category, string> = {
    'web-development': '🌐',
    'ai-ml': '🤖',
    'mobile-dev': '📱',
    'devops': '⚙️',
    'security': '🔒',
    'blockchain': '⛓️',
    'cloud-computing': '☁️',
    'data-science': '📊',
    'ui-ux': '🎨',
    'database': '🗄️',
  }
  return icons[category] || '📝'
}

export function formatCategoryName(category: Category): string {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function extractTextFromHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()
}

export function generateExcerpt(content: string, maxLength: number = 160): string {
  const text = extractTextFromHtml(content)
  return truncateText(text, maxLength)
}

export function getRelatedArticles(
  currentArticle: Article,
  allArticles: Article[],
  limit: number = 3
): Article[] {
  return allArticles
    .filter(article => article.id !== currentArticle.id)
    .filter(article => article.category === currentArticle.category)
    .sort((a, b) => {
      const aScore = calculateRelevanceScore(currentArticle, a)
      const bScore = calculateRelevanceScore(currentArticle, b)
      return bScore - aScore
    })
    .slice(0, limit)
}

function calculateRelevanceScore(current: Article, candidate: Article): number {
  let score = 0
  
  if (candidate.category === current.category) {
    score += 10
  }
  
  const commonTags = current.tags.filter(tag => candidate.tags.includes(tag))
  score += commonTags.length * 5
  
  if (candidate.author.id === current.author.id) {
    score += 3
  }
  
  const timeDiff = Math.abs(
    new Date(candidate.publishedAt).getTime() - 
    new Date(current.publishedAt).getTime()
  )
  const daysDiff = timeDiff / (1000 * 60 * 60 * 24)
  if (daysDiff <= 30) {
    score += 2
  }
  
  return score
}

export function capitalizeFirstLetter(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function pluralize(count: number, singular: string, plural?: string): string {
  if (count === 1) {
    return `${count} ${singular}`
  }
  return `${count} ${plural || singular + 's'}`
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text)
  }
  
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.position = 'fixed'
  textArea.style.left = '-999999px'
  textArea.style.top = '-999999px'
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  
  return new Promise((resolve, reject) => {
    try {
      document.execCommand('copy')
      resolve()
    } catch (err) {
      reject(err)
    } finally {
      document.body.removeChild(textArea)
    }
  })
}

export function getScrollPosition(): { x: number; y: number } {
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop,
  }
}

export function scrollToTop(smooth: boolean = true): void {
  if (smooth) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    window.scrollTo(0, 0)
  }
}

export function isElementInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}
