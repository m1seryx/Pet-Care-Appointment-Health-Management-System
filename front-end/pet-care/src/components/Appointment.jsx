import React, { useState, useEffect } from "react";
import "./Appointment.css";
import { addPet } from "../api/petApi";
import { createAppointment } from "../api/appointmentApi";

export default function Appointment({ closeModal }) {
  const [step, setStep] = useState(1);
  const [hasPet, setHasPet] = useState(false);
  const [petId, setPetId] = useState(null);
  const [pets, setPets] = useState([]); // ✅ FIX: should be an array

  const [petData, setPetData] = useState({
    pet_name: "",
    breed: "",
    age: "",
    gender: "",
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

  // ✅ Decode token and fill user info
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const firstName = payload.first_name || "";
        const lastName = payload.last_name || "";
        const email = payload.email || "";
        const phone = payload.phone_number || "";
        setFormData((prev) => ({ ...prev, firstName, lastName, email, phone }));
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }
  }, []);

  // ✅ Simulate fetching user's pets
  useEffect(() => {
    if (hasPet) {
      const staticPets = [
        { pet_id: 1, pet_name: "Buddy", breed: "Golden Retriever", age: 3, gender: "Male" },
        { pet_id: 2, pet_name: "Mittens", breed: "Persian Cat", age: 2, gender: "Female" },
        { pet_id: 3, pet_name: "Charlie", breed: "Pug", age: 5, gender: "Male" },
      ];
      setPets(staticPets);
    } else {
      setPets([]);
      setPetId(null);
    }
  }, [hasPet]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (step === 1) {
      if (hasPet && name === "petSelect") {
        setPetId(value);
      } else {
        setPetData({ ...petData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Step navigation
  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // ✅ Dynamic time slots by service
  const getAvailableTimes = (service) => {
    switch (service) {
      case "General Check-up":
        return ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"];
      case "Vaccination":
        return ["09:30 AM", "10:30 AM", "01:00 PM", "02:30 PM"];
      case "Grooming":
        return ["10:00 AM", "11:30 AM", "01:30 PM", "03:30 PM"];
      case "Dental Cleaning":
        return ["09:00 AM", "11:00 AM", "02:00 PM"];
      case "Emergency Visit":
        return ["Anytime (24/7 available)"];
      default:
        return [];
    }
  };

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
        let finalPetId = petId;

        // ✅ Add new pet if user doesn’t have one
        if (!hasPet) {
          const petResponse = await addPet(petData);
          if (!petResponse.success) throw new Error(petResponse.message);
          finalPetId = petResponse.pet?.pet_id;
        }

        await createAppointment({
          pet_id: finalPetId,
          date: formData.date,
          time: formData.time,
          service: formData.service,
          notes: formData.notes,
        });

        alert("✅ Appointment booked successfully!");
        closeModal();
      } catch (err) {
        console.error(err);
        alert("⚠️ Error submitting appointment. Try again.");
      }
    } else {
      alert("⚠️ Please complete all required fields.");
    }
  };

  // ✅ Generate times dynamically
  const availableTimes = getAvailableTimes(formData.service);

  return (
    <div className="appointment-container">
      <div className="appointment-box">
        {/* Step indicators */}
        <div className="steps-indicator">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className={`step-circle ${step === num ? "active" : ""}`}>
              {num}
            </div>
          ))}
        </div>

        {/* Right Info Panel */}
        <div className="right-panel">
          <i className="fa-solid fa-paw icon"></i>
          <h2>Book Your Pet's Appointment</h2>
          <p>Add your pet details and schedule their next visit with ease.</p>
          <p className="contact-info">
            <strong>09912345678</strong>
            <br />
            <span>petcare@gmail.com</span>
          </p>
        </div>

        {/* Form Section */}
        <form className="form-panel" onSubmit={handleSubmit}>
          {/* STEP 1 - PET INFO */}
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

              {hasPet ? (
                <>
                  <label>Select your pet:</label>
                  <select
                    name="petSelect"
                    value={petId || ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Choose your pet --</option>
                    {pets.map((pet) => (
                      <option key={pet.pet_id} value={pet.pet_id}>
                        {pet.pet_name} ({pet.breed}, {pet.age} yrs)
                      </option>
                    ))}
                  </select>

                  {petId && (
                    <div className="pet-preview">
                      <p>
                        🐾 <strong>{pets.find((p) => p.pet_id == petId)?.pet_name}</strong>
                      </p>
                      <p>Breed: {pets.find((p) => p.pet_id == petId)?.breed}</p>
                      <p>Age: {pets.find((p) => p.pet_id == petId)?.age}</p>
                      <p>Gender: {pets.find((p) => p.pet_id == petId)?.gender}</p>
                    </div>
                  )}
                </>
              ) : (
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
                  <select
                    name="gender"
                    value={petData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <input
                    type="text"
                    name="medical_history"
                    placeholder="Medical history (optional)"
                    value={petData.medical_history}
                    onChange={handleChange}
                  />
                </>
              )}
            </>
          )}

          {/* STEP 2 - OWNER INFO */}
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
                  readOnly
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  readOnly
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

          {/* STEP 3 - SERVICE & TIME */}
          {step === 3 && (
            <>
              <h3>Select Pet Care Service:</h3>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="">-- Choose Service --</option>
                <option value="General Check-up">General Check-up</option>
                <option value="Vaccination">Vaccination</option>
                <option value="Grooming">Grooming</option>
                <option value="Dental Cleaning">Dental Cleaning</option>
                <option value="Emergency Visit">Emergency Visit</option>
              </select>

              {formData.service && (
                <>
                  <h4>Available Times for {formData.service}:</h4>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Time --</option>
                    {availableTimes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </>
              )}

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </>
          )}

          {/* STEP 4 - REVIEW & SUBMIT */}
          {step === 4 && (
            <>
              <h3>Review Appointment Details:</h3>
              <ul className="review-list">
                <li>
                  <strong>Service:</strong> {formData.service}
                </li>
                <li>
                  <strong>Date:</strong> {formData.date}
                </li>
                <li>
                  <strong>Time:</strong> {formData.time}
                </li>
                <li>
                  <strong>Pet:</strong>{" "}
                  {hasPet
                    ? pets.find((p) => p.pet_id == petId)?.pet_name
                    : petData.pet_name}
                </li>
              </ul>
            </>
          )}

          {/* Buttons */}
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
