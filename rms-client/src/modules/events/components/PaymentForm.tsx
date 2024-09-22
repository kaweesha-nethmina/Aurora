import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './../styles/PaymentForm.css';
import Header from '../../core/components/Header';

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  const navigate = useNavigate();
  const { id } = useParams();


  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate a payment process (for demonstration)
    if (cardNumber.length === 12 && cvv.length === 3) {
      setPaymentStatus('success');
    } else {
      setPaymentStatus('failure');
    }
  };

  const handleBackClick = () => {
    navigate(`/events/${id}/book`);
  };

  return (
    <div className="payment-container">
      <Header activeTab={'events'} />
      <h2>Payment Form</h2>

      <form onSubmit={handlePayment}>
        <label>Card Number</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          maxLength={12}
          required
        />
        
        <label>Name on Card</label>
        <input
          type="text"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          required
        />

        <label>Expiry Date</label>
        <input
          type="month"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
        />

        <label>CVV</label>
        <input
          type="text"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          maxLength={3}
          required
        />

        <button type="submit">Make Payment</button>
      </form>

      {/* Display payment status */}
      {paymentStatus === 'success' && <p>Payment Successful!</p>}
      {paymentStatus === 'failure' && <p>Payment Failed. Please try again.</p>}

      {/* Back button to go to event details */}
      <button type="button" onClick={handleBackClick}>Back to Event</button>
    </div>
  );
};

export default PaymentForm;
