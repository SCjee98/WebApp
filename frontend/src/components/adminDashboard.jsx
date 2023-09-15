import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import {
  Typography,
  Button,
  Select,
  MenuItem,
  ListItem,
  ListItemText,
  List,
  ListItemSecondaryAction,
  IconButton,
  Container,
  Grid,
  InputLabel,
  Drawer,
  ListSubheader,
  ListItemIcon,
  Paper,
} from "@mui/material";
import NavBar from "../adminDashboard/NavBar";
import DashboardCalendar from "../adminDashboard/calendar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  Assignment,
  People,
  LocalHospital,
  Group,
  Person,
} from "@mui/icons-material";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  // const [isAdmin, setIsAdmin] = useState(false);
  // const [result, setResult] = useState("");
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [healthStaffs, setHealthStaffs] = useState([]);
  const [activeMenu, setActiveMenu] = useState("Dashboard"); // Default active menu

  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");
  useEffect(() => {
    // Fetch list of users (patients, doctors, health staff, and admins) from the server
    fetch("http://localhost:5000/api/dashboard/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Include the token in the Authorization header
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const patientsData = data.filter((user) => user.role === "Patient");
        const doctorsData = data.filter((user) => user.role === "Doctor");
        const adminsData = data.filter((user) => user.role === "Admin");
        const healthStaffsData = data.filter(
          (user) => user.role === "Health Staff"
        );

        setUsers(data);
        setPatients(patientsData);
        setDoctors(doctorsData);
        setAdmins(adminsData);
        setHealthStaffs(healthStaffsData);
      });

    // Check if the logged-in user is an admin
    const decodedToken = jwtDecode(token);
    // setIsAdmin(decodedToken.role === "Admin");
  }, []);


  const handleDeleteUser = (userId, role) => {
    let deleteEndpoint = "";

    // Determine the delete endpoint based on the user's role
    if (role === "Patient") {
      deleteEndpoint = `http://localhost:5000/api/dashboard/users/patients/${userId}`;
    } else if (role === "Doctor") {
      deleteEndpoint = `http://localhost:5000/api/dashboard/users/doctors/${userId}`;
    } else if (role === "Admin") {
      deleteEndpoint = `http://localhost:5000/api/dashboard/users/admins/${userId}`;
    } else if (role === "Health Staff") {
      deleteEndpoint = `http://localhost:5000/api/dashboard/users/healthstaffs/${userId}`;
    }

    // Send a DELETE request to the appropriate endpoint
    fetch(deleteEndpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then(() => {
        // Refresh the user lists based on their roles
        if (role === "Patient") {
          setPatients((prevPatients) =>
            prevPatients.filter((patient) => patient._id !== userId)
          );
        } else if (role === "Doctor") {
          setDoctors((prevDoctors) =>
            prevDoctors.filter((doctor) => doctor._id !== userId)
          );
        } else if (role === "Admin") {
          setAdmins((prevAdmins) =>
            prevAdmins.filter((admin) => admin._id !== userId)
          );
        } else if (role === "Health Staff") {
          setHealthStaffs((prevHealthStaffs) =>
            prevHealthStaffs.filter((healthStaff) => healthStaff._id !== userId)
          );
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  // const calculateSum = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5000/api/calculate-sum", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ numbers: [2, 4, 6, 8, 10] }), // Example input data
  //     });

  //     const data = await response.json();
  //     setResult(data.result);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const menuContent = {
    Dashboard: (
      <Grid style={{ backgroundColor: "#add8e6", minHeight: "100vh" }}>
        <NavBar />

        <Grid container spacing={2}>
          {/* Number of Patients */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={1}
              style={{
                padding: "1rem",
                textAlign: "center",
                background: "rgba(255, 255, 255, 0.7)",
              }}
            >
              <Typography variant="h6">Number of Patients</Typography>
              <Typography variant="h4">{patients.length}</Typography>
            </Paper>
          </Grid>

          {/* Number of Doctors */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={3}
              style={{
                padding: "1rem",
                textAlign: "center",
                background: "rgba(255, 255, 255, 0.7)",
              }}
            >
              <Typography variant="h6">Number of Doctors</Typography>
              <Typography variant="h4">{doctors.length}</Typography>
            </Paper>
          </Grid>

          {/* Number of Health Staff */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={3}
              style={{
                padding: "1rem",
                textAlign: "center",
                background: "rgba(255, 255, 255, 0.7)",
              }}
            >
              <Typography variant="h6">Number of Health Staff</Typography>
              <Typography variant="h4">{healthStaffs.length}</Typography>
            </Paper>
          </Grid>

          {/* Calendar */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={3}
              style={{
                padding: "1rem",
                textAlign: "center",
                background: "rgba(255, 255, 255, 0.7)",
              }}
            >
              <DashboardCalendar />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    ),
    
    PatientsList: (
      <List>
        <NavBar />
        <Button
      variant="contained"
      color="primary"
      onClick={() => navigate("/register")}
    >
      Add Patients
    </Button>
        {patients?.map((patient) => (
          <ListItem key={patient._id}>
            <ListItemText
              primary={`${patient.firstName} ${patient.lastName}`}
              secondary={`Role: ${patient.role}`}
            />
            <ListItemSecondaryAction>
              <Link to={`/edit_patient/${patient._id}`}>
                <IconButton edge="end" aria-label="edit">
                  <EditIcon />
                </IconButton>
              </Link>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteUser(patient._id, patient.role)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    ),
    DoctorsList: (
      <List>
        <NavBar />
        <Button
      variant="contained"
      color="primary"
      onClick={() => navigate("/doctor-registration")}
    >
      Add Doctors
    </Button>
        {doctors?.map((doctor) => (
          <ListItem key={doctor._id}>
            <ListItemText
              primary={`${doctor.firstName} ${doctor.lastName}`}
              secondary={`Role: ${doctor.role}`}
            />
            <ListItemSecondaryAction>
              <Link to={`/edit_doctor/${doctor._id}`}>
                <IconButton edge="end" aria-label="edit">
                  <EditIcon />
                </IconButton>
              </Link>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteUser(doctor._id, doctor.role)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    ),
    AdminsList: (
      <List>
        <NavBar />
        <Button
      variant="contained"
      color="primary"
      onClick={() => navigate("/admin-registration")}
    >
      Add Admins
    </Button>
        {admins?.map((admin) => (
          <ListItem key={admin._id}>
            <ListItemText
              primary={`${admin.firstName} ${admin.lastName}`}
              secondary={`Role: ${admin.role}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteUser(admin._id, admin.role)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    ),
    HealthStaffList: (
      <List>
        <NavBar />
        <Button
      variant="contained"
      color="primary"
      onClick={() => navigate("/register-health-staff")}
    >
      Add Health Staff
    </Button>
        {healthStaffs?.map((healthStaff) => (
          <ListItem key={healthStaff._id}>
            <ListItemText
              primary={`${healthStaff.firstName} ${healthStaff.lastName}`}
              secondary={`Role: ${healthStaff.role}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() =>
                  handleDeleteUser(healthStaff._id, healthStaff.role)
                }
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    ),
  };

  return (
    <Container>
      <Drawer variant="permanent" sx={{ width: 240 }}>
        <List
          sx={{
            backgroundColor: "rgba(173, 216, 230, 0.7)", // Change to the desired background color with transparency
            color: "#ffffff", // Text color
          }}
        >
          <ListSubheader sx={{ fontSize: "1.2rem", color: "#fbcde" }}>
            Menu
          </ListSubheader>
          <ListItem
            button
            onClick={() => setActiveMenu("Dashboard")}
            selected={activeMenu === "Dashboard"}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            button
            onClick={() => setActiveMenu("PatientsList")}
            selected={activeMenu === "PatientsList"}
          >
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Patients List" />
          </ListItem>
          <ListItem
            button
            onClick={() => setActiveMenu("DoctorsList")}
            selected={activeMenu === "DoctorsList"}
          >
            <ListItemIcon>
              <LocalHospital />
            </ListItemIcon>
            <ListItemText primary="Doctors List" />
          </ListItem>
          <ListItem
            button
            onClick={() => setActiveMenu("AdminsList")}
            selected={activeMenu === "AdminsList"}
          >
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary="Admins List" />
          </ListItem>
          <ListItem
            button
            onClick={() => setActiveMenu("HealthStaffList")}
            selected={activeMenu === "HealthStaffList"}
          >
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Health Staff List" />
          </ListItem>
        </List>
      </Drawer>

      <main>
        {/* <Typography variant="h4">Admin Dashboard</Typography> */}
        {menuContent[activeMenu]}
      </main>
    </Container>
  );
};

export default AdminDashboard;
