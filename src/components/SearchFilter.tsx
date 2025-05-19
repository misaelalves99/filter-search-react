// src/components/SearchFilter.tsx

import React, { useState, useEffect } from 'react';
import { Product } from '../types/product';
import styles from './SearchFilter.module.css';

interface SearchFilterProps {
  products: Product[];
  categories: string[];
  onSearch: (filteredProducts: Product[]) => void;
  onCategoryChange?: (category: string) => void;
  onPriceRangeChange?: (category: string, min: number, max: number) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ 
  products, 
  categories, 
  onSearch, 
  onCategoryChange,
  onPriceRangeChange 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const filterProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    if (minPrice || maxPrice) {
      filtered = filtered.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }

    onSearch(filtered);

    if (onCategoryChange) onCategoryChange(selectedCategory);
    if (onPriceRangeChange) onPriceRangeChange(selectedCategory, minPrice, maxPrice);
  };

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedCategory, minPrice, maxPrice]);

  return (
    <div className={styles.searchFilterContainer}>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.filtersWrapper}>
        <div className={styles.filterGroup}>
          <label>Categoria</label>
          <select
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

        <div className={styles.filterGroup}>
          <label>Faixa de Preço</label>
          <div className={styles.priceRange}>
            <input
              type="number"
              placeholder="Preço Mínimo"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className={styles.priceInput}
            />
            <input
              type="number"
              placeholder="Preço Máximo"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className={styles.priceInput}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
