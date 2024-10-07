import { useReservations } from '../states/useReservations';

const RoomReservationTable = () => {
    const { reservations, isLoading, error, handleAccept, handleReject, handleDelete } = useReservations();

    if (isLoading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (error) {
        return <div>{error}</div>; // Show error state
    }

    if (reservations.length === 0) {
        return <div>No reservations available.</div>; // Show when there are no reservations
    }

    // Function to format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Get the date part in YYYY-MM-DD format
    };

    return (
        <div className="table-containert">
            <table className="reservation-tablet">
                <thead>
                    <tr>
                        <th>Room Type</th>
                        <th>Check-in Date</th>
                        <th>Check-out Date</th>
                        <th>Special Requests</th>
                        <th>Payment Method</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation) => {
                        if (!reservation._id) {
                            console.error("Reservation ID is missing:", reservation);
                            return null; // Skip rendering for reservations without an ID
                        }

                        console.log("Reservation Status:", reservation.status); // Log the status of each reservation

                        return (
                            <tr key={reservation._id}>
                                <td>{reservation.roomType}</td>
                                <td>{formatDate(reservation.arrivalDate)}</td> {/* Format the arrival date */}
                                <td>{formatDate(reservation.departureDate)}</td> {/* Format the departure date */}
                                <td>{reservation.specialRequests}</td>
                                <td>{reservation.paymentMethod}</td>
                                <td>{reservation.email}</td>
                                <td>{reservation.status}</td>
                                <td>
                                    {reservation.status === 'Pending' && (
                                        <div className="action-buttonst">
                                            <button onClick={() => handleAccept(reservation._id)}>Accept</button>
                                            <button onClick={() => handleReject(reservation._id)}>Reject</button>
                                        </div>
                                    )}
                                    {(reservation.status === 'accepted' || reservation.status === 'rejected') && (
                                        <div className="action-buttonst">
                                            <button onClick={() => handleDelete(reservation._id)}>Delete</button>
                                            {/* <button onClick={() => handleCancel(reservation._id)}>Cancel</button> */}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default RoomReservationTable;
