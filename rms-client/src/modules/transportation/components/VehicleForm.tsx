import React from 'react';
import './style/adminVehiclePage.css';  // Updated CSS file

interface Vehicle {
  vehicleType: string;
  vehicleCode: string;
  seats: number;
  available: boolean;
}

interface VehicleFormProps {
  newVehicle: Vehicle;
  setNewVehicle: React.Dispatch<React.SetStateAction<Vehicle>>;
  handleAdd: () => void;
}

const VehicleForm: React.FC<VehicleFormProps> = ({ newVehicle, setNewVehicle, handleAdd }) => {
  const handleNewVehicleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewVehicle({ ...newVehicle, [name]: value });
  };

  return (
    <form className="vehicle-form">
      <div className="vehicle-form-group">
      <h1 className="admin-vehicle-title">Add Vehicles</h1>
        <label>Vehicle Type</label>
        <input type="text" name="vehicleType" value={newVehicle.vehicleType} onChange={handleNewVehicleChange} />
      </div>
      <div className="vehicle-form-group">
        <label>Vehicle Code</label>
        <input type="text" name="vehicleCode" value={newVehicle.vehicleCode} onChange={handleNewVehicleChange} />
      </div>
      <div className="vehicle-form-group">
        <label>Seats</label>
        <input type="number" name="seats" value={newVehicle.seats} onChange={handleNewVehicleChange} />
      </div>
      <button type="button" className="vehicle-btn-add" onClick={handleAdd}>Add Vehicle</button>
    </form>
  );
};

export default VehicleForm;
