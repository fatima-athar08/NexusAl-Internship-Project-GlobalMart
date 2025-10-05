import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './OrderSummary.css';

export default function OrderSummary() {
  const { state } = useContext(CartContext);
  const { cartItems } = state;

  // Perform calculations for the order summary
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.quantity * parseFloat(item.price.replace('$', '')), 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10; // Free shipping for orders over $100
  const taxPrice = itemsPrice * 0.15; // 15% tax
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <div className="summary-row">
        <span>Items ({cartItems.reduce((a, c) => a + c.quantity, 0)})</span>
        <span>${itemsPrice.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Shipping</span>
        <span>{shippingPrice === 0 ? 'Free' : `$${shippingPrice.toFixed(2)}`}</span>
      </div>
      <div className="summary-row">
        <span>Tax (15%)</span>
        <span>${taxPrice.toFixed(2)}</span>
      </div>
      <div className="summary-row total">
        <span>Order Total</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
}