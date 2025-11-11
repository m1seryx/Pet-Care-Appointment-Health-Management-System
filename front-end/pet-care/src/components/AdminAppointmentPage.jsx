import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaClock, FaCheckCircle, FaTimesCircle, FaCalendarCheck, FaArrowLeft, FaSearch } from "react-icons/fa";
import Sidebar from "./Sidebar";   // optional - keep if you have it
import Header from "./Header";     // optional - keep if you have it
import "./AdminAppointmentPage.css";

export default function AdminAppointmentPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Pending");
  // initial sample data (stateful)
  const [appointments, setAppointments] = useState([
    { id: 1, owner: "Kristine Sabureo", pet: "Buddy", service: "General Check-up", date: "2025-10-20", time: "09:00 AM", status: "Pending" },
    { id: 2, owner: "John Dela Cruz",    pet: "Max",   service: "Vaccination",       date: "2025-10-21", time: "10:30 AM", status: "Accepted" },
    { id: 3, owner: "Maria Lopez",       pet: "Bella", service: "Grooming",          date: "2025-10-22", time: "03:30 PM", status: "Completed" },
    { id: 4, owner: "Kyle Ramirez",      pet: "Charlie", service: "Dental Cleaning", date: "2025-10-23", time: "11:00 AM", status: "Cancelled" },
    { id: 5, owner: "Ella Santos",       pet: "Luna",  service: "Emergency Visit",   date: "2025-10-24", time: "Anytime (24/7 available)", status: "Pending" },
  ]);

  const [search, setSearch] = useState("");

  // Service -> available times
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

  // filter by active tab and search
  const filtered = useMemo(() => {
    return appointments.filter(a => {
      const tabMatch = a.status === activeTab;
      if (!search.trim()) return tabMatch;
      const q = search.trim().toLowerCase();
      return tabMatch && (a.owner.toLowerCase().includes(q) || a.pet.toLowerCase().includes(q));
    });
  }, [appointments, activeTab, search]);

  // Handlers to mutate appointment state
  const updateStatus = (id, newStatus) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const updateTime = (id, newTime) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, time: newTime } : a));
  };

  const handleAccept = (id) => {
    updateStatus(id, "Accepted");
  };
  const handleDecline = (id) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;
    updateStatus(id, "Cancelled");
  };
  const handleComplete = (id) => {
    updateStatus(id, "Completed");
  };

  return (
    <div className="grid-container-admin">
      {/* Optional Sidebar/Header — remove if you don't have these */}
      {typeof Sidebar !== "undefined" && <Sidebar />}
      {typeof Header !== "undefined" && <Header />}

      <main className="main-container">
        <div className="admin-appointment-wrapper">
          <div className="top-row">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <FaArrowLeft /> Back
            </button>
            <div className="page-title">
              <h3>Pet Care Appointments</h3>
              <h4>Manage your pet clients’ appointments and schedules</h4>
            </div>
          </div>

          <div className="controls-row">
            <div className="tabs-container">
              <button className={`tab-btn ${activeTab === "Pending" ? "active" : ""}`} onClick={() => setActiveTab("Pending")}><FaClock /> Pending</button>
              <button className={`tab-btn ${activeTab === "Accepted" ? "active" : ""}`} onClick={() => setActiveTab("Accepted")}><FaCheckCircle /> Accepted</button>
              <button className={`tab-btn ${activeTab === "Completed" ? "active" : ""}`} onClick={() => setActiveTab("Completed")}><FaCalendarCheck /> Completed</button>
              <button className={`tab-btn ${activeTab === "Cancelled" ? "active" : ""}`} onClick={() => setActiveTab("Cancelled")}><FaTimesCircle /> Cancelled</button>
            </div>

            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search owner or pet name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="appointment-table">
            <table>
              <thead>
                <tr>
                  <th>Owner</th>
                  <th>Pet</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Time (select)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length ? (
                  filtered.map(item => (
                    <tr key={item.id}>
                      <td>{item.owner}</td>
                      <td>{item.pet}</td>
                      <td>{item.service}</td>
                      <td>{item.date}</td>
                      <td>
                        <select
                          value={item.time}
                          onChange={(e) => updateTime(item.id, e.target.value)}
                          className="time-select"
                        >
                          {getAvailableTimes(item.service).map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </td>
                      <td className="actions-td">
                        {item.status === "Pending" && (
                          <>
                            <button className="accept-btn" onClick={() => handleAccept(item.id)}>Accept</button>
                            <button className="decline-btn" onClick={() => handleDecline(item.id)}>Decline</button>
                          </>
                        )}
                        {item.status === "Accepted" && (
                          <>
                            <button className="complete-btn" onClick={() => handleComplete(item.id)}>Mark Completed</button>
                            <button className="decline-btn" onClick={() => handleDecline(item.id)}>Cancel</button>
                          </>
                        )}
                        {item.status === "Completed" && <span className="status completed">Done</span>}
                        {item.status === "Cancelled" && <span className="status cancelled">Cancelled</span>}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="no-data">No {activeTab} Appointments</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
