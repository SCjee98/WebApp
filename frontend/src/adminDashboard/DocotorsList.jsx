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

// const DoctorsList = () => {
//   const [doctors, setDoctors] = useState([]);

//   useEffect(() => {
//     // Fetch the list of doctors from your API
//     fetch("http://localhost:5000/api/doctors", {
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
//   }, []);

//   const handleDeleteDoctor = (doctorId) => {
//     // Send a DELETE request to delete the doctor
//     fetch(`http://localhost:5000/api/doctors/${doctorId}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         // Include your authorization token here
//       },
//     })
//       .then((response) => response.json())
//       .then(() => {
//         // Remove the deleted doctor from the list
//         setDoctors((prevDoctors) =>
//           prevDoctors.filter((doctor) => doctor._id !== doctorId)
//         );
//       })
//       .catch((error) => {
//         console.error("Error deleting doctor:", error);
//       });
//   };

//   return (
//     <div>
//       <h2>Doctors List</h2>
//       <List>
//         {doctors.map((doctor) => (
//           <ListItem key={doctor._id}>
//             <ListItemText
//               primary={`${doctor.firstName} ${doctor.lastName}`}
//               secondary={`Role: ${doctor.role}`}
//             />
//             <ListItemSecondaryAction>
//               <IconButton edge="end" aria-label="edit">
//                 <EditIcon />
//               </IconButton>
//               <IconButton
//                 edge="end"
//                 aria-label="delete"
//                 onClick={() => handleDeleteDoctor(doctor._id)}
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

// export default DoctorsList;
