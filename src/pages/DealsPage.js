import React from 'react';
import Deals from '../components/Deal';

export default function DealsPage({ flashDeals, dailyDeals, addToCart }) {
  return (
    <div className="page-container">
      <Deals 
        main="Hot Deals" 
        title="Flash Sale" 
        products={flashDeals} 
        endTime={Date.now() + 2 * 60 * 60 * 1000}
        addToCart={addToCart}
      />
      <Deals 
        title="Daily Deals" 
        products={dailyDeals} 
        endTime={Date.now() + 6 * 60 * 60 * 1000} 
        addToCart={addToCart}
      />
    </div>
  );
}