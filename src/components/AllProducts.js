import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

export default function AllProducts({ products = [], addToCart, selectedCategory }) {
  const navigate = useNavigate();

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    alert('Added to wishlist (demo)!');
  };
  
  const capitalize = (str) => str ? str.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '';

  const title = selectedCategory ? `Products in "${capitalize(selectedCategory)}"` : "All Products";
  const subtitle = selectedCategory 
    ? `Browse products available in the ${capitalize(selectedCategory)} category.`
    : "Browse our entire collection and find what you're looking for.";

  return (
    <section id="all-products" className="section all-products-section">
      <h2 className="section-heading">{title}</h2>
      <p className="section-subtitle">{subtitle}</p>

      <div className="products-grid">
        {products.length > 0 ? (
          products.map((p) => (
            <div
              className="product-card"
              key={p.id}
              onClick={() => navigate(`/product/${p.id}`)}
              role="link"
              tabIndex="0"
              onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && navigate(`/product/${p.id}`)}
            >
              <div className="product-image-container">
                <img
                  src={p.image}
                  alt={p.name}
                  className="product-image"
                  onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400x300?text=No+Image")}
                />
                {p.discount && <span className="product-discount-tag">{p.discount}</span>}
                <button className="wishlist-btn" title="Add to Wishlist" onClick={handleWishlistClick}>
                  <i className="fas fa-heart"></i>
                </button>
              </div>
              <div className="product-info">
                <h3 className="product-title">{p.name}</h3>
                <div className="product-rating">
                  <span>{'★'.repeat(Math.round(p.rating))}{'☆'.repeat(5 - Math.round(p.rating))}</span>
                  <span className="rating-count">({p.rating.toFixed(1)})</span>
                </div>
                <div className="product-price">
                  <span className="current-price">{p.price}</span>
                  {p.discount && <span className="original-price">{p.originalPrice}</span>}
                </div>
              </div>
              <div className="product-actions">
                <button className="btn btn-primary add-to-cart-btn" onClick={(e) => handleAddToCart(e, p)}>
                  <i className="fas fa-shopping-cart"></i> Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-products-message">No products found matching your criteria.</p>
        )}
      </div>
    </section>
  );
}