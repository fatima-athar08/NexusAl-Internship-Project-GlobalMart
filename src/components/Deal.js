import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Deals.css";
import "./ProductCard.css";

export default function Deal({ products = [], title, main, endTime, addToCart }) {
  const navigate = useNavigate();

  function useCountdown(targetTime) {
    const [timeLeft, setTimeLeft] = useState(Math.max(targetTime - Date.now(), 0));
    useEffect(() => {
      const interval = setInterval(() => setTimeLeft(Math.max(targetTime - Date.now(), 0)), 1000);
      return () => clearInterval(interval);
    }, [targetTime]);
    if (timeLeft <= 0) return "00:00:00";
    const hours = String(Math.floor(timeLeft / (1000 * 60 * 60))).padStart(2, "0");
    const minutes = String(Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
    const seconds = String(Math.floor((timeLeft % (1000 * 60)) / 1000)).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }
  const countdown = useCountdown(endTime);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
  };
  
  const handleWishlistClick = (e) => {
    e.stopPropagation();
    alert('Added to wishlist (demo)!');
  };

  return (
    <section id="deals" className="section deals-section">
      {main && <h2 className="section-heading">{main}</h2>}
      <div className="deal-category">
        <div className="deal-header">
          <h3>{title}</h3>
          <div className="deal-timer">ENDS IN: {countdown}</div>
        </div>
        <div className="products-grid">
          {products && products.length > 0 ? (
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
            <p className="no-products-message">No deals available right now. Check back later!</p>
          )}
        </div>
      </div>
    </section>
  );
}