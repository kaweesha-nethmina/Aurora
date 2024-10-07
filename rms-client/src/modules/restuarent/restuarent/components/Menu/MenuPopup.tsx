// MenuPopup.tsx
import React, { ReactNode } from 'react';
import './menuPopup.css'; // Create this CSS file for styling

interface MenuPopupProps {
  items: {
      foodCode: ReactNode; foodcode: string; name: string; price: number 
}[]; // Adjust this type according to your data
  onClose: () => void;
}

const MenuPopup: React.FC<MenuPopupProps> = ({ items, onClose }) => {
  return (
    <div className="menu-popup">
      <div className="popup-content">
        <h2>Menu</h2>
        <button className="close-button" onClick={onClose}>Close</button>
        <table>
          <thead>
            <tr>
              <th>Food Code</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.foodCode}</td>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MenuPopup;
