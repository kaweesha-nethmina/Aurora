import { useReservations } from '../states/useReservations';

const RoomReservationTable = () => {
  const { reservations, handleAccept, handleReject, handleCancel } = useReservations();

  return (
    <div className="table-container">
      <table className="reservation-table">
        <thead>
          <tr>
            <th>Room Type</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Special Requests</th>
            <th>Payment Method</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.roomType}</td>
              <td>{reservation.checkInDate}</td>
              <td>{reservation.checkOutDate}</td>
              <td>{reservation.specialRequests}</td>
              <td>{reservation.paymentMethod}</td>
              <td>{reservation.status}</td>
              <td>
                {reservation.status === 'Pending' && (
                  <div className="action-buttons">
                    <button
                      className="accept-button"
                      onClick={() => handleAccept(reservation.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="reject-button"
                      onClick={() => handleReject(reservation.id)}
                    >
                      Reject
                    </button>
                  </div>
                )}
                {reservation.status === 'Accepted' && (
                  <button
                    className="cancel-button"
                    onClick={() => handleCancel(reservation.id)}
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomReservationTable;
