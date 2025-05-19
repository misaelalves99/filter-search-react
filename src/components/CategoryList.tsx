// src/components/CategoryList.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CategoryList.module.css';

interface CategoryListProps {
  categories: string[];
  onCategorySelect: (category: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onCategorySelect }) => {
  const navigate = useNavigate();

  const handleCategorySelect = (category: string) => {
    onCategorySelect(category);
    navigate(`/products/${category}`);
  };

  return (
    <div className={styles.categoryListContainer}>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategorySelect(category)}
          className={styles.categoryButton}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryList;

