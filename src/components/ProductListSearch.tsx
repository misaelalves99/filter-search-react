// src/components/ProductListSearch.tsx

import React, { useState, useEffect } from 'react';
import { getProducts } from '../lib/api/products';
import { useProduct } from '../context/ProductContext';
import ProductCard from './ProductCard';
import SearchForm from './SearchForm';

import styles from './ProductListSearch.module.css';

interface ProductListSearchProps {
  enableBuyNow?: boolean;
  title?: string;
}

const ProductListSearch: React.FC<ProductListSearchProps> = ({
  enableBuyNow = false,
}) => {
  const { products, setProducts } = useProduct();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetched = await getProducts();
        setProducts(fetched);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchData();
  }, [setProducts]);

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.pageWrapper}>
      <SearchForm onSearch={setSearchQuery} />

      <div className={styles.productGrid}>
        {filtered.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} enableBuyNow={enableBuyNow} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListSearch;
