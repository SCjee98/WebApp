import React, { useState } from "react";
import { Grid, Paper, Typography, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HealthStaffRegistration = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    console.log("register working");
    try {
      // Send registration request to the backend
      const response = await fetch(
        "http://localhost:5000/api/register-health-staff",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            firstName,
            lastName,
            // Set the role to "Health Staff"
          }),
        }
      );

      if (response.ok) {
        // Handle successful registration
        console.log("Health Staff registration successful!");
        navigate("/login"); // Redirect to the login page after successful registration
      } else {
        // Handle error responses
        setError("Failed to register. Please try again.");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      // Handle network or server errors
      setError(
        "An error occurred during registration. Please try again later."
      );
    }
  };

  return (
    <div
      style={{
        display: "grid",
        height: "100vh",
        placeItems: "center",
        backgroundImage: "linear-gradient(#FF7F50, #fff6e4, #006400)",
      }}
    >
      {" "}
      <Paper
        sx={{ padding: "30px", border: "5px solid blue", borderRadius: "20px" }}
      >
        <Typography variant="h5" style={{ marginBottom: "20px" }}>
          Health Staff Registration Form
        </Typography>
        <Grid
          container
          spacing={3}
          direction={"column"}
          justify={"center"}
          alignItems={"center"}
        >
          <Grid item xs={12}>
            <TextField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              style={{ backgroundColor: "blue", borderRadius: "8px" }}
              variant="contained"
              onClick={handleRegister}
            >
              Register
            </Button>
          </Grid>
          {/* Display error message if registration fails */}
          {error && (
            <Grid item xs={12}>
              <Typography variant="body1" style={{ color: "red" }}>
                {error}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
    </div>
  );
};

export default HealthStaffRegistration;
