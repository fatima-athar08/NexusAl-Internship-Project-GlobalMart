import React from 'react';
import './InfoPage.css';

export default function PressPage() {
  return (
    <div className="page-container info-page">
      <h1 className="section-heading">Press & Media</h1>
      <div className="info-content">
        <p>Welcome to the GlobalMart press room. Here you will find our latest news, press releases, and media contact information.</p>
        <div className="info-section">
          <p>For all media inquiries, please contact our communications team at <a href="mailto:press@globalmart.com">press@globalmart.com</a>.</p>
        </div>
      </div>
    </div>
  );
}