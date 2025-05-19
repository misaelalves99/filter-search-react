// src/components/ProductListFilter.tsx

import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import ProductCard from './ProductCard';
import SelectFilter from './SelectFilter';
import { useProduct } from '../context/ProductContext';
import { getProducts } from '../lib/api/products';

import styles from './ProductListFilter.module.css';

interface ProductListFilterProps {
  enableFilterUI?: boolean;
  enableBuyNow?: boolean;
  title?: string;
}

const ProductListFilter = ({
  enableFilterUI = true,
  enableBuyNow = false,
}: ProductListFilterProps) => {
  const { products, setProducts } = useProduct();

  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetched = await getProducts();
        setProducts(fetched);

        const allCategories = Array.from(
          new Set(fetched.map((product: Product) => product.category))
        );
        setCategories(allCategories);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchData();
  }, [setProducts]);

  const handleSearch = (filteredProducts: Product[]) => {
    setProducts(filteredProducts);
  };

  const filtered = products.filter((product: Product) =>
    categoryFilter ? product.category === categoryFilter : true
  );

  return (
    <div className={styles.pageWrapper}>
      {enableFilterUI && (
        <div className={styles.filters}>
          <SelectFilter
            categories={categories}
            products={products}
            onSearch={handleSearch}
            onCategoryChange={setCategoryFilter}
          />
        </div>
      )}

      <div className={styles.productGrid}>
        {filtered.map((product: Product) => (
          <div key={product.id}>
            <ProductCard product={product} enableBuyNow={enableBuyNow} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListFilter;
