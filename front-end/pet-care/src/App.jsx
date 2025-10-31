import React from 'react';
import {Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signin from './components/Signin';
import Appointment from './components/Appointment';
import UserDashboard from './components/UserDashboard';
import AdminHome from './components/AdminDashboard'



function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/Admin" element={<AdminHome />} />

      </Routes>

  );
}

export default App; 
