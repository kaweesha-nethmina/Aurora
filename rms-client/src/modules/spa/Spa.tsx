import React from 'react';
import HomePage from './components/Employee/Home/HomePage';
import MedicalAppointmentForm from './components/Employee/Medicalform/MedicalAppointmentForm';
import SpaAppointmentForm from './components/Employee/Spaform/SpaAppointmentForm';
import GymAppointmentForm from './components/Employee/Gymform/GymAppointmentForm';
import SpaPage from './components/Employee/Spa/SpaPage';
import GymPage from './components/Employee/Gym/GymPage';
import MedicalPage from './components/Employee/Medical/MedicalPage';
import CustomerDetailsTable from './components/Manager/Customerdetails/CustomerDetailsTable';
import InventoryTable from './components/Manager/Inventory/InventoryTable';

const SpaApp: React.FC = () => {
  return (
    <div>
            
    <HomePage />

    <SpaPage/>
    <MedicalPage/>
    <GymPage/>
    <MedicalAppointmentForm />
    <SpaAppointmentForm/>
    <GymAppointmentForm/>
    <CustomerDetailsTable/>
    <InventoryTable/>

  







    </div>
  );
};

export default SpaApp;















