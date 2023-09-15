// import React, { useEffect, useState } from "react";
// import {
//   List,
//   ListItem,
//   ListItemText,
//   ListItemSecondaryAction,
//   IconButton,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";

// const HealthStaffList = () => {
//   const [healthStaffs, setHealthStaffs] = useState([]);

//   useEffect(() => {
//     // Fetch the list of health staff from your API
//     fetch("http://localhost:5000/api/healthstaffs", {
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

//   const handleDeleteHealthStaff = (healthStaffId) => {
//     // Send a DELETE request to delete the health staff
//     fetch(`http://localhost:5000/api/healthstaffs/${healthStaffId}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         // Include your authorization token here
//       },
//     })
//       .then((response) => response.json())
//       .then(() => {
//         // Remove the deleted health staff from the list
//         setHealthStaffs((prevHealthStaffs) =>
//           prevHealthStaffs.filter(
//             (healthStaff) => healthStaff._id !== healthStaffId
//           )
//         );
//       })
//       .catch((error) => {
//         console.error("Error deleting health staff:", error);
//       });
//   };

//   return (
//     <div>
//       <h2>Health Staff List</h2>
//       <List>
//         {healthStaffs.map((healthStaff) => (
//           <ListItem key={healthStaff._id}>
//             <ListItemText
//               primary={`${healthStaff.firstName} ${healthStaff.lastName}`}
//               secondary={`Role: ${healthStaff.role}`}
//             />
//             <ListItemSecondaryAction>
//               <IconButton
//                 edge="end"
//                 aria-label="delete"
//                 onClick={() => handleDeleteHealthStaff(healthStaff._id)}
//               >
//                 <DeleteIcon />
//               </IconButton>
//             </ListItemSecondaryAction>
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );
// };

// export default HealthStaffList;
