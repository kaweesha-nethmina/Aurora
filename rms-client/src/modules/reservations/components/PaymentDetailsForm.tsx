import React from 'react';

interface PaymentDetailsFormProps {
  paymentDetails: {
    cardNumber: string;
    expirationDate: string;
    cvv: string;
  };
  handlePaymentDetailsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentDetailsForm: React.FC<PaymentDetailsFormProps> = ({ paymentDetails, handlePaymentDetailsChange }) => (
  <div className="payment-details">
    <h3>Payment Details</h3>
    <div className="form-group">
      <label htmlFor="cardNumber">Card Number</label>
      <input
        type="text"
        id="cardNumber"
        name="cardNumber"
        value={paymentDetails.cardNumber}
        onChange={handlePaymentDetailsChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="expirationDate">Expiration Date</label>
      <input
        type="text"
        id="expirationDate"
        name="expirationDate"
        value={paymentDetails.expirationDate}
        onChange={handlePaymentDetailsChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="cvv">CVV</label>
      <input
        type="text"
        id="cvv"
        name="cvv"
        value={paymentDetails.cvv}
        onChange={handlePaymentDetailsChange}
      />
    </div>
  </div>
);

export default PaymentDetailsForm;
