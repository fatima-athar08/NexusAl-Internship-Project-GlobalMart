import React, { useState } from 'react';
import './ProductFilters.css';

export default function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  sortOrder,
  onSortChange,
  priceRange,
  onPriceChange,
  maxPrice
}) {
  const [showFilters, setShowFilters] = useState(false);

  const handlePriceChange = (e) => {
    onPriceChange({ ...priceRange, [e.target.name]: Number(e.target.value) });
  };
  
  const capitalize = (str) => str ? str.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '';

  return (
    <div className="product-filters-container">
      <div className="filter-header">
        <h3 className="filter-title">Filters</h3>
        <button 
          className="filter-toggle-btn" 
          onClick={() => setShowFilters(!showFilters)}
        >
          <i className={`fas ${showFilters ? 'fa-times' : 'fa-filter'}`}></i>
        </button>
      </div>

      <div className={`filters-wrapper ${showFilters ? 'show' : ''}`}>
        {/* Category Filter */}
        <div className="filter-group">
          <label htmlFor="category-select">Category</label>
          <select 
            id="category-select" 
            value={selectedCategory} 
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{capitalize(cat)}</option>
            ))}
          </select>
        </div>

        {/* Sort Order Filter */}
        <div className="filter-group">
          <label htmlFor="sort-select">Sort By</label>
          <select 
            id="sort-select" 
            value={sortOrder} 
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="">Default</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="filter-group price-range-group">
          <label>Price Range</label>
          <div className="price-range-inputs">
            <span>${priceRange.min}</span>
            <input
              type="range"
              name="max"
              min="0"
              max={maxPrice}
              value={priceRange.max}
              onChange={handlePriceChange}
              className="price-slider"
            />
            <span>${priceRange.max}</span>
          </div>
        </div>
      </div>
    </div>
  );
}