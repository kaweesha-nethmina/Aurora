import { useState } from 'react';

interface Appointment {
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
  message: string;
}

export const useSpaAppointmentForm = () => {
  const [appointment, setAppointment] = useState<Appointment>({
    name: '',
    email: '',
    service: '',
    date: '',
    time: '',
    message: '',
  });

  const [services] = useState([
    { value: 'Harmony Massage', label: 'Harmony Massage' },
    { value: 'Facial Treatment', label: 'Facial Treatment' },
    { value: 'Shiatsu Massage', label: 'Shiatsu Massage' },
  ]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(appointment);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  return {
    appointment,
    services,
    handleSubmit,
    handleChange,
  };
};
