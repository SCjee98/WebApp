//for admin
import React, { useState } from "react";
import { Grid, Paper, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

const AdminRegistration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [formErrors, setFormErrors] = useState({});
  // ... other admin-specific fields and states

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email.";
      isValid = false;
    }

    if (
      !password ||
      !/(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$!%^&*()\-_=+{};:,<.>]).{8,}/.test(
        password
      )
    ) {
      errors.password =
        "Please enter a password of at least 16 characters with at least one letter, one number, and one special character.";
      isValid = false;
    }

    if (!firstName) {
      errors.name = "Please enter your name.";
      isValid = false;
    }
    if (!lastName) {
      errors.name = "Please enter your name.";
      isValid = false;
    }

    if (!contactNumber || !/^\d{10}$/.test(contactNumber)) {
      errors.contactNumber = "Please enter a valid 10-digit contact number.";
      isValid = false;
    }
    if (!adminCode || !/^\d{10}$/.test(adminCode)) {
      errors.adminCode = "Please enter a valid 10-digit contact number.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    const isValid = validateForm();
    if (isValid) {
      try {
        // Construct the admin registration data
        const adminData = {
          firstName,
          lastName,
          email,
          password,
          adminCode,
          contactNumber,
          // ... other admin-specific fields
        };

        // Send the admin registration data to the backend
        const response = await fetch(
          "http://localhost:5000/api/register-admin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(adminData),
          }
        );

        if (response.ok) {
          // Registration successful, handle the response accordingly
        } else {
          // Registration failed, handle the response accordingly
        }
      } catch (error) {
        console.error("An error occurred during admin registration:", error);
        // Handle the error accordingly
      }
    }
  };

  return (
    <div style={{ display: "grid", height: "100vh", placeItems: "center" }}>
      <Typography
        variant="h3"
        component="h2"
        style={{
          textAlign: "center",
          fontSize: "24px",
          color: "black",
          marginBottom: "5px",
          marginTop: "10px",
        }}
      >
        Admin Registration Form
      </Typography>
      <Paper
        sx={{
          padding: "30px",
          border: "5px solid blue",
          borderRadius: "20px",
        }}
      >
        {/* Admin-specific fields */}
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
              error={!!formErrors.lastName}
              helperText={formErrors.lastName}
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
              label="Admin Code"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              error={!!formErrors.adminCode}
              helperText={formErrors.adminCode}
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
          {/* ... other admin-specific fields */}
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleSubmit}>
              Register as Admin
            </Button>
          </Grid>
        </Grid>
        {/* Link to switch between patient and doctor registration */}
        <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
          <Grid item>
            <Link to="/register">Register as Patient</Link>
          </Grid>
          <Grid item>
            <Link to="/register-doctor">Register as Doctor</Link>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default AdminRegistration;
