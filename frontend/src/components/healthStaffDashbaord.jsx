import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const HealthStaffDashboard = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/");
  };

  useEffect(() => {
    // Fetch list of patients from the server
    const token = localStorage.getItem("jwtToken");

    fetch("http://localhost:5000/api/dashboard/health-staff/patients", {
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePatientSelect = (patient) => {
    //console.log("patient:", patient._id);
    setSelectedPatient(patient);
    console.log("selectedPatient:", selectedPatient);
  };

  return (
    <div>
      <h1>Health Staff Dashboard</h1>
      <TextField
        label="Search Patients"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: "20px" }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients
              .filter(
                (patient) =>
                  patient.firstName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  patient.lastName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  patient.email.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((patient) => (
                <TableRow
                  key={patient._id}
                  onClick={() => handlePatientSelect(patient)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell>
                    {patient.firstName} {patient.lastName}
                  </TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>

      {selectedPatient && (
        <div>
          <Typography variant="h4">
            Selected Patient: {selectedPatient.firstName}{" "}
            {selectedPatient.lastName}
          </Typography>
          <div>
            <Link
              to={`/admission`} // Modify the path as needed
              state={{ selectedPatientId: selectedPatient.patientID}} // Pass only the selected patient's _id
            >
              Admission Form
            </Link>
            {/* Add links to other forms */}
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthStaffDashboard;
