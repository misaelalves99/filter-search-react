// src/context/ProductProvider.tsx

import { useState, type ReactNode } from "react";
import { ProductContext } from "./ProductContext";
import { getProducts } from "../lib/api/products";
import type { Product } from "../types/product";

const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = () => {
    getProducts()
      .then(setProducts)
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  };

  return (
    <ProductContext.Provider value={{ products, setProducts, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
