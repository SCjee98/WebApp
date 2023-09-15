import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router";
import {
  Button,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const PatientDashboard = () => {
  const [patientData, setPatientData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      // Handle the case where the token is missing or expired
      return;
    }

    const decodedToken = jwtDecode(token);

    fetch(`http://localhost:5000/api/patients/${decodedToken.userId}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPatientData(data);
      })
      .catch((error) => {
        console.error("Error fetching patient data:", error);
        // Handle the error here
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/");
  };

  return (
    <Container>
      <Typography variant="h2">Patient Dashboard</Typography>
      <Typography variant="h4">Welcome, {patientData.firstName}!</Typography>
      <List>
        <ListItem>
          <ListItemText primary={`First Name: ${patientData.firstName}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Last Name: ${patientData.lastName}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Date of Birth: ${patientData.dob}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Gender: ${patientData.gender}`} />
        </ListItem>
        {/* Display other patient-specific data here */}
      </List>
      <Button
        variant="outlined"
        onClick={handleLogout}
        style={{ marginTop: "16px" }}
      >
        Logout
      </Button>
    </Container>
  );
};

export default PatientDashboard;
