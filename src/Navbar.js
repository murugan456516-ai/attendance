import React from "react";

const Navbar = ({ 
  currentView, onNavClick, facultyData, onSelectFaculty, 
  user, onLoginClick, 
  canGoBack, canGoForward, onBack, onForward 
}) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* LEFT CORNER: BUTTONS + LOGO */}
        <div className="nav-left">
          
          {/* 1. Buttons are first = Top Left Corner */}
          <div className="nav-controls">
            <button 
              className="nav-btn" 
              onClick={onBack} 
              disabled={!canGoBack} 
              title="Go Back"
            >
              ←
            </button>
            <button 
              className="nav-btn" 
              onClick={onForward} 
              disabled={!canGoForward} 
              title="Go Forward"
            >
              →
            </button>
          </div>

          {/* 2. Logo follows the buttons */}
          <div className="logo-section" onClick={() => onNavClick("home")}>
            <span className="logo-icon">🎓</span>
            <div className="logo-text">
              <h1>UniTrack</h1>
              <span className="sub-title">Admin Portal</span>
            </div>
          </div>
        </div>

        {/* CENTER / RIGHT LINKS */}
        <ul className="nav-links">
          <li className={currentView === "home" ? "active" : ""} onClick={() => onNavClick("home")}>
            Dashboard
          </li>
          
          {user && (
            <li className="dropdown-trigger">
              Faculty ▾
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={() => onNavClick("faculty")}>
                  <strong>View All Faculty</strong>
                </div>
                <hr style={{margin:'5px 0', border:'0', borderTop:'1px solid #eee'}}/>
                {facultyData.map((fac) => (
                  <div key={fac.id} className="dropdown-item" onClick={() => onSelectFaculty(fac.id)}>
                    {fac.name}
                  </div>
                ))}
              </div>
            </li>
          )}

          {user && (
            <li className={currentView === "reports" ? "active" : ""} onClick={() => onNavClick("reports")}>
              Reports
            </li>
          )}
          
          <li className={currentView === "settings" ? "active" : ""} onClick={() => onNavClick("settings")}>
            Settings
          </li>
        </ul>
        
        {/* FAR RIGHT: USER */}
        <div className="user-section">
          {user ? (
            <div className="user-profile">
              <div className="avatar" title={`Logged in as ${user.name}`}>
                {user.name.charAt(0)}
              </div>
            </div>
          ) : (
            <button className="login-btn-small" onClick={onLoginClick}>
              Login
            </button>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;