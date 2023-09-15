// import React, { useEffect, useState } from "react";
// import {
//   List,
//   ListItem,
//   ListItemText,
//   ListItemSecondaryAction,
//   IconButton,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";

// const AdminsList = () => {
//   const [admins, setAdmins] = useState([]);

//   useEffect(() => {
//     // Fetch the list of admins from your API
//     fetch("http://localhost:5000/api/admins", {
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
//   }, []);

//   const handleDeleteAdmin = (adminId) => {
//     // Send a DELETE request to delete the admin
//     fetch(`http://localhost:5000/api/admins/${adminId}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         // Include your authorization token here
//       },
//     })
//       .then((response) => response.json())
//       .then(() => {
//         // Remove the deleted admin from the list
//         setAdmins((prevAdmins) =>
//           prevAdmins.filter((admin) => admin._id !== adminId)
//         );
//       })
//       .catch((error) => {
//         console.error("Error deleting admin:", error);
//       });
//   };

//   return (
//     <div>
//       <h2>Admins List</h2>
//       <List>
//         {admins.map((admin) => (
//           <ListItem key={admin._id}>
//             <ListItemText
//               primary={`${admin.firstName} ${admin.lastName}`}
//               secondary={`Role: ${admin.role}`}
//             />
//             <ListItemSecondaryAction>
//               <IconButton
//                 edge="end"
//                 aria-label="delete"
//                 onClick={() => handleDeleteAdmin(admin._id)}
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

// export default AdminsList;
