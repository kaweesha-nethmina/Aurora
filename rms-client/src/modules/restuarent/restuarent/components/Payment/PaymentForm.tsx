import React, { useState } from 'react';
import './PaymentForm.css'; // Importing the CSS
import { Link } from 'react-router-dom';
import Header from '../../../../core/components/Header';

interface PaymentFormValues {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  cardHolderName: string;
}

const PaymentForm = () => {
  const [values, setValues] = useState<PaymentFormValues>({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    cardHolderName: '',
  });

  const [errors, setErrors] = useState<PaymentFormValues>({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    cardHolderName: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors: PaymentFormValues = {
      cardNumber: '',
      expirationDate: '',
      cvv: '',
      cardHolderName: '',
    };

    if (!values.cardNumber || values.cardNumber.length !== 16) {
      newErrors.cardNumber = 'Invalid card number';
      isValid = false;
    }

    if (!values.expirationDate || values.expirationDate.length !== 5) {
      newErrors.expirationDate = 'Invalid expiration date';
      isValid = false;
    }

    if (!values.cvv || values.cvv.length !== 3) {
      newErrors.cvv = 'Invalid CVV';
      isValid = false;
    }

    if (!values.cardHolderName) {
      newErrors.cardHolderName = 'Card holder name is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(values);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => ({ ...prevValues, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <Header activeTab={''} />
      <h2 className="form-title">Payment Form</h2>
      <div className="form-field">
        <label htmlFor="cardNumber">Card Number</label>
        <input
          className={`input ${errors.cardNumber ? 'input-error' : ''}`}
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={values.cardNumber}
          onChange={handleChange}
          placeholder="1234 5678 9012 3456"
        />
        {errors.cardNumber && <p className="error-text">{errors.cardNumber}</p>}
      </div>
      <div className="form-field">
        <label htmlFor="expirationDate">Expiration Date</label>
        <input
          className={`input ${errors.expirationDate ? 'input-error' : ''}`}
          type="text"
          id="expirationDate"
          name="expirationDate"
          value={values.expirationDate}
          onChange={handleChange}
          placeholder="MM/YY"
        />
        {errors.expirationDate && <p className="error-text">{errors.expirationDate}</p>}
      </div>
      <div className="form-field">
        <label htmlFor="cvv">CVV</label>
        <input
          className={`input ${errors.cvv ? 'input-error' : ''}`}
          type="text"
          id="cvv"
          name="cvv"
          value={values.cvv}
          onChange={handleChange}
          placeholder="123"
        />
        {errors.cvv && <p className="error-text">{errors.cvv}</p>}
      </div>
      <div className="form-field">
        <label htmlFor="cardHolderName">Card Holder Name</label>
        <input
          className={`input ${errors.cardHolderName ? 'input-error' : ''}`}
          type="text"
          id="cardHolderName"
          name="cardHolderName"
          value={values.cardHolderName}
          onChange={handleChange}
          placeholder="John Doe"
        />
        {errors.cardHolderName && <p className="error-text">{errors.cardHolderName}</p>}
      </div>
      <Link to='/detailspage'> <button className="submit-btn" type="submit">
        Submit
      </button></Link>
    </form>
  );
};

export default PaymentForm;
