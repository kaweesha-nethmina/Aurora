import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EmployeeProfile.css'; // Adjust the path as needed

interface Employee {
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

const EmployeeProfile1: React.FC = () => {
    const navigate = useNavigate();
    const [employeeData, setEmployeeData] = useState<Employee | null>(null);
    const [formData, setFormData] = useState<Employee | null>(null);
    const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);
    const [updateError, setUpdateError] = useState<string | null>(null);

    useEffect(() => {
        const storedEmployeeData = localStorage.getItem('employeeData');
        if (storedEmployeeData) {
            const employee = JSON.parse(storedEmployeeData);
            setEmployeeData(employee);
            setFormData(employee);
        } else {
            navigate('/employee-login'); // Redirect if no employee data is found
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
            const response = await axios.put<UpdateResponse>(`http://localhost:5000/api/employees/${employeeData?.id}`, formData);
            setUpdateSuccess(response.data.message);
            setUpdateError(null);
            setEmployeeData(formData); // Update local employee data
            localStorage.setItem('employeeData', JSON.stringify(formData)); // Update local storage
        } catch (error) {
            const errorMessage = (error as any).response?.data?.message || 'An unexpected error occurred.';
            setUpdateError(errorMessage);
            setUpdateSuccess(null);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('employeeData');
        localStorage.removeItem('token'); // Remove token if applicable
        navigate('/employee-login'); // Redirect to login page
    };

    return (
        <div className="employee-profile-container">
            {updateSuccess && <p className="employee-profile-success-message">{updateSuccess}</p>}
            {updateError && <p className="employee-profile-error-message">{updateError}</p>}

            {formData && (
                <form onSubmit={handleSubmit} className="employee-profile-form">
                    <h1 className="employee-profile-title">Employee Profile</h1>
                    <div className="employee-profile-details">
                        <label className="employee-profile-label">First Name</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="employee-profile-input" />
                    </div>
                    <div className="employee-profile-details">
                        <label className="employee-profile-label">Last Name</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="employee-profile-input" />
                    </div>
                    <div className="employee-profile-details">
                        <label className="employee-profile-label">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="employee-profile-input" />
                    </div>
                    <div className="employee-profile-details">
                        <label className="employee-profile-label">Phone</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required className="employee-profile-input" />
                    </div>
                    <div className="employee-profile-details">
                        <label className="employee-profile-label">Username</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} required className="employee-profile-input" />
                    </div>
                    <div className="employee-profile-button-group">
                        <input type="submit" value="Update Profile" className="employee-profile-save-button" />
                    </div>
                </form>
            )}
            <div className="logout-container">
                <button className="employee-profile-cancel-button" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default EmployeeProfile1;
