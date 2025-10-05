import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Signup.css';
import './Forms.css'; // Ensure this line is present

export default function Signup({ setNotification }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      return setNotification('⚠️ Please fill in all fields.');
    }
    if (password !== confirmPassword) {
      return setNotification('❌ Passwords do not match.');
    }
    if (password.length < 6) {
      return setNotification('❌ Password must be at least 6 characters long.');
    }
    
    const mockUsers = JSON.parse(localStorage.getItem('globalMartUsers')) || [];
    const userExists = mockUsers.find(user => user.email === email);

    if (userExists) {
        return setNotification('❌ An account with this email already exists.');
    }

    const newUser = { name, email, password };
    localStorage.setItem('globalMartUsers', JSON.stringify([...mockUsers, newUser]));

    signup({ name, email });
    setNotification(`✅ Welcome, ${name}! Your account has been created.`);
    navigate('/');
  };

  return (
    <div className="signup-section">
      <div className="signup-container">
        <div className="logo">
          <img src="images/logopic (1).svg" alt="GlobalMart Logo" />
          <h2>Create Your Account</h2>
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-with-icon">
              <i className="fas fa-user"></i>
              <input type="text" id="name" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email-signup">Email Address</label>
            <div className="input-with-icon">
              <i className="fas fa-envelope"></i>
              <input type="email" id="email-signup" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password-signup">Password</label>
            <div className="input-with-icon">
              <i className="fas fa-lock"></i>
              <input type="password" id="password-signup" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="input-with-icon">
              <i className="fas fa-lock"></i>
              <input type="password" id="confirm-password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Create Account</button>
        </form>
        <div className="login-link">
          Already have an account? <Link to="/login">Log in now</Link>
        </div>
      </div>
    </div>
  );
}