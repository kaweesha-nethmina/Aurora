// guest/components/UserProfile/UserProfileComponent.tsx

import { useState } from 'react';
import './UserProfileComponent.css';
import Header from '../../../core/components/Header';
import { Link } from 'react-router-dom';
import Navbar from '../nav/GNavbar';

interface UserProfile {
  username: string;
  name: string;
  address: string;
  profileImage: string;
}

const defaultUserProfile: UserProfile = {
  username: 'johnDoe123',
  name: 'John Doe',
  address: '123 Main St, New York, NY 10001',
  profileImage: 'https://via.placeholder.com/150',
};

const UserProfileComponent3 = () => {
  const [userProfile, setUserProfile] = useState(defaultUserProfile);
  const [feedback, setFeedback] = useState('');

  const handleFeedbackSubmit = () => {
    console.log('Feedback submitted:', feedback);
    setFeedback('');
  };

  return (
    <div className="user-profile-containerW">
        <Header activeTab={''} />
        <Navbar />
      <div className="user-profile-header">
        <img
          src={userProfile.profileImage}
          alt="Profile Image"
          className="user-profile-image"
        />
        <h2 className="user-profile-username">{userProfile.username}</h2>
      </div>
      <div className="user-profile-info">
        <h3 className="user-profile-label">Name:</h3>
        <p className="user-profile-text">{userProfile.name}</p>
      </div>
      <div className="user-profile-info">
        <h3 className="user-profile-label">Address:</h3>
        <p className="user-profile-text">{userProfile.address}</p>
      </div>
      <Link to="/Feedbackrating"> <button
        onClick={handleFeedbackSubmit}
        className="user-profile-button"
      >
        Submit Feedback
      </button></Link>
    </div>
  );
};

export default UserProfileComponent3;
