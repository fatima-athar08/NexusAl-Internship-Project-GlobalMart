import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';
import './CartPage.css';

export default function CartPage() {
  const { state, totals } = useContext(CartContext);
  const { cartItems } = state;
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/shipping');
  };

  return (
    <div className="page-container cart-page">
      <h1 className="section-heading">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="empty-cart-container">
          <p className="section-subtitle">Your cart is empty.</p>
          <Link to="/products" className="btn btn-primary">Go Shopping</Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-list">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="cart-summary">
            <h2>Cart Summary</h2>
            <div className="summary-row">
              <span>Total Items</span>
              <span>{totals.totalItems}</span>
            </div>
            <div className="summary-row total">
              <span>Grand Total</span>
              <span className="cart-total-value">${totals.itemsPrice.toFixed(2)}</span>
            </div>
            <button className="btn btn-primary checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}