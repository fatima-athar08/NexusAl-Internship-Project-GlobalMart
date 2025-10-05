import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import useForm from '../hooks/useForm';
import CheckoutSteps from '../components/CheckoutSteps';
import './ShippingPage.css';

// Validation logic for the form hook
const validateShipping = (values) => {
  const errors = {};
  if (!values.fullName.trim()) errors.fullName = 'Full name is required';
  if (!/^\+?[0-9\s-]{7,20}$/.test(values.phone)) errors.phone = 'A valid phone number is required';
  if (!values.address1.trim()) errors.address1 = 'Address line 1 is required';
  if (!values.city.trim()) errors.city = 'City is required';
  if (!values.postalCode.trim()) errors.postalCode = 'Postal code is required';
  if (!values.country.trim()) errors.country = 'Country is required';
  return errors;
};

export default function ShippingPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(CartContext);

  const submit = () => {
    dispatch({ type: 'SAVE_SHIPPING_ADDRESS', payload: values });
    navigate('/payment');
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(state.shippingAddress, validateShipping, submit);

  return (
    <div className="page-container shipping-page">
      <CheckoutSteps step1 />
      <h1 className="section-heading">Shipping Address</h1>
      <form className="shipping-form" onSubmit={handleSubmit} noValidate>
        {/* All form fields remain the same */}
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName" name="fullName" value={values.fullName || ''} onChange={handleChange} required />
          {errors.fullName && <span className="error">{errors.fullName}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" name="phone" value={values.phone || ''} onChange={handleChange} required />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="address1">Address Line 1</label>
          <input type="text" id="address1" name="address1" value={values.address1 || ''} onChange={handleChange} required />
          {errors.address1 && <span className="error">{errors.address1}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="address2">Address Line 2 (Optional)</label>
          <input type="text" id="address2" name="address2" value={values.address2 || ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input type="text" id="city" name="city" value={values.city || ''} onChange={handleChange} required />
          {errors.city && <span className="error">{errors.city}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="state">State / Province</label>
          <input type="text" id="state" name="state" value={values.state || ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="postalCode">Postal Code</label>
          <input type="text" id="postalCode" name="postalCode" value={values.postalCode || ''} onChange={handleChange} required />
          {errors.postalCode && <span className="error">{errors.postalCode}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input type="text" id="country" name="country" value={values.country || ''} onChange={handleChange} required />
          {errors.country && <span className="error">{errors.country}</span>}
        </div>
        <button type="submit" className="btn btn-primary">Continue to Payment</button>
      </form>
    </div>
  );
}