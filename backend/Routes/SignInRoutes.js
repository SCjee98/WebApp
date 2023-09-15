// const express = require('express');
// const router = express.Router();
// const User = require('../schema/user');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { v4: uuidv4 } = require('uuid');
// const cookies = require('cookies'); // Import the cookies package

// // Generate a random secret key using uuid
// const generateSecretKey = () => {
//   return uuidv4();
// };

// // Login route
// router.post('/login', async (req, res) => {
//   try {
//     // Extract the login data from req.body
//     const { email, password } = req.body;
//     console.log('Login Request:', email);

//     // Find the user with the provided email
//     const user = await User.findOne({ email });

//     // Check if the user exists
//     if (!user) {
//       console.log('User not found:', email);
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     // Compare the provided password with the hashed password stored in the database
//     const passwordMatch = await bcrypt.compare(password, user.password);

//     // Check if the passwords match
//     if (!passwordMatch) {
//       console.log('Invalid password for:', email);
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     // Passwords match, user is authenticated

//     // Generate a token
//     const secretKey = generateSecretKey();
//     console.log('Generated Secret Key:', secretKey);
//     const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
//     console.log('Generated Token:', token);

//     // Set the token as an HTTP-only cookie
//     const cookiesHandler = new cookies(req, res);
//     console.log('Token being sent:', token);
//     cookiesHandler.set('jwtToken', token, { httpOnly: true });

//     // Return a success response
//     res.json({ success: true });

//   } catch (error) {
//     console.error('Login Error:', error);
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred during login. Please try again later.' });
//   }
// });

// module.exports = router;

// Login routes
const express = require("express");
const router = express.Router();
const User = require("../schema/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    // Extract the login data from req.body
    const { email, password } = req.body;
    console.log("Login Request:", email);

    // Find the user with the provided email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      console.log("User not found:", email);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Check if the passwords match
    if (!passwordMatch) {
      console.log("Invalid password for:", email);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Passwords match, user is authenticated

    // Generate a token
    // Generate a token with the role "patient"
    const token = jwt.sign(
      { userId: user._id, role: "Patient" },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );
    console.log("Generated Token:", token);

    // Return the token to the client
    res.json({ token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      error: "An error occurred during login. Please try again later.",
    });
  }
});

module.exports = router;
