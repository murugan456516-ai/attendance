import React, { useState } from "react";

const Login = ({ onLogin, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    // SIMULATE LOGIN
    // In a real app, you would verify credentials with a backend here.
    const userData = {
      name: "Admin User", // Mock name since we don't have a backend to fetch it
      email: formData.email,
      role: "Admin"
    };

    onLogin(userData);
  };

  return (
    <div className="auth-box">
      <div className="auth-header">
        <span className="logo-icon-lg">🎓</span>
        <h1>UniTrack</h1>
        <p>Welcome back! Please login.</p>
      </div>

      {error && <div className="error-msg">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email Address</label>
          <input 
            type="email" name="email" placeholder="admin@college.edu"
            value={formData.email} onChange={handleChange} 
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input 
            type="password" name="password" placeholder="••••••••"
            value={formData.password} onChange={handleChange} 
          />
        </div>

        <button type="submit" className="auth-btn">Login to Dashboard</button>
      </form>

      <div className="auth-footer">
        New here? <span onClick={onSwitchToSignup}>Create an account</span>
      </div>
    </div>
  );
};

export default Login;