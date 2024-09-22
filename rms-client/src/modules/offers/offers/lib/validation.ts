import { FormValues } from '../utils/constants';

export const validateForm = (values: FormValues) => {
  const errors: Partial<FormValues> = {};
  if (!values.fullName) {
    errors.fullName = 'Full Name is required';
  }
  if (!values.nic) {
    errors.nic = 'NIC is required';
  } else if (values.nic.length < 13) {
    errors.nic = 'NIC must be 13 characters long';
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = 'Phone Number is required';
  } else if (values.phoneNumber.length < 11) {
    errors.phoneNumber = 'Phone Number must be 11 characters long';
  }
  if (!values.date) {
    errors.date = 'Date is required';
  }
  if (!values.description) {
    errors.description = 'Description is required';
  }
  return errors;
};
