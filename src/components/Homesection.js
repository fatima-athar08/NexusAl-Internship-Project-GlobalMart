import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homesection.css';

export default function Homesection({ heading, description, buttonText, image }) {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate('/products');
  };

  return (
    <div>
      <section id="home" className="section home-section">
        <div className="hero">
          <div className="hero-content">
            <h1 className="section-heading">{heading}</h1>
            <p>{description}</p>
            <button className="btn btn-primary" onClick={handleShopNowClick}>
              {buttonText}
            </button>
          </div>
          <img className="home-pic" src={image} alt="Shopping illustration" />
        </div>
      </section>
    </div>
  );
}