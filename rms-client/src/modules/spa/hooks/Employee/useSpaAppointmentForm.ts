import { useState } from 'react';
import axios from 'axios'; // Import axios for HTTP requests

export const useSpaAppointmentForm = () => {
  const [appointment, setAppointment] = useState({
    name: '',
    email: '',
    service: '',
    date: '',
    time: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // To manage submission state
  const [submitSuccess, setSubmitSuccess] = useState(false); // To manage submission success state
  const [submitError, setSubmitError] = useState<string | null>(null); // To manage errors

  const services = [
    { value: 'massage', label: 'Massage' },
    { value: 'facial', label: 'Facial' },
    // Add more services here
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAppointment((prevAppointment) => ({
      ...prevAppointment,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true
    setSubmitError(null); // Clear previous errors

    try {
      const response = await axios.post('http://localhost:5000/api/spaappointments', appointment); // Send POST request to backend

      if (response.status === 201) { // Assuming 201 for successful creation
        setSubmitSuccess(true); // Mark submission as successful
        setAppointment({
          name: '',
          email: '',
          service: '',
          date: '',
          time: '',
          message: '',
        }); // Clear the form
      }
    } catch (error) {
      setSubmitError('Failed to book appointment. Please try again.');
      console.error('Error submitting appointment:', error);
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return {
    appointment,
    setAppointment,
    services,
    handleChange,
    handleSubmit,
    isSubmitting,
    submitSuccess,
    submitError,
  };
};
