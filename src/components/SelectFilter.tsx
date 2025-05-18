// src/components/SelectFilter.tsx

import React, { useEffect, useState } from 'react';
import { Product } from '../types/product';
import styles from './SelectFilter.module.css';

interface SelectFilterProps {
  products: Product[];
  categories: string[];
  onSearch: (filteredProducts: Product[]) => void;
  onCategoryChange?: (category: string) => void;
}

const SelectFilter: React.FC<SelectFilterProps> = ({
  products,
  categories,
  onSearch,
  onCategoryChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    onSearch(filtered);
    if (onCategoryChange) onCategoryChange(selectedCategory);
  }, [selectedCategory, products, onSearch, onCategoryChange]);

  return (
    <div className={styles.searchFilterContainer}>
      <div className={styles.filtersWrapper}>
        <div className={styles.filterGroup}>
          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">Todas as Categorias</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SelectFilter;
