import React from 'react';
import './Header.css'; // Import a CSS file for styling
import logo from '../Images/Aurora white.png';
import user from '../Images/user.png';
import { Link } from 'react-router-dom';

interface HeaderProps {
  activeTab: string;
}

const Header: React.FC<HeaderProps> = ({ activeTab }) => {
  // Check if user data or token exists in local storage to determine login status
  const isLoggedIn = !!localStorage.getItem('userData') || !!localStorage.getItem('token');

  return (
    <header className="headerC">
      <div className="logo">
        <img src={logo} alt="Aurora Logo" />
      </div>
      <nav className="nav-links">
        <a href="/" className={activeTab === 'home' ? 'active' : ''}>Home</a>
        <a href="/eventcard" className={activeTab === 'events' ? 'active' : ''}>Events</a>
        <a href="/roomreservation" className={activeTab === 'rooms' ? 'active' : ''}>Rooms</a>
        <a href="/menuhomepage" className={activeTab === 'restaurant-bar' ? 'active' : ''}>Restaurant & Bar</a>
        <a href="/spa" className={activeTab === 'spa-wellness' ? 'active' : ''}>Spa & Wellness</a>
        <a href="/transportation" className={activeTab === 'transportation' ? 'active' : ''}>Transport</a>
        <a href="/HomePage1" className={activeTab === 'offers' ? 'active' : ''}>Offers</a>
        <a href="/displayfeedback" className={activeTab === 'feedback' ? 'active' : ''}>Feedback</a>
      </nav>
      <div className="user-icon">
        {/* Show user icon only if logged in */}
        {isLoggedIn && (
          <Link to="/pr"><img src={user} alt="User Icon" /></Link>
        )}
      </div>
      <div>
        {/* Show login button only if not logged in */}
        {!isLoggedIn && (
          <Link to="/login"><button className='loginbtn'>Login</button></Link>
        )}
      </div>
    </header>
  );
};

export default Header;
