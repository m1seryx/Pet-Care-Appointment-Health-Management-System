import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import LightRays from "./LightRays";
import { loginUser } from "../api/authApi";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.username || !formData.password) {
    alert("Please fill out all fields!");
    return;
  }

  try {
    const result = await loginUser(formData);
    
    if (result.message === "Login successful" || result.message === "Admin login successful") {
    
      if (result.role === 'admin') {
        navigate("/Admin");
      } else {
        navigate("/UserDashboard");
      }
    } else {
      alert(result.message);
    }
  } catch (error) {
    alert("Login failed. Please try again.");
    console.error(error);
  }
};

  return (
    <div className="auth-container">
      <div className="overlay"></div>

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
          <div className="logo"><span>PetCare</span></div>
          <h2>Welcome Back!</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="login-btn">Login</button>
          </form>

          <div className="form-footer">
            <p>
              Don’t have an account?{" "}
              <a href="/Signin" className="link">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
