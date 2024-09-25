import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ManagerProfile.css';

interface Manager {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
}

interface UpdateResponse {
    message: string; // Define the expected response structure
}

const ManagerProfile: React.FC = () => {
    const navigate = useNavigate();
    const [managerData, setManagerData] = useState<Manager | null>(null);
    const [formData, setFormData] = useState<Manager | null>(null);
    const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);
    const [updateError, setUpdateError] = useState<string | null>(null);

    useEffect(() => {
        const storedManagerData = localStorage.getItem('managerData');
        if (storedManagerData) {
            const manager = JSON.parse(storedManagerData);
            setManagerData(manager);
            setFormData(manager);
        } else {
            navigate('/manager-login'); // Redirect if no manager data is found
        }
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (formData) {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.put<UpdateResponse>(`http://localhost:5000/api/managers/${managerData?.id}`, formData);
            setUpdateSuccess(response.data.message);
            setUpdateError(null);
            setManagerData(formData); // Update local manager data
            localStorage.setItem('managerData', JSON.stringify(formData)); // Update local storage
        } catch (error) {
            const errorMessage = (error as any).response?.data?.message || 'An unexpected error occurred.';
            setUpdateError(errorMessage);
            setUpdateSuccess(null);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('managerData');
        localStorage.removeItem('token'); // Remove token if applicable
        navigate('/manager-login'); // Redirect to login page
    };

    return (
        <div className="profile-container">
            {updateSuccess && <p className="success-message">{updateSuccess}</p>}
            {updateError && <p className="error-message">{updateError}</p>}

            {formData && (
                <form onSubmit={handleSubmit} className="profile-form">
                    <h1>Manager Profile</h1>
                    <div className="input-group">
                        <label>First Name</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Last Name</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Phone</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Username</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                    </div>
                    <div className="btn-field">
                        <input type="submit" value="Update Profile" />
                    </div>
                </form>
            )}
            <div className="logout-container">
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default ManagerProfile;
