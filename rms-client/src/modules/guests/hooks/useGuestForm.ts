// hooks/useGuestForm.ts
import { useState } from 'react';
import { Guest } from '../lib/guestTypes';

const useGuestForm = () => {
  const [guest, setGuest] = useState<Guest>({
    name: '',
    email: '',
    phoneNumber: '',
    arrivalDate: '',
    departureDate: '',
    roomNumber: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setGuest({ ...guest, [name]: value });
  };

  return { guest, handleInputChange };
};

export default useGuestForm;
