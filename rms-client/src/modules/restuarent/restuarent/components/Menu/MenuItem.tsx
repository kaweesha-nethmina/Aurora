// Path: restaurant/components/Menu/MenuItem.tsx

import React from 'react';
import { MenuItem as MenuItemType } from '../../services/menuService';
import './menuItem.css';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  return (
    <div className="menu-item">
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>Price: ${item.price}</p>
      <p>Category: {item.category}</p>
      <p>Code: {item.foodCode}</p>
    </div>
  );
};

export default MenuItem;
