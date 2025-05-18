import React, { useState, useEffect } from "react";
import { Product } from "../types/product";
import ProductCard from "./ProductCard";
import SearchForm from "./SearchForm";
import SearchFilter from "./SearchFilter";
import styles from "./ProductList.module.css";

interface ProductListProps {
  products: Product[]; // Aceitando a lista de produtos diretamente
  enableFilterUI?: boolean;
  enableBuyNow?: boolean;
  title?: string;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  enableFilterUI = true,
  enableBuyNow = false,
}) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    const allCategories = Array.from(
      new Set(products.map((product: Product) => product.category))
    );
    setCategories(allCategories);
  }, [products]);

  // Função para filtrar os produtos com base na pesquisa, categoria e faixa de preço
  const handleSearch = () => {
    let filtered = products;

    // Filtro por pesquisa
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtro por categoria
    if (minPrice || maxPrice) {
      filtered = filtered.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }

    // Atualiza os produtos filtrados
    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (selectedCategory: string) => {
    // Atualiza a lista de produtos filtrados com base na categoria
    const filtered = products.filter((product) =>
      selectedCategory === "todos"
        ? true
        : product.category === selectedCategory
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className={styles.pageWrapper}>
      <SearchForm onSearch={setSearchQuery} />

      {enableFilterUI && (
        <>
          <div className={styles.filters}>
            <SearchFilter
              categories={categories}
              products={products}
              onCategoryChange={handleCategoryChange} // Passando a função de categoria
              onPriceRangeChange={(min, max) => {
                setMinPrice(Number(min));
                setMaxPrice(Number(max));
                handleSearch();
              }}
              onSearch={handleSearch} // Passando a função de filtro
            />
          </div>
        </>
      )}

      <div className={styles.productGrid}>
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} enableBuyNow={enableBuyNow} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
