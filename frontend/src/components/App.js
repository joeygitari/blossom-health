import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Login from './Login';
import Register from './Register';
import About from "./About";
import Contact from "./Contact";
import Services from "./Services";

const App = () => {

  const [data, setData] = useState([{}]);

  useEffect(() =>{
    fetch("/members").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    // <div>
    //   {(typeof data.members === 'undefined') ? (
    //     <p>Loading...</p>
    //   ) : (
    //     data.members.map((member, i) => (
    //       <p key={i}>{member}</p>
    //     ))
    //   )}
    //   )}
    // </div>
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
