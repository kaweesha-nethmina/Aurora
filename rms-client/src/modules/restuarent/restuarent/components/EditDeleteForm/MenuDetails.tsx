import React, { useState } from 'react';
import './MenuDetails.css';

interface MenuItem {
  id: number;
  image: string;
  name: string;
  price: number;
  description: string;
  category: string;
  foodCode: string;
}

const MenuDetails: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      image: 'https://via.placeholder.com/100',
      name: 'Burger',
      price: 10.99,
      description: 'A juicy burger with all the fixings',
      category: 'Main Course',
      foodCode: 'BUR001',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/100',
      name: 'Pizza',
      price: 14.99,
      description: 'A delicious pizza with your choice of toppings',
      category: 'Main Course',
      foodCode: 'PIZ001',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/100',
      name: 'Salad',
      price: 8.99,
      description: 'A fresh mix of greens with your choice of toppings',
      category: 'Side Dish',
      foodCode: 'SAL001',
    },
  ]);

  const handleEdit = (id: number) => {
    console.log(`Editing menu item with id ${id}`);
  };

  const handleDelete = (id: number) => {
    setMenuItems(menuItems.filter((menuItem) => menuItem.id !== id));
  };

  return (
    <div className="menu-details">
      <h2 className="title">Menu Details</h2>
      <table className="menu-table">
        <thead>
          <tr>
            <th className="table-header">Image</th>
            <th className="table-header">Name</th>
            <th className="table-header">Price</th>
            <th className="table-header">Description</th>
            <th className="table-header">Category</th>
            <th className="table-header">Food Code</th>
            <th className="table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((menuItem) => (
            <tr key={menuItem.id}>
              <td className="table-cell">
                <img src={menuItem.image} alt={menuItem.name} className="menu-image" />
              </td>
              <td className="table-cell">{menuItem.name}</td>
              <td className="table-cell">${menuItem.price.toFixed(2)}</td>
              <td className="table-cell">{menuItem.description}</td>
              <td className="table-cell">{menuItem.category}</td>
              <td className="table-cell">{menuItem.foodCode}</td>
              <td className="table-cell">
                <button
                  className="edit-button"
                  onClick={() => handleEdit(menuItem.id)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(menuItem.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuDetails;
