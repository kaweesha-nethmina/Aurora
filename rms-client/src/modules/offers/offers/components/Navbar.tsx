import React, { useState } from 'react';
import './Navbar.css';

interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
  { name: 'Create Offers', path: '/create-offers' },
  { name: 'View Offers', path: '/view-offers' },
  { name: 'View Bookings', path: '/view-bookings' },
  { name: 'Generate Reports', path: '/generate-reports' },
];

const Navbar = () => {
  const [activeItem, setActiveItem] = useState(navItems[0].name);

  const handleItemClick = (name: string) => {
    setActiveItem(name);
  };

  return (
    <nav className="navbar">
      <div className="nav-items">
        {navItems.map((item) => (
          <button
            key={item.name}
            className={`nav-item ${activeItem === item.name ? 'active' : ''}`}
            onClick={() => handleItemClick(item.name)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
