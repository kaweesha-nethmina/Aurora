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
            password: ''
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
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
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
        } catch (err) {
            setError('Failed to update employee');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingEmployee(null);
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
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="employee-list-container">
            <h1 className="employee-list-title">Employee List</h1>
            <table className="employee-list-table">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Position</th>
                        <th>Department</th>
                        <th>Hire Date</th>
                        <th>Contact Email</th>
                        <th>Contact Username</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee._id}>
                            <td>{employee.employeeID}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.position}</td>
                            <td>{employee.department}</td>
                            <td>{new Date(employee.hire_date).toLocaleDateString()}</td>
                            <td>{employee.contact_info.email}</td>
                            <td>{employee.contact_info.username}</td>
                            <td className="action-buttons">
                                <button className="edit-button" onClick={() => handleEdit(employee)}>Edit</button>
                                <button className="delete-button" onClick={() => handleDelete(employee._id)}>Delete</button>
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
                                <input
                                    type="text"
                                    name="department"
                                    value={formData.department}
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
                            <label>
                                Contact Username:
                                <input
                                    type="text"
                                    name="contact_info.username"
                                    value={formData.contact_info.username}
                                    onChange={handleFormChange}
                                />
                            </label>
                            <label>
                                Contact Password:
                                <input
                                    type="password"
                                    name="contact_info.password"
                                    value={formData.contact_info.password}
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
