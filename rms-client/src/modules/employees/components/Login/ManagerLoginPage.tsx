import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ManagerLoginPage.css';

interface SignupResponse {
    message: string;
}

interface LoginResponse {
    token?: string;
    manager?: Manager; 
}

interface Manager {
    id: string;
    username: string;
    email: string;
}

const ManagerLoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [formType, setFormType] = useState<'login' | 'signup'>('login');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        email: '',
        phone: '',
        confirmPassword: ''
    });
    const [registrationSuccess, setRegistrationSuccess] = useState<string | null>(null);
    const [registrationError, setRegistrationError] = useState<string | null>(null);
    const [loginError, setLoginError] = useState<string | null>(null);

    useEffect(() => {
        setRegistrationSuccess(null);
        setLoginError(null);
    }, []);

    const handleSwitchForm = () => {
        setFormType(prevType => (prevType === 'login' ? 'signup' : 'login'));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { username, password, email, confirmPassword, firstName, lastName, phone } = formData;

        try {
            let response;

            if (formType === 'login') {
                response = await axios.post<LoginResponse>('http://localhost:5000/api/managers/login', { username, password });

                if (response.data.token) {
                    const { token, manager } = response.data;
                    localStorage.setItem('managerData', JSON.stringify(manager));
                    localStorage.setItem('token', token);
                    navigate('/hr/manager-profile'); // Navigate to manager dashboard
                }
            } else if (formType === 'signup') {
                if (!email || !firstName || !lastName || !phone) {
                    setRegistrationError("All fields are required.");
                    return;
                }
                if (password !== confirmPassword) {
                    setRegistrationError("Passwords do not match.");
                    return;
                }

                response = await axios.post<SignupResponse>('http://localhost:5000/api/managers/signup', { 
                    username, 
                    email, 
                    password,
                    firstName,
                    lastName,
                    phone 
                });
                setRegistrationSuccess(response.data.message);
                setFormData({ firstName: '', lastName: '', username: '', password: '', email: '', phone: '', confirmPassword: '' });
            }

            if (response) {
                console.log('Login successful:', response.data);
            }
        } catch (error) {
            const errorMessage = (error as any).response?.data?.message || 'An unexpected error occurred.';
            if (formType === 'signup') {
                setRegistrationError(errorMessage);
            } else {
                setLoginError(errorMessage);
            }
        }
    };

    return (
        <div className="containerManager">
            {registrationSuccess && (
                <p id="successMessageManager" className="success-messageManager">
                    {registrationSuccess}
                </p>
            )}
            {registrationError && (
                <p className="error-messageManager">{registrationError}</p>
            )}
            {loginError && (
                <p className="login-errorManager">{loginError}</p>
            )}

            <div className="form-boxManager">
                <h1 id="titleManager" className="form-titleManager">
                    {formType === 'signup' ? 'Manager Sign Up' : 'Manager Login'}
                </h1>

                <form onSubmit={handleSubmit} className="formManager">
                    <div className="input-groupManager">
                        {formType === 'signup' && (
                            <>
                                <div className="input-fieldManager">
                                    <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
                                </div>
                                <div className="input-fieldManager">
                                    <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
                                </div>
                                <div className="input-fieldManager">
                                    <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
                                </div>
                                <div className="input-fieldManager">
                                    <input type="text" placeholder="Phone" name="phone" value={formData.phone} onChange={handleChange} required />
                                </div>
                            </>
                        )}
                        <div className="input-fieldManager">
                            <input type="text" placeholder="Username" name="username" value={formData.username} onChange={handleChange} required />
                        </div>
                        <div className="input-fieldManager">
                            <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
                        </div>
                        {formType === 'signup' && (
                            <div className="input-fieldManager">
                                <input type="password" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                            </div>
                        )}
                    </div>
                    <div className="btn-fieldManager">
                        <input type="submit" value={formType === 'signup' ? "Sign Up" : "Login"} />
                    </div>
                </form>

                <p id="switchTextManager" className="form-textManager">
                    {formType === 'signup' 
                        ? "Already have an account? " 
                        : "Don't have an account? "}
                    <a href="#" onClick={handleSwitchForm}>
                        {formType === 'signup' ? 'Login' : 'Sign Up'}
                    </a>
                </p>
            </div>
        </div>
    );
};

export default ManagerLoginPage;
