import React, { useState } from "react";
import { Grid, Paper, Typography, Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!selectedRole) {
      setError("Please select a role first");
      return;
    }
    try {
      // Send login request to the backend
      const loginUrl =
        selectedRole === "Doctor"
          ? "http://localhost:5000/api/login/doctor"
          : selectedRole === "Admin"
          ? "http://localhost:5000/api/login/admin"
          : selectedRole === "Health Staff" // New Health Staff login route
          ? "http://localhost:5000/api/login/health-staff"
          : "http://localhost:5000/api/login"; // Default route for other roles
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Get the JWT token from the response
        const data = await response.json();
        const token = data.token;

        console.log("JWT Token:", token);

        // Store the token securely in local storage
        localStorage.setItem("jwtToken", token);

        // Redirect to the respective dashboard based on the selected role
        if (selectedRole === "Admin") {
          navigate("/admin-dashboard");
        } else if (selectedRole === "Doctor") {
          navigate("/doctor-dashboard");
        } else if (selectedRole === "Patient") {
          navigate("/patient-dashboard");
        } else if (selectedRole === "Health Staff") {
          // Navigate to Health Staff dashboard
          navigate("/health-staff-dashboard");
        }
      }
      // ... (other error handling)
    } catch (error) {
      // ... (error handling)
    }
  };

  const handleRegister = () => {
    if (selectedRole === "Admin") {
      navigate("/admin-registration");
    } else if (selectedRole === "Doctor") {
      navigate("/doctor-registration");
    } else if (selectedRole === "Patient") {
      navigate("/register");
    } else if (selectedRole === "Health Staff") {
      // Navigate to Health Staff registration
      navigate("/register-health-staff");
    } else {
      // Handle if no role is selected
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
      {/* Proceed as: User type selection */}
      <Typography variant="h6" style={{ marginBottom: "20px" }}>
        Proceed as:
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => setSelectedRole("Admin")}
          style={{ marginRight: "10px" }}
        >
          Admin
        </Button>
        <Button
          variant="outlined"
          onClick={() => setSelectedRole("Patient")}
          style={{ marginRight: "10px" }}
        >
          Patient
        </Button>
        <Button variant="outlined" onClick={() => setSelectedRole("Doctor")}>
          Doctor
        </Button>

        <Button
          variant="outlined"
          onClick={() => setSelectedRole("Health Staff")}
        >
          Health Staff
        </Button>
      </div>
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
          direction={"column"}
          justify={"center"}
          alignItems={"center"}
        >
          <Grid item xs={12}>
            <TextField
              label="Username"
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
        </Grid>
        <Grid container spacing={3} style={{ paddingTop: "24px" }}>
          <Grid item xs={12}>
            <Grid container xs={12} justifyContent="space-around" spacing={1}>
              <Grid item xs="auto">
                {/* "Login" button handles the login functionality */}
                <Button
                  style={{ backgroundColor: "green", borderRadius: "8px" }}
                  variant="contained"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs="auto">
                {/* "New user? Then Register" button redirects to the registration page */}
                {/* <Button component={Link} to="/register" style={{ backgroundColor: 'white', color: 'green', border: '1px solid green', borderRadius: '8px' }} variant="contained">
                  New user? Then Register
                </Button> */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs>
                <Link to="/forgot-password">
                  <Typography variant="body2">Forgotten Password?</Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Display the selected registration form */}
        {/* {selectedType === 'Admin' && <AdminRegistration />}
        {selectedType === 'Patient' && <PatientRegistration />}
        {selectedType === 'Doctor' && <DoctorRegistration />} */}

        {/* "New user? Then Register" button redirects to the registration page */}
        <Grid container justifyContent="center" style={{ paddingTop: "12px" }}>
          <Grid item>
            <Button
              style={{
                backgroundColor: "white",
                color: "green",
                border: "1px solid green",
                borderRadius: "8px",
              }}
              variant="contained"
              onClick={handleRegister}
            >
              New user? Then Register
            </Button>
          </Grid>
        </Grid>

        {/* existing error handling */}
        {error && (
          <Grid container spacing={3} style={{ paddingTop: "12px" }}>
            <Grid item xs={12}>
              <Typography variant="body1" style={{ color: "red" }}>
                {error}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Paper>
    </div>
  );
};

export default SignUp;
