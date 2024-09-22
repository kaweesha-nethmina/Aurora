import React, { useState } from 'react';
import './PaymentPage.css';

interface PaymentDetails {
  customerID: string;
  paymentDate: string;
  amount: number;
  paymentMethod: string;
}

const PaymentPage = () => {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    customerID: '',
    paymentDate: '',
    amount: 0,
    paymentMethod: 'Credit Card',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(paymentDetails);
  };

  return (
    <div className="payment-page-container">
      <h2 className="title">Payment Page</h2>
      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customerID">Customer ID</label>
          <input
            id="customerID"
            name="customerID"
            type="text"
            value={paymentDetails.customerID}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="paymentDate">Payment Date</label>
          <input
            id="paymentDate"
            name="paymentDate"
            type="date"
            value={paymentDetails.paymentDate}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            name="amount"
            type="number"
            value={paymentDetails.amount}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={paymentDetails.paymentMethod}
            onChange={handleSelectChange}
            className="input-field"
          >
            <option value="Credit Card">Credit Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cash">Cash</option>
          </select>
        </div>
        <button className="submit-button" type="submit">
          Make Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
