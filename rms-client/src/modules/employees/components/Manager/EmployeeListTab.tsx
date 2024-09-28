import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    CircularProgress,
    Snackbar,
    Alert
} from '@mui/material';
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
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:5000/employees');
                if (!response.ok) throw new Error('Network response was not ok');
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
            if (!response.ok) throw new Error('Network response was not ok');
            setEmployees(employees.filter(employee => employee._id !== id));
            setSnackbarOpen(true);
        } catch (err) {
            setError('Failed to delete employee');
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
            if (!response.ok) throw new Error('Network response was not ok');
            const updatedEmployee = await response.json();
            setEmployees(employees.map(emp => emp._id === updatedEmployee._id ? updatedEmployee : emp));
            handleCloseModal();
        } catch (err) {
            setError('Failed to update employee');
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        resetFormData();
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

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        setError(null);
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <div className="employee-list-container">
            <h1 className="employee-list-title">Employee List</h1>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Position</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Hire Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map(employee => (
                            <TableRow key={employee._id}>
                                <TableCell>{employee.firstName} {employee.lastName}</TableCell>
                                <TableCell>{employee.position}</TableCell>
                                <TableCell>{employee.department}</TableCell>
                                <TableCell>{employee.contact_info.phone}</TableCell>
                                <TableCell>{employee.contact_info.email}</TableCell>
                                <TableCell>{new Date(employee.hire_date).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="primary" onClick={() => handleEdit(employee)}>Edit</Button>
                                    <Button variant="outlined" color="secondary" onClick={() => handleDelete(employee._id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={isModalOpen} onClose={handleCloseModal}>
                <DialogTitle>Edit Employee</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Employee ID"
                            name="employeeID"
                            value={formData.employeeID}
                            
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleFormChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleFormChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Position"
                            name="position"
                            value={formData.position}
                            onChange={handleFormChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Department"
                            select
                            name="department"
                            value={formData.department}
                            onChange={handleFormChange}
                            fullWidth
                            margin="normal"
                        >
                            <option value="" disabled>Select Department</option>
                            <option value="Human Resources">Human Resources</option>
                            <option value="Restaurant">Restaurant</option>
                            <option value="Event">Event</option>
                            <option value="Reservation">Reservation</option>
                            <option value="Spa">Spa</option>
                            <option value="Transport">Transport</option>
                        </TextField>
                        <TextField
                            label="Phone"
                            name="contact_info.phone"
                            value={formData.contact_info.phone}
                            onChange={handleFormChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Hire Date"
                            type="date"
                            name="hire_date"
                            value={formData.hire_date}
                            onChange={handleFormChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Contact Email"
                            type="email"
                            name="contact_info.email"
                            value={formData.contact_info.email}
                            onChange={handleFormChange}
                            fullWidth
                            margin="normal"
                        />
                        <DialogActions>
                            <Button onClick={handleCloseModal} color="primary">Cancel</Button>
                            <Button type="submit" color="primary">Save</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            <Snackbar 
                open={snackbarOpen} 
                autoHideDuration={6000} 
                onClose={handleSnackbarClose} 
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Snackbar anchored to the bottom-right
            >
                <Alert onClose={handleSnackbarClose} severity="success">
                    Employee deleted successfully!
                </Alert>
            </Snackbar>

        </div>
    );
};

export default EmployeeList;
