// src/components/Payment/PaymentForm.tsx

import React from 'react';

interface PaymentFormProps {
  paymentDetails: {
    vehicleType: string;
    distance: number;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
  setPaymentDetails: React.Dispatch<React.SetStateAction<any>>;
  fare: number;
  onVehicleTypeChange: (vehicleType: string) => void;
  onDistanceChange: (distance: number) => void;
  onPayNow: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  paymentDetails,
  setPaymentDetails,
  fare,
  onVehicleTypeChange,
  onDistanceChange,
  onPayNow,
}) => {
  return (
    <form>
      <div className="f-group">
        <label className="f-label" htmlFor="vehicle-type">
          Vehicle Type
        </label>
        <select
          className="f-select"
          id="vehicle-type"
          value={paymentDetails.vehicleType}
          onChange={(e) => onVehicleTypeChange(e.target.value)}
        >
          <option value="">Select Vehicle Type</option>
          <option value="car">Car</option>
          <option value="van">Van</option>
          <option value="tuk-tuk">Tuk Tuk</option>
        </select>
      </div>
      <div className="f-group">
        <label className="f-label" htmlFor="distance">
          Distance (km)
        </label>
        <input
          className="f-input"
          id="distance"
          type="number"
          value={paymentDetails.distance}
          onChange={(e) => onDistanceChange(parseInt(e.target.value))}
        />
      </div>
      <div className="f-group">
        <label className="f-label" htmlFor="fare">
          Your Fare (Rs.)
        </label>
        <input
          className="f-input"
          id="fare"
          type="number"
          value={fare}
          readOnly
        />
      </div>
      <div className="f-group">
        <label className="f-label" htmlFor="card-number">
          Card Number
        </label>
        <input
          className="f-input"
          id="card-number"
          type="text"
          value={paymentDetails.cardNumber}
          onChange={(event) => setPaymentDetails({ ...paymentDetails, cardNumber: event.target.value })}
        />
      </div>
      <div className="f-group">
        <label className="f-label" htmlFor="expiry-date">
          Expiry Date
        </label>
        <input
          className="f-input"
          id="expiry-date"
          type="text"
          value={paymentDetails.expiryDate}
          onChange={(event) => setPaymentDetails({ ...paymentDetails, expiryDate: event.target.value })}
        />
      </div>
      <div className="f-group">
        <label className="f-label" htmlFor="cvv">
          CVV
        </label>
        <input
          className="f-input"
          id="cvv"
          type="text"
          value={paymentDetails.cvv}
          onChange={(event) => setPaymentDetails({ ...paymentDetails, cvv: event.target.value })}
        />
      </div>
      <button
        className="f-button"
        type="button"
        onClick={onPayNow}
      >
        Pay Now
      </button>
    </form>
  );
};

export default PaymentForm;
