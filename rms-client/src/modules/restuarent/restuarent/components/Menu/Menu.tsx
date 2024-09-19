// Path: restaurant/components/Menu/Menu.tsx

import React, { useState, useEffect } from 'react';
import MenuItem from './MenuItem';
import SearchFilter from './SearchFilter';
import { fetchMenuItems, MenuItem as MenuItemType } from '../../services/menuService';
import { filterMenuItems } from '../../utils/filterUtils';
import './menu.css';

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItemType[]>([]);
  const [category, setCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMenuItems();
      setMenuItems(data);
      setFilteredItems(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = filterMenuItems(menuItems, category, searchTerm);
    setFilteredItems(filtered);
  }, [menuItems, category, searchTerm]);

  return (
    <div className="menu">
      <h2>Our Menu</h2>
      <SearchFilter
        category={category}
        setCategory={setCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="menu-items">
        {filteredItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
