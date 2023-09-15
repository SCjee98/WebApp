const path = require("path");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectToDB } = require("./database/db");

const registrationRoutes = require("./Routes/registrationRoutes");
const signInRoutes = require("./Routes/SignInRoutes");
//const dashboardRoutes = require('./Routes/DashboardRoutes');
const admissionRoutes = require("./Routes/admissionRoutes");
const dischargeRoutes = require("./Routes/dischargeRoutes");
const uploadImagesRoutes = require("./Routes/uploadImagesRoutes");
const doctorRoutes = require("./Routes/doctorRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const doctorLoginRoutes = require("./Routes/doctorLoginRoutes");
const adminLoginRoutes = require("./Routes/adminLoginRoutes");
const patientDashboardRoutes = require("./Routes/patientDashboardRoutes");
const doctorDashboardRoutes = require("./Routes/doctorDashboardRoutes");
const adminDashboardRoutes = require("./Routes/adminDashboardRoutes");
const healthStaffLoginRoutes = require("./Routes/healthStaffLoginRoutes");
const healthStaffRegistration = require("./Routes/healthStaffRegistration");
const healthStaffDashboardRoutes = require("./Routes/healthStaffDashbaord");
const calculateRoute = require("./Routes/calculateRoutes");
const patientEdit = require("./Routes/patientEditRoutes");
const generatePatient = require("./Routes/generatePatientId");
const generateHADMID = require("./Routes/generateHADMId");
const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Check if the .env file exists in the root directory
const envFilePath = path.join(__dirname, "..", ".env"); // Assuming the .env file is in the root directory (WebPage1/.env)
if (!fs.existsSync(envFilePath)) {
  // Generate a random secure secret key using uuid
  const secretKey = require("uuid").v4();

  // Create or update the .env file with the JWT_SECRET_KEY
  fs.writeFileSync(envFilePath, `JWT_SECRET_KEY=${secretKey}\n`);

  console.log("Generated JWT secret key and stored in .env file.");
}

// Load environment variables from the .env file in the root directory
require("dotenv").config({ path: envFilePath });

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/login", signInRoutes);
app.use("/api/registration", registrationRoutes);

app.use("/api/admission", admissionRoutes);
app.use("/api/discharge", dischargeRoutes);
app.use("/api/upload-images", uploadImagesRoutes);
//app.use('/api/dashboard', dashboardRoutes);
app.use("/api/register-doctor", doctorRoutes);
app.use("/api/register-admin", adminRoutes);
app.use("/api/login/doctor", doctorLoginRoutes);
app.use("/api/login/admin", adminLoginRoutes);
app.use("/api/dashboard/patient", patientDashboardRoutes);
app.use("/api/dashboard/doctor", doctorDashboardRoutes);
app.use("/api/dashboard/users", adminDashboardRoutes);
app.use("/api/login/health-staff", healthStaffLoginRoutes);
app.use("/api/register-health-staff", healthStaffRegistration); // Corrected route path
app.use("/api/dashboard/health-staff", healthStaffDashboardRoutes);
app.use("/api/calculate-sum", calculateRoute);
app.use("/api/patients", patientEdit);
app.use("/api/generate-patient-id", generatePatient);
app.use("/api/generate-hadm-id", generateHADMID);
// Add a route handler for the home route ('/') to provide a response or redirect to the login page
app.get("/", (req, res) => {
  res.send("Welcome to the backend!"); //replaceable
});

connectToDB();

const port = 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
