import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router";

const PatientDashboard = () => {
  const [patientData, setPatients] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      // Handle the case where the token is missing or expired
      return;
    }

    const decodedToken = jwtDecode(token);

    fetch(
      `http://localhost:5000/api/dashboard/patient/${decodedToken.userId}`,
      {
        headers: {
          Authorization: token, // Include the token in the header
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setPatients(data.patients);
      })
      .catch((error) => {
        console.error("Error fetching patient data:", error);
        // Handle the error here
      });
  }, []);

  const handleLogout = () => {
    // Clear token and redirect to login
    localStorage.removeItem("jwtToken");
    navigate("/"); // Use navigate to redirect
  };

  return (
    <div>
      <h1>Patient Dashboard</h1>
      <h2>Welcome, {patientData.firstName}!</h2>
      <p>Your patient data:</p>
      <ul>
        <li>First Name: {patientData.firstName}</li>
        <li>Last Name: {patientData.lastName}</li>
        <li>Date of Birth: {patientData.dob}</li>
        <li>Gender: {patientData.gender}</li>
        {/* Display other patient-specific data here */}
      </ul>
      <button onClick={handleLogout}>Logout</button> {/* Add logout button */}
    </div>
  );
};

export default PatientDashboard;
