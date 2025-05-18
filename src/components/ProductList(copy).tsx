// src/components/ProductList.tsx

import React, { useEffect, useState } from "react";
import { Product } from "../types/product";
import ProductCard from "./ProductCard";
import { useProduct } from "../context/ProductContext";
import styles from "./ProductList.module.css";

interface ProductListProps {
  selectedCategory?: string;
  filter?: "lowToHigh" | "highToLow" | "";
  searchQuery?: string;
  priceRange?: [number, number];
  overrideProducts?: Product[]; // Permite sobrescrever os produtos carregados
}

const ProductList: React.FC<ProductListProps> = ({
  selectedCategory = "",
  filter = "",
  searchQuery = "",
  priceRange = [0, Infinity],
  overrideProducts = [],
}) => {
  const { products, setProducts } = useProduct(); // Usando seu contexto customizado para estado global
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Função para buscar produtos
  const fetchProducts = async (): Promise<Product[]> => {
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      if (!res.ok) throw new Error("Erro ao buscar produtos");
      return await res.json();
    } catch (err) {
      setError("Erro ao carregar produtos");
      throw err;
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        // Se overrideProducts é fornecido, usa ele; caso contrário, faz a requisição para a API
        const base = overrideProducts.length ? overrideProducts : await fetchProducts();

        const filtered = base.filter((p) =>
          (!selectedCategory || p.category === selectedCategory) &&
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          p.price >= priceRange[0] &&
          p.price <= priceRange[1]
        );

        // Ordenando os produtos
        if (filter === "lowToHigh") filtered.sort((a, b) => a.price - b.price);
        if (filter === "highToLow") filtered.sort((a, b) => b.price - a.price);

        setProducts(filtered); // Atualizando o estado global com os produtos filtrados
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    load(); // Executa a função de carregamento
  }, [filter, selectedCategory, searchQuery, priceRange, overrideProducts, setProducts]);

  // Exibindo carregamento ou mensagens de erro
  if (loading) return <div className={styles.loading}>Carregando produtos...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!products.length) return <p className={styles.noProductsMessage}>Nenhum produto encontrado.</p>;

  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductList;
