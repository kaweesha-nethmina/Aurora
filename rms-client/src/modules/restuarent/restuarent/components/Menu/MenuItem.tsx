import React from 'react';
import { MenuItem as MenuItemType } from '../../services/menuService';
import './menuItem.css';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<{ item: MenuItemType }> = ({ item }) => {
  return (
    <div className="menu-item">
      <img src={item.image} alt={item.name} className="menu-item-image" />
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>{item.price}</p>
    </div>
  );
};


export default MenuItem;
