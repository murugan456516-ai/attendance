import React from "react";

const Timetable = ({ 
  facultyName, schedule, selectedDayId, 
  onSelectDay, onSelectPeriod, onBack 
}) => {
  
  // VIEW A: Day List
  if (!selectedDayId) {
    return (
      <div className="container">
        <button className="back-btn" onClick={onBack}>← Back to Faculty</button>
        <h1>{facultyName}</h1>
        <div className="list-group">
          {schedule.map((day) => {
            const classCount = day.periods.filter(p => p.type === "CLASS").length;
            return (
              <div key={day.id} className="list-item" onClick={() => onSelectDay(day.id)}>
                <span>📅 {day.name}</span>
                <span className="count-badge">{classCount} Classes</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // VIEW B: Period List
  const activeDay = schedule.find(d => d.id === selectedDayId);

  return (
    <div className="container">
      <button className="back-btn" onClick={onBack}>← Back to Days</button>
      <h1>{activeDay.name}</h1>
      <div className="timetable-grid">
        {activeDay.periods.map((period, index) => (
          <div
            key={period.id}
            className={`card period-card ${period.type === "FREE" ? "disabled" : ""}`}
            onClick={() => period.type === "CLASS" && onSelectPeriod(period.id)}
          >
            <div className="period-badge">Period {index + 1}</div>
            <div className="period-info">
              <h3>{period.subject}</h3>
              <p>{period.time}</p>
            </div>
            {period.isLocked && <span>🔒</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timetable;