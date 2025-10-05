import React from 'react';
import Contact from '../components/Contact';

export default function ContactPage({ setNotification }) {
  return (
    <div className="page-container">
      <Contact setNotification={setNotification} />
    </div>
  );
}