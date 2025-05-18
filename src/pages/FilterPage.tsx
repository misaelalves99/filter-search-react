// src/pages/FilterPage.tsx

import React from 'react';
import ProductListFilter from '../components/ProductListFilter';
import PageHeader from '../components/PageHeader';
import styles from './FilterPage.module.css';

const FilterPage: React.FC = () => {
  return (
    <main className={styles.container}>
      <PageHeader
        title="Catálogo de Produtos"
        subtitle="Explore nossa coleção completa de produtos disponíveis."
      />

      <ProductListFilter
        enableFilterUI
        enableBuyNow
      />
    </main>
  );
};

export default FilterPage;
