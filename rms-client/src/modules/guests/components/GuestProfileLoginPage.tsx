import React, { useState } from 'react';
import './styles.css'
import Header from '../../core/components/Header';
import { Link } from 'react-router-dom';

interface GuestProfile {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  accountType: string;
}

const GuestProfileLoginPage = () => {
  const [guestProfile, setGuestProfile] = useState<GuestProfile>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: '',
  });
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setGuestProfile({ ...guestProfile, [name]: value });
  };

  const handleAccountTypeChange = (event: React.ChangeEvent<HTMLButtonElement>) => {
    setGuestProfile({ ...guestProfile, accountType: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLogin) {
      // Login logic here
    } else {
      if (guestProfile.password !== guestProfile.confirmPassword) {
        setError('Passwords do not match');
      } else {
        // Register logic here
      }
    }
  };

  return (
    <div className="containerGE">
      <Header activeTab={''} />
      <h2 className="titleL">{isLogin ? 'Login' : 'Create New Account'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <div className="input-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={guestProfile.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={guestProfile.lastName}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={guestProfile.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={guestProfile.password}
            onChange={handleInputChange}
          />
        </div>
        {!isLogin && (
          <>
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={guestProfile.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="account-type">
  <p>Account Type:</p>
  <label>
    <input
      type="radio"
      value="user"
      name="accountType"
      checked={guestProfile.accountType === 'user'}
      onChange={handleInputChange}
    />
    User
  </label>
  <label>
    <input
      type="radio"
      value="admin"
      name="accountType"
      checked={guestProfile.accountType === 'admin'}
      onChange={handleInputChange}
    />
    Admin
  </label>
</div>
          </>
        )}
        {error && <p className="error">{error}</p>}
        <Link to="/pr"> <button type="submit" className="submit-btn">
          {isLogin ? 'Login' : 'Create Account'}
        </button></Link>
        <button type="button" className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Create New Account' : 'Login Instead'}
        </button>
      </form>
    </div>
  );
};

export default GuestProfileLoginPage;
