
import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DischargeForm = () => {
  const [formData, setFormData] = useState({
    dischargeDate: '',
    dischargeTime: '',
    dischargeSummary: '',
    dischargeMedication: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new Discharge object to send to the server
    const dischargeData = {
      dischargeDate: formData.dischargeDate,
      dischargeTime: formData.dischargeTime,
      dischargeSummary: formData.dischargeSummary,
      dischargeMedication: formData.dischargeMedication,
    };

    try {
      const response = await fetch('http://localhost:5000/api/discharge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
        body: JSON.stringify(dischargeData),
      });

      if (response.ok) {
        // Handle successful form submission
      
        console.log('Discharge form submitted successfully!');
        navigate('/dashboard'); // Navigate to the dashboard after successful submission
      } else {
        // Handle error responses
        console.error('Failed to submit discharge form:', response);
      }
    } catch (error) {
      console.error('Error submitting discharge form:', error);
    }
  };

  return (
    <form style={{ margin: '30px', marginLeft: '10px', border: '2px solid green', padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Discharge Details
      </Typography>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <label htmlFor="dischargeDate" style={{ marginRight: '10px', flexBasis: '30%' }}>Discharge Date</label>
        <TextField
          name="dischargeDate"
          value={formData.dischargeDate}
          type="date"
          onChange={handleChange}
          fullWidth
          required
          style={{ flex: 1, marginRight: '10px' }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <label htmlFor="dischargeTime" style={{ marginRight: '10px', flexBasis: '30%' }}>Discharge Time</label>
        <TextField
          name="dischargeTime"
          value={formData.dischargeTime}
          type="time"
          onChange={handleChange}
          fullWidth
          required
          style={{ flex: 1, marginRight: '10px' }}
        />
      </div>
      <TextField
        label="Discharge Summary"
        name="dischargeSummary"
        value={formData.dischargeSummary}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: '10px' }}
      />
      <TextField
        label="Discharge Medication"
        name="dischargeMedication"
        value={formData.dischargeMedication}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: '10px' }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default DischargeForm;

