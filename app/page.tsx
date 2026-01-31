'use client'

import { useState, useEffect } from 'react'
import { Hero } from './components/Hero'
import { ArticleGrid } from './components/ArticleGrid'
import { SearchBar } from './components/SearchBar'
import { CategoryFilter } from './components/CategoryFilter'
import { ArticleModal } from './components/ArticleModal'
import { Article, Category } from '@/lib/types'
import { fetchArticles } from '@/lib/api'

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await fetchArticles()
        setArticles(data)
        setFilteredArticles(data)
      } catch (error) {
        console.error('Failed to load articles:', error)
      } finally {
        setLoading(false)
      }
    }

    loadArticles()
  }, [])

  useEffect(() => {
    let filtered = articles

    if (searchQuery) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(article => article.category === selectedCategory)
    }

    setFilteredArticles(filtered)
  }, [articles, searchQuery, selectedCategory])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleCategoryFilter = (category: Category | null) => {
    setSelectedCategory(category)
  }

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article)
  }

  const handleCloseModal = () => {
    setSelectedArticle(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Hero />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="md:w-64">
            <CategoryFilter
              categories={Array.from(new Set(articles.map(article => article.category)))}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryFilter}
            />
          </div>
        </div>

        <ArticleGrid
          articles={filteredArticles}
          onArticleClick={handleArticleClick}
        />

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No articles found matching your criteria.</p>
          </div>
        )}
      </div>

      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
