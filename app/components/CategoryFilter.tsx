import { Category } from '@/lib/types'

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: Category | null
  onCategoryChange: (category: Category | null) => void
}

export function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Filter by Category
      </label>
      <select
        value={selectedCategory || ''}
        onChange={(e) => onCategoryChange(e.target.value as Category || null)}
        className="input w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
          </option>
        ))}
      </select>
    </div>
  )
}
