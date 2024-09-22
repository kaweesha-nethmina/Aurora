import { FormValues } from '../utils/formConstants';

export const validateForm = (values: FormValues) => {
  const errors: Partial<Record<keyof FormValues, string>> = {};
  if (!values.firstName) errors.firstName = 'First Name is required';
  if (!values.lastName) errors.lastName = 'Last Name is required';
  if (!values.email) errors.email = 'Email is required';
  if (!values.street) errors.street = 'Street is required';
  if (!values.city) errors.city = 'City is required';
  if (!values.zipcode) errors.zipcode = 'Zipcode is required';
  if (!values.state) errors.state = 'State is required';
  if (!values.country) errors.country = 'Country is required';
  if (!values.phone) errors.phone = 'Phone is required';
  return errors;
};
