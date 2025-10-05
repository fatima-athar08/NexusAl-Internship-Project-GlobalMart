import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import * as constants from '../context/constants';
import './CartSidebar.css';

export default function CartSidebar() {
  const { state, dispatch, totals } = useContext(CartContext);
  const { isCartOpen, cartItems } = state;
  const navigate = useNavigate();

  const closeCart = () => {
    dispatch({ type: constants.TOGGLE_CART });
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) {
      // If quantity drops to 0, remove the item
      dispatch({ type: constants.CART_REMOVE_ITEM, payload: item });
    } else {
      dispatch({ type: constants.CART_UPDATE_QUANTITY, payload: { id: item.id, quantity: newQuantity } });
    }
  };
  
  const handleRemove = (itemToRemove) => {
    dispatch({ type: constants.CART_REMOVE_ITEM, payload: itemToRemove });
  };

  const handleViewCart = () => {
    closeCart();
    navigate('/cart');
  };

  return (
    <>
      <div className={`cart-overlay ${isCartOpen ? 'show' : ''}`} onClick={closeCart}></div>
      <div className={`cart-sidebar ${isCartOpen ? 'show' : ''}`}>
        <div className="cart-sidebar-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={closeCart}>&times;</button>
        </div>
        <div className="cart-sidebar-body">
          {cartItems.length === 0 ? (
            <p className="empty-cart-message">Your cart is empty.</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-sidebar-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>{item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(item, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <div className="item-remove-container">
                    <button className="sidebar-item-remove" onClick={() => handleRemove(item)} title="Remove item">
                        &times;
                    </button>
                </div>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="cart-sidebar-footer">
            <div className="subtotal">
              <span>Subtotal:</span>
              <span>${totals.itemsPrice.toFixed(2)}</span>
            </div>
            <button className="btn btn-primary" onClick={handleViewCart}>View Cart & Checkout</button>
          </div>
        )}
      </div>
    </>
  );
}