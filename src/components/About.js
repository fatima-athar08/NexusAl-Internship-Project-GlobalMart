import React from 'react'
import './About.css'
export default function About({mission,values,image}) {
  return (
     <section id="about" className="section about-section">
        <h2 className="section-heading">About Us</h2>
        <div className="about-content">
            <div className="team-photo">
                <img src={image} alt="Our Team"/>
                <button className="btn more-btn" onClick={() => {document.getElementById("team").scrollIntoView({ behavior: "smooth" });}} >More About Our Team</button>
            </div>
            <div className="about-text">
                <p>GlobalMart began with a simple idea: to create a one-stop online destination for everyone. Frustrated by cluttered websites and uncertain quality, our founders set out to build something better. Today, we're a passionate community bringing a seamless shopping journey right to your doorstep.</p>
                
                <h3>Our Mission & Values</h3>
                <p><strong>Our Mission:</strong>{mission}</p>
                {values.map((v,idx)=>(
                <ul className="values-list" key={idx}>
                    
                    <li><strong>{v.title}</strong>{v.text}</li>
                    
                </ul>
               ))} 
                <div className="stats">
                    <div className="stat-item"><h3>5M+</h3>Customers</div>
                    <div className="stat-item"><h3>100K+</h3>Products</div>
                    <div className="stat-item"><h3>24/7</h3>Support</div>
                </div>
            </div>
        </div>
    </section>

  )
}
