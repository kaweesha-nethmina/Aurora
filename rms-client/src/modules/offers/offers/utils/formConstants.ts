export interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    city: string;
    zipcode: string;
    state: string;
    country: string;
    phone: string;
  }
  
  export const defaultFormValues: FormValues = {
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    zipcode: '',
    state: '',
    country: '',
    phone: '',
  };
  