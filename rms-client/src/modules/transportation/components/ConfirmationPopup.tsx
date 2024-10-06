// src/components/Payment/ConfirmationPopup.tsx

import React from 'react';

interface ConfirmationPopupProps {
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({ onConfirm, onClose }) => {
  return (
    <div className="c-popup">
      <div className="c-content">
        <h2 className="c-title">Confirm Payment</h2>
        <p className="c-message">Are you sure you want to make this payment?</p>
        <button
          className="c-button"
          type="button"
          onClick={onConfirm}
        >
          Confirm Payment
        </button>
        <button
          className="c-close"
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
