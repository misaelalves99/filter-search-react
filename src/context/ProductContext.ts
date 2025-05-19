// src/context/ProductContext.ts

import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Product } from "../types/product";

export type ProductContextType = {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  fetchProducts: () => void;
};

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct deve ser usado dentro de um ProductProvider");
  }
  return context;
};
