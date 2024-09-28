import React, { useState, useEffect } from 'react';
import { fetchDrinkItems, DrinkItem } from '../../services/drinkService';
import MenuItemCard from '../DrinksMenu/MenuItemCard';
import DrinksFilter from './DrinksFilter';
import DrinksSearch from './DrinksSearch';
import './drinksMenu.css';
import Header from '../../../../core/components/Header';
import Navbar from '../HomePage/ResNavbar';


const DrinksMenu: React.FC = () => {
    const [drinks, setDrinks] = useState<DrinkItem[]>([]);
    const [filteredDrinks, setFilteredDrinks] = useState<DrinkItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const loadDrinks = async () => {
            const data = await fetchDrinkItems();
            setDrinks(data);
            setFilteredDrinks(data);
        };
        loadDrinks();
    }, []);

    useEffect(() => {
        let filtered = drinks.filter(drink => 
            drink.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(drink => drink.category === selectedCategory);
        }
        setFilteredDrinks(filtered);
    }, [searchTerm, selectedCategory, drinks]);

    return (
        <div className="drinks-menu">
            <Header activeTab={'restaurant-bar'} />
            <Navbar />
            <DrinksSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {/* <DrinksFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} /> */}
            <div className="menu-grid">
                {filteredDrinks.map(drink => (
                    <MenuItemCard key={drink.id} item={drink} />
                ))}
            </div>
        </div>
    );
};

export default DrinksMenu;
