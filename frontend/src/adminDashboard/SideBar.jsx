// import React from "react";
// import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
// import { Link } from "react-router-dom";
// import {
//   Dashboard as DashboardIcon,
//   Assignment as AssignmentIcon,
//   People as PeopleIcon,
//   LocalHospital as LocalHospitalIcon,
//   Group as GroupIcon,
//   Person as PersonIcon,
// } from "@mui/icons-material";

// const Sidebar = ({ activeMenu, setActiveMenu }) => {
//   return (
//     <List>
//       {/* Dashboard */}
//       <ListItem
//         button
//         onClick={() => setActiveMenu("Dashboard")}
//         selected={activeMenu === "Dashboard"}
//       >
//         <ListItemIcon>
//           <DashboardIcon />
//         </ListItemIcon>
//         <ListItemText primary="Dashboard" />
//       </ListItem>

//       {/* Assign Roles */}
//       <ListItem
//         button
//         onClick={() => setActiveMenu("AssignRoles")}
//         selected={activeMenu === "AssignRoles"}
//       >
//         <ListItemIcon>
//           <AssignmentIcon />
//         </ListItemIcon>
//         <ListItemText primary="Assign Roles" />
//       </ListItem>

//       {/* Patients List */}
//       <ListItem
//         button
//         onClick={() => setActiveMenu("PatientsList")}
//         selected={activeMenu === "PatientsList"}
//       >
//         <ListItemIcon>
//           <PeopleIcon />
//         </ListItemIcon>
//         <ListItemText primary="Patients List" />
//       </ListItem>

//       {/* Doctors List */}
//       <ListItem
//         button
//         onClick={() => setActiveMenu("DoctorsList")}
//         selected={activeMenu === "DoctorsList"}
//       >
//         <ListItemIcon>
//           <LocalHospitalIcon />
//         </ListItemIcon>
//         <ListItemText primary="Doctors List" />
//       </ListItem>

//       {/* Admins List */}
//       <ListItem
//         button
//         onClick={() => setActiveMenu("AdminsList")}
//         selected={activeMenu === "AdminsList"}
//       >
//         <ListItemIcon>
//           <GroupIcon />
//         </ListItemIcon>
//         <ListItemText primary="Admins List" />
//       </ListItem>

//       {/* Health Staff List */}
//       <ListItem
//         button
//         onClick={() => setActiveMenu("HealthStaffList")}
//         selected={activeMenu === "HealthStaffList"}
//       >
//         <ListItemIcon>
//           <PersonIcon />
//         </ListItemIcon>
//         <ListItemText primary="Health Staff List" />
//       </ListItem>
//     </List>
//   );
// };

// export default Sidebar;
