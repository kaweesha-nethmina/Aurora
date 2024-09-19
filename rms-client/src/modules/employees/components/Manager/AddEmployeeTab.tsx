import React, { useState } from 'react';
import { createEmployee } from '../../services/Manager/employeeService';
import '../../components/Manager/ManagerCss/EmployeeStyles.css';

const AddEmployeeTab = () => {
  const [formData, setFormData] = useState({
    employeeID: '', // Match backend field names
    firstName: '',
    lastName: '',
    position: '',
    department: '',
    hire_date: '', // Use a date format
    contact_info: {
      email: '',
      username: '',
      password: ''
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleNestedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      contact_info: {
        ...prevData.contact_info,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEmployee(formData);
      alert('Employee added successfully!');
      setFormData({
        employeeID: '',
        firstName: '',
        lastName: '',
        position: '',
        department: '',
        hire_date: '',
        contact_info: {
          email: '',
          username: '',
          password: ''
        }
      });
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Error adding employee. Please try again.');
    }
  };

  return (
    <div className="formContainer">
      <h2 className="formTitle">Add New Employee</h2>
      <form className="employeeForm" onSubmit={handleSubmit}>
        <input
          className="formInput"
          type="text"
          name="employeeID"
          placeholder="Employee ID"
          value={formData.employeeID}
          onChange={handleChange}
          required
        />
        <input
          className="formInput"
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          className="formInput"
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          className="formInput"
          type="text"
          name="position"
          placeholder="Position"
          value={formData.position}
          onChange={handleChange}
          required
        />
        <input
          className="formInput"
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />
        <input
          className="formInput"
          type="date"
          name="hire_date"
          placeholder="Hire Date"
          value={formData.hire_date}
          onChange={handleChange}
          required
        />
        <input
          className="formInput"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.contact_info.email}
          onChange={handleNestedChange}
          required
        />
        <input
          className="formInput"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.contact_info.username}
          onChange={handleNestedChange}
          required
        />
        <input
          className="formInput"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.contact_info.password}
          onChange={handleNestedChange}
          required
        />
        <button className="formButton" type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployeeTab;
