import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate(); // Get navigate function

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
    // Clear token and redirect to login
    localStorage.removeItem("jwtToken");
    navigate("/"); // Use navigate to redirect
  };

  return (
    <div>
      <h1>Doctor Dashboard</h1>
      <button onClick={handleLogout}>Logout</button> {/* Add logout button */}
      <h2>Patients</h2>
      <ul>
        {patients.map((patient) => (
          <li key={patient._id}>
            {patient.firstName} {patient.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorDashboard;
