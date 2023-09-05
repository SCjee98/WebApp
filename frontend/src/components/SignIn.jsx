// //log in
// import React, { useState } from 'react';
// import { Grid, Paper, Typography, Button, TextField } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';

// const SignIn = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = async () => {
//     try {
//       // Send login request to the backend
//       const response = await fetch('http://localhost:5000/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       console.log('Login response:', response);

//       if (response.ok) {
//         // Get the JWT token from the response
//         const data = await response.json();
//         const token = data.token;

//         console.log('JWT Token:', token);

//         // Store the token securely in a secure HTTP-only cookie
//         document.cookie = `jwtToken=${token}; path=/; Secure; HttpOnly;`;

//         // Redirect to the successful login page (dashboard)
//         navigate('/dashboard');

//       } else if (response.status === 401) {
//         // Handle invalid credentials
//         setError('Invalid email or password');
//       } else {
//         // Handle other errors
//         setError('An error occurred during login. Please try again later.');
//       }
//     } catch (error) {
//       console.error('Login Error:', error);
//       // Handle network or server errors
//       setError('An error occurred during login. Please try again later.');
//     }
//   };

//   return (
//     <div style={{ display: 'grid', height: '100vh', placeItems: 'center', backgroundImage: 'linear-gradient(#FF7F50, #fff6e4, #006400)' }}>
//       <Paper sx={{ padding: '30px', border: '5px solid green', borderRadius: '20px' }}>
//         <Grid
//           container
//           spacing={3}
//           direction={'column'}
//           justify={'center'}
//           alignItems={'center'}
//         >
//           <Grid item xs={12}>
//             <TextField
//               label="Username"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </Grid>
//         </Grid>
//         <Grid container spacing={3} style={{ paddingTop: '24px' }}>
//           <Grid item xs={12}>
//             <Grid container xs={12} justifyContent="space-around" spacing={1}>
//               <Grid item xs="auto">
//                 <Button style={{ backgroundColor: 'green', borderRadius: '8px' }} variant="contained" onClick={handleLogin}> Login </Button>
//               </Grid>
//               <Grid item xs="auto">
//                 <Button style={{ backgroundColor: 'white', color: 'green', border: '1px solid green', borderRadius: '8px' }} variant="contained"> Sign up </Button>
//               </Grid>
//             </Grid>
//           </Grid>
//           <Grid item xs={12}>
//             <Grid container>
//               <Grid item xs>
//                 <Link to="/forgot-password">
//                   <Typography variant="body2">Forgotten Password?</Typography>
//                 </Link>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//         {error && (
//           <Grid container spacing={3} style={{ paddingTop: '12px' }}>
//             <Grid item xs={12}>
//               <Typography variant="body1" style={{ color: 'red' }}>{error}</Typography>
//             </Grid>
//           </Grid>
//         )}
//       </Paper>
//     </div>
//   );
// };

// export default SignIn;
