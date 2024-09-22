import React, { useState } from 'react';
import './PaymentForm.css';
import Header from '../../../../core/components/Header';
import Navbar from '../nav/ONavbar';

interface PaymentForm {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  zipcode: string;
  state: string;
  country: string;
  phone: string;
}

const PaymentForm = () => {
  const [form, setForm] = useState<PaymentForm>({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    zipcode: '',
    state: '',
    country: '',
    phone: '',
  });

  const [errors, setErrors] = useState<PaymentForm>({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    zipcode: '',
    state: '',
    country: '',
    phone: '',
  });

  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const validateForm = () => {
    let isValid = true;
    let newErrors: PaymentForm = {
      firstName: '',
      lastName: '',
      email: '',
      street: '',
      city: '',
      zipcode: '',
      state: '',
      country: '',
      phone: '',
    };

    if (!form.firstName) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }
    if (!form.lastName) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }
    if (!form.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }
    if (!form.street) {
      newErrors.street = 'Street is required';
      isValid = false;
    }
    if (!form.city) {
      newErrors.city = 'City is required';
      isValid = false;
    }
    if (!form.zipcode) {
      newErrors.zipcode = 'Zipcode is required';
      isValid = false;
    }
    if (!form.state) {
      newErrors.state = 'State is required';
      isValid = false;
    }
    if (!form.country) {
      newErrors.country = 'Country is required';
      isValid = false;
    }
    if (!form.phone) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsPaymentSuccessful(true);
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        zipcode: '',
        state: '',
        country: '',
        phone: '',
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="payment-form-container">
      <Header activeTab={'offers'} />
      <Navbar />
      <div className='ofcon'>
      <h2 className="payment-form-title">Payment Form</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(form).map((key) => (
          <div className="form-group" key={key}>
            <label className="form-label" htmlFor={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              className="form-input"
              id={key}
              type={key === 'email' ? 'email' : 'text'}
              name={key}
              value={(form as any)[key]}
              onChange={handleInputChange}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            />
            {errors[key as keyof PaymentForm] && (
              <p className="error-message">{errors[key as keyof PaymentForm]}</p>
            )}
          </div>
        ))}
        <div className="form-group">
          <button className="form-button" type="submit">
            Payment
          </button>
        </div>
      </form>
      {isPaymentSuccessful && (
        <div className="success-message">
          <span>Payment was successful!</span>
        </div>
      )}
      </div>
    </div>
  );
};

export default PaymentForm;
