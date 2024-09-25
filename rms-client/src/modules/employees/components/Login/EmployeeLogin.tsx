import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './EmployeeLogin.css'; // Adjust the path as needed

const EmployeeLogin: React.FC = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Reset error state before submission
    
        try {
            const response = await fetch('http://localhost:5000/employees/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                throw new Error('Invalid credentials. Please try again.');
            }
    
            const data = await response.json();
            console.log('Login successful:', data);
    
            if (data.token && data.employee) { // Ensure both token and employee data exist
                localStorage.setItem('token', data.token);
                localStorage.setItem('employeeData', JSON.stringify(data.employee)); // Store employee data
                navigate('/staf/profile'); // Redirect to the profile page on successful login
            } else {
                throw new Error('Token or employee data not received. Please try again.');
            }
    
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };
    
    
    

    return (
        <div className="employee-login-container">
            <h1 className="employee-login-title">Employee Login</h1>
            <form onSubmit={handleSubmit} className="employee-login-form">
                {error && <p className="error-message employee-login-error">{error}</p>}
                <label className="employee-login-label">
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="employee-login-input"
                    />
                </label>
                <label className="employee-login-label">
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="employee-login-input"
                    />
                </label>
                <button type="submit" disabled={loading} className="employee-login-button">
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default EmployeeLogin;
