import { Article } from '@/lib/types'
import Image from 'next/image'

interface ArticleCardProps {
  article: Article
  onClick: () => void
}

export function ArticleCard({ article, onClick }: ArticleCardProps) {
  return (
    <article 
      className="card hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        {article.coverImage ? (
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              {article.title.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {article.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <time dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </time>
          <span className="mx-2">•</span>
          <span>{article.readingTime} min read</span>
        </div>
        
        <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {article.title}
        </h3>
        
        <p className="text-gray-600 line-clamp-3 mb-4">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {article.author.avatar ? (
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium">
                  {article.author.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <span className="text-sm text-gray-700">{article.author.name}</span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {article.views}
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {article.likes}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
