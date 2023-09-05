// import React, { useState, useEffect } from "react";
// import jwtDecode from "jwt-decode";
// import NavBar from "./NavBar";
// import Sidebar from "./SideBar";
// import DashboardCalendar from "./calendar";
// import PatientsList from "./PatientsList";
// import DoctorsList from "./DocotorsList";
// import AdminsList from "./AdminsList";
// import HealthStaffList from "./HealthStaffsList";
// import {
//   Typography,
//   Button,
//   Select,
//   MenuItem,
//   ListItem,
//   ListItemText,
//   List,
//   ListItemSecondaryAction,
//   IconButton,
//   Container,
//   Grid,
//   InputLabel, // Import InputLabel
//   Drawer,
//   ListSubheader,
//   ListItemIcon,
//   Paper,
// } from "@mui/material";

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUserId, setSelectedUserId] = useState("");
//   const [selectedRole, setSelectedRole] = useState("");
//   const [patients, setPatients] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [admins, setAdmins] = useState([]);
//   const [healthStaffs, setHealthStaffs] = useState([]);
//   const [activeMenu, setActiveMenu] = useState("Dashboard");

//   const token = localStorage.getItem("jwtToken");
//   useEffect(() => {
//     fetch("http://localhost:5000/api/dashboard/users", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         const patientsData = data.filter((user) => user.role === "Patient");
//         const doctorsData = data.filter((user) => user.role === "Doctor");
//         const adminsData = data.filter((user) => user.role === "Admin");
//         const healthStaffsData = data.filter(
//           (user) => user.role === "Health Staff"
//         );

//         setUsers(data);
//         setPatients(patientsData);
//         setDoctors(doctorsData);
//         setAdmins(adminsData);
//         setHealthStaffs(healthStaffsData);
//       });
//   }, [token]);

//   const handleRoleAssignment = () => {
//     fetch(
//       `http://localhost:5000/api/dashboard/users/admin/assign-role/${selectedUserId}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token,
//         },
//         body: JSON.stringify({ role: selectedRole }),
//       }
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         setUsers(data);
//         setSelectedUserId("");
//         setSelectedRole("");
//       });
//   };

//   const handleDeleteUser = (userId, role) => {
//     let deleteEndpoint = "";

//     if (role === "Patient") {
//       deleteEndpoint = `http://localhost:5000/api/dashboard/users/patients/${userId}`;
//     } else if (role === "Doctor") {
//       deleteEndpoint = `http://localhost:5000/api/dashboard/users/doctors/${userId}`;
//     } else if (role === "Admin") {
//       deleteEndpoint = `http://localhost:5000/api/dashboard/users/admins/${userId}`;
//     } else if (role === "Health Staff") {
//       deleteEndpoint = `http://localhost:5000/api/dashboard/users/healthstaffs/${userId}`;
//     }

//     fetch(deleteEndpoint, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//     })
//       .then((response) => response.json())
//       .then(() => {
//         if (role === "Patient") {
//           setPatients((prevPatients) =>
//             prevPatients.filter((patient) => patient._id !== userId)
//           );
//         } else if (role === "Doctor") {
//           setDoctors((prevDoctors) =>
//             prevDoctors.filter((doctor) => doctor._id !== userId)
//           );
//         } else if (role === "Admin") {
//           setAdmins((prevAdmins) =>
//             prevAdmins.filter((admin) => admin._id !== userId)
//           );
//         } else if (role === "Health Staff") {
//           setHealthStaffs((prevHealthStaffs) =>
//             prevHealthStaffs.filter((healthStaff) => healthStaff._id !== userId)
//           );
//         }
//       })
//       .catch((error) => {
//         console.error("Error deleting user:", error);
//       });
//   };

//   return (
//     <Container>
//       <NavBar />

//       <Grid container spacing={2}>
//         <Grid item xs={12} md={3}>
//           <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
//         </Grid>

//         <Grid item xs={12} md={9}>
//           {activeMenu === "Dashboard" && (
//             <Paper
//               elevation={1}
//               style={{
//                 padding: "1rem",
//                 textAlign: "center",
//                 background: "rgba(255, 255, 255, 0.7)",
//               }}
//             >
//               <Typography variant="h6">Number of Patients</Typography>
//               <Typography variant="h4">{patients.length}</Typography>
//             </Paper>
//           )}

//           {activeMenu === "AssignRoles" && (
//             <div>
//               <InputLabel>Select a User</InputLabel>
//               <Select
//                 value={selectedUserId}
//                 onChange={(e) => setSelectedUserId(e.target.value)}
//                 fullWidth
//               >
//                 <MenuItem value="">
//                   <em>Select a User</em>
//                 </MenuItem>
//                 {users?.map((user) => (
//                   <MenuItem key={user._id} value={user._id}>
//                     {user.firstName} {user.lastName}
//                   </MenuItem>
//                 ))}
//               </Select>
//               <InputLabel>Select a Role</InputLabel>
//               <Select
//                 value={selectedRole}
//                 onChange={(e) => setSelectedRole(e.target.value)}
//                 fullWidth
//               >
//                 <MenuItem value="">
//                   <em>Select a Role</em>
//                 </MenuItem>
//                 <MenuItem value="Doctor">Doctor</MenuItem>
//                 <MenuItem value="Patient">Patient</MenuItem>
//                 <MenuItem value="Health Staff">Health Staff</MenuItem>
//                 <MenuItem value="Admin">Admin</MenuItem>
//               </Select>
//               <Button onClick={handleRoleAssignment} variant="contained">
//                 Assign Role
//               </Button>
//               <Typography>Users</Typography>
//               <Grid>
//                 {users?.map((user) => (
//                   <List>
//                     <ListItem key={user._id}>
//                       {user.firstName} {user.lastName} - Role: {user.role}
//                     </ListItem>
//                   </List>
//                 ))}
//               </Grid>
//             </div>
//           )}

//           {activeMenu === "PatientsList" && <PatientsList />}

//           {activeMenu === "DoctorsList" && <DoctorsList />}

//           {activeMenu === "AdminsList" && <AdminsList />}

//           {activeMenu === "HealthStaffList" && <HealthStaffList />}
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default AdminDashboard;
