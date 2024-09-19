// components/guestProfile.tsx
import './guestProfile.css'
import GuestForm from './guestForm';
import { Guest } from '../lib/guestTypes';

const GuestProfile = () => {
  const handleFormSubmit = (guest: Guest) => {
    console.log(guest);
  };

  return (
    <div className="guest-profile">
      <h2 className="profile-title">Guest Profile</h2>
      <GuestForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default GuestProfile;
