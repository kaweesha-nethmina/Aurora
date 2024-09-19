import React, { useEffect, useState } from 'react';
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
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch menu items from the API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/menu'); // Update with your endpoint
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const handleEdit = (id: number) => {
    console.log(`Editing menu item with id ${id}`);
    // Implement your edit functionality here
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/menu/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete the menu item');

      setMenuItems((prevItems) => prevItems.filter((menuItem) => menuItem.id !== id));
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
                <button className="edit-button" onClick={() => handleEdit(menuItem.id)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(menuItem.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuDetails;
