// Path: restaurant/restaurant.tsx
import React from 'react';
import Menu from './components/Menu/Menu';
import DrinksMenu from './components/DrinksMenu/DrinksMenu';


const Restaurant: React.FC = () => {
  return (
    <div className="restaurant">
      <Menu />
    </div>
  );
};

export default Restaurant;
