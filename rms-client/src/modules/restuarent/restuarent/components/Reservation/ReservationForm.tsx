import React, { useState, useEffect } from 'react';
import { fetchMenuItems } from '../../services/menuService'; // Adjust this import to match your service structure
import './reservation.css';
import MenuPopup from '../Menu/MenuPopup';

interface ReservationFormProps {
  onSubmit: (data: any) => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    arrivalDate: '',
    departureDate: '',
    numGuests: 1,
    name: '',
    checkin: '',
    checkout: '',
    foodcode: '',
    phone: '',
    email: '',
  });

  const [menuItems, setMenuItems] = useState<any[]>([]); // State for storing menu items
  const [showMenuPopup, setShowMenuPopup] = useState(false); // State for showing the popup

  // useEffect to fetch user data and auto-fill name and phone
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const userProfile = JSON.parse(userData);
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: `${userProfile.firstName || ''} ${userProfile.lastName || ''}`,
        phone: userProfile.phone || '',
      }));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMenuItems();
        console.log(data); // Log fetched items
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleViewMenu = () => {
    setShowMenuPopup(true); // Show the menu popup
  };

  const closePopup = () => {
    setShowMenuPopup(false); // Close the menu popup
  };

  return (
    <div className="reservation-form-container">
      <form onSubmit={handleSubmit} className="reservation-form">
        <h2 className="form-title">Reserve a Table</h2>
        <input className="input-date arrival-date" type="date" name="arrivalDate" onChange={handleChange} required />
        <input className="input-date departure-date" type="date" name="departureDate" onChange={handleChange} required />
        <input className="input-number num-guests" type="number" name="numGuests" placeholder="No Of Guests" min="1" onChange={handleChange} required />
        <input className="input-text name" type="text" name="name" value={formData.name} onChange={handleChange} required />
        <input className="input-text checkin" type="time" name="checkin" placeholder="Check in" onChange={handleChange} required />
        <input className="input-text checkout" type="time" name="checkout" placeholder="Check out" onChange={handleChange} required />
        <input className="input-tel foodcode" type="text" name="foodcode" placeholder="Food Code" onChange={handleChange} required />
        <button className="view-menu-buttonR" type="button" onClick={handleViewMenu}>
          View Menu
        </button>
        <input className="input-tel phone" type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        <input className="input-email email" type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <button className="check-button" type="submit">Check Availability</button>
      </form>

      {showMenuPopup && (
        <MenuPopup items={menuItems} onClose={closePopup} />
      )}
    </div>
  );
};

export default ReservationForm;
