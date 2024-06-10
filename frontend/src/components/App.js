import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './Homepage';
import Login from './Login';
import Register from './Register';
import About from "./About";
import Contact from "./Contact";
import Services from "./Services";
import PatientDashboard from './dashboards/PatientDashboard/PatientDashboard';
import MedicDashboard from './dashboards/MedicDashboard/MedicDashboard';
import Appointments from "./dashboards/MedicDashboard/Appointments";
import Patients from "./dashboards/MedicDashboard/Patients";
import Reports from './dashboards/MedicDashboard/Reports';
import Settings from "./dashboards/MedicDashboard/Settings";
import Symptoms from './dashboards/PatientDashboard/Symptoms';
import Appointments2 from "./dashboards/PatientDashboard/Appointments";
import Medications from "./dashboards/PatientDashboard/Medications";
import Labs from './dashboards/PatientDashboard/Labs';
import Images from './dashboards/PatientDashboard/Images';
import Reports2 from './dashboards/PatientDashboard/Reports';
import Settings2 from "./dashboards/PatientDashboard/Settings";
import PatientsForm from './dashboards/MedicDashboard/PatientsForm';
import Prediction from './dashboards/MedicDashboard/Prediction';
import Prediction2 from './dashboards/PatientDashboard/Prediction';
import Profile from './dashboards/Profile';
import FourOFour from './404';

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
          <Route exact path="/patient-dashboard/home" element={<PatientDashboard />} />
          <Route path="/patient-dashboard" element={<Navigate replace to="/patient-dashboard/home" />} />
          <Route exact path="/patient-dashboard/symptoms" element={<Symptoms />} />
          <Route exact path="/patient-dashboard/appointments" element={<Appointments2 />} />
          <Route exact path="/patient-dashboard/medications" element={<Medications />} />
          <Route exact path="/patient-dashboard/labs" element={<Labs />} />
          <Route exact path="/patient-dashboard/images" element={<Images />} />
          <Route exact path="/patient-dashboard/reports" element={<Reports2 />} />
          <Route exact path="/patient-dashboard/settings" element={<Settings2 />} />
          <Route exact path="/medic-dashboard/home" element={<MedicDashboard />} />
          <Route path="/medic-dashboard" element={<Navigate replace to="/medic-dashboard/home" />} />
          <Route exact path="/medic-dashboard/appointments" element={<Appointments />} />
          <Route exact path="/medic-dashboard/patients" element={<Patients />} />
          <Route exact path="/medic-dashboard/reports" element={<Reports />} />
          <Route exact path="/medic-dashboard/settings" element={<Settings />} />
          <Route exact path="/medic-dashboard/patient-form" element={<PatientsForm />} />
          <Route exact path="/medic-dashboard/prediction/:patientId" element={<Prediction />} />
          <Route exact path="/patient-dashboard/prediction/:patientId" element={<Prediction2 />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route path="*" element={<FourOFour/>}/>
        </Routes>
      </Router>
  );
}

export default App;
