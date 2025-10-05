import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import AllProducts from '../components/AllProducts';
import ProductFilters from '../components/ProductFilters'; // New component
import './ProductsPage.css';

export default function ProductsPage({ allProducts, categories, addToCart }) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get initial category from URL or set to 'all'
  const selectedCategory = searchParams.get('category') || 'all';

  // State for sorting and price range
  const [sortOrder, setSortOrder] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });

  // Determine the max price from all products for the slider range
  const maxPrice = useMemo(() => {
    if (allProducts.length === 0) return 0;
    return Math.max(...allProducts.map(p => parseFloat(p.price.replace('$', ''))));
  }, [allProducts]);

  // Set initial price range once maxPrice is calculated
  useState(() => {
    if (maxPrice > 0) {
      setPriceRange({ min: 0, max: maxPrice });
    }
  }, [maxPrice]);

  // Filter and sort products based on user selections
  const filteredAndSortedProducts = useMemo(() => {
    let products = allProducts;

    // 1. Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
      products = products.filter(p => p.category === selectedCategory);
    }

    // 2. Filter by price range
    products = products.filter(p => {
      const price = parseFloat(p.price.replace('$', ''));
      return price >= priceRange.min && price <= priceRange.max;
    });

    // 3. Sort products
    if (sortOrder === 'low-to-high') {
      products.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
    } else if (sortOrder === 'high-to-low') {
      products.sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
    }

    return products;
  }, [selectedCategory, sortOrder, priceRange, allProducts]);

  const handleCategoryChange = (category) => {
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="page-container products-page">
      <ProductFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        priceRange={priceRange}
        onPriceChange={setPriceRange}
        maxPrice={maxPrice}
      />
      <div className="products-container">
        <AllProducts
          products={filteredAndSortedProducts}
          addToCart={addToCart}
          selectedCategory={selectedCategory === 'all' ? null : selectedCategory}
        />
      </div>
    </div>
  );
}