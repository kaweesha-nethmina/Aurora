import React, { useState } from 'react';
import './CreditCardModal.css';
interface CreditCardModalProps {
  onClose: () => void;
  onPaymentSuccess: () => void;
}

const CreditCardModal: React.FC<CreditCardModalProps> = ({ onClose, onPaymentSuccess }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate a successful payment
    console.log('Payment details:', { cardNumber, expiry, cvv });
    onPaymentSuccess(); // Call the success function
    onClose(); // Close the modal
  };

  return (
    <div className="modalT">
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Expiry Date (MM/YY)</label>
          <input
            type="text"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            required
          />
        </div>
        <div>
          <label>CVV</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
        </div>
        <button className='pay' type="submit">Pay</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default CreditCardModal;
