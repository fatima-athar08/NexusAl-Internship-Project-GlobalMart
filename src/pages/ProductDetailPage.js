import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';

export default function ProductDetailPage({ allProducts, addToCart }) {
  const { productId } = useParams();
  
  // Find the product by its ID. Using `===` for strict comparison.
  const product = allProducts.find(p => p.id === productId);

  return (
    <div className="page-container">
      <ProductDetail product={product} addToCart={addToCart} />
    </div>
  );
}