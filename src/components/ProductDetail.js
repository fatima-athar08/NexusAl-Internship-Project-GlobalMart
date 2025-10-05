import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductDetail.css';

export default function ProductDetail({ product, addToCart }) {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="product-detail-container">
        <h2 className="section-heading">Product Not Found</h2>
        <p className="section-subtitle">Sorry, the product you are looking for does not exist.</p>
      </div>
    );
  }

  const stockStatus = product.stock > 0 ? "In Stock" : "Out of Stock";
  const stockClass = product.stock > 0 ? 'in-stock' : 'out-of-stock';


  return (
    <div className="product-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">
        <i className="fas fa-arrow-left"></i> Back
      </button>

      <div className="product-detail-card">
        <div className="product-detail-images">
            <div className="main-image-container">
            <img 
                src={selectedImage} 
                alt={product.name} 
                className="product-detail-image"
                onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/600x600?text=No+Image")}
            />
            </div>
            <div className="product-detail-thumbnails">
                {product.images.map((img, index) => (
                    <img 
                        key={index}
                        src={img}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className={`thumbnail-image ${img === selectedImage ? 'active' : ''}`}
                        onClick={() => setSelectedImage(img)}
                    />
                ))}
            </div>
        </div>
        <div className="product-detail-info">
          <div className="product-brand">{product.brand}</div>
          <h1 className="product-detail-name">{product.name}</h1>
          <p className="product-detail-description">{product.description || "No description available."}</p>
          <div className="product-rating">
            <span>{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</span>
            <span className="rating-count">({product.rating.toFixed(1)} stars)</span>
          </div>
          <div className={`stock-status ${stockClass}`}>{stockStatus} ({product.stock} left)</div>
          <div className="product-detail-price">{product.price}</div>
          
          <button 
            className="btn btn-primary add-to-cart-btn" 
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
          >
            <i className="fas fa-shopping-cart"></i> 
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}