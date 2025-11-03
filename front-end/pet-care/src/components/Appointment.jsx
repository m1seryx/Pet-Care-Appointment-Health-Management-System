import React, { useState } from "react";
import "./Appointment.css";
import { addPet } from "../api/petApi";

export default function Appointment({ closeModal }) {
  const [step, setStep] = useState(1);
  const [hasPet, setHasPet] = useState(false);
  const [petId, setPetId] = useState(null);

  const [petData, setPetData] = useState({
    pet_name: "",
    breed: "",
    age: "",
    medical_history: "",
  });

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
    const { name, value } = e.target;
    step === 1
      ? setPetData({ ...petData, [name]: value })
      : setFormData({ ...formData, [name]: value });
  };

  const handleNext = async () => {
    if (step === 1 && !hasPet) {
      try {
        const response = await addPet(petData);
        if (!response.success) throw new Error(result.message);

       setPetId(response.pet?.pet_id)
       alert("✅ Pet data saved successfully!");
      } catch (err) {
        console.error(err); 
        alert("⚠️ Could not save pet data. Please try again.");
      }
    } else {
      setStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      formData.date &&
      formData.time &&
      formData.service
    ) {
      try {
        const appointmentPayload = {
          ...formData,
          petId,
        };

        const res = await fetch("/api/appointments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(appointmentPayload),
        });

        if (!res.ok) throw new Error("Failed to save appointment");
        alert("✅ Appointment booked successfully!");
        closeModal();
      } catch (err) {
        console.error(err);
        alert("⚠️ Error submitting appointment. Try again.");
      }
    } else {
      alert("⚠️ Please complete all fields before submitting!");
    }
  };

  return (
    <div className="appointment-container">
      <div className="appointment-box">
        {/* Steps Indicator */}
        <div className="steps-indicator">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className={`step-circle ${step === num ? "active" : ""}`}>
              {num}
            </div>
          ))}
        </div>

        {/* Info Panel */}
        <div className="right-panel">
          <i className="fa-solid fa-paw icon"></i>
          <h2>Book Your Pet's Appointment</h2>
          <p>Add your pet details and schedule their next visit with ease.</p>
          <p className="contact-info">
            <strong>09912345678</strong><br />
            <span>petcare@gmail.com</span>
          </p>
        </div>

        {/* Form */}
        <form className="form-panel" onSubmit={handleSubmit}>
          {/* Step 1: Pet Info */}
          {step === 1 && (
            <>
              <h3>Pet Information:</h3>
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={hasPet}
                  onChange={() => setHasPet(!hasPet)}
                />
               <h4>I already have a pet on file</h4> 
              </label>

              {!hasPet && (
                <>
                  <div className="input-group">
                    <input
                      type="text"
                      name="pet_name"
                      placeholder="Pet name"
                      value={petData.pet_name}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="breed"
                      placeholder="Breed"
                      value={petData.breed}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <input
                    type="text"
                    name="age"
                    placeholder="Age"
                    value={petData.age}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="medical_history"
                    placeholder="Profile photo URL (optional)"
                    value={petData.medical_history}
                    onChange={handleChange}
                  />
                </>
              )}
            </>
          )}

          
          {step === 2 && (
            <>
              <h3>Pet Owner Info:</h3>
              <div className="input-group">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <textarea
                name="notes"
                placeholder="Additional notes"
                value={formData.notes}
                onChange={handleChange}
              ></textarea>
            </>
          )}

         
          {step === 3 && (
            <>
              <h3>Choose Appointment Date & Time:</h3>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
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

          
          {step === 4 && (
            <>
              <h3>Select Pet Care Service:</h3>
              <div className="service-option">
                {[
                  "General Check-up",
                  "Vaccination",
                  "Grooming",
                  "Dental Cleaning",
                  "Emergency Visit",
                ].map((service) => (
                  <label key={service}>
                    <input
                      type="radio"
                      name="service"
                      value={service}
                      checked={formData.service === service}
                      onChange={handleChange}
                      required
                    />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          
          <div className="button-group">
            {step > 1 && (
              <button type="button" onClick={prevStep} className="back-btn">
                ← Back
              </button>
            )}
            {step < 4 ? (
              <button type="button" onClick={handleNext} className="next-btn">
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
