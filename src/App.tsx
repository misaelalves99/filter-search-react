// src/App.tsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ProductProvider } from './context/ProductContext';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import SearchPage from './pages/SearchPage';
import FilterPage from './pages/FilterPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ProductProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/filter" element={<FilterPage />} />
          </Routes>
        </main>
        <Footer />
      </ProductProvider>
    </BrowserRouter>
  );
};

export default App;
