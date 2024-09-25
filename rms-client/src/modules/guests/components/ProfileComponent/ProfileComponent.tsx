import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './profileComponent.css';

interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    username: string;
}

const ProfileComponent = () => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        console.log('Raw User Data from localStorage:', userData); // Log raw user data

        if (userData) {
            try {
                const parsedData = JSON.parse(userData);
                console.log('Parsed User Data:', parsedData); // Log parsed data

                // Ensure data has the required structure
                if (parsedData && parsedData.firstName && parsedData.lastName && parsedData.contact_info) {
                    console.log('Customer contact_info:', parsedData.contact_info); // Log contact_info
                    setUserProfile({
                        firstName: parsedData.firstName,
                        lastName: parsedData.lastName,
                        email: parsedData.contact_info.email, // Access email from contact_info
                        phone: parsedData.phone,
                        username: parsedData.contact_info.username, // Access username from contact_info
                    });
                } else {
                    console.error('Parsed data does not have the required fields:', parsedData);
                }
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        } else {
            console.error('No user data found in local storage.');
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (userProfile) {
            setUserProfile(prevProfile => ({ ...prevProfile!, [name]: value }));
        }
    };

    const handleSave = async () => {
        if (userProfile) {
            try {
                const response = await axios.put('http://localhost:5000/api/customers/update', userProfile);
                console.log('User updated:', response.data);
                localStorage.setItem('userData', JSON.stringify(userProfile)); // Save updated data to local storage
                setIsEditing(false);
            } catch (error) {
                console.error('Error updating user:', error);
            }
        }
    };

    return (
        <div className="profile-container">
            {userProfile ? (
                <div>
                    <h2>Profile</h2>
                    {isEditing ? (
                        <div>
                            <input type="text" name="firstName" value={userProfile.firstName} onChange={handleChange} />
                            <input type="text" name="lastName" value={userProfile.lastName} onChange={handleChange} />
                            <input type="email" name="email" value={userProfile.email} onChange={handleChange} />
                            <input type="tel" name="phone" value={userProfile.phone} onChange={handleChange} />
                            <input type="text" name="username" value={userProfile.username} onChange={handleChange} />
                            <button onClick={handleSave}>Save</button>
                            <button onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <p>First Name: {userProfile.firstName}</p>
                            <p>Last Name: {userProfile.lastName}</p>
                            <p>Email: {userProfile.email}</p>
                            <p>Phone: {userProfile.phone}</p>
                            <p>Username: {userProfile.username}</p>
                            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProfileComponent;
