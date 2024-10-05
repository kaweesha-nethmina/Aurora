import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../core/components/Header';
import './../styles/CustomEventPayment.css'
/*
interface CustomEventPaymentProps {
  numOfParticipants: number;
  perPersonCharge: number;
}*/

const CustomEventPayment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure state with an explicit type
  const { guestCount, perPersonCharge, additionalResources } = location.state as {
    guestCount: number;
    additionalResources: string[];
    perPersonCharge: number;
  };

  // Calculate the total payment for additional resources
  const basicAmount = 50000; // Basic amount for custom events
  const resourceCosts = {
    DJ: additionalResources.includes('DJ') ? 30000 : 0,
    FoodCatering: additionalResources.includes('Food Catering') ? 2000 * guestCount : 0,
    Photography: additionalResources.includes('Photography') ? 15000 : 0,
    Lighting: additionalResources.includes('Lighting') ? 15000 : 0,
    Decor: additionalResources.includes('Decor') ? 12000 : 0,
  };

  // Total cost includes basic amount and additional resources
  const totalAmount = basicAmount 
  + resourceCosts.FoodCatering 
  + resourceCosts.DJ 
  + resourceCosts.Photography 
  + resourceCosts.Lighting 
  + resourceCosts.Decor 
  + (perPersonCharge * guestCount);

  // State for payment details
  const [paymentStatus, setPaymentStatus] = useState<'Complete' | 'Incomplete'>('Incomplete');
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const [payLater, setPayLater] = useState(false);

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!payLater) {
      // Validate card details
      if (!cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvv) {
        alert('Please fill in all card details.');
        return;
      }

      // Mark payment as complete
      setPaymentStatus('Complete');
      // Notify admin here (e.g., via API call)
      alert('Payment Successful! Notifying Admin...');
    } else {
      // Mark payment as incomplete and notify admin
      setPaymentStatus('Incomplete');
      alert('Booking confirmed! You can pay later. Admin will be notified.');
    }

    // Redirect to the booking confirmation page or dashboard
    navigate('/event-confirmation', { state: { paymentStatus } });
  };

  return (
    <div className="custom-event-payment">
      <Header activeTab={'payment'} />
      <h2>Payment Details</h2>
      <p>Number of Participants: {guestCount}</p>
      <p>Per Person Charge: LKR {perPersonCharge}</p>
      <br></br>
      <h4>Breakdown of Costs:</h4>
      <ul>
        <li>Basic Amount: LKR {basicAmount}</li>
        {additionalResources.includes('DJ') && (
          <li>DJ: LKR {resourceCosts.DJ}</li>
        )}
        {additionalResources.includes('Food Catering') && (
          <li>Food Catering: LKR {resourceCosts.FoodCatering}</li>
        )}
        {additionalResources.includes('Photography') && (
          <li>Photography: LKR {resourceCosts.Photography}</li>
        )}
        {additionalResources.includes('Lighting') && (
          <li>Lighting: LKR {resourceCosts.Lighting}</li>
        )}
        {additionalResources.includes('Decor') && (
          <li>Decor: LKR {resourceCosts.Decor}</li>
        )}
        <li>Guests Charge: LKR {perPersonCharge * guestCount}</li>
      </ul>
      <br></br>
      <h3>Total Payment Amount: LKR {totalAmount}</h3>

      <form onSubmit={handleSubmitPayment}>
        <div>
          <label>
            <input 
              type="checkbox" 
              checked={payLater} 
              onChange={() => setPayLater((prev) => !prev)} 
            />
            Pay Later
          </label>
        </div>

        {!payLater && (
          <div>
            <h3>Card Details:</h3>
            <input 
              type="text" 
              name="cardNumber" 
              placeholder="Card Number" 
              value={cardDetails.cardNumber} 
              onChange={handleCardDetailsChange} 
            />
            <input 
              type="text" 
              name="expiry" 
              placeholder="Expiry Date (MM/YY)" 
              value={cardDetails.expiry} 
              onChange={handleCardDetailsChange} 
            />
            <input 
              type="text" 
              name="cvv" 
              placeholder="CVV" 
              value={cardDetails.cvv} 
              onChange={handleCardDetailsChange} 
            />
          </div>
        )}

        <button type="submit" className="pay-btn">
          {payLater ? 'Book Event' : 'Make Payment'}
        </button>
      </form>
    </div>
  );
};

export default CustomEventPayment;
