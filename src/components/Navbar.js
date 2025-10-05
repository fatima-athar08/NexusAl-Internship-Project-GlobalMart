import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import * as constants from '../context/constants';
import './Navbar.css';

export default function Navbar({ onSearch, searchQuery }) {
  const { dispatch: cartDispatch, totals } = useContext(CartContext);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(searchQuery);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
  }, [isMobileMenuOpen]);

  const toggleCart = () => {
    cartDispatch({ type: constants.TOGGLE_CART });
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
    setIsMobileMenuOpen(false);
    navigate('/products');
  };

  const clearSearch = () => {
    onSearch('');
    setInputValue('');
  };

  const handleNavClick = () => {
    if (searchQuery) {
        clearSearch();
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <NavLink to="/" onClick={handleNavClick}>
            <img src="/images/logopic (1).svg" className="logo-img" alt="logo" />
          </NavLink>
        </div>

        <div className="nav-desktop">
          <div className="nav-links">
            <NavLink to="/" onClick={handleNavClick} className={({ isActive }) => (isActive ? 'active-link' : '')}>Home</NavLink>
            <NavLink to="/products" onClick={handleNavClick} className={({ isActive }) => (isActive ? 'active-link' : '')}>Products</NavLink>
            <NavLink to="/deals" onClick={handleNavClick} className={({ isActive }) => (isActive ? 'active-link' : '')}>Deals</NavLink>
            <NavLink to="/about" onClick={handleNavClick} className={({ isActive }) => (isActive ? 'active-link' : '')}>About</NavLink>
            <NavLink to="/contact" onClick={handleNavClick} className={({ isActive }) => (isActive ? 'active-link' : '')}>Contact</NavLink>
          </div>
        </div>

        <div className="nav-actions">
          <div className="nav-actions-desktop">
            <form className="search-container" onSubmit={handleSearchSubmit}>
              <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="search-bar" placeholder="Search..." />
              {inputValue && <button type="button" className="clear-search-btn" onClick={clearSearch}>&times;</button>}
              <button type="submit" className="search-btn"><i className="fas fa-search"></i></button>
            </form>
            {isAuthenticated ? (
              <div className="user-menu">
                <span className="user-greeting">Welcome, {user.name}</span>
                <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
              </div>
            ) : (
              <div className="auth-links">
                <NavLink to="/login" className="btn btn-secondary">Login</NavLink>
                <NavLink to="/signup" className="btn btn-primary">Signup</NavLink>
              </div>
            )}
          </div>
          
          <div className="cart-icon" onClick={toggleCart} role="button" tabIndex="0" aria-label="Open cart">
            <i className="fas fa-shopping-cart"></i>
            {totals.totalItems > 0 && <span className="cart-count">{totals.totalItems}</span>}
          </div>
          
          <button className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            <i className={isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
          </button>
        </div>
      </nav>

      <div className={`nav-menu-mobile ${isMobileMenuOpen ? 'active' : ''}`}>
        <form className="search-container-mobile" onSubmit={handleSearchSubmit}>
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="search-bar" placeholder="Search products..." />
            <button type="submit" className="search-btn"><i className="fas fa-search"></i></button>
        </form>

        <div className="nav-links-mobile">
          <NavLink to="/" onClick={handleNavClick}>Home</NavLink>
          <NavLink to="/products" onClick={handleNavClick}>Products</NavLink>
          <NavLink to="/deals" onClick={handleNavClick}>Deals</NavLink>
          <NavLink to="/about" onClick={handleNavClick}>About</NavLink>
          <NavLink to="/contact" onClick={handleNavClick}>Contact</NavLink>
        </div>

        <div className="auth-actions-mobile">
            {isAuthenticated ? (
              <div className="user-menu-mobile">
                <span className="user-greeting">Welcome, {user.name}!</span>
                <button onClick={handleLogout} className="btn btn-secondary logout-btn-mobile">Logout</button>
              </div>
            ) : (
              <div className="auth-links-mobile">
                <NavLink to="/login" className="btn btn-secondary" onClick={() => setIsMobileMenuOpen(false)}>Login</NavLink>
                <NavLink to="/signup" className="btn btn-primary" onClick={() => setIsMobileMenuOpen(false)}>Signup</NavLink>
              </div>
            )}
        </div>
      </div>
    </header>
  );
}