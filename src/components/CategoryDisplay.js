import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryDisplay.css';

// Map API categories to user-friendly display names and icons
const categoryMap = {
  'fragrances': { name: 'Fragrances', icon: 'fas fa-perfume' },
  'skincare': { name: 'Beauty', icon: 'fas fa-spa' },
  'laptops': { name: 'Laptops', icon: 'fas fa-laptop' },
  'mens-shirts': { name: 'Men Shirts', icon: 'fas fa-tshirt' },
  'home-decoration': { name: 'Home & Kitchen', icon: 'fas fa-home' },
  // Add other mappings as needed for a consistent look
  'smartphones': { name: 'Smartphones', icon: 'fas fa-mobile-alt' },
  'groceries': { name: 'Groceries', icon: 'fas fa-shopping-basket' },
  'furniture': { name: 'Furniture', icon: 'fas fa-couch' },
  'tops': { name: 'Tops', icon: 'fas fa-tshirt' },
};

const getCategoryDetails = (category) => {
  if (categoryMap[category]) {
    return categoryMap[category];
  }
  // Fallback for categories not in the map
  return {
    name: category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    icon: 'fas fa-tag',
  };
};

export default function CategoryDisplay({ categories }) {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="section categories-section">
      <h2 className="section-heading">Shop by Category</h2>
      <div className="categories-grid">
        {categories.map((category) => {
          const { name, icon } = getCategoryDetails(category);
          return (
            <Link to={`/products?category=${category}`} key={category} className="category-card">
              <div className="category-icon">
                <i className={icon}></i>
              </div>
              <h3 className="category-name">{name}</h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
}