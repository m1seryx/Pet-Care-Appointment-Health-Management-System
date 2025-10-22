import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";
import LightRays from "./LightRays";

export default function Signin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.phoneNumber || !formData.password) {
      alert("Please fill out all fields!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Form submitted:", formData);
    alert("Sign up successful!");
    navigate("/login");
  };

  return (
    <div className="signin-container">
      {}
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

      {/* Form Section */}
      <div className="form-section" style={{ position: "relative", zIndex: 2 }}>
        <div className="form-wrapper">
          <div className="logo">
            <span>PetCare</span>
          </div>

          <h2>Create an Account</h2>

          <form onSubmit={handleSubmit}>
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
              <label htmlFor="phoneNumber">Phone Number</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
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

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

             <button className="login-btn" onClick={() => navigate("/signin")}>
              Sign Up
            </button>
          </form>

          <div className="form-footer">
            <p>
              Already have an account?{" "}
              <a href="/Login" className="link">
                login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
