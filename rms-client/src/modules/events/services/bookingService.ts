export const bookEvent = async (eventId: number, date: Date, venueId: number) => {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      body: JSON.stringify({ eventId, date, venueId }),
    });
    return response.ok;
  };
  