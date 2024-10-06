// src/components/Payment/PaymentPage.tsx

import { useState } from 'react';
import PaymentForm from './PaymentForm';
import ConfirmationPopup from './ConfirmationPopup';
import './style/Payment.css';

const PaymentPage = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    vehicleType: '',
    distance: 0,
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [fare, setFare] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleVehicleTypeChange = (vehicleType: string) => {
    setPaymentDetails({ ...paymentDetails, vehicleType });
    calculateFare(vehicleType, paymentDetails.distance);
  };

  const handleDistanceChange = (distance: number) => {
    setPaymentDetails({ ...paymentDetails, distance });
    calculateFare(paymentDetails.vehicleType, distance);
  };

  const calculateFare = (vehicleType: string, distance: number) => {
    let farePerKm = 0;
    switch (vehicleType) {
      case 'car':
        farePerKm = 150;
        break;
      case 'van':
        farePerKm = 200;
        break;
      case 'tuk-tuk':
        farePerKm = 90;
        break;
      default:
        farePerKm = 0;
    }
    setFare(farePerKm * distance);
  };

  const handlePayNow = () => {
    setIsPopupOpen(true);
  };

  const handleConfirmPayment = () => {
    setIsPopupOpen(false);
    // Reset payment details
    setPaymentDetails({
      vehicleType: '',
      distance: 0,
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    });
    setFare(0);
  };

  return (
    <div className="p-container">
      <h2 className="p-title">Make Payment</h2>
      <PaymentForm
        paymentDetails={paymentDetails}
        setPaymentDetails={setPaymentDetails}
        fare={fare}
        onVehicleTypeChange={handleVehicleTypeChange}
        onDistanceChange={handleDistanceChange}
        onPayNow={handlePayNow}
      />
      {isPopupOpen && (
        <ConfirmationPopup onConfirm={handleConfirmPayment} onClose={() => setIsPopupOpen(false)} />
      )}
    </div>
  );
};

export default PaymentPage;
