import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Login from './Login';
import Register from './Register';
import About from "./About";
import Contact from "./Contact";
import Services from "./Services";

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
      </Routes>
    </Router>
  );
}

export default App;
