import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import OrderSummary from '../components/OrderSummary';
import CheckoutSteps from '../components/CheckoutSteps';
import './ConfirmOrderPage.css';

export default function ConfirmOrderPage({ setNotification }) {
  const navigate = useNavigate();
  const { state, dispatch, totals } = useContext(CartContext);
  const { cartItems, shippingAddress, paymentMethod } = state;
  const [isLoading, setIsLoading] = useState(false);

  // Protection logic
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
    if (!shippingAddress.address1) {
      navigate('/shipping');
    }
  }, [cartItems, shippingAddress, navigate]);

  const handleConfirm = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const order = {
        id: `gm_${Date.now()}`,
        items: cartItems,
        shippingAddress,
        paymentMethod,
        totals: {
          items: totals.itemsPrice.toFixed(2),
          shipping: totals.shippingPrice.toFixed(2),
          tax: totals.taxPrice.toFixed(2),
          grandTotal: totals.totalPrice.toFixed(2),
        },
        timestamp: new Date().toISOString(),
      };
      
      const existingOrders = JSON.parse(localStorage.getItem('globalMartOrders')) || [];
      localStorage.setItem('globalMartOrders', JSON.stringify([...existingOrders, order]));
      
      dispatch({ type: 'CART_CLEAR' });
      
      setNotification('✅ Order placed successfully!');
      navigate(`/order-success/${order.id}`);
    }, 1500);
  };

  return (
    <div className="page-container confirm-order-page">
      <CheckoutSteps step1 step2 step3 />
      <h1 className="section-heading">Confirm Your Order</h1>
      <div className="confirm-order-content">
        <div className="confirm-order-details">
          <div className="detail-section">
            <h2>Shipping Address</h2>
            <p>{shippingAddress.fullName}</p>
            <p>{shippingAddress.address1}{shippingAddress.address2 ? `, ${shippingAddress.address2}` : ''}</p>
            <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}</p>
            <p>{shippingAddress.country}</p>
            <Link to="/shipping" className="edit-link">Edit</Link>
          </div>
          <div className="detail-section">
            <h2>Payment Method</h2>
            <p>{paymentMethod}</p>
            <Link to="/payment" className="edit-link">Edit</Link>
          </div>
          <div className="detail-section">
            <h2>Order Items</h2>
            <div className="order-items-list">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <span>{item.quantity} x {item.price} = <strong>${(item.quantity * parseFloat(item.price.replace('$', ''))).toFixed(2)}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="order-summary-container">
          <OrderSummary />
          <div className="confirm-order-actions">
            <button className="btn btn-primary" onClick={handleConfirm} disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Confirm & Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}