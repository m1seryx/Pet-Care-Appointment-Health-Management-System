import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { getUserAppointment } from '../api/appointmentApi';
import { getUser } from '../api/authApi';
import './profile.css';

function AppointmentSection() {
  const [activeTab, setActiveTab] = useState('pending');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const user = getUser();
        if (!user || !user.id) {
          setError('User not logged in');
          setLoading(false);
          return;
        }
        
        // Backend gets user_id from JWT token automatically
        const data = await getUserAppointment();
        
        if (!data.success) {
          setError(data.message || 'Failed to load appointments');
        } else {
          setAppointments(data.appointments || []);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError('Failed to load appointments');
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, []);

  // Map backend status to frontend tabs
  // Backend uses: Pending, Accepted, Completed, Cancelled
  const statusMap = {
    'pending': 'Pending',
    'booked': 'Accepted',
    'canceled': 'Cancelled'
  };

  const filteredAppointments = appointments.filter(
    (appt) => appt.status === statusMap[activeTab]
  );

  return (
    <div>
      <div className="section-title">
        <Calendar size={20} />
        Appointment
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => handleTabClick('pending')}
        >
          Pending
        </button>
        <button 
          className={`tab ${activeTab === 'booked' ? 'active' : ''}`}
          onClick={() => handleTabClick('booked')}
        >
          Booked
        </button>
        <button 
          className={`tab ${activeTab === 'canceled' ? 'active' : ''}`}
          onClick={() => handleTabClick('canceled')}
        >
          Canceled
        </button>
      </div>

      <div className="appointments-table">
        {loading ? (
          <p>Loading appointments...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name of Pet</th>
                <th>Date & Appointment Time</th>
                <th>Service Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appt) => (
                  <tr key={appt.appointment_id}>
                    <td>{appt.pet_name || 'Unknown Pet'}</td>
                    <td>{new Date(appt.date_time).toLocaleString()}</td>
                    <td>{appt.service}</td>
                    <td>
                      <span className={`status-badge status-${appt.status.toLowerCase()}`}>
                        {appt.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>
                    No {activeTab} appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AppointmentSection;
