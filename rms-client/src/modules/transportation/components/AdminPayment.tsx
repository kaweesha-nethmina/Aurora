import { useState } from 'react';
import PaymentCard from './PaymentCard';
import './style/AdminPayment.css';

interface Payment {
  driver: string;
  date: string;
  time: string;
  kilometers: number;
  payment: number;
}

const AdminPayment = () => {
  const [payments, setPayments] = useState<Payment[]>([
    { driver: 'DRV-001', date: '2022-01-01', time: '10:00', kilometers: 100, payment: 1000 },
    { driver: 'DRV-004', date: '2022-01-02', time: '11:00', kilometers: 150, payment: 1500 },
    { driver: 'DRV-007', date: '2022-01-03', time: '12:00', kilometers: 200, payment: 2000 },
    { driver: 'DRV-005', date: '2022-01-03', time: '12:00', kilometers: 200, payment: 2000 },
    { driver: 'DRV-004', date: '2022-01-02', time: '11:00', kilometers: 150, payment: 1500 },
    { driver: 'DRV-002', date: '2022-01-03', time: '12:00', kilometers: 200, payment: 2000 },
    { driver: 'DRV-009', date: '2022-01-03', time: '12:00', kilometers: 200, payment: 2000 },
    { driver: 'DRV-003', date: '2022-01-02', time: '11:00', kilometers: 150, payment: 1500 },
    { driver: 'DRV-006', date: '2022-01-03', time: '12:00', kilometers: 200, payment: 2000 },
    { driver: 'DRV-001', date: '2022-01-03', time: '12:00', kilometers: 200, payment: 2000 }
  ]);

  return (
    <div className="admin-payment-container">
      <h1 className="admin-payment-heading">Payment Details</h1>
      <div className="admin-payment-grid">
        {payments.map((payment, index) => (
          <PaymentCard key={index} payment={payment} />
        ))}
      </div>
    </div>
  );
};

export default AdminPayment;
