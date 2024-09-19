import React, { useState, useEffect } from 'react';
import { MenuItem as MenuItemType, addMenuItem, editMenuItem } from '../../services/addeditService'; // Import your API service functions
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
    try {
      if (isEditing) {
        await editMenuItem(menuItem); // API call to edit menu item
      } else {
        await addMenuItem(menuItem); // API call to add new menu item
      }
      onSave(); // Callback to refresh the list after saving
    } catch (error) {
      console.error('Error saving menu item:', error);
    }
  };

  return (
    <div className="add-edit-menu-item">
      <h2>{isEditing ? 'Edit Menu Item' : 'Add Menu Item'}</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields remain the same */}
        {/* ... */}
      </form>
    </div>
  );
};

export default AddEditMenuItem;
