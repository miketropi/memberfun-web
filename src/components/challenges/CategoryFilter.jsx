import { useState, useEffect } from 'react';
import { api } from '../../api/apiService';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/wp/v2/challenge_category');
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return <div className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">Loading categories…</div>;
  }

  return (
    <div className="mb-8">
      <select
        value={selectedCategory || ''}
        onChange={(e) => onCategoryChange(e.target.value || null)}
        className="w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-2.5 text-zinc-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 md:w-72"
      >
        <option value="">All categories</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter; 