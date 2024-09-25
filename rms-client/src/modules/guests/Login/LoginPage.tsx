import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

interface SignupResponse {
    message: string;
}

interface LoginResponse {
    token?: string;
    customer?: Customer; 
    admin?: Admin;
}

interface Admin {
    id: string;
    username: string;
    email: string;
}

interface Customer {
    firstName: string;
    lastName: string;
    contact_info: {
        email: string;
        username: string;
        password: string;
    };
    phone: string;
}

const LoginPageN: React.FC = () => {
    const navigate = useNavigate();
    const [formType, setFormType] = useState<'login' | 'signup' | 'admin'>('login');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
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

    const handleAdminSwitch = () => {
        setFormType(prevType => (prevType === 'login' ? 'admin' : 'login'));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { username, password, firstName, lastName, email, phone, confirmPassword } = formData;

        try {
            let response;

            if (formType === 'login') {
                response = await axios.post<LoginResponse>('http://localhost:5000/api/customers/login', { username, password });

                if (response.data.token) {
                    const { token, customer } = response.data;
                
                    console.log("Customer Data Before Saving:", customer); // Log customer data
                    localStorage.setItem('userData', JSON.stringify(customer));
                    localStorage.setItem('token', token);
                    navigate('/pr');
                }
                
            } else if (formType === 'signup') {
                if (!firstName || !lastName) {
                    setRegistrationError("First name and last name are required.");
                    return;
                }
                if (password !== confirmPassword) {
                    setRegistrationError("Passwords do not match.");
                    return;
                }

                response = await axios.post<SignupResponse>('http://localhost:5000/api/customers/signup', { firstName, lastName, email, phone, username, password });
                setRegistrationSuccess(response.data.message);
                setFormData({ username: '', password: '', firstName: '', lastName: '', email: '', phone: '', confirmPassword: '' });
            } else if (formType === 'admin') {
                response = await axios.post<LoginResponse>('http://localhost:5000/api/admin/login', { username, password });

                if (response.data.token) {
                    const { token } = response.data; 
                    localStorage.setItem('adminToken', token);
                    navigate('/pr');
                }
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
        <div className="containerLoginN">
            {registrationSuccess && (
                <p id="successMessageN" className="success-messageN">
                    {registrationSuccess}
                </p>
            )}
            {registrationError && (
                <p className="error-messageN">{registrationError}</p>
            )}
            {loginError && (
                <p className="login-errorN">{loginError}</p>
            )}

            <div className="form-boxN">
                <h1 id="titleN" className="form-titleN">
                    {formType === 'signup' ? 'Sign Up' : formType === 'admin' ? 'Staff Login' : 'Login'}
                </h1>

                <form onSubmit={handleSubmit} className="formN">
                    <div className="input-groupN">
                        {formType === 'signup' && (
                            <>
                                <div className="input-fieldN">
                                    <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
                                </div>
                                <div className="input-fieldN">
                                    <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
                                </div>
                                <div className="input-fieldN">
                                    <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
                                </div>
                                <div className="input-fieldN">
                                    <input type="tel" placeholder="Phone" name="phone" value={formData.phone} onChange={handleChange} required />
                                </div>
                            </>
                        )}
                        <div className="input-fieldN">
                            <input type="text" placeholder={formType === 'admin' ? "Staff Username" : "Username"} name="username" value={formData.username} onChange={handleChange} required />
                        </div>
                        <div className="input-fieldN">
                            <input type="password" placeholder={formType === 'admin' ? "Staff Password" : "Password"} name="password" value={formData.password} onChange={handleChange} required />
                        </div>
                        {formType === 'signup' && (
                            <div className="input-fieldN">
                                <input type="password" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                            </div>
                        )}
                    </div>
                    <div className="btn-fieldN">
                        <input type="submit" value={formType === 'signup' ? "Sign Up" : formType === 'admin' ? "Login as Staff" : "Login"} />
                    </div>
                </form>

                <p id="signupTextN" className="form-textN">
                    If you don't have an account <a href="#" onClick={handleSwitchForm}>Sign Up</a>
                </p>
                <p id="adminTextN" className="form-textN">
                    If you are a staff member <a href="#" onClick={handleAdminSwitch}>Login as Staff</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPageN;