import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import AdminTheme from "./styles/adminTheme";
import HomePage from "./components/HomePage";
import SignUp from "./components/SignUp";
import RegistrationForm from "./components/RegistrationForm";
import DoctorRegistrationForm from "./components/doctorRegistrationForm";
import AdminRegistrationForm from "./components/adminRegistrationForm";
import HealthStaffRegistration from "./components/healthStaffRegistration";
import AdminDashboard from "./components/adminDashboard";
import DoctorDashboard from "./components/doctorDashboard";
import PatientDashboard from "./components/patientDashboard";
import AdmissionForm from "./Forms/Admission";
import DischargeForm from "./Forms/Discharge";
//import UploadImagesForm from "./components/UploadImagesForm";
import HealthStaffDashboard from "./components/healthStaffDashbaord";
import PatientEditPage from "./components/patientEditPage";
// import { Dashboard } from "@mui/icons-material";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={AdminTheme}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignUp />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route
              path="/doctor-registration"
              element={<DoctorRegistrationForm />}
            />
            <Route
              path="/admin-registration"
              element={<AdminRegistrationForm />}
            />
            <Route
              path="/register-health-staff"
              element={<HealthStaffRegistration />}
            />{" "}
            {/* Route for Health Staff Registration */}
            {<Route path="/admin-dashboard" element={<AdminDashboard />} />}
            {/* Route for Admin Dashboard */}
            <Route
              path="/doctor-dashboard"
              element={<DoctorDashboard />}
            />{" "}
            <Route
              path="/health-staff-dashboard"
              element={<HealthStaffDashboard />}
            />{" "}
            <Route path="/patient-dashboard" element={<PatientDashboard />} />
            {/* <Route path="/admission" element={<AdmissionForm />} /> */}
            {/* Route to the Admission Form */}
            <Route path="/admission" element={<AdmissionForm />} />
            <Route path="/discharge" element={<DischargeForm />} />
            {/* { <Route path="/upload-images-form" element={<UploadImagesForm />} />} */}
            <Route path="/edit_patient/:id" element={<PatientEditPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
