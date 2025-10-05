import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

// This component wraps our checkout pages to protect them
export default function ProtectedRoute({ children, step }) {
  const { state } = useContext(CartContext);
  const { cartItems, shippingAddress } = state;

  // If trying to access payment without a shipping address, redirect to shipping
  if (step === 'payment' && !shippingAddress.address1) {
    return <Navigate to="/shipping" replace />;
  }

  // If trying to confirm an order without a shipping address or items, redirect
  if (step === 'confirm' && (!shippingAddress.address1 || cartItems.length === 0)) {
    return <Navigate to="/shipping" replace />;
  }

  // If all conditions are met, render the requested page
  return children;
}