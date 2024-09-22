import { useState } from 'react';
import { validateForm } from '../lib/validation';
import { defaultFormValues, FormValues } from '../utils/constants';

export const useForm = () => {
  const [formValues, setFormValues] = useState<FormValues>(defaultFormValues);
  const [errors, setErrors] = useState<Partial<FormValues>>({});

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formValues);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted successfully:', formValues);
      setFormValues(defaultFormValues);
    }
  };

  return {
    formValues,
    errors,
    handleChange,
    handleSubmit,
  };
};
