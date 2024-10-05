import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './profileComponent.css';
import Header from '../../../core/components/Header';
import Navbar from '../nav/GNavbar';

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
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            try {
                const parsedData = JSON.parse(userData);
                if (parsedData && parsedData.firstName && parsedData.lastName && parsedData.contact_info) {
                    setUserProfile({
                        firstName: parsedData.firstName,
                        lastName: parsedData.lastName,
                        email: parsedData.contact_info.email,
                        phone: parsedData.phone,
                        username: parsedData.contact_info.username,
                    });
                }
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
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
                localStorage.setItem('userData', JSON.stringify(userProfile));
                setIsEditing(false);
            } catch (error) {
                console.error('Error updating user:', error);
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
        navigate('/login');
    };


    return (
        <div className="profile-container-unique">
            <Header activeTab={''} />
            <Navbar />
            <div className='profile-content'>
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
                                <button className='btn-editL' onClick={() => setIsEditing(true)}>Edit Profile</button>
                            </div>
                        )}
                        <button className='btn-logout' onClick={handleLogout}>Logout</button>
                         
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <Link to="/Feedbackrating"> <button className='btn-feedback'>Add Feedback</button></Link>
        </div>
    );
};

export default ProfileComponent;
