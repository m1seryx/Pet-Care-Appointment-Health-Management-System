import React, { useState, useEffect } from 'react';
import './App.css';
import heroBg from './assets/background (2).jpg'; 

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      icon: "📅",
      title: "Appointment Scheduling",
      description: "Easy online booking system for all your pet's healthcare needs with real-time availability"
    },
    {
      icon: "🩺",
      title: "Health and Vaccination Record",
      description: "Complete digital health records and vaccination tracking for comprehensive pet care"
    },
    {
      icon: "🔔",
      title: "Reminder System",
      description: "Never miss important appointments or medication schedules with smart notifications"
    }
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="app">
      {}
      <div className="decorative-elements">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
      </div>

      {}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo"><div className="paw-icon">🐾</div></div>
            <span className="logo-text">PetCare</span>
          </div>

          <nav className="desktop-nav">
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>

          <button className="login-btn">Login</button>

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
            <button className="mobile-login-btn">Login</button>
          </div>
        )}
      </header>

      {}
<section
  id="home"
  className="hero"
  style={{ backgroundImage: `url(${heroBg})` }}
>
  <div className="hero-overlay"></div>
  <div className="hero-content">
    <div className="hero-text">
      <h1 className={`hero-title ${isVisible ? 'animate-in' : ''}`}>
        Smart Scheduling,{' '}
        <span className="text-blue">Healthier Pets</span>,{' '}
        <span className="text-purple">Happier Owners</span>.
      </h1>
      <p className={`hero-subtitle ${isVisible ? 'animate-in delay-1' : ''}`}>
        Because Every Paw Deserves Perfect Care
      </p>
      <button className={`cta-btn ${isVisible ? 'animate-in delay-2' : ''}`}>
        Let’s get started!
      </button>
    </div>
  </div>
</section>


      {}
      <section id="services" className="services">
        <div className="services-content">
          <div className="services-header">
            <h2 className="services-title">
              Services <span className="text-blue">PetCare</span> offers:
            </h2>
            <p className="services-subtitle">
              Providing our patients with the most comprehensive range of services and the highest 
              quality in veterinary care that always has been our top priority at PetCare.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon"><span>{service.icon}</span></div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <footer id="contact" className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="logo"><div className="paw-icon">🐾</div></div>
            <span className="logo-text">PetCare</span>
          </div>
          <p className="footer-text">© 2025 PetCare. All rights reserved. Made with ❤️ for pets and their families.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
