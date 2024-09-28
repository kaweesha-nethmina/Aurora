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
import './ManagerProfile.css';

interface Manager {
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

const ManagerProfile: React.FC = () => {
  const navigate = useNavigate();
  const [managerData, setManagerData] = useState<Manager | null>(null);
  const [formData, setFormData] = useState<Manager | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const storedManagerData = localStorage.getItem('managerData');
    if (storedManagerData) {
      const manager = JSON.parse(storedManagerData);
      setManagerData(manager);
      setFormData(manager);
    } else {
      navigate('/manager-login'); // Redirect if no manager data is found
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
        `http://localhost:5000/api/managers/${managerData?.id}`,
        formData
      );
      setSnackbarMessage(response.data.message);
      setIsError(false);
      setManagerData(formData); // Update local manager data
      localStorage.setItem('managerData', JSON.stringify(formData)); // Update local storage
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
    localStorage.removeItem('managerData');
    localStorage.removeItem('token'); // Remove token if applicable
    navigate('/manager-login'); // Redirect to login page
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} className="profile-container">
        <Typography variant="h5" component="h1" align="center">
          Manager Profile
        </Typography>

        <form onSubmit={handleSubmit} className="profile-form">
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
                className="btn-submit"
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
          className="logout-button"
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

export default ManagerProfile;
