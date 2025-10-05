import React from 'react';
import './InfoPage.css';
export default function ShippingInfoPage() {
return (
<div className="page-container info-page">
<h1 className="section-heading">Shipping & Returns</h1>
<div className="info-content">
    <div className="info-section">
      <h2>Shipping Policy</h2>
      <p>We are committed to delivering your products in a timely and secure manner. Standard shipping is free on all orders over $100. For orders under $100, a flat rate of $10 applies. Most orders are processed within 1-2 business days.</p>
    </div>
    <div className="info-section">
      <h2>Returns Policy</h2>
      <p>Your satisfaction is our priority. If you are not completely satisfied with your purchase, you may return it within 30 days of receipt for a full refund or exchange. Items must be in their original condition. To start a return, please visit our "Contact Us" page.</p>
    </div>
  </div>
</div>
);
}