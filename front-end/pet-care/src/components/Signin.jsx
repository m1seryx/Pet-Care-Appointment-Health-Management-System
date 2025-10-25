import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";
import LightRays from "./LightRays";
import { registerUser } from "../api/authApi";

export default function Signin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { first_name, last_name, username, email, phone_number, password } = formData;

    if (!first_name || !last_name || !username || !email || !phone_number || !password) {
      alert("Please fill out all fields!");
      return;
    }

     try {
       const result = await registerUser(formData); 
       
       if (result.message === "Registered successfully") {
         console.log("Registered successfully:", formData);
         navigate("/"); 
       } else {
         alert(result.message); 
       }
     } catch (error) {
       alert("Registration failed. Please try again.");
     }
  };

  return (
    <div className="signin-container">
      {/* Light Rays Background */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 1,
        }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ADB5"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
        />
      </div>

      <div className="form-section" style={{ position: "relative", zIndex: 2 }}>
        <div className="form-wrapper">
          <div className="logo">
            <span>PetCare</span>
          </div>

          <h2>Create an Account</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder="Enter your first name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  placeholder="Enter your last name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone_number">Phone Number</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  placeholder="Enter your phone number"
                  value={formData.phone_number}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="login-btn">
              Sign Up
            </button>
          </form>

          <div className="form-footer">
            <p>
              Already have an account?{" "}
              <a href="/Login" className="link">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
