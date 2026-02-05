import React, { useState } from "react";

const Signup = ({ onSignup, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    // SIMULATE SIGNUP
    const userData = {
      name: formData.name,
      email: formData.email,
      role: "Admin"
    };

    onSignup(userData);
  };

  return (
    <div className="auth-box">
      <div className="auth-header">
        <span className="logo-icon-lg">🎓</span>
        <h1>UniTrack</h1>
        <p>Create your admin account.</p>
      </div>

      {error && <div className="error-msg">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Full Name</label>
          <input 
            type="text" name="name" placeholder="John Doe"
            value={formData.name} onChange={handleChange} 
          />
        </div>

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

        <button type="submit" className="auth-btn">Create Account</button>
      </form>

      <div className="auth-footer">
        Already have an account? <span onClick={onSwitchToLogin}>Login here</span>
      </div>
    </div>
  );
};

export default Signup;