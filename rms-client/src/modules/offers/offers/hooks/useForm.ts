import { useState } from 'react';
import { validateForm } from '../lib/validation';
import { defaultFormValues, FormValues } from '../utils/constants';

export const useForm = () => {
  const [formValues, setFormValues] = useState<FormValues>(defaultFormValues);
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null); // Track submission status

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formValues);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:5000/api/offerbookings', { // Update the endpoint here
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('Booking successful:', data);
          setSubmissionStatus('Booking successful!'); // Success message
          window.alert('Booking successful!'); // Alert the user
          setFormValues(defaultFormValues); // Reset form values after successful submission
        } else {
          console.error('Error submitting booking:', response.statusText);
          setSubmissionStatus('Error submitting booking, please try again.'); // Error message
        }
      } catch (error) {
        console.error('Error submitting booking:', error);
        setSubmissionStatus('Error submitting booking, please try again.'); // Error message
      }
    }
  };

  return {
    formValues,
    errors,
    handleChange,
    handleSubmit,
    setFormValues,
    submissionStatus, // Return submission status
  };
};
