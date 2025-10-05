import React,{useState} from 'react';
import './Contact.css'

export default function Contact({ setNotification }) {
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form submit logic
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setNotification('⚠️ Please fill in all fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setNotification('⚠️ Please enter a valid email.');
      return;
    }

    // Save message in localStorage (optional, for demo)
    const existingMessages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    existingMessages.push(formData);
    localStorage.setItem('contactMessages', JSON.stringify(existingMessages));

    // Reset form and show success notification
    setFormData({ name: '', email: '', message: '' });
    setNotification('✅ Message sent successfully! We will get back to you soon.');
  };

  return (
    <div className="contact-section">
        <div className="contact-container">
            <h2 className="section-heading">Contact GlobalMart</h2>
            <p className="contact-subtitle">We're here to help. Send us a message!</p>

            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input type="text" id="name" name="name" className="form-input" placeholder="Enter your name" value={formData.name}
                onChange={handleChange} required/>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" className="form-input" placeholder="Enter your email" value={formData.email}
                    onChange={handleChange} required/>
                </div>

                <div className="form-group">
                    <label htmlFor="message">Your Message</label>
                    <textarea id="message" name="message" className="form-textarea" placeholder="How can we help you?" value={formData.message}
                onChange={handleChange} required></textarea>
                </div>

                <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
        </div>
    </div>
  )
}