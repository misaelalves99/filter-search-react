// src/components/CategoryList.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Usando React Router para navegação
import styles from './CategoryList.module.css';

interface CategoryListProps {
  categories: string[];
  onCategorySelect: (category: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onCategorySelect }) => {
  const navigate = useNavigate(); // Definindo o hook 'useNavigate' aqui

  const handleCategorySelect = (category: string) => {
    onCategorySelect(category); // Chama o callback do pai (se necessário)
    navigate(`/products/${category}`); // Navega para a página de categoria selecionada
  };

  return (
    <div className={styles.categoryListContainer}>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategorySelect(category)} // Usando a navegação dentro da função
          className={styles.categoryButton}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryList;

