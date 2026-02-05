import React from "react";

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="landing-container">
      <nav className="landing-nav">
        <div className="logo-section">
          <span className="logo-icon">🎓</span>
          <h1 style={{color: 'var(--primary)', fontSize:'1.5rem'}}>UniTrack</h1>
        </div>
        <button className="login-nav-btn" onClick={onGetStarted}>Login</button>
      </nav>

      <div className="hero-section">
        <div className="hero-content">
          <h1>Effortless Attendance Management for Modern Colleges</h1>
          <p>
            Track student attendance, manage faculty timetables, and generate instant reports 
            with UniTrack's secure admin portal.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={onGetStarted}>
              Get Started ➔
            </button>
            <button className="secondary-btn">Learn More</button>
          </div>
        </div>
        
        {/* Decorative Visual */}
        <div className="hero-visual">
          <div className="visual-card">
             <div className="fake-header"></div>
             <div className="fake-row"></div>
             <div className="fake-row"></div>
             <div className="fake-row active"></div>
          </div>
        </div>
      </div>
      
      <footer className="landing-footer">
        © 2026 UniTrack Systems. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;