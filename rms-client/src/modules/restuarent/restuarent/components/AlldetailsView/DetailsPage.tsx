import React, { useState } from 'react';
import '../AlldetailsView/DetailsPage.module.css';

interface ReservationDetails {
 
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  cardHolderName:String;
  tableNumber: number;
  status: 'Successful' | 'Unsuccessful';
}

const ViewAllDetails: React.FC = () => {
  const [details, setDetails] = useState<ReservationDetails>({
    cardNumber: '1234 5678 9012 3456',
    expirationDate: '12/25',
    cvv: '123',
    cardHolderName:'Hiruni chmathka',
    tableNumber: 10,
    status: 'Successful',
  });

  const handleConfirm = () => {
    alert('Details confirmed!');
  };

  return (
    <div className="details-container">
      <h2>Reservation Details</h2>
      <div className="details-grid">
        <div className="details-item">
        </div>

        <div className="details-item">
          <label>Card Number:</label>
          <span>{details.cardNumber}</span>
        </div>
        <div className="details-item">
          <label>Expiration Date:</label>
          <span>{details.expirationDate}</span>
        </div>
        <div className="details-item">
          <label>CVV:</label>
          <span>{details.cvv}</span>
        </div>
        <div className="details-item">
          <label>CardHolder Name:</label>
          <span>{details.cvv}</span>
        </div>
        <div className="details-item">
          <label>Table Number:</label>
          <span>{details.tableNumber}</span>
        </div>
        <div className="details-item">
          <label>Status:</label>
          <span className={details.status === 'Successful' ? 'status-success' : 'status-failure'}>
            {details.status}
          </span>
        </div>
      </div>
      <button className="confirm-button" onClick={handleConfirm}>
        Confirm
      </button>
    </div>
  );
};

export default ViewAllDetails;

