import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signin from './components/Signin';
import Appointment from './components/Appointment'; // ✅ Import Appointment

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/appointment" element={<Appointment />} /> {/* ✅ Added route */}
    </Routes>
  );
}

export default App;
