// src/components/Navbar.tsx

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState<string>('');

  useEffect(() => {
    if (location.pathname) {
      setCurrentPath(location.pathname);
    }
  }, [location.pathname]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          E-Commerce
        </Link>

        <div className={styles.navLinks}>
          <Link
            to="/"
            className={`${styles.link} ${currentPath === '/' ? styles.active : ''}`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`${styles.link} ${currentPath === '/products' ? styles.active : ''}`}
          >
            Produtos
          </Link>
          <Link
            to="/search"
            className={`${styles.link} ${currentPath === '/search' ? styles.active : ''}`}
          >
            Busca
          </Link>
          <Link
            to="/filter"
            className={`${styles.link} ${currentPath === '/filter' ? styles.active : ''}`}
          >
            Filtro
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
