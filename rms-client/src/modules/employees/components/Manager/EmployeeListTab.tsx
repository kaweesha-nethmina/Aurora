import React, { useEffect, useState } from 'react';
import './ManagerCss/EmployeeList.css';

const EmployeeList: React.FC = () => {
    const [employees, setEmployees] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingEmployee, setEditingEmployee] = useState<any | null>(null);
    const [formData, setFormData] = useState({
        employeeID: '',
        firstName: '',
        lastName: '',
        position: '',
        department: '',
        hire_date: '',
        contact_info: {
            email: '',
            username: '',
            password: '',
            phone: ''
        }
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:5000/employees');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEmployees(data);
            } catch (err) {
                setError('Failed to fetch employees');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleEdit = (employee: any) => {
        setEditingEmployee(employee);
        setFormData({
            ...employee,
            hire_date: new Date(employee.hire_date).toISOString().split('T')[0]
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:5000/employees/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setEmployees(employees.filter(employee => employee._id !== id));
        } catch (err) {
            setError('Failed to delete employee');
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name.startsWith('contact_info.')) {
            setFormData(prevData => ({
                ...prevData,
                contact_info: {
                    ...prevData.contact_info,
                    [name.split('.')[1]]: value
                }
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/employees/${editingEmployee._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const updatedEmployee = await response.json();
            setEmployees(employees.map(emp => emp._id === updatedEmployee._id ? updatedEmployee : emp));
            setIsModalOpen(false);
            setEditingEmployee(null);
            resetFormData(); // Reset form data after submission
        } catch (err) {
            setError('Failed to update employee');
        }
    };

    const resetFormData = () => {
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
                password: '',
                phone: ''
            }
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        resetFormData();
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="employee-list-container">
            <h1 className="employee-list-title">Employee List</h1>
            <table className="employee-list-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Department</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Hire Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee._id}>
                            <td>{employee.firstName} {employee.lastName}</td>
                            <td>{employee.position}</td>
                            <td>{employee.department}</td>
                            <td>{employee.contact_info.phone}</td>
                            <td>{employee.contact_info.email}</td>
                            <td>{new Date(employee.hire_date).toLocaleDateString()}</td>
                            <td className="action-buttons1">
                                <button className="edit-button1" onClick={() => handleEdit(employee)}>Edit</button>
                                <button className="delete-button1" onClick={() => handleDelete(employee._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Edit Employee</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Employee ID:
                                <input
                                    type="text"
                                    name="employeeID"
                                    value={formData.employeeID}
                                    onChange={handleFormChange}
                                />
                            </label>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    name="fullName"
                                    value={`${formData.firstName} ${formData.lastName}`} // Combined field for display
                                    readOnly // Prevent editing here
                                />
                            </label>
                            <label>
                                First Name:
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleFormChange}
                                />
                            </label>
                            <label>
                                Last Name:
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleFormChange}
                                />
                            </label>
                            <label>
                                Position:
                                <input
                                    type="text"
                                    name="position"
                                    value={formData.position}
                                    onChange={handleFormChange}
                                />
                            </label>
                            <label>
                                Department:
                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleFormChange}
                                >
                                    <option value="" disabled>Select Department</option>
                                    <option value="Human Resources">Human Resources</option>
                                    <option value="Restaurant">Restaurant</option>
                                    <option value="Event">Event</option>
                                    <option value="Reservation">Reservation</option>
                                    <option value="Spa">Spa</option>
                                    <option value="Transport">Transport</option>
                                </select>
                            </label>
                            <label>
                                Phone:
                                <input
                                    type="text"
                                    name="contact_info.phone"
                                    value={formData.contact_info.phone}
                                    onChange={handleFormChange}
                                />
                            </label>
                            <label>
                                Hire Date:
                                <input
                                    type="date"
                                    name="hire_date"
                                    value={formData.hire_date}
                                    onChange={handleFormChange}
                                />
                            </label>
                            <label>
                                Contact Email:
                                <input
                                    type="email"
                                    name="contact_info.email"
                                    value={formData.contact_info.email}
                                    onChange={handleFormChange}
                                />
                            </label>
                            <button type="submit">Save</button>
                            <button type="button" onClick={closeModal}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeList;
