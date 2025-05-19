// src/pages/HomePage.tsx

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product } from '../types/product';
import { getProducts } from '../lib/api/products';
import ProductList from '../components/ProductList';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/products");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetched = await getProducts();
        setProducts(fetched);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Bem-vindo ao Nosso E-commerce</h1>
        <p className={styles.description}>Explore nossos produtos incríveis!</p>
        <button className={styles.heroButton} onClick={handleNavigate}>
          Ver Produtos
        </button>
      </section>

      <section>
        <h2 className={styles.subtitle}>Produtos em Destaque</h2>
        <ProductList products={products} />
      </section>
    </main>
  );
};

export default HomePage;
