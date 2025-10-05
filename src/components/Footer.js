import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

// This mapping ensures consistent naming with the Home page categories.
const categoryDisplayMap = {
  'smartphones': 'Smartphones',
  'laptops': 'Laptops',
  'skincare': 'Beauty',
  'mens-shirts': 'Men Shirts',
  'home-decoration': 'Home & Kitchen',
};

const capitalize = (str) => {
    return categoryDisplayMap[str] || str.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export default function Footer({ footerLinks, mainCategories = [] }) {
  return (
    <div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Shop</h3>
            <ul className="footer-links">
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/deals">Deals & Offers</Link></li>
            </ul>
          </div>
          
          {/* Main Categories Column */}
          {mainCategories.length > 0 && (
            <div className="footer-column">
              <h3>Main Categories</h3>
              <ul className="footer-links">
                {mainCategories.map((category) => (
                  <li key={category}>
                    <Link to={`/products?category=${category}`}>
                      {capitalize(category)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Existing Footer Links from data.js */}
          {footerLinks.map((group, idx) => (
            <div className="footer-column" key={idx}>
              <h3>{group.title}</h3>
              <ul className="footer-links">
                {group.links.map((link, i) => (
                  <li key={i}>
                    <Link to={link.path}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="footer-column">
            <h3>Connect With Us</h3>
            <p>Follow us on social media for exclusive deals and updates!</p>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="twitter"><i className="fab fa-twitter"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="instagram"><i className="fab fa-instagram"></i></a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="pinterest"><i className="fab fa-pinterest"></i></a>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2023 GlobalMart. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}