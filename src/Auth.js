import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const Auth = ({ onLogin }) => {
  // State to toggle between views. Default is 'login'
  const [view, setView] = useState("login");

  return (
    <div className="auth-container">
      {view === "login" ? (
        <Login 
          onLogin={onLogin} 
          onSwitchToSignup={() => setView("signup")} 
        />
      ) : (
        <Signup 
          onSignup={onLogin} 
          onSwitchToLogin={() => setView("login")} 
        />
      )}
    </div>
  );
};

export default Auth;