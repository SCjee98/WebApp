const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../schema/user");

// Middleware to check if the request contains a valid JWT token
const authenticateToken = (req, res, next) => {
  // Extract the JWT token from the Authorization header
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: "Authentication failed. Token missing." });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res
        .status(403)
        .json({ error: "Authentication failed. Token invalid." });
    }

    // Check if the token is not expired
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp <= currentTime) {
      return res
        .status(403)
        .json({ error: "Authentication failed. Token expired." });
    }

    // Store the user ID from the token in the request object for later use
    req.userId = decodedToken.userId;

    next();
  });
};

// API route to fetch user data for the dashboard
router.get("/user-data", authenticateToken, async (req, res) => {
  try {
    // Get the user ID from the request object (set in the authenticateToken middleware)
    const userId = req.userId;

    // Find the user with the provided user ID
    const user = await User.findById(userId, { password: 0 });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Assuming you want to fetch data for all users in the database, excluding the password field
    const allUsers = await User.find({}, { password: 0 });

    if (!allUsers) {
      return res.status(404).json({ error: "No users found." });
    }

    // Return the user data (excluding the password field) for all users
    res.json(allUsers);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user data." });
  }
});

module.exports = router;
