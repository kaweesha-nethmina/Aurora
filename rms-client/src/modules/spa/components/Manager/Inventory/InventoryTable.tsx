import React, { useState } from 'react';
import './InventoryTable.css';

interface Inventory {
  InventoryID: string;
  ItemName: string;
  Quantity: number;
  Supplier: string;
  RestockDate: Date;
}

const InventoryTable = () => {
  const [inventory, setInventory] = useState<Inventory[]>([
    {
      InventoryID: "I002",
      ItemName: "Shampoo",
      Quantity: 50,
      Supplier: "XYZ Products",
      RestockDate: new Date("2024-10-15T00:00:00.000+00:00"),
    },
  ]);

  const [newInventory, setNewInventory] = useState<Inventory>({
    InventoryID: "",
    ItemName: "",
    Quantity: 0,
    Supplier: "",
    RestockDate: new Date(),
  });

  const handleDelete = (id: string) => {
    setInventory(inventory.filter((item) => item.InventoryID !== id));
  };

  const handleAdd = () => {
    setInventory([...inventory, newInventory]);
    setNewInventory({
      InventoryID: "",
      ItemName: "",
      Quantity: 0,
      Supplier: "",
      RestockDate: new Date(),
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewInventory({ ...newInventory, [name]: value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewInventory({ ...newInventory, [name]: new Date(value) });
  };

  return (
    <div className="inventory-table-container">
      <h2 className="title">Inventory Table</h2>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Inventory ID</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Supplier</th>
            <th>Restock Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.InventoryID}>
              <td>{item.InventoryID}</td>
              <td>{item.ItemName}</td>
              <td>{item.Quantity}</td>
              <td>{item.Supplier}</td>
              <td>{item.RestockDate.toLocaleDateString()}</td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(item.InventoryID)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                name="InventoryID"
                value={newInventory.InventoryID}
                onChange={handleInputChange}
                className="input"
              />
            </td>
            <td>
              <input
                type="text"
                name="ItemName"
                value={newInventory.ItemName}
                onChange={handleInputChange}
                className="input"
              />
            </td>
            <td>
              <input
                type="number"
                name="Quantity"
                value={newInventory.Quantity}
                onChange={handleInputChange}
                className="input"
              />
            </td>
            <td>
              <input
                type="text"
                name="Supplier"
                value={newInventory.Supplier}
                onChange={handleInputChange}
                className="input"
              />
            </td>
            <td>
              <input
                type="date"
                name="RestockDate"
                value={newInventory.RestockDate.toISOString().split('T')[0]}
                onChange={handleDateChange}
                className="input"
              />
            </td>
            <td>
              <button className="add-button" onClick={handleAdd}>
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
