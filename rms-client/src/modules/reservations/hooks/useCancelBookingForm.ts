import { useState } from 'react';

export const useCancelBookingForm = () => {
  const [bookingId, setBookingId] = useState('');
  const [checkinDate, setCheckinDate] = useState('');
  const [cancellationReason, setCancellationReason] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    const { value } = event.target;
    if (field === 'bookingId') setBookingId(value);
    if (field === 'checkinDate') setCheckinDate(value);
    if (field === 'cancellationReason') setCancellationReason(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return {
    bookingId,
    checkinDate,
    cancellationReason,
    isSubmitted,
    handleChange,
    handleSubmit,
  };
};
