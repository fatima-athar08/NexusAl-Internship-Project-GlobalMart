import React from 'react';
import './InfoPage.css';

export default function PrivacyPolicyPage() {
  return (
    <div className="page-container info-page">
      <h1 className="section-heading">Privacy Policy</h1>
      <div className="info-content">
        <p>Your privacy is important to us. It is GlobalMart's policy to respect your privacy regarding any information we may collect from you across our website.</p>
        <div className="info-section">
          <h2>1. Information we collect</h2>
          <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
        </div>
        <div className="info-section">
          <h2>2. How we use your information</h2>
          <p>We use the information we collect to process transactions, send periodic emails, and improve our service.</p>
        </div>
      </div>
    </div>
  );
}