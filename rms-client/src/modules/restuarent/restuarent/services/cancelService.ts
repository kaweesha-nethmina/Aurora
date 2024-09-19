interface CancelBookingData {
    name: string;
    phoneNumber: string;
    checkInDate: string;
    cancellationReason: string;
  }
  
  export const cancelBooking = (data: CancelBookingData) => {
    // Logic to handle the cancellation process
    console.log('Cancelling booking with data:', data);
  };
  