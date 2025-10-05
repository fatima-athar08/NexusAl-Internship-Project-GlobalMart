import React from 'react';
import './InfoPage.css'; // Using a shared CSS for simple info pages

export default function FaqPage() {
  return (
    <div className="page-container info-page">
      <h1 className="section-heading">Frequently Asked Questions</h1>
      
      <div className="info-content">
        <div className="info-section">
          <h2>Ordering</h2>
          <h4>How do I place an order?</h4>
          <p>Browse our products, add items to your cart, and click the checkout button. Follow the on-screen instructions to enter your shipping and payment information to complete your order.</p>
          <h4>Can I track my order?</h4>
          <p>Yes, once your order is shipped, you will receive a tracking number via email. You can use this number on our "Track Order" page.</p>
        </div>

        <div className="info-section">
          <h2>Shipping & Returns</h2>
          <h4>What is your return policy?</h4>
          <p>We offer a 30-day return policy for most items. Please visit our "Shipping & Returns" page for full details on how to initiate a return.</p>
          <h4>How long does shipping take?</h4>
          <p>Standard shipping typically takes 5-7 business days. Expedited options are available at checkout.</p>
        </div>
      </div>
    </div>
  );
}