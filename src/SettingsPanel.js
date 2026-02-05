import React from "react";

const SettingsPanel = ({ darkMode, toggleTheme, user, onLogout, onLoginClick }) => {
  
  const handleReset = () => {
    if(window.confirm("Are you sure? This will wipe all attendance data!")) {
      window.location.reload(); 
    }
  };

  return (
    <div className="container">
      <h1>Settings</h1>
      
      {/* --- ACCOUNT SECTION (Handles Login/Logout) --- */}
      <div className="settings-section">
        <h3>👤 Account</h3>
        {user ? (
          // IF LOGGED IN: SHOW LOGOUT
          <div>
            <div className="setting-row">
              <span>Status</span>
              <span className="badge-active">Active</span>
            </div>
            <div className="setting-row">
              <span>User</span>
              <strong>{user.name}</strong>
            </div>
            <button className="logout-btn-full" onClick={onLogout}>
              Logout
            </button>
          </div>
        ) : (
          // IF GUEST: SHOW LOGIN / SIGNUP
          <div style={{textAlign: 'center', padding: '10px 0'}}>
            <p style={{color: 'var(--text-secondary)', marginBottom: '15px'}}>
              You are currently browsing as a Guest.
            </p>
            <button className="auth-btn-full" onClick={onLoginClick}>
              Login or Signup
            </button>
          </div>
        )}
      </div>

      {/* --- APPEARANCE --- */}
      <div className="settings-section">
        <h3>🎨 Appearance</h3>
        <div className="setting-row">
          <span>Dark Mode</span>
          <label className="switch">
            <input type="checkbox" checked={darkMode} onChange={toggleTheme} />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      {/* --- DANGER ZONE (Hide for Guests) --- */}
      {user && (
        <div className="settings-section danger-zone">
          <h3 style={{color: 'var(--danger)'}}>⚠️ Danger Zone</h3>
          <p style={{fontSize:'0.9rem', color:'var(--text-secondary)'}}>
            Resetting will clear all local data.
          </p>
          <button className="reset-btn" onClick={handleReset}>
            Reset All Data
          </button>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;