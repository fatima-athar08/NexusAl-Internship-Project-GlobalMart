import React from 'react';
import './InfoPage.css';

export default function CareersPage() {
  return (
    <div className="page-container info-page">
      <h1 className="section-heading">Careers at GlobalMart</h1>
      <div className="info-content">
        <p>Join our mission to connect buyers and sellers across the world with quality and value. We are always looking for passionate, talented individuals to join our team.</p>
        <div className="info-section">
          <h2>Current Openings</h2>
          <p>There are no open positions at this time, but we are always interested in hearing from talented people. Please feel free to send your resume to <a href="mailto:careers@globalmart.com">careers@globalmart.com</a>.</p>
        </div>
      </div>
    </div>
  );
}