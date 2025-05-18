import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import PageHeader from '../components/PageHeader';
import { getProducts } from '../lib/api/products';
import { Product } from '../types/product';
import styles from './ProductsPage.module.css';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <main className={styles.container}>
      <PageHeader
        title="Catálogo de Produtos"
        subtitle="Explore nossa coleção completa de produtos disponíveis."
      />

      {loading ? (
        <p>Carregando produtos...</p>
      ) : (
        <ProductList
          products={products}
          enableFilterUI
          enableBuyNow
        />
      )}
    </main>
  );
};

export default ProductsPage;
