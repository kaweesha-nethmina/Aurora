import React from 'react';
import { DrinkItem } from '../../services/drinkService';
import './menuItemCard.css';

interface MenuItemCardProps {
    item: DrinkItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
    return (
        <div className="menu-item-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <span>${item.price.toFixed(2)}</span>
            <p>Food Code: {item.foodCode}</p>
        </div>
    );
};

export default MenuItemCard;
