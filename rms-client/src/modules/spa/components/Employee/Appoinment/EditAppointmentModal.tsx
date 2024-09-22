import React, { useEffect, useState } from 'react';

interface Appointment {
  _id: string;
  doctor: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

interface EditAppointmentModalProps {
  appointment: Appointment | null;
  onClose: () => void;
  onSave: (updatedAppointment: Appointment) => void;
}

const EditAppointmentModal: React.FC<EditAppointmentModalProps> = ({ appointment, onClose, onSave }) => {
  const [formData, setFormData] = useState<Appointment | null>(null);

  useEffect(() => {
    setFormData(appointment);
  }, [appointment]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      // Call the API to update the appointment details
      try {
        const response = await fetch(`http://localhost:5000/api/appointments/${formData._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to update appointment');
        }

        const updatedAppointment: Appointment = await response.json();
        onSave(updatedAppointment);
      } catch (error) {
        console.error('Error updating appointment:', error);
      }
    }
  };

  if (!formData) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Appointment</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Doctor:
            <input type="text" name="doctor" value={formData.doctor} onChange={handleChange} required />
          </label>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            Phone:
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
          </label>
          <label>
            Date:
            <input type="date" name="date" value={formData.date.split('T')[0]} onChange={handleChange} required />
          </label>
          <label>
            Time:
            <input type="time" name="time" value={formData.time} onChange={handleChange} required />
          </label>
          <label>
            Status:
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </label>
          <button type="submit" className="btn btn-primary">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditAppointmentModal;
