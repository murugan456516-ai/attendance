import React, { useState } from "react";
import "./App.css";

const App = () => {
  // --- 1. CONFIGURATION ---
  const facultyConfig = [
    { id: 1, name: "Prof. Arun", subject: "React JS" },
    { id: 2, name: "Prof. Ben", subject: "Node JS" },
    { id: 3, name: "Prof. Chitra", subject: "Database" },
    { id: 4, name: "Prof. Divya", subject: "Mathematics" },
    { id: 5, name: "Prof. Elango", subject: "English" },
    { id: 6, name: "Prof. Farhan", subject: "Networks" },
    { id: 7, name: "Prof. Guna", subject: "OS" },
  ];

  // --- 2. DATA GENERATOR (Realistic Slots) ---
  const generateWeekData = (fixedSubject) => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const times = [
      "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 01:00",
      "02:00 - 03:00", "03:00 - 04:00", "04:00 - 05:00"
    ];

    return days.map((day, dayIndex) => ({
      id: `day-${dayIndex}`,
      name: day,
      periods: times.map((time, timeIndex) => {
        // LOGIC: Only assign class if this condition is met (e.g., specific pattern)
        // This ensures they don't teach all 7 hours.
        // (dayIndex + timeIndex) % 3 === 0 is just a math trick to scatter classes
        const isTeachingSlot = (dayIndex + timeIndex) % 3 === 0;

        if (isTeachingSlot) {
          return {
            id: `p-${dayIndex}-${timeIndex}`,
            time: time,
            subject: fixedSubject, // The Professor's Subject
            type: "CLASS",
            students: [
              { id: 1, name: "Student A", roll: "101", status: "Present" },
              { id: 2, name: "Student B", roll: "102", status: "Absent" },
              { id: 3, name: "Student C", roll: "103", status: "Present" },
            ]
          };
        } else {
          return {
            id: `p-${dayIndex}-${timeIndex}`,
            time: time,
            subject: "Free Period",
            type: "FREE",
            students: [] // No students in free period
          };
        }
      })
    }));
  };

  // --- 3. STATE ---
  const [data, setData] = useState(
    facultyConfig.map((fac) => ({
      id: fac.id,
      name: fac.name,
      assignedSubject: fac.subject,
      schedule: generateWeekData(fac.subject)
    }))
  );

  const [selectedFacultyId, setSelectedFacultyId] = useState(null);
  const [selectedDayId, setSelectedDayId] = useState(null);
  const [selectedPeriodId, setSelectedPeriodId] = useState(null);

  // --- 4. HELPERS ---
  const activeFaculty = data.find(f => f.id === selectedFacultyId);
  const activeDay = activeFaculty?.schedule.find(d => d.id === selectedDayId);
  const activePeriod = activeDay?.periods.find(p => p.id === selectedPeriodId);

  // --- 5. ATTENDANCE TOGGLE ---
  const toggleAttendance = (studentId) => {
    const newData = data.map(faculty => {
      if (faculty.id !== selectedFacultyId) return faculty;
      const newSchedule = faculty.schedule.map(day => {
        if (day.id !== selectedDayId) return day;
        const newPeriods = day.periods.map(period => {
          if (period.id !== selectedPeriodId) return period;
          const newStudents = period.students.map(student => {
            if (student.id !== studentId) return student;
            return { ...student, status: student.status === "Present" ? "Absent" : "Present" };
          });
          return { ...period, students: newStudents };
        });
        return { ...day, periods: newPeriods };
      });
      return { ...faculty, schedule: newSchedule };
    });
    setData(newData);
  };

  // --- VIEWS ---

  // VIEW 1: FACULTY
  if (!selectedFacultyId) {
    return (
      <div className="container">
        <h1>Select Faculty</h1>
        <div className="grid-2">
          {data.map(f => (
            <div key={f.id} className="card faculty-card" onClick={() => setSelectedFacultyId(f.id)}>
              <h3>{f.name}</h3>
              <p className="subject-tag">{f.assignedSubject}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // VIEW 2: DAY
  if (!selectedDayId) {
    return (
      <div className="container">
        <button className="back-btn" onClick={() => setSelectedFacultyId(null)}>← Back</button>
        <h1>{activeFaculty.name}</h1>
        <div className="list-group">
          {activeFaculty.schedule.map(day => {
            // Count how many actual classes they have this day
            const classCount = day.periods.filter(p => p.type === "CLASS").length;
            return (
              <div key={day.id} className="list-item" onClick={() => setSelectedDayId(day.id)}>
                <span>📅 {day.name}</span>
                <span className="count-badge">{classCount} Classes</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // VIEW 3: PERIODS (With Free Periods Disabled)
  if (!selectedPeriodId) {
    return (
      <div className="container">
        <button className="back-btn" onClick={() => setSelectedDayId(null)}>← Back</button>
        <h1>{activeDay.name}</h1>
        <div className="timetable-grid">
          {activeDay.periods.map((period, index) => (
            <div 
              key={period.id} 
              // Add 'disabled' class if it is a Free Period
              className={`card period-card ${period.type === "FREE" ? "disabled" : ""}`} 
              onClick={() => period.type === "CLASS" && setSelectedPeriodId(period.id)}
            >
              <div className="period-badge">Period {index + 1}</div>
              <h3>{period.subject}</h3>
              <p>{period.time}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // VIEW 4: ATTENDANCE
  return (
    <div className="container">
      <button className="back-btn" onClick={() => setSelectedPeriodId(null)}>← Back</button>
      <div className="header-box">
        <h2>{activePeriod.subject}</h2>
        <p>{activeDay.name} | {activePeriod.time}</p>
      </div>
      <div className="student-list">
        {activePeriod.students.map(student => (
          <div key={student.id} className={`student-row ${student.status.toLowerCase()}`} onClick={() => toggleAttendance(student.id)}>
            <div className="info"><b>{student.roll}</b> <span>{student.name}</span></div>
            <span className={`status-badge ${student.status.toLowerCase()}`}>{student.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;