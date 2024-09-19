import { useState } from 'react';

interface RoomReservation {
  id: number;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  specialRequests: string;
  paymentMethod: string;
  status: string;
}

const initialReservations: RoomReservation[] = [
  {
    id: 1,
    roomType: 'Single',
    checkInDate: '2023-03-01',
    checkOutDate: '2023-03-03',
    specialRequests: 'Extra Bed',
    paymentMethod: 'Credit Card',
    status: 'Pending',
  },
  {
    id: 2,
    roomType: 'Double',
    checkInDate: '2023-03-05',
    checkOutDate: '2023-03-07',
    specialRequests: 'Room Service',
    paymentMethod: 'Cash',
    status: 'Pending',
  },
];

export const useReservations = () => {
  const [reservations, setReservations] = useState(initialReservations);

  const handleAccept = (id: number) => {
    setReservations(
      reservations.map((reservation) =>
        reservation.id === id
          ? { ...reservation, status: 'Accepted' }
          : reservation
      )
    );
  };

  const handleReject = (id: number) => {
    setReservations(
      reservations.map((reservation) =>
        reservation.id === id
          ? { ...reservation, status: 'Rejected' }
          : reservation
      )
    );
  };

  const handleCancel = (id: number) => {
    setReservations(
      reservations.map((reservation) =>
        reservation.id === id
          ? { ...reservation, status: 'Cancelled' }
          : reservation
      )
    );
    notifyManager(id);
  };

  const notifyManager = (id: number) => {
    const cancelledReservation = reservations.find(
      (reservation) => reservation.id === id
    );
    if (cancelledReservation) {
      // Example notification logic
      console.log(
        `Manager notified: Reservation ID ${cancelledReservation.id} for ${cancelledReservation.roomType} has been cancelled.`
      );
      // You can integrate with an actual notification service here
    }
  };

  return {
    reservations,
    handleAccept,
    handleReject,
    handleCancel,
  };
};

