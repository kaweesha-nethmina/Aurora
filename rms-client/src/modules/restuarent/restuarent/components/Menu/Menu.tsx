import React, { useState, useEffect } from 'react';
import MenuItem from './MenuItem';
import SearchFilter from './SearchFilter';
import { fetchMenuItems, MenuItem as MenuItemType } from '../../services/menuService';
import { filterMenuItems } from '../../utils/filterUtils';
import './menu.css';
import Header from '../../../../core/components/Header';
import Navbar from '../HomePage/ResNavbar';
import { Link } from 'react-router-dom';

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItemType[]>([]);
  const [category, setCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMenuItems();
        setMenuItems(data);
        setFilteredItems(data); // Initialize filtered items with all items
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = filterMenuItems(menuItems, category, searchTerm);
    setFilteredItems(filtered);
  }, [menuItems, category, searchTerm]);

  return (
    <div className="menu">
      <Header activeTab={'restaurant-bar'} />
      <Navbar />
      <h2>Our Menu</h2>
      <div className='search-btn'>
      <SearchFilter
        category={category}
        setCategory={setCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Link to="/form"><button className='orderNbtn'>Order Now</button></Link>
      </div>
      <div className="menu-items">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))
        ) : (
          <p>No menu items found.</p>
        )}
      </div>
    </div>
  );
};

export default Menu;
