import React from 'react';
import './InfoPage.css';

export default function InvestorsPage() {
  return (
    <div className="page-container info-page">
      <h1 className="section-heading">Investor Relations</h1>
      <div className="info-content">
        <p>GlobalMart is committed to creating long-term shareholder value. This section provides investors with access to our key financial data and corporate announcements.</p>
        <div className="info-section">
          <p>For investor-related inquiries, please contact <a href="mailto:investors@globalmart.com">investors@globalmart.com</a>.</p>
        </div>
      </div>
    </div>
  );
}