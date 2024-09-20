import React, { useState } from 'react';
import VehicleTable from './VehicleTable';
import VehicleForm from './VehicleForm';
import './style/adminVehiclePage.css';  // Updated CSS file

interface Vehicle {
  vehicleType: string;
  vehicleCode: string;
  seats: number;
  available: boolean;
}

const initialVehicles: Vehicle[] = [
  { vehicleType: 'Car', vehicleCode: 'CAR-001', seats: 5, available: true },
  { vehicleType: 'Van', vehicleCode: 'Van-001', seats: 15, available: false },
  { vehicleType: 'Tok Tok', vehicleCode: 'Tok-001', seats: 3, available: true },
];

const AdminVehiclePage = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [newVehicle, setNewVehicle] = useState<Vehicle>({
    vehicleType: '',
    vehicleCode: '',
    seats: 0,
    available: true,
  });
  const [editing, setEditing] = useState<number>(-1);
  const [editedVehicle, setEditedVehicle] = useState<Vehicle>({
    vehicleType: '',
    vehicleCode: '',
    seats: 0,
    available: true,
  });

  const handleAdd = () => {
    const updatedVehicles = [...vehicles, newVehicle];
    setVehicles(updatedVehicles);
    setNewVehicle({ vehicleType: '', vehicleCode: '', seats: 0, available: true });
  };

  const handleRemove = (index: number) => {
    const updatedVehicles = [...vehicles];
    updatedVehicles.splice(index, 1);
    setVehicles(updatedVehicles);
  };

  const handleEdit = (index: number) => {
    setEditing(index);
    setEditedVehicle(vehicles[index]);
  };

  const handleSaveEdit = () => {
    const updatedVehicles = [...vehicles];
    updatedVehicles[editing] = { ...editedVehicle, available: vehicles[editing].available };
    setVehicles(updatedVehicles);
    setEditing(-1);
  };

  return (
    <div className="admin-vehicle-container">
      
      <h1 className="admin-vehicle-title">Vehicles</h1>
      <VehicleTable
        vehicles={vehicles}
        editing={editing}
        editedVehicle={editedVehicle}
        handleRemove={handleRemove}
        handleEdit={handleEdit}
        handleSaveEdit={handleSaveEdit}
        setEditedVehicle={setEditedVehicle}
        setEditing={setEditing}
      />
      <VehicleForm newVehicle={newVehicle} setNewVehicle={setNewVehicle} handleAdd={handleAdd} />
    </div>
  );
};

export default AdminVehiclePage;
