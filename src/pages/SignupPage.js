import React from 'react';
import Signup from '../components/Signup';

export default function SignupPage({ setNotification }) {
  return (
    <div className="page-container">
      <Signup setNotification={setNotification} />
    </div>
  );
}