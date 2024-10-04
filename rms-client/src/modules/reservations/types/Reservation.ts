export interface Reservation {
  id: string; // or _id if you're using MongoDB ObjectID
  roomType: string;
  arrivalDate: string;
  departureDate: string;
  specialRequests?: string;
  paymentMethod: string;
  status: string; // e.g., 'Pending', 'Accepted', 'Rejected', 'Canceled'
  cardNumber?: string;
  expirationDate?: string;
  cvv?: string;
}
