import React from 'react';
import './style/adminVehiclePage.css';  // Updated CSS file

interface Vehicle {
  vehicleType: string;
  vehicleCode: string;
  seats: number;
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
          <th>Type</th>
          <th>Code</th>
          <th>Seats</th>
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
                  <input type="text" name="vehicleType" value={editedVehicle.vehicleType} onChange={handleEditChange} />
                </td>
                <td>
                  <input type="text" name="vehicleCode" value={editedVehicle.vehicleCode} onChange={handleEditChange} />
                </td>
                <td>
                  <input type="number" name="seats" value={editedVehicle.seats} onChange={handleEditChange} />
                </td>
              </>
            ) : (
              <>
                <td>{vehicle.vehicleType}</td>
                <td>{vehicle.vehicleCode}</td>
                <td>{vehicle.seats}</td>
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
