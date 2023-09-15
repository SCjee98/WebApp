// import React, { useEffect, useState } from "react";
// import {
//   List,
//   ListItem,
//   ListItemText,
//   ListItemSecondaryAction,
//   IconButton,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// const PatientsList = () => {
//   const [patients, setPatients] = useState([]);

//   useEffect(() => {
//     // Fetch the list of patients from your API
//     fetch("http://localhost:5000/api/patients", {
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
//   }, []);

//   const handleDeletePatient = (patientId) => {
//     // Send a DELETE request to delete the patient
//     fetch(`http://localhost:5000/api/patients/${patientId}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         // Include your authorization token here
//       },
//     })
//       .then((response) => response.json())
//       .then(() => {
//         // Remove the deleted patient from the list
//         setPatients((prevPatients) =>
//           prevPatients.filter((patient) => patient._id !== patientId)
//         );
//       })
//       .catch((error) => {
//         console.error("Error deleting patient:", error);
//       });
//   };

//   return (
//     <div>
//       <h2>Patients List</h2>
//       <List>
//         {patients.map((patient) => (
//           <ListItem key={patient._id}>
//             <ListItemText
//               primary={`${patient.firstName} ${patient.lastName}`}
//               secondary={`Role: ${patient.role}`}
//             />
//             <ListItemSecondaryAction>
//               <IconButton edge="end" aria-label="edit">
//                 <EditIcon />
//               </IconButton>
//               <IconButton
//                 edge="end"
//                 aria-label="delete"
//                 onClick={() => handleDeletePatient(patient._id)}
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

// export default PatientsList;
