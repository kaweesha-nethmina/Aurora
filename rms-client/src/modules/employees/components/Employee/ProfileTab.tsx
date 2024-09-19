import React, { useState } from 'react';
import '../Employee/ProfileTab.css'; // Add appropriate CSS file

const ProfileTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Kaweesha Nethmina',
    role: 'Human Resources Manager',
    department: 'Front Desk',
    email: 'Kaweesha@gmail.com',
    phone: '0711140913',
    location: 'Aurora Main building',
    startDate: 'January 2023',
    languages: 'English, Sinhala',
    picture: 'https://via.placeholder.com/150', // Default profile picture
  });
  const [newPicture, setNewPicture] = useState<File | null>(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setNewPicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({ ...prevProfile, picture: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Implement save functionality here (e.g., API call to update profile)
  };

  return (
    <div className="profile-tab">
      <div className="profile-header">
        <img
          src={profile.picture}
          alt="Profile"
          className="profile-picture"
        />
        <div className="profile-info">
          <h2 className="profile-title">{profile.name}</h2>
          <p className="profile-role">{profile.role}</p>
          <p className="profile-department">{profile.department}</p>
        </div>
        <div className="edit-icon" onClick={handleEditClick}>
          <i className="fas fa-edit"></i> {/* FontAwesome Edit Icon */}
        </div>
      </div>
      {isEditing ? (
        <div className="profile-edit-form">
          <label>
            Profile Picture:
            <input
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Start Date:
            <input
              type="text"
              name="startDate"
              value={profile.startDate}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Languages:
            <input
              type="text"
              name="languages"
              value={profile.languages}
              onChange={handleInputChange}
            />
          </label>
          <button className="save-button" onClick={handleSaveClick}>
            Save
          </button>
        </div>
      ) : (
        <div className="profile-details">
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Location:</strong> {profile.location}</p>
          <p><strong>Start Date:</strong> {profile.startDate}</p>
          <p><strong>Languages:</strong> {profile.languages}</p>
        </div>
      )}
      
    </div>
  );
};

export default ProfileTab;
