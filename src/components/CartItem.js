import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import * as constants from '../context/constants';
import './CartItem.css';

export default function CartItem({ item }) {
  const { dispatch } = useContext(CartContext);

  // Handles increasing or decreasing quantity.
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      // Automatically remove the item if quantity goes below 1.
      handleRemove();
    } else {
      dispatch({ type: constants.CART_UPDATE_QUANTITY, payload: { id: item.id, quantity: newQuantity } });
    }
  };

  // Handles removing the item completely.
  const handleRemove = () => {
    dispatch({ type: constants.CART_REMOVE_ITEM, payload: item });
  };

  const subtotal = (parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2);

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.name}</h3>
        <div className="cart-item-price">{item.price}</div>
        <div className="cart-item-quantity">
          <button onClick={() => handleQuantityChange(item.quantity - 1)} aria-label="Decrease quantity">-</button>
          <span>{item.quantity}</span>
          <button onClick={() => handleQuantityChange(item.quantity + 1)} aria-label="Increase quantity">+</button>
        </div>
        <div className="cart-item-subtotal">
          Subtotal: ${subtotal}
        </div>
        <button className="cart-item-remove" onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
}