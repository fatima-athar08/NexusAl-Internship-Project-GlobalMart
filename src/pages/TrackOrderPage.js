import React from 'react';
import './InfoPage.css';

export default function TrackOrderPage() {
  const handleTrack = (e) => {
    e.preventDefault();
    alert('Tracking feature is for demonstration purposes. Order status: In Transit.');
  };

  return (
    <div className="page-container info-page">
      <h1 className="section-heading">Track Your Order</h1>
      <p className="section-subtitle">Enter your order ID below to see its status.</p>
      
      <form className="track-order-form" onSubmit={handleTrack}>
        <div className="form-group">
          <label htmlFor="orderId">Order ID</label>
          <input type="text" id="orderId" name="orderId" className="form-input" placeholder="e.g., gm_123456789" />
        </div>
        <button type="submit" className="btn btn-primary">Track</button>
      </form>
    </div>
  );
}