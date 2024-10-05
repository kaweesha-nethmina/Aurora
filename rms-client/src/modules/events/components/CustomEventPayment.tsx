import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../core/components/Header';
import './../styles/CustomEventPayment.css';

const CustomEventPayment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure state with an explicit type
  const { guestCount, perPersonCharge, additionalResources } = location.state as {
    guestCount: number;
    additionalResources: string[];
    perPersonCharge: number;
  };

  // State for user data
  const [formValues, setFormValues] = useState<{ fullName: string; phoneNumber: string }>({
    fullName: '',
    phoneNumber: ''
  });

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const userProfile = JSON.parse(userData);
      setFormValues((prevValues) => ({
        ...prevValues,
        fullName: `${userProfile.firstName || ''} ${userProfile.lastName || ''}`,
        phoneNumber: userProfile.phone || '',
      }));
    }
  }, []);

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

  // State for booking confirmation
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleSubmitBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const bookingData = {
      fullName: formValues.fullName,
      phoneNumber: formValues.phoneNumber,
      guestCount,
      perPersonCharge,
      additionalResources,
      totalAmount
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/customBookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert('Booking confirmed! Admin will be notified.');
        navigate('/eventcard', { state: { bookingConfirmed: true } });
      } else {
        alert('Error confirming booking.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error confirming booking.');
    }
  };
  

  return (
    <div className="custom-event-payment">
      <Header activeTab={'payment'} />
      <h2>Booking Details</h2>

      {/* Full Name Input */}
      <div className="ced-full-name">
        <label>Full Name:</label>
        <input
          type="text"
          value={formValues.fullName}
          readOnly // Set to readOnly if you don't want the user to edit it
        />
      </div>

      <p>Number of Participants: {guestCount}</p>
      <p>Per Person Charge: LKR {perPersonCharge}</p>
      <br />
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
      <br />
      <h3>Total Amount: LKR {totalAmount}</h3>

      <form onSubmit={handleSubmitBooking}>
        <button type="submit" className="pay-btn">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default CustomEventPayment;
