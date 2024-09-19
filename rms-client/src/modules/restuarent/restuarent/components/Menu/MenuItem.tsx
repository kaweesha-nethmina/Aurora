// src/components/Menu/MenuItem.tsx

import React from 'react';
import { MenuItem as MenuItemType } from '../../services/menuService';
import './menuItem.css';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  return (
    <div className="menu-item">
      <img src={item.imageUrl} alt={item.name} className="menu-item-image" />
      <h3 className="menu-item-name">{item.name}</h3>
      <p className="menu-item-description">{item.description}</p>
      <p className="menu-item-price">${item.price.toFixed(2)}</p>
    </div>
  );
};

export default MenuItem;
