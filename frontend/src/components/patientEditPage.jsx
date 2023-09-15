// PatientEditPage.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  FormControlLabel,
  FormLabel,
  Button,
  Radio,
  RadioGroup,
  FormControl,
} from "@mui/material";

const PatientEditPage = () => {
  const { id } = useParams(); // Extracts the patient ID from the URL
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    contactNumber: "",
    address: "",
  });

  useEffect(() => {
    // Fetch patient data based on the ID from the backend
    // Populate the state with the fetched patient data
    // Replace this with your actual fetch logic
    fetch(`http://localhost:5000/api/patients/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPatientData(data);
      })
      .catch((error) => {
        console.error("Error fetching patient data:", error);
      });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const formattedDate = new Date(patientData.dob)
        .toISOString()
        .split("T")[0];

      // Create the updates object with only the fields you want to update
      const updates = {
        firstName: patientData.firstName,
        lastName: patientData.lastName,
        email: patientData.email,
        dob: formattedDate,
        gender: patientData.gender,
        contactNumber: patientData.contactNumber,
        address: patientData.address,
      };

      const response = await fetch(
        `http://localhost:5000/api/patients/edit-patient/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updates), // Send the updates object in the request body
        }
      );

      if (response.ok) {
        // Update successful, navigate back to patient list
        navigate("/admin-dashboard");
      } else {
        // Handle error response
      }
    } catch (error) {
      console.error("Error updating patient data:", error);
      // Handle error
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
        Edit Patient Details
      </Typography>
      <Paper
        sx={{
          padding: "30px",
          border: "5px solid green",
          borderRadius: "20px",
        }}
      >
        <Grid
          container
          spacing={3}
          direction="column"
          justify="center"
          alignItems="center"
        >
          {/* Input fields for patient details */}
          {/* Replace the TextField components with your actual input fields */}
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              value={patientData.email}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="First Name"
              name="firstName"
              value={patientData.firstName}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Last Name"
              name="lastName"
              value={patientData.lastName}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Date of Birth"
              type="date"
              name="dob"
              value={patientData.dob}
              onChange={handleInputChange}
              required
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                name="gender"
                value={patientData.gender}
                onChange={handleInputChange}
              >
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contact Number"
              name="contactNumber"
              value={patientData.contactNumber}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              value={patientData.address}
              onChange={handleInputChange}
              required
            />
          </Grid>
          {/* More input fields for other patient details */}
          {/* ... */}
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default PatientEditPage;
