// import React, { useState, useEffect } from "react";
// import NavBar from "./NavBar";
// import DashboardCalendar from "./calendar";
// import { Typography, Grid, Paper } from "@mui/material";

// const DashboardContents = () => {
//   const [patients, setPatients] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [admins, setAdmins] = useState([]);
//   const [healthStaffs, setHealthStaffs] = useState([]);

//   useEffect(() => {
//     // Fetch lists of patients, doctors, admins, and health staff from the server
//     fetch("http://localhost:5000/api/dashboard/patients", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         // Include your authorization token here
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setPatients(data);
//       });

//     fetch("http://localhost:5000/api/dashboard/doctors", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         // Include your authorization token here
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setDoctors(data);
//       });

//     fetch("http://localhost:5000/api/dashboard/admins", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         // Include your authorization token here
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setAdmins(data);
//       });

//     fetch("http://localhost:5000/api/dashboard/healthstaffs", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         // Include your authorization token here
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setHealthStaffs(data);
//       });
//   }, []);

//   return (
//     <Grid style={{ backgroundColor: "#add8e6", minHeight: "100vh" }}>
//       <NavBar />

//       <Grid container spacing={2}>
//         {/* Number of Patients */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Paper
//             elevation={1}
//             style={{
//               padding: "1rem",
//               textAlign: "center",
//               background: "rgba(255, 255, 255, 0.7)",
//             }}
//           >
//             <Typography variant="h6">Number of Patients</Typography>
//             <Typography variant="h4">{patients.length}</Typography>
//           </Paper>
//         </Grid>

//         {/* Number of Doctors */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Paper
//             elevation={3}
//             style={{
//               padding: "1rem",
//               textAlign: "center",
//               background: "rgba(255, 255, 255, 0.7)",
//             }}
//           >
//             <Typography variant="h6">Number of Doctors</Typography>
//             <Typography variant="h4">{doctors.length}</Typography>
//           </Paper>
//         </Grid>

//         {/* Number of Health Staff */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Paper
//             elevation={3}
//             style={{
//               padding: "1rem",
//               textAlign: "center",
//               background: "rgba(255, 255, 255, 0.7)",
//             }}
//           >
//             <Typography variant="h6">Number of Health Staff</Typography>
//             <Typography variant="h4">{healthStaffs.length}</Typography>
//           </Paper>
//         </Grid>

//         {/* Calendar */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Paper
//             elevation={3}
//             style={{
//               padding: "1rem",
//               textAlign: "center",
//               background: "rgba(255, 255, 255, 0.7)",
//             }}
//           >
//             <DashboardCalendar />
//           </Paper>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default DashboardContents;
