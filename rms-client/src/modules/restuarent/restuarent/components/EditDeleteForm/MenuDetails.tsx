import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import './MenuDetails.css';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string; // Ensure this matches the backend
  foodCode: string;
  availability: boolean;
}

const categories = [
  { value: 'food', label: 'Food' },
  { value: 'drink', label: 'Drink' },
];

const MenuDetails: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch menu items from the API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/menu-items');
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

  const handleEdit = (menuItem: MenuItem) => {
    setSelectedItem(menuItem);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (foodCode: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/menu-items/${foodCode}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete the menu item');

      // Update the state to remove the deleted item
      setMenuItems(prevItems => prevItems.filter(menuItem => menuItem.foodCode !== foodCode));
      alert('Menu item deleted successfully!');
    } catch (error) {
      console.error('Error deleting menu item:', error);
      alert('Failed to delete menu item. Please try again.');
    }
  };

  const handleSave = async () => {
    if (selectedItem) {
      try {
        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing
          ? `http://localhost:5000/api/menu-items/${selectedItem.foodCode}`
          : 'http://localhost:5000/api/menu-items';

        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selectedItem),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message || response.statusText}`);
        }

        alert('Menu item saved successfully!');
        setIsModalOpen(false);
        setSelectedItem(null);
        setIsEditing(false);

        // Refresh the menu items list
        const updatedResponse = await fetch('http://localhost:5000/api/menu-items');
        if (!updatedResponse.ok) throw new Error('Failed to fetch updated menu items');
        const data = await updatedResponse.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Error saving menu item:', error);
        alert('Failed to save menu item. Please try again.');
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (selectedItem) {
      setSelectedItem({ ...selectedItem, [name]: value });
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && selectedItem) {
      const file = event.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setSelectedItem({
          ...selectedItem,
          image: imageUrl, // Store the local preview URL
        });
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="menu-details">
      <h2 className="titleM">Menu Details</h2>
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
          {menuItems.map(menuItem => (
            <tr key={menuItem.foodCode}>
              <td className="table-cell">
                <img src={menuItem.image} alt={menuItem.name} className="menu-image" />
              </td>
              <td className="table-cell">{menuItem.name}</td>
              <td className="table-cell">${menuItem.price.toFixed(2)}</td>
              <td className="table-cell">{menuItem.description}</td>
              <td className="table-cell">{menuItem.category}</td>
              <td className="table-cell">{menuItem.foodCode}</td>
              <td className="table-cell">
                <button className="edit-button" onClick={() => handleEdit(menuItem)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(menuItem.foodCode)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedItem && (
          <div className="modal-content">
            <h2>{isEditing ? 'Edit Menu Item' : 'Add Menu Item'}</h2>
            <form onSubmit={(event) => { event.preventDefault(); handleSave(); }}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={selectedItem.name}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={selectedItem.price}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={selectedItem.description}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="foodCode">Food Code:</label>
                <input
                  type="text"
                  id="foodCode"
                  name="foodCode"
                  value={selectedItem.foodCode}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  name="category"
                  value={selectedItem.category}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="image">Image:</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  className="form-control"
                />
                {selectedItem.image && <img src={selectedItem.image} alt="Preview" className="image-preview" />}
              </div>
              <button type="submit" className="submit-button">
                {isEditing ? 'Save Changes' : 'Add Menu Item'}
              </button>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MenuDetails;
