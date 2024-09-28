// Import statements remain the same
import React, { useState } from 'react';
import { createEmployee } from '../../services/Manager/employeeService';
import '../../components/Manager/ManagerCss/EmployeeStyles.css';

const AddEmployeeTab = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    position: '',
    department: '',
    hire_date: '',
    contact_info: {
      email: '',
      username: '',
      password: '',
      phone: '',
    },
  });
  
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNestedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      contact_info: {
        ...prevData.contact_info,
        [name]: value,
      },
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];
    
    if (!formData.firstName.trim()) newErrors.push('First Name is required.');
    if (!formData.lastName.trim()) newErrors.push('Last Name is required.');
    if (!formData.position.trim()) newErrors.push('Position is required.');
    if (!formData.department.trim()) newErrors.push('Department is required.');
    if (!formData.hire_date) newErrors.push('Hire Date is required.');
    if (!formData.contact_info.email.trim()) newErrors.push('Email is required.');
    else if (!/^[\w-]+(\.[\w-]+)*@gmail\.com$/.test(formData.contact_info.email)) 
      newErrors.push('Email must be a valid Gmail address ending with @gmail.com.');
    if (!formData.contact_info.username.trim()) newErrors.push('Username is required.');
    if (!formData.contact_info.password.trim()) newErrors.push('Password is required.');
    else if (formData.contact_info.password.length < 6) 
      newErrors.push('Password must be at least 6 characters long.');
    if (!formData.contact_info.phone.trim()) newErrors.push('Phone number is required.');

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await createEmployee(formData);
      alert('Employee added successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        position: '',
        department: '',
        hire_date: '',
        contact_info: {
          email: '',
          username: '',
          password: '',
          phone: '',
        },
      });
      setErrors([]);
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Error adding employee. Please try again.');
    }
  };

  return (
    <div className="formContainer">
      <h2 className="formTitle">Add New Employee</h2>
      <form className="employeeForm" onSubmit={handleSubmit}>
        {errors.length > 0 && (
          <div className="error-messages">
            {errors.map((error, index) => (
              <p key={index} className="error">{error}</p>
            ))}
          </div>
        )}
        <div className="form-group">
          <input
            className="formInput"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="formInput"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <select
            className="formInput"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Position
            </option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
          </select>
        </div>

        <div className="form-group">
          <select
            className="formInput"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Department</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Event">Event</option>
            <option value="Reservation">Reservation</option>
            <option value="Spa">Spa</option>
            <option value="Transport">Transport</option>
          </select>
        </div>
        <div className="form-group">
          <input
            className="formInput"
            type="date"
            name="hire_date"
            value={formData.hire_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="formInput"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.contact_info.email}
            onChange={handleNestedChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="formInput"
            type="text"
            name="username"
            placeholder="Username"
            value={formData.contact_info.username}
            onChange={handleNestedChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="formInput"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.contact_info.password}
            onChange={handleNestedChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="formInput"
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.contact_info.phone}
            onChange={handleNestedChange}
            required
          />
        </div>
        <button className="formButton" type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployeeTab;
