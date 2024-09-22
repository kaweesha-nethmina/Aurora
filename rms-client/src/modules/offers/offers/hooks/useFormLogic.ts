import { useState } from 'react';
import { validateForm } from '../lib/formValidation';
import { defaultFormValues } from '../utils/formConstants';

export const useFormLogic = () => {
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [errors, setErrors] = useState({ ...defaultFormValues });
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formValues);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setIsPaymentSuccessful(true);
      setTimeout(() => {
        setIsPaymentSuccessful(false);
      }, 2000);
      setFormValues(defaultFormValues);
    }
  };

  return { formValues, errors, handleChange, handleSubmit, isPaymentSuccessful };
};
