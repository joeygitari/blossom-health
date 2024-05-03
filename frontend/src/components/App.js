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
import PatientDashboard from './dashboards/PatientDashboard';
import MedicDashboard from './dashboards/MedicDashboard';

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
          <Route exact path="/medic-dashboard" element={<MedicDashboard />} />
        </Routes>
      </Router>
  );
}

export default App;
