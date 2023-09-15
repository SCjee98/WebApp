import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    fetch("http://localhost:5000/api/dashboard/doctor/patients", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPatients(data);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/");
  };

  const handlePatientClick = (patient) => {
    // Handle clicking on a patient
    // You can navigate to a specific patient's details page here
  };

  return (
    <Container>
      <Typography variant="h2">Doctor Dashboard</Typography>
      <Button
        variant="outlined"
        onClick={handleLogout}
        style={{ margin: "16px" }}
      >
        Logout
      </Button>
      <Typography variant="h4">Patients</Typography>
      <List>
        {patients.map((patient) => (
          <ListItem
            key={patient._id}
            button
            onClick={() => handlePatientClick(patient)}
          >
            <ListItemText
              primary={`${patient.firstName} ${patient.lastName}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default DoctorDashboard;
