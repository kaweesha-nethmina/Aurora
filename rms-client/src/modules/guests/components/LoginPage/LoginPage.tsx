import React, { useState } from 'react';
import './LoginPage.css';

interface User {
  image: string;
  username: string;
  email: string;
  mobileNumber: string;
  password: string;
}

const LoginPage = () => {
  const [user, setUser] = useState<User>({
    image: '',
    username: '',
    email: '',
    mobileNumber: '',
    password: '',
  });

  const [passwordShown, setPasswordShown] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setUser({ ...user, image: URL.createObjectURL(event.target.files[0]) });
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(user);
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="image-upload-container">
          <img
            src={user.image}
            alt="User"
            className="user-image"
          />
          <input
            type="file"
            onChange={handleImageChange}
            className="file-input"
          />
        </div>
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label>Mobile Number</label>
          <input
            type="tel"
            name="mobileNumber"
            value={user.mobileNumber}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type={passwordShown ? 'text' : 'password'}
            name="password"
            value={user.password}
            onChange={handleInputChange}
            className="input-field"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="toggle-password-btn"
          >
            {passwordShown ? 'Hide' : 'Show'}
          </button>
          <p className="password-hint">
            Password should be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, one number, and one special character.
          </p>
        </div>
        <button
          type="submit"
          className="submit-btn"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
