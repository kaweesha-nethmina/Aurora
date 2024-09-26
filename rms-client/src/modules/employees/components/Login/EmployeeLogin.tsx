import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './EmployeeLogin.css'; // Use the same CSS file to maintain consistency

const EmployeeLogin: React.FC = () => {
    const navigate = useNavigate();
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
        setError(null);

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

            if (data.token && data.employee) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('employeeData', JSON.stringify(data.employee));
                navigate('/staf/profile');
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
        <div className="containerEmployeeLogin"> {/* Unique container class */}
            <div className="form-boxEmployeeLogin"> {/* Unique form box class */}
                <h1 className="form-titleEmployeeLogin">Employee Login</h1>
                <form onSubmit={handleSubmit} className="formEmployeeLogin">
                    {error && <p className="error-messageEmployeeLogin">{error}</p>}
                    <div className="input-groupEmployeeLogin">
                        <div className="input-fieldEmployeeLogin">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-fieldEmployeeLogin">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="btn-fieldEmployeeLogin">
                        <button type="submit" disabled={loading} className="employee-login-button">
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                    <div className='lo'><Link to="/manager-login"> <p className='mlog'>
                        Login As Manager
                    </p></Link>
                    <Link to="/login"><p className='mlog'>Login As Customer</p></Link></div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeLogin;
