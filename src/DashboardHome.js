import React from "react";

const DashboardHome = ({ user, onNavigate, onLoginRequest }) => {
  
  // --- UPDATED CLICK HANDLER ---
  const handleCardClick = (targetView) => {
    if (user) {
      // 1. If Logged In -> Go straight to the feature
      onNavigate(targetView);
    } else {
      // 2. If Guest -> Show Confirm Alert first
      const shouldLogin = window.confirm("🔒 Access Restricted\n\nYou need to Login or Signup to access this feature. Proceed to Login?");
      
      if (shouldLogin) {
        onLoginRequest(); // Only go to login if they clicked "OK"
      }
    }
  };

  return (
    <div className="container">
      {/* 1. WELCOME BANNER */}
      <div className="guest-banner">
        <div className="banner-text">
          <h2>{user ? `Welcome back, ${user.name}` : "Welcome to UniTrack Portal"}</h2>
          <p>
            {user 
              ? "Manage attendance, track schedules, and view reports from your admin dashboard."
              : "Streamline your college's attendance management with our secure admin portal."}
          </p>
          {!user && (
            <button className="auth-btn-full" style={{maxWidth: '200px', marginTop:'15px'}} onClick={onLoginRequest}>
              Login to Access
            </button>
          )}
        </div>
        <div className="banner-visual">📊</div>
      </div>

      {/* 2. PLATFORM FEATURES (NOW WITH ALERT) */}
      <h3 style={{marginTop: '30px', marginBottom: '15px'}}>Platform Features</h3>
      <div className="grid-2">
        
        {/* Card 1: Faculty */}
        <div className="card feature-card clickable" onClick={() => handleCardClick("faculty")}>
          <h3>📅 Faculty & Timetables</h3>
          <p style={{color: 'var(--text-secondary)', fontSize:'0.9rem'}}>
            Manage complex faculty schedules, view assigned subjects, and track daily classes.
          </p>
          <span className="link-text">{user ? "Manage Faculty ➔" : "Login to View 🔒"}</span>
        </div>

        {/* Card 2: Reports */}
        <div className="card feature-card clickable" onClick={() => handleCardClick("reports")}>
          <h3>📈 Analytics & Reports</h3>
          <p style={{color: 'var(--text-secondary)', fontSize:'0.9rem'}}>
            Generate detailed attendance reports, identify trends, and export data.
          </p>
          <span className="link-text">{user ? "View Reports ➔" : "Login to View 🔒"}</span>
        </div>

        {/* Card 3: Settings */}
        <div className="card feature-card clickable" onClick={() => handleCardClick("settings")}>
          <h3>⚙️ System Settings</h3>
          <p style={{color: 'var(--text-secondary)', fontSize:'0.9rem'}}>
            Configure system preferences, manage themes, and account security.
          </p>
          <span className="link-text">{user ? "Open Settings ➔" : "Login to View 🔒"}</span>
        </div>

        {/* Card 4: Security (Info Only) */}
        <div className="card feature-card">
          <h3>🛡️ Secure Access</h3>
          <p style={{color: 'var(--text-secondary)', fontSize:'0.9rem'}}>
            Role-based security ensures only authorized personnel can edit attendance records.
          </p>
          <span className="link-text" style={{color:'var(--success)', cursor:'default'}}>Active ✅</span>
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;