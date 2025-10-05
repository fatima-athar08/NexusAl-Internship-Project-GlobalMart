import React from 'react';
import Login from '../components/Login';

// Pass setNotification down to the Login component
export default function LoginPage({ setNotification }) {
  return (
    <div className="page-container">
      <Login setNotification={setNotification} />
    </div>
  );
}