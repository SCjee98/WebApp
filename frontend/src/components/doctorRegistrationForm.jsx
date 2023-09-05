import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

const DoctorRegistration = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [formErrors, setFormErrors] = useState({});
  // ... other doctor-specific fields and states

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email.';
      isValid = false;
    }

    if (
      !password ||
      !/(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$!%^&*()\-_=+{};:,<.>]).{8,}/.test(
        password
      )
    ) {
      errors.password =
        'Please enter a password of at least 16 characters with at least one letter, one number, and one special character.';
      isValid = false;
    }

    if (!firstName) {
      errors.name = 'Please enter your name.';
      isValid = false;
    }
    if (!lastName) {
      errors.name = 'Please enter your name.';
      isValid = false;
    }

    if (!specialization) {
      errors.specialization = 'Please enter your specialization.';
      isValid = false;
    }

    if (!contactNumber || !/^\d{10}$/.test(contactNumber)) {
      errors.contactNumber = 'Please enter a valid 10-digit contact number.';
      isValid = false;
    }

    if (!registrationNumber || !/^\d{10}$/.test(contactNumber)) {
      errors.contactNumber = 'Please enter a valid 10-digit registration number.';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    const isValid = validateForm();

    if (isValid) {
    try {
      // Construct the doctor registration data
      const doctorData = {
        firstName,
        lastName,
        email,
        password,
        specialization,
        contactNumber,
        registrationNumber,
        // ... other doctor-specific fields
      };

      // Send the doctor registration data to the backend
      const response = await fetch('http://localhost:5000/api/register-doctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorData),
      });

      if (response.ok) {
        // Registration successful, handle the response accordingly
      } else {
        // Registration failed, handle the response accordingly
      }
    } catch (error) {
      console.error('An error occurred during doctor registration:', error);
      // Handle the error accordingly
    }
  }
  };

  return (
    <div style={{ display: 'grid', height: '100vh', placeItems: 'center' }}>
      <Typography
        variant="h3"
        component="h2"
        style={{
          textAlign: 'center',
          fontSize: '24px',
          color: 'black',
          marginBottom: '5px',
          marginTop: '10px',
        }}
      >
        Doctor Registration Form
      </Typography>
      <Paper
        sx={{
          padding: '30px',
          border: '5px solid blue',
          borderRadius: '20px',
        }}
      >
        {/* Doctor-specific fields */}
        <Grid
          container
          spacing={3}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <TextField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={!!formErrors.firstName}
              helperText={formErrors.firstName}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={!!formErrors.lastName}
              helperText={formErrors.lastName}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!formErrors.email}
              helperText={formErrors.email}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!formErrors.password}
              helperText={formErrors.password}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              error={!!formErrors.specialization}
              helperText={formErrors.specialization}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Registration Number"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              error={!!formErrors.registrationNumber}
              helperText={formErrors.registrationNumber}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              error={!!formErrors.contactNumber}
              helperText={formErrors.contactNumber}
              required
            />
          </Grid>
          {/* ... other doctor-specific fields */}
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleSubmit}>
              Register as Doctor
            </Button>
          </Grid>
        </Grid>
        {/* Link to switch between patient and doctor registration */}
        <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
          <Grid item>
            <Link to="/register">Register as Patient</Link>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default DoctorRegistration;
