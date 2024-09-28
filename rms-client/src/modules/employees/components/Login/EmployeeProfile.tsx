import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Snackbar,
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import './EmployeeProfile.css'; // Adjust the path as needed

interface Employee {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

interface UpdateResponse {
  message: string; // Define the expected response structure
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EmployeeProfile1: React.FC = () => {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState<Employee | null>(null);
  const [formData, setFormData] = useState<Employee | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const storedEmployeeData = localStorage.getItem('employeeData');
    if (storedEmployeeData) {
      const employee = JSON.parse(storedEmployeeData);
      setEmployeeData(employee);
      setFormData(employee);
    } else {
      navigate('/employee-login'); // Redirect if no employee data is found
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.put<UpdateResponse>(
        `http://localhost:5000/api/employees/${employeeData?.id}`,
        formData
      );
      setSnackbarMessage(response.data.message);
      setIsError(false);
      setEmployeeData(formData); // Update local employee data
      localStorage.setItem('employeeData', JSON.stringify(formData)); // Update local storage
      setSnackbarOpen(true);
    } catch (error) {
      const errorMessage =
        (error as any).response?.data?.message ||
        'An unexpected error occurred.';
      setSnackbarMessage(errorMessage);
      setIsError(true);
      setSnackbarOpen(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('employeeData');
    localStorage.removeItem('token'); // Remove token if applicable
    navigate('/employee-login'); // Redirect to login page
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} className="employee-profile-container">
        <Typography variant="h5" component="h1" align="center">
          Employee Profile
        </Typography>

        <form onSubmit={handleSubmit} className="employee-profile-form">
          {formData && (
            <>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                type="email"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className="employee-profile-save-button"
              >
                Update Profile
              </Button>
            </>
          )}
        </form>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={handleLogout}
          className="employee-profile-cancel-button"
        >
          Logout
        </Button>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={isError ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EmployeeProfile1;
