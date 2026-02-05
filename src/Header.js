import React from "react";

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo-section">
          <span className="logo-icon">🎓</span>
          <h1>UniTrack <span className="sub-title">Attendance Manager</span></h1>
        </div>
        
        <div className="user-profile">
          <span className="user-name">Admin Portal</span>
          <div className="avatar">A</div>
        </div>
      </div>
    </header>
  );
};

export default Header;