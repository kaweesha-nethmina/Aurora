import React, { useState } from 'react';
import VehicleTable from './VehicleTable';
import VehicleForm from './VehicleForm';
import './style/adminVehiclePage.css';  // Updated CSS file

interface Vehicle {
  code: string;
  model: string;
  number: string;
  seats: number;
  driver: string;
  available: boolean;
}

const initialVehicles: Vehicle[] = [
  { code: 'CAR-001', model: 'Toyota', number: '1234', seats: 5, driver: 'John', available: true },
  { code: 'VAN-001', model: 'Ford', number: '5678', seats: 15, driver: 'Mike', available: false },
  { code: 'TOK-001', model: 'Honda', number: '9101', seats: 3, driver: 'Alex', available: true },
];

const AdminVehiclePage = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [newVehicle, setNewVehicle] = useState<Vehicle>({
    code: '',
    model: '',
    number: '',
    seats: 0,
    driver: '',
    available: true,
  });
  const [editing, setEditing] = useState<number>(-1);
  const [editedVehicle, setEditedVehicle] = useState<Vehicle>({
    code: '',
    model: '',
    number: '',
    seats: 0,
    driver: '',
    available: true,
  });

  const handleAdd = () => {
    const updatedVehicles = [...vehicles, newVehicle];
    setVehicles(updatedVehicles);
    setNewVehicle({ code: '', model: '', number: '', seats: 0, driver: '', available: true });
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
