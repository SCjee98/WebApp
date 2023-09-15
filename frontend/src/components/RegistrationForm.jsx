//for paient
import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  FormLabel,
  Button,
  Radio,
  RadioGroup,
  FormControl,
} from "@mui/material";
import { Link } from "react-router-dom";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [open, setOpen] = useState(false);

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
      errors.firstName = "Please enter your first name.";
      isValid = false;
    }

    if (!lastName) {
      errors.lastName = "Please enter your last name.";
      isValid = false;
    }

    if (!dob) {
      errors.dob = "Please enter your date of birth.";
      isValid = false;
    }

    if (!gender) {
      errors.gender = "Please select your gender.";
      isValid = false;
    }

    if (!contactNumber || !/^\d{10}$/.test(contactNumber)) {
      errors.contactNumber = "Please enter a valid 10-digit contact number.";
      isValid = false;
    }

    if (!address) {
      errors.address = "Please enter your address.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    setOpen(false);
  };

  const handleSubmit = async () => {
    const isValid = validateForm();
  
    if (isValid) {
      try {
        // Fetch a unique patient ID from the server
        const patientIDResponse = await fetch(
          "http://localhost:5000/api/generate-patient-id"
        );
        const patientIDJSON = await patientIDResponse.json();
        const patientID = patientIDJSON.patientID;
  
        // Include the generated patient ID in the registration data
        const formData = {
          email,
          password,
          firstName,
          lastName,
          dob,
          gender,
          contactNumber,
          address,
          patientID, // Assign the generated patient ID to the form data
        };
  
        // Send the registration data to the server
        const response = await fetch(
          "http://localhost:5000/api/registration",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
  
        if (response.ok) {
          // Registration successful, handle the response accordingly
        } else {
          // Registration failed, handle the response accordingly
        }
      } catch (error) {
        console.error("An error occurred during registration:", error);
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
      </Typography>
      <Paper
        sx={{
          padding: "30px",
          border: "5px solid green",
          borderRadius: "20px",
        }}
      >
        <Typography
          variant="h3"
          component="h2"
          style={{
            textAlign: "center",
            fontSize: "24px",
            color: "#00FF00",
            marginBottom: "20px",
          }}
        >
          Patient Registration form
        </Typography>

        <Grid
          container
          spacing={3}
          direction="column"
          justify="center"
          alignItems="center"
        >
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
              label="Date of Birth"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              error={!!formErrors.dob}
              helperText={formErrors.dob}
              required
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Gender"
              value={gender}
              onClick={handleOpenDialog}
              error={!!formErrors.gender}
              helperText={formErrors.gender}
              required
              fullWidth
            />
            <Dialog open={open} onClose={handleCloseDialog}>
              <DialogTitle>Select Gender</DialogTitle>
              <DialogContent>
                <FormControl component="fieldset">
                  {/* <FormLabel component="legend">Gender</FormLabel> */}
                  <RadioGroup value={gender} onChange={handleGenderChange}>
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </DialogContent>
            </Dialog>
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
          <Grid item xs={12}>
            <TextField
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              error={!!formErrors.address}
              helperText={formErrors.address}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleSubmit}>
              Register
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default RegistrationForm;
