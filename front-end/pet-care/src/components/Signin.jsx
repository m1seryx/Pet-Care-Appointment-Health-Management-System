import React, { useState } from 'react';

export default function Signin() {
  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Form submitted:', formData);
    alert('Sign in successful!');
  };

  return (
    <div>
      <div className="signin-container">
        <div className="header">
          <div className="logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 2C10.34 2 9 3.34 9 5C9 6.66 10.34 8 12 8C13.66 8 15 6.66 15 5C15 3.34 13.66 2 12 2M5 8C3.34 8 2 9.34 2 11C2 12.66 3.34 14 5 14C6.66 14 8 12.66 8 11C8 9.34 6.66 8 5 8M19 8C17.34 8 16 9.34 16 11C16 12.66 17.34 14 19 14C20.66 14 22 12.66 22 11C22 9.34 20.66 8 19 8M12 9C8.5 9 4 10.76 4 14V16H20V14C20 10.76 15.5 9 12 9Z" />
              </svg>
            </div>
            <span>PetCare</span>
          </div>
        </div>

        <div className="form-section">
          <div className="form-wrapper">
            <h2>Sign in</h2>
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

              <button type="submit" className="signin-btn">
                Sign In
              </button>
            </form>

            <div className="form-footer">
              <p>
                Already have an account? <a href="/Login">Log in</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}