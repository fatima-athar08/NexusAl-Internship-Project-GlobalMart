import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import useForm from '../hooks/useForm';
import OrderSummary from '../components/OrderSummary';
import CheckoutSteps from '../components/CheckoutSteps';
import './PaymentPage.css';

// --- VALIDATION FOR MOCK CARD ---
const validateCard = (values) => {
  const errors = {};
  if (!values.cardholderName || !/^[a-zA-Z\s]+$/.test(values.cardholderName)) {
    errors.cardholderName = 'A valid cardholder name is required';
  }
  if (!/^\d{16}$/.test(values.cardNumber)) {
    errors.cardNumber = 'Card number must be 16 digits';
  }
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(values.expiry)) {
    errors.expiry = 'Expiry must be in MM/YY format';
  }
  if (!/^\d{3}$/.test(values.cvv)) {
    errors.cvv = 'CVV must be 3 digits';
  }
  return errors;
};

export default function PaymentPage({ setNotification }) {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState(state.paymentMethod || 'COD');
  const [view, setView] = useState('selection'); // 'selection' or 'cardForm'
  const [isLoading, setIsLoading] = useState(false);

  // Protection logic
  useEffect(() => {
    if (!state.shippingAddress.address1) {
      navigate('/shipping');
    }
  }, [state.shippingAddress, navigate]);

  // Submission logic after card validation passes
  const submitCard = () => {
    setIsLoading(true);
    // Simulate API call for payment processing
    setTimeout(() => {
      setIsLoading(false);
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: 'Credit Card (Online)' });
      setNotification('✅ Payment successful!');
      navigate('/confirm-order');
    }, 1500);
  };
  
  const {
    values,
    errors,
    handleChange: originalHandleChange,
    handleSubmit: handleCardSubmit,
  } = useForm(
    { cardholderName: '', cardNumber: '', expiry: '', cvv: '' },
    validateCard,
    submitCard
  );

  // Custom handleChange to enforce input restrictions
  const handleChange = (e) => {
    const { name, value } = e.target;
    let sanitizedValue = value;

    if (name === 'cardNumber' || name === 'cvv') {
      sanitizedValue = value.replace(/\D/g, ''); // Allow only digits
    } else if (name === 'expiry') {
      let v = value.replace(/[^\d/]/g, ''); // Allow digits and slash
      if (v.length > 2 && v.indexOf('/') === -1) {
        v = v.slice(0, 2) + '/' + v.slice(2);
      }
      sanitizedValue = v.slice(0, 5);
    } else if (name === 'cardholderName') {
      sanitizedValue = value.replace(/[^a-zA-Z\s]/g, ''); // Allow letters and spaces
    }

    // Pass the sanitized value to the useForm hook's handler
    originalHandleChange({ target: { name, value: sanitizedValue } });
  };

  // Handles the initial payment method selection
  const handleMethodSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod === 'Online') {
      setView('cardForm'); // Show card form
    } else {
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
      navigate('/confirm-order');
    }
  };
  
  return (
    <div className="page-container payment-page">
      <CheckoutSteps step1 step2 />
      <h1 className="section-heading">Payment Method</h1>
      <div className="payment-content">
        <div className="payment-form-container">
          {view === 'selection' ? (
            <form className="payment-form" onSubmit={handleMethodSubmit}>
              <h2>Select a method</h2>
              <div className="payment-options">
                <div className="payment-option">
                  <input type="radio" id="cod" name="paymentMethod" value="COD" checked={paymentMethod === 'COD'} onChange={(e) => setPaymentMethod(e.target.value)} />
                  <label htmlFor="cod">Cash on Delivery</label>
                </div>
                <div className="payment-option">
                  <input type="radio" id="online" name="paymentMethod" value="Online" checked={paymentMethod === 'Online'} onChange={(e) => setPaymentMethod(e.target.value)} />
                  <label htmlFor="online">Credit / Debit Card</label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Continue</button>
            </form>
          ) : (
            <form className="card-details-form" onSubmit={handleCardSubmit} noValidate>
              <h2>Enter Card Details</h2>
              <div className="form-group">
                <label htmlFor="cardholderName">Cardholder Name</label>
                <input type="text" id="cardholderName" name="cardholderName" value={values.cardholderName} onChange={handleChange} placeholder="John Doe" required />
                {errors.cardholderName && <span className="error">{errors.cardholderName}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <input type="text" id="cardNumber" name="cardNumber" value={values.cardNumber} onChange={handleChange} placeholder="1111222233334444" maxLength="16" required />
                {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiry">Expiry</label>
                  <input type="text" id="expiry" name="expiry" value={values.expiry} onChange={handleChange} placeholder="MM/YY" required />
                  {errors.expiry && <span className="error">{errors.expiry}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input type="text" id="cvv" name="cvv" value={values.cvv} onChange={handleChange} placeholder="123" maxLength="3" required />
                  {errors.cvv && <span className="error">{errors.cvv}</span>}
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setView('selection')}>Back</button>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? 'Processing...' : 'Pay Now'}
                </button>
              </div>
            </form>
          )}
        </div>
        <div className="order-summary-container">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}