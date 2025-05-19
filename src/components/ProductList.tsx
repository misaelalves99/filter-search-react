import React, { useState, useEffect } from "react";
import { Product } from "../types/product";
import ProductCard from "./ProductCard";
import SearchForm from "./SearchForm";
import SearchFilter from "./SearchFilter";
import styles from "./ProductList.module.css";

interface ProductListProps {
  products: Product[];
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

  const handleSearch = () => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (minPrice || maxPrice) {
      filtered = filtered.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }

    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (selectedCategory: string) => {
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
              onCategoryChange={handleCategoryChange}
              onPriceRangeChange={(min, max) => {
                setMinPrice(Number(min));
                setMaxPrice(Number(max));
                handleSearch();
              }}
              onSearch={handleSearch}
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
