import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Login.css';
import './Forms.css'; // Ensure this line is present

export default function Login({ setNotification }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return setNotification('⚠️ Please enter both email and password.');
    }

    const mockUsers = JSON.parse(localStorage.getItem('globalMartUsers')) || [];
    const user = mockUsers.find(user => user.email === email && user.password === password);

    if (user) {
      login({ name: user.name, email: user.email });
      setNotification(`👋 Welcome back, ${user.name}!`);
      navigate('/');
    } else {
      setNotification('❌ Invalid email or password.');
    }
  };

  return (
    <div className="login-section">
      <div className="login-container">
        <div className="logo">
          <img src="images/logopic (1).svg" alt="GlobalMart Logo" />
          <h2>Welcome Back</h2>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="emaillogin">Email Address</label>
            <div className="input-with-icon">
              <i className="fas fa-envelope"></i>
              <input type="email" id="emaillogin" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <i className="fas fa-lock"></i>
              <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Login to Your Account</button>
        </form>
        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign up now</Link>
        </div>
      </div>
    </div>
  );
}