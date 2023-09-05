import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdmissionForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientId: "",
    admissionDate: "",
    admissionTime: "",
    chiefProblem: "",
    historyOfPresentIllness: "",
    socialHistory: "",
    familyHistory: "",
    physicalExam: "",
    medicationOnAdmission: "",
    allergies: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("Authentication token not found. Please log in.");
      return;
    }

    const admissionData = {
      ...formData,
    };

    try {
      const response = await fetch("http://localhost:5000/api/admission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(admissionData),
      });

      if (response.ok) {
        console.log("Admission form submitted successfully!");
        navigate("/health-staff-dashboard");
      } else {
        console.error("Failed to submit admission form:", response);
      }
    } catch (error) {
      console.error("Error submitting admission form:", error);
    }
  };

  return (
    <form
      style={{
        margin: "30px",
        marginLeft: "10px",
        border: "2px solid blue",
        padding: "20px",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Admission Details
      </Typography>
      <TextField
        label="Patient Id"
        name="patientId"
        value={formData.patientId}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <label
          htmlFor="admissionDate"
          style={{ marginRight: "10px", flexBasis: "30%" }}
        >
          Admission Date
        </label>
        <TextField
          name="admissionDate"
          value={formData.admissionDate}
          type="date"
          onChange={handleChange}
          fullWidth
          required
          style={{ flex: 1, marginRight: "10px" }}
        />
      </div>

      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <label
          htmlFor="admissionTime"
          style={{ marginRight: "10px", flexBasis: "30%" }}
        >
          Admission Time
        </label>
        <TextField
          name="admissionTime"
          value={formData.admissionTime}
          type="time"
          onChange={handleChange}
          fullWidth
          required
          style={{ flex: 1, marginRight: "10px" }}
        />
      </div>
      <TextField
        label="Chief Problem"
        name="chiefProblem"
        value={formData.chiefProblem}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="History of Present Illness"
        name="historyOfPresentIllness"
        value={formData.historyOfPresentIllness}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Social History"
        name="socialHistory"
        value={formData.socialHistory}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Family History"
        name="familyHistory"
        value={formData.familyHistory}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Physical Exam"
        name="physicalExam"
        value={formData.physicalExam}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Medication on Admission"
        name="medicationOnAdmission"
        value={formData.medicationOnAdmission}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Allergies"
        name="allergies"
        value={formData.allergies}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default AdmissionForm;
