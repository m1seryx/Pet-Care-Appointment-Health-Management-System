import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import profile from '../assets/dp.png';
import notify from '../assets/notif.png';
import { User, Heart, Calendar, FileText, Mail, Edit2, PlusCircle } from 'lucide-react';

function UserDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">
              <div className="paw-icon">🐾</div>
            </div>
            <span className="logo-text">PetCare</span>
          </div>

          <nav className="desktop-nav">
            <a href="./UserDashboard" className="nav-link">Home</a>
            <a href="./UserDashboard" className="nav-link">Services</a>
            <a href="./UserDashboard" className="nav-link">Appointment</a>
            <a href="./UserDashboard" className="nav-link">About</a>
          </nav>

          <div className="profile">
            <div className="notify">
              <div className="notif" style={{ backgroundImage: `url(${notify})` }}></div>
            </div>
            <div className="prof" onClick={() => navigate('/profile')} style={{ backgroundImage: `url(${profile})` }}></div>
          </div>

          <button className="mobile-menu-btn" onClick={toggleMenu}>
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu">
            <a href="#home" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#about" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#services" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Services</a>
            <a href="#contact" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Contact</a>
            <div className="prof" onClick={() => navigate('/profile')} style={{ backgroundImage: `url(${profile})` }}></div>
          </div>
        )}
      </header>

      <div className="main-content">
        <aside className="sidebar">
          <ul className="sidebar-menu">
            <li>
              <a href="#profile" className="active">
                <User size={20} />
                <span>Profile</span>
              </a>
            </li>
            <li>
              <a href="#pets">
                <Heart size={20} />
                <span>Pet Profile</span>
              </a>
            </li>
            <li>
              <a href="#appointments">
                <Calendar size={20} />
                <span>Appointment</span>
              </a>
            </li>
            <li>
              <a href="#records">
                <FileText size={20} />
                <span>Pet Record</span>
              </a>
            </li>
          </ul>
        </aside>

        <div className="content-area">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar" style={{ backgroundImage: `url(${profile})` }} ></div>
              <div className="profile-info">
                <h2>Kristine Sabuero</h2>
                <p className="user-id">ID: 0123456</p>
                <p className="user-email">
                  <Mail size={16} />
                  kristine@email.com
                </p>
              </div>
              <button className="btn-edit">
                <Edit2 size={16} />
                Edit Profile
              </button>
            </div>
          </div>

          <div className="section-title">
            <Heart size={20} />
            Registered Pets
          </div>
          <div className="pets-grid">
            <div className="pet-card">
              <div className="pet-card-header">
                <div className="pet-info">
                  <h3>Dochi Sabuero</h3>
                  <div className="pet-details">
                    <div><strong>Age:</strong> 3 years old</div>
                    <div><strong>Species:</strong>Cat</div>
                    <div><strong>Breed:</strong>Tilapia Cat</div>
                    <div><strong>Gender:</strong>Female</div>
                  </div>
                </div>
                <span className="pet-badge">Active</span>
              </div>
            </div>
            <div className="pet-card">
              <div className="pet-card-header">
                <div className="pet-info">
                  <h3>PunPun Sabuero</h3>
                  <div className="pet-details">
                    <div><strong>Age:</strong> 1 year old</div>
                    <div><strong>Species:</strong>Cat</div>
                    <div><strong>Breed:</strong>Tilapia Cat</div>
                    <div><strong>Gender:</strong>Female</div>
                  </div>
                </div>
                <span className="pet-badge">Active</span>
              </div>
            </div>
            <div className="pet-card" style={{ background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)', border: '2px dashed #667eea', cursor: 'pointer' }}>
              <div style={{ textAlign: 'center', padding: '20px', color: '#667eea' }}>
                <PlusCircle size={48} style={{ marginBottom: '10px' }} />
                <h3 style={{ color: '#667eea' }}>Add New Pet</h3>
              </div>
            </div>
          </div>

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
                <tr>
                  <td>Dochi</td>
                  <td>Nov 5, 2025 - 10:00 AM</td>
                  <td>Vaccination</td>
                  <td><span className="status-badge status-pending">Pending</span></td>
                </tr>
                <tr>
                  <td>Luna</td>
                  <td>Nov 8, 2025 - 2:30 PM</td>
                  <td>Grooming</td>
                  <td><span className="status-badge status-pending">Pending</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;