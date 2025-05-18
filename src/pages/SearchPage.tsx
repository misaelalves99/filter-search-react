// src/pages/SearchPage.tsx

import React from 'react';
import ProductListSearch from '../components/ProductListSearch';
import PageHeader from '../components/PageHeader';
import styles from './SearchPage.module.css';

const SearchPage: React.FC = () => {
  return (
    <main className={styles.container}>
      <PageHeader
        title="Catálogo de Produtos"
        subtitle="Explore nossa coleção completa de produtos disponíveis."
      />

      <ProductListSearch
        enableBuyNow
      />
    </main>
  );
};

export default SearchPage;
