import React from 'react';
import './style/adminVehiclePage.css';  // Updated CSS file

interface Vehicle {
  code: string;
  model: string;
  number: string;
  seats: number;
  driver: string;
  available: boolean;
}

interface VehicleTableProps {
  vehicles: Vehicle[];
  editing: number;
  editedVehicle: Vehicle;
  handleRemove: (index: number) => void;
  handleEdit: (index: number) => void;
  handleSaveEdit: () => void;
  setEditedVehicle: React.Dispatch<React.SetStateAction<Vehicle>>;
  setEditing: React.Dispatch<React.SetStateAction<number>>;
}

const VehicleTable: React.FC<VehicleTableProps> = ({
  vehicles,
  editing,
  editedVehicle,
  handleRemove,
  handleEdit,
  handleSaveEdit,
  setEditedVehicle,
  setEditing,
}) => {
  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedVehicle({ ...editedVehicle, [name]: value });
  };

  return (
    <table className="vehicle-table">
      <thead>
        <tr>
          <th>Code</th>
          <th>Model</th>
          <th>Number</th>
          <th>Seats</th>
          <th>Driver</th>
          <th>Available</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((vehicle, index) => (
          <tr key={index}>
            {editing === index ? (
              <>
                <td>
                  <input type="text" name="code" value={editedVehicle.code} onChange={handleEditChange} />
                </td>
                <td>
                  <input type="text" name="model" value={editedVehicle.model} onChange={handleEditChange} />
                </td>
                <td>
                  <input type="text" name="number" value={editedVehicle.number} onChange={handleEditChange} />
                </td>
                <td>
                  <input type="number" name="seats" value={editedVehicle.seats} onChange={handleEditChange} />
                </td>
                <td>
                  <input type="text" name="driver" value={editedVehicle.driver} onChange={handleEditChange} />
                </td>
              </>
            ) : (
              <>
                <td>{vehicle.code}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.number}</td>
                <td>{vehicle.seats}</td>
                <td>{vehicle.driver}</td>
              </>
            )}
            <td>{vehicle.available ? <span className="vehicle-available">Yes</span> : <span className="vehicle-not-available">No</span>}</td>
            <td>
              {editing === index ? (
                <>
                  <button className="vehicle-btn-save" onClick={handleSaveEdit}>Save</button>
                  <button className="vehicle-btn-cancel" onClick={() => setEditing(-1)}>Cancel</button>
                </>
              ) : (
                <>
                  <button className="vehicle-btn-edit" onClick={() => handleEdit(index)}>Edit</button>
                  <button className="vehicle-btn-remove" onClick={() => handleRemove(index)}>Remove</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VehicleTable;
