export interface FormValues {
  fullName: string;
  nic: string;
  phoneNumber: string;
  date: string;
  description: string;
}

export const defaultFormValues: FormValues = {
  fullName: '',
  nic: '',
  phoneNumber: '',
  date: '',
  description: '',
};
