import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Login from './Login';
import Register from './Register';
import About from "./About";
import Contact from "./Contact";
import Services from "./Services";
import Symptoms from './Symptoms';
import PatientProfile from "./PatientProfile";
import PatientVitals from "./PatientVitals";
import PatientDashboard from './dashboards/PatientDashboard/PatientDashboard';
import MedicDashboard from './dashboards/MedicDashboard/MedicDashboard';
import Appointments from "./dashboards/MedicDashboard/Appointments";
import Patients from "./dashboards/MedicDashboard/Patients";
import Settings from "./dashboards/MedicDashboard/Settings";

const App = () => {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/services" element={<Services />} />
          <Route exact path="/symptoms" element={<Symptoms />} />
          <Route exact path="/patient-profile" element={<PatientProfile />} />
          <Route exact path="/patient-vitals" element={<PatientVitals />} />
          <Route exact path="/patient-dashboard" element={<PatientDashboard />} />
          <Route exact path="/medic-dashboard/home" element={<MedicDashboard />} />
          <Route exact path="/medic-dashboard/appointments" element={<Appointments />} />
          <Route exact path="/medic-dashboard/patients" element={<Patients />} />
          <Route exact path="/medic-dashboard/settings" element={<Settings />} />
        </Routes>
      </Router>
  );
}

export default App;
