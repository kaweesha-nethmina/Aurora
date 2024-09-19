import React from 'react';
import './Header.css'; // Import a CSS file for styling
import logo from '../Images/Aurora white.png';
import user from '../Images/user.png';

interface HeaderProps {
  activeTab: string;
}

const Header: React.FC<HeaderProps> = ({ activeTab }) => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Aurora Logo" />
      </div>
      <nav className="nav-links">
        <a href="/home" className={activeTab === 'home' ? 'active' : ''}>Home</a>
        <a href="/event" className={activeTab === 'events' ? 'active' : ''}>Events</a>
        <a href="/reservation" className={activeTab === 'rooms' ? 'active' : ''}>Rooms</a>
        <a href="/restaurant" className={activeTab === 'restaurant-bar' ? 'active' : ''}>Restaurant & Bar</a>
        <a href="/spa" className={activeTab === 'spa-wellness' ? 'active' : ''}>Spa & Wellness</a>
        <a href="/transportation" className={activeTab === 'transportation' ? 'active' : ''}>Transport</a>
        <a href="/offers" className={activeTab === 'offers' ? 'active' : ''}>Offers</a>
      </nav>
      <div className="user-icon">
        <img src={user} alt="User Icon" />
      </div>
    </header>
  );
};

export default Header;
