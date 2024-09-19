import React, { useState, useEffect } from 'react';
import { MenuItem as MenuItemType, addMenuItem, editMenuItem } from '../../services/addeditService';
import './addEditMenuItem.css';

const categories = [
  { value: 'food', label: 'Food' },
  { value: 'drink', label: 'Drink' },
];

interface AddEditMenuItemProps {
  menuItemToEdit?: MenuItemType;
  onSave: () => void;
}

const AddEditMenuItem: React.FC<AddEditMenuItemProps> = ({ menuItemToEdit, onSave }) => {
  const [menuItem, setMenuItem] = useState<MenuItemType>({
    name: '',
    price: 0,
    description: '',
    foodCode: '',
    category: 'food',
    image: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (menuItemToEdit) {
      setMenuItem(menuItemToEdit);
      setIsEditing(true);
    }
  }, [menuItemToEdit]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setMenuItem({ ...menuItem, [name]: value });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setMenuItem({ ...menuItem, image: URL.createObjectURL(event.target.files[0]) });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEditing) {
      await editMenuItem(menuItem);
    } else {
      await addMenuItem(menuItem);
    }
    onSave();
  };

  return (
    <div className="add-edit-menu-item">
      <h2>{isEditing ? 'Edit Menu Item' : 'Add Menu Item'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={menuItem.name}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={menuItem.price}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={menuItem.description}
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
            value={menuItem.foodCode}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={menuItem.category}
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
          {menuItem.image && <img src={menuItem.image} alt="Preview" className="image-preview" />}
        </div>
        <button type="submit" className="submit-button">
          {isEditing ? 'Save Changes' : 'Add Menu Item'}
        </button>
      </form>
    </div>
  );
};

export default AddEditMenuItem;
