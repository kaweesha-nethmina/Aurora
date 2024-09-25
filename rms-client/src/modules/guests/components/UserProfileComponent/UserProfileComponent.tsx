import React, { useState } from 'react';
import './UserProfileComponent.css';

interface UserProfile {
  username: string;
  email: string;
  mobileNumber: string;
  password: string;
}

const UserProfileComponent2 = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: 'John Doe',
    email: 'john.doe@example.com',
    mobileNumber: '1234567890',
    password: 'password123',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="profile-container">
      <div className="profile-image-container">
        <img
          src="https://via.placeholder.com/100"
          alt="User Image"
          className="profile-image"
        />
      </div>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userProfile.username}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userProfile.email}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            value={userProfile.mobileNumber}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={userProfile.password}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          <button type="button" onClick={handleTogglePassword}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {isEditing ? (
          <button type="button" onClick={handleSaveProfile}>
            Save
          </button>
        ) : (
          <button type="button" onClick={handleEditProfile}>
            Edit
          </button>
        )}
      </form>
    </div>
  );
};

export default UserProfileComponent2;
