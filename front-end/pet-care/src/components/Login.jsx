import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { loginUser } from '../api/authApi';
import dogBg from "./dog.jpg"; 
=======
>>>>>>> 9833d5e8d0fe9935544f53b3e40099711c422b6d
import "./Login.css";
import LightRays from "./LightRays";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

<<<<<<< HEAD
const handleSubmit = async (e) => {  // Make it async
  e.preventDefault();

  if (!formData.username || !formData.password) {
    alert("Please fill out all fields!");
    return;
  }

  try {
    const result = await loginUser(formData);  // Call the actual API
    
    if (result.message === "Login successful") {
      console.log("Login successful:", formData);
      navigate("/");  // Only navigate on successful login
    } else {
      alert(result.message);  // Show error message
    }
  } catch (error) {
    alert("Login failed. Please try again.");
  }
};
=======
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      alert("Please fill out all fields!");
      return;
    }
    console.log("Login successful:", formData);
    navigate("/");
  };
>>>>>>> 9833d5e8d0fe9935544f53b3e40099711c422b6d

  return (
    <div className="signin-container">
      <div className="overlay"></div>

      { }
      <div style={{ width: "100%", height: "100%", position: "absolute", zIndex: 1 }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      <div className="form-section" style={{ position: "relative", zIndex: 2 }}>
        <div className="form-wrapper">
          <div className="logo">
            <span>PetCare</span>
          </div>

          <h2>Welcome Back!</h2>
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

            <button type="submit" className="signin-btn">
              Log In
            </button>
          </form>

          <div className="form-footer">
            <p>
              Don't have an account?{" "}
              <a href="/Signin" className="link">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
