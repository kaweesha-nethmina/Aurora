import React from 'react';

interface Payment {
  driver: string;
  date: string;
  time: string;
  kilometers: number;
  payment: number;
}

interface PaymentCardProps {
  payment: Payment;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ payment }) => {
  return (
    <div className="admin-payment-card">
      <h2 className="admin-payment-card-title">{payment.driver}</h2>
      <p className="admin-payment-card-detail">Date: {payment.date}</p>
      <p className="admin-payment-card-detail">Time: {payment.time}</p>
      <p className="admin-payment-card-detail">Kilometers: {payment.kilometers}</p>
      <p className="admin-payment-card-detail">Payment: {payment.payment}</p>
    </div>
  );
};

export default PaymentCard;
