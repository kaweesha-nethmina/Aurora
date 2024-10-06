import React, { useState } from 'react';
import './PaymentDetailsTable.css'; // Import the CSS file

interface PaymentDetails {
  id: number;
  serviceCategory: string;
  paymentMethod: string;
  amount: number;
}

const initialPaymentDetails: PaymentDetails[] = [
  { id: 1, serviceCategory: 'Category 1', paymentMethod: 'Cash', amount: 100 },
  { id: 2, serviceCategory: 'Category 2', paymentMethod: 'Card', amount: 200 },
  { id: 3, serviceCategory: 'Category 3', paymentMethod: 'Online', amount: 300 },
];

const PaymentDetailsTable = () => {
  const [paymentDetails, setPaymentDetails] = useState(initialPaymentDetails);
  const [editing, setEditing] = useState(false);
  const [currentPayment, setCurrentPayment] = useState<PaymentDetails | null>(null);

  const handleDelete = (id: number) => {
    setPaymentDetails(paymentDetails.filter((payment) => payment.id !== id));
  };

  const handleUpdate = (payment: PaymentDetails) => {
    setPaymentDetails(
      paymentDetails.map((p) => (p.id === payment.id ? payment : p))
    );
    setEditing(false);
  };

  const handleEdit = (payment: PaymentDetails) => {
    setEditing(true);
    setCurrentPayment(payment);
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">Payment Details Table</h2>
      <table className="payment-table">
        <thead>
          <tr>
            <th className="payment-th">ID</th>
            <th className="payment-th">Service Category</th>
            <th className="payment-th">Payment Method</th>
            <th className="payment-th">Amount</th>
            <th className="payment-th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paymentDetails.map((payment) => (
            <tr key={payment.id}>
              <td className="payment-td">{payment.id}</td>
              <td className="payment-td">{payment.serviceCategory}</td>
              <td className="payment-td">{payment.paymentMethod}</td>
              <td className="payment-td">{payment.amount}</td>
              <td className="payment-td">
                <button className="btn-delete" onClick={() => handleDelete(payment.id)}>
                  Delete
                </button>
                <button className="btn-edit" onClick={() => handleEdit(payment)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editing && currentPayment && (
        <div className="payment-form">
          <h2 className="payment-title">Update Payment Details</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate({
                id: currentPayment.id,
                serviceCategory: (e.target as any).serviceCategory.value,
                paymentMethod: (e.target as any).paymentMethod.value,
                amount: parseInt((e.target as any).amount.value),
              });
            }}
          >
            <div className="form-group">
              <label htmlFor="serviceCategory">Service Category</label>
              <input
                id="serviceCategory"
                type="text"
                defaultValue={currentPayment.serviceCategory}
              />
            </div>
            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method</label>
              <select id="paymentMethod" defaultValue={currentPayment.paymentMethod}>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Online">Online</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input id="amount" type="number" defaultValue={currentPayment.amount} />
            </div>
            <button className="btn-submit" type="submit">
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PaymentDetailsTable;
