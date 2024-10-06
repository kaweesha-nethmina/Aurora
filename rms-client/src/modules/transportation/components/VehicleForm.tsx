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
      <h1 className="admin-vehicle-title">Add Vehicles</h1>

      <div className="vehicle-form-group">
        <label>Code</label>
        <input type="text" name="code" value={newVehicle.code} onChange={handleNewVehicleChange} />
      </div>
      
      <div className="vehicle-form-group">
        <label>Model</label>
        <input type="text" name="model" value={newVehicle.model} onChange={handleNewVehicleChange} />
      </div>

      <div className="vehicle-form-group">
        <label>Number</label>
        <input type="text" name="number" value={newVehicle.number} onChange={handleNewVehicleChange} />
      </div>

      <div className="vehicle-form-group">
        <label>Seats</label>
        <input type="number" name="seats" value={newVehicle.seats} onChange={handleNewVehicleChange} />
      </div>

      <div className="vehicle-form-group">
        <label>Driver</label>
        <input type="text" name="driver" value={newVehicle.driver} onChange={handleNewVehicleChange} />
      </div>

      <button type="button" className="vehicle-btn-add" onClick={handleAdd}>Add Vehicle</button>
    </form>
  );
};

export default VehicleForm;
