import React from 'react';
import { NavLink } from 'react-router-dom';
import './CheckoutSteps.css';

export default function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <div className="checkout-steps">
      <div className={step1 ? 'active' : ''}>
        <NavLink to="/shipping">Shipping</NavLink>
      </div>
      <div className={step2 ? 'active' : ''}>
        {step2 ? <NavLink to="/payment">Payment</NavLink> : <span>Payment</span>}
      </div>
      <div className={step3 ? 'active' : ''}>
        {step3 ? <NavLink to="/confirm-order">Place Order</NavLink> : <span>Place Order</span>}
      </div>
    </div>
  );
}