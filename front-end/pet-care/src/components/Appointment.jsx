import React, { useState } from "react";
import "./Appointment.css";

export default function Appointment() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
    date: "",
    time: "",
    service: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("🐾 Appointment booked successfully!");
    console.log(formData);
  };

  return (
    <div className="appointment-container">
      <div className="appointment-box">
        {}
        <div className="steps-indicator">
          {[1, 2, 3].map((num) => (
            <div key={num} className={`step-circle ${step === num ? "active" : ""}`}>
              {num}
            </div>
          ))}
        </div>

        {}
        <div className="right-panel">
          <i className="fa-solid fa-calendar-check icon"></i>
          <h2>Book Your Pet's Appointment</h2>
          <p>
            Follow the steps to set up an appointment for your pet’s check-up, vaccination, or grooming.
          </p>
          <p className="contact-info">
            <strong>09912345678</strong>
            <br />
            <span>petcare@gmail.com</span>
          </p>
        </div>

        {}
        <form className="form-panel" onSubmit={handleSubmit}>
          {}
          {step === 1 && (
            <>
              <h3>Pet Owner Info:</h3>
              <div className="input-group">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
              />
              <textarea
                name="notes"
                placeholder="Additional notes (e.g. pet name, special care)"
                value={formData.notes}
                onChange={handleChange}
              ></textarea>
            </>
          )}

          {}
          {step === 2 && (
            <>
              <h3>Choose Appointment Date & Time:</h3>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
              >
                <option value="">Select Time</option>
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="01:00 PM">01:00 PM</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="04:30 PM">04:30 PM</option>
              </select>
            </>
          )}

          {}
          {step === 3 && (
            <>
              <h3>Select Pet Care Service:</h3>
              <div className="service-option">
                <label>
                  <input
                    type="radio"
                    name="service"
                    value="General Check-up"
                    checked={formData.service === "General Check-up"}
                    onChange={handleChange}
                  />
                  <span>🩺 General Check-up</span>
                </label>

                <label>
                  <input
                    type="radio"
                    name="service"
                    value="Vaccination"
                    checked={formData.service === "Vaccination"}
                    onChange={handleChange}
                  />
                  <span>💉 Vaccination</span>
                </label>

                <label>
                  <input
                    type="radio"
                    name="service"
                    value="Grooming"
                    checked={formData.service === "Grooming"}
                    onChange={handleChange}
                  />
                  <span>✂️ Grooming Session</span>
                </label>

                <label>
                  <input
                    type="radio"
                    name="service"
                    value="Dental Cleaning"
                    checked={formData.service === "Dental Cleaning"}
                    onChange={handleChange}
                  />
                  <span>🦷 Dental Cleaning</span>
                </label>

                <label>
                  <input
                    type="radio"
                    name="service"
                    value="Emergency Visit"
                    checked={formData.service === "Emergency Visit"}
                    onChange={handleChange}
                  />
                  <span>🚑 Emergency Visit</span>
                </label>
              </div>
            </>
          )}

          {}
          <div className="button-group">
            {step > 1 && (
              <button type="button" onClick={prevStep} className="back-btn">
                ← Back
              </button>
            )}
            {step < 3 ? (
              <button type="button" onClick={nextStep} className="next-btn">
                Next Step →
              </button>
            ) : (
              <button type="submit" className="finish-btn">
                Finish ✔
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
