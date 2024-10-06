// ../../../types/types.ts

// Base interface for common properties
export interface BaseAppointment {
  _id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  message?: string; // Optional field
  status: 'pending' | 'accepted' | 'rejected'; // Common status field
}

// Interface for Spa Appointments
export interface SpaAppointment extends BaseAppointment {
  service: string; // Required field for spa appointments
}

// Interface for Medical Appointments
export interface MedicalAppointment extends BaseAppointment {
  doctor: string; // Required field for medical appointments
  phone: string; // Required field for medical appointments
}
