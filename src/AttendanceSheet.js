import React from "react";

const AttendanceSheet = ({ 
  periodData, dayName, onToggleAttendance, onToggleLock, onBack 
}) => {
  
  // Stats Calculation
  const total = periodData.students.length;
  const present = periodData.students.filter(s => s.status === "Present").length;
  const absent = periodData.students.filter(s => s.status === "Absent").length;
  const percent = total > 0 ? Math.round((present / total) * 100) : 0;
  const absentees = periodData.students.filter(s => s.status === "Absent");

  return (
    <div className="container">
      <div className="top-nav">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <button
          className={`lock-btn ${periodData.isLocked ? "locked" : "unlocked"}`}
          onClick={onToggleLock}
        >
          {periodData.isLocked ? "🔒 Unlock Attendance" : "🔓 Lock Attendance"}
        </button>
      </div>

      <div className={`header-box ${periodData.isLocked ? "locked-mode" : ""}`}>
        <h2>{periodData.subject}</h2>
        <p>{dayName} | {periodData.time}</p>
        {periodData.isLocked && <div className="lock-banner">READ ONLY MODE</div>}
      </div>

      {/* REPORT SECTION (Visible when Locked) */}
      {periodData.isLocked && (
        <div className="report-container">
          <h3>📊 Class Report</h3>
          <div className="stats-grid">
            <div className="stat-card green">
              <span className="stat-num">{present}</span>
              <span className="stat-label">Present</span>
            </div>
            <div className="stat-card red">
              <span className="stat-num">{absent}</span>
              <span className="stat-label">Absent</span>
            </div>
            <div className="stat-card blue">
              <span className="stat-num">{percent}%</span>
              <span className="stat-label">Percentage</span>
            </div>
          </div>
          {absent > 0 ? (
            <div className="absentee-box">
              <strong>⚠️ Absentees:</strong>
              <p>{absentees.map(s => s.name).join(", ")}</p>
            </div>
          ) : (
            <div className="all-present-msg">🎉 100% Attendance!</div>
          )}
        </div>
      )}

      {/* STUDENT LIST */}
      <div className="student-list">
        {periodData.students.map((student) => (
          <div
            key={student.id}
            className={`student-row ${student.status.toLowerCase()} ${periodData.isLocked ? "read-only" : ""}`}
            onClick={() => onToggleAttendance(student.id)}
          >
            <div className="info">
              <b>{student.roll}</b>
              <span>{student.name}</span>
            </div>
            <span className={`status-badge ${student.status.toLowerCase()}`}>
              {student.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceSheet;