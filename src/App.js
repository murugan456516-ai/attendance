import React, { useState, useEffect } from "react";
import "./App.css";

// --- COMPONENT IMPORTS ---
import LandingPage from "./LandingPage";
import Auth from "./Auth";
import Navbar from "./Navbar";
import DashboardHome from "./DashboardHome"; 
import FacultyList from "./FacultyList";
import Timetable from "./Timetable";
import AttendanceSheet from "./AttendanceSheet";
import ReportsDashboard from "./ReportsDashboard";
import SettingsPanel from "./SettingsPanel";

const App = () => {
  // --- 1. AUTH & USER STATE ---
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  // --- 2. HISTORY ENGINE (For Browser Navigation) ---
  // Default State: Sitting at "Home"
  const [history, setHistory] = useState([
    { view: "home", facId: null, dayId: null, perId: null }
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Current View Snapshot
  const currentState = history[historyIndex];

  // --- 3. AUTH EFFECTS ---
  useEffect(() => {
    const savedUser = localStorage.getItem("uni_user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("uni_user", JSON.stringify(userData));
    setShowAuth(false);
    setIsGuest(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsGuest(false);
    setShowAuth(false);
    localStorage.removeItem("uni_user");
    // Reset History on Logout
    setHistory([{ view: "home", facId: null, dayId: null, perId: null }]);
    setHistoryIndex(0);
  };

  // --- 4. THEME ---
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  const toggleTheme = () => setDarkMode(!darkMode);

  // --- 5. DATA GENERATION ---
  const facultyConfig = [
    { id: 1, name: "Prof. Arun", subject: "React JS" },
    { id: 2, name: "Prof. Ben", subject: "Node JS" },
    { id: 3, name: "Prof. Chitra", subject: "Database" },
    { id: 4, name: "Prof. Divya", subject: "Mathematics" },
    { id: 5, name: "Prof. Elango", subject: "English" },
    { id: 6, name: "Prof. Farhan", subject: "Networks" },
    { id: 7, name: "Prof. Guna", subject: "OS" },
  ];

  const generateWeekData = (fixedSubject) => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const times = ["09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 01:00", "02:00 - 03:00", "03:00 - 04:00", "04:00 - 05:00"];
    
    return days.map((day, dayIndex) => ({
      id: `day-${dayIndex}`,
      name: day,
      periods: times.map((time, timeIndex) => {
        const isTeachingSlot = (dayIndex + timeIndex) % 3 === 0;
        if (isTeachingSlot) {
          return {
            id: `p-${dayIndex}-${timeIndex}`,
            time: time,
            subject: fixedSubject,
            type: "CLASS",
            isLocked: false,
            students: Array.from({ length: 30 }, (_, i) => ({
              id: i + 1,
              name: `Student ${i + 1}`,
              roll: (100 + i + 1).toString(),
              status: "Present"
            }))
          };
        } else {
          return { id: `p-${dayIndex}-${timeIndex}`, time: time, subject: "Free Period", type: "FREE", isLocked: false, students: [] };
        }
      })
    }));
  };

  const [data, setData] = useState(
    facultyConfig.map((fac) => ({
      id: fac.id,
      name: fac.name,
      assignedSubject: fac.subject,
      schedule: generateWeekData(fac.subject)
    }))
  );

  // --- 6. NAVIGATION ACTIONS (HISTORY AWARE) ---

  // Generic Navigate: Pushes new state to history stack
  const navigateTo = (newSnapshot) => {
    // If we are in middle of stack (clicked back 3 times), clicking a link
    // truncates the "future" history (just like Chrome/Edge)
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newSnapshot);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Specific Actions
  const goToHome = () => navigateTo({ view: "home", facId: null, dayId: null, perId: null });
  const goToFaculty = () => navigateTo({ view: "faculty", facId: null, dayId: null, perId: null });
  const goToSettings = () => navigateTo({ view: "settings", facId: null, dayId: null, perId: null });
  const goToReports = () => navigateTo({ view: "reports", facId: null, dayId: null, perId: null });
  
  // Drill-down Actions
  const selectFaculty = (id) => navigateTo({ view: "dashboard", facId: id, dayId: null, perId: null });
  const selectDay = (dId) => navigateTo({ ...currentState, dayId: dId, perId: null });
  const selectPeriod = (pId) => navigateTo({ ...currentState, perId: pId });

  // Browser Controls
  const handleBack = () => {
    if (historyIndex > 0) setHistoryIndex(historyIndex - 1);
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) setHistoryIndex(historyIndex + 1);
  };

  // Auth Wrapper for Actions
  const withAuth = (action) => {
    if (user) action();
    else setShowAuth(true);
  };

  // --- 7. DATA HELPERS ---
  const activeFaculty = data.find(f => f.id === currentState.facId);
  const activeDay = activeFaculty?.schedule.find(d => d.id === currentState.dayId);
  const activePeriod = activeDay?.periods.find(p => p.id === currentState.perId);

  // --- 8. UPDATE LOGIC (Locking, Attendance) ---
  const updateData = (studentCallback, isLockAction = false) => {
    const newData = data.map(faculty => {
      if (faculty.id !== currentState.facId) return faculty;
      const newSchedule = faculty.schedule.map(day => {
        if (day.id !== currentState.dayId) return day;
        const newPeriods = day.periods.map(period => {
          if (period.id !== currentState.perId) return period;
          
          if (isLockAction) return { ...period, isLocked: !period.isLocked };

          const newStudents = period.students.map(studentCallback);
          return { ...period, students: newStudents };
        });
        return { ...day, periods: newPeriods };
      });
      return { ...faculty, schedule: newSchedule };
    });
    setData(newData);
  };

  const toggleAttendance = (studentId) => {
    if (activePeriod.isLocked) return alert("Class Locked!");
    updateData((student) => {
      if (student.id !== studentId) return student;
      return { ...student, status: student.status === "Present" ? "Absent" : "Present" };
    });
  };

  const toggleLock = () => { updateData(null, true); };

  // --- 9. RENDER LOGIC ---

  // A. SHOW LOGIN SCREEN
  if (showAuth) {
    return <Auth onLogin={handleLogin} />;
  }

  // B. SHOW MAIN APP
  if (user || isGuest) {
    
    const renderContent = () => {
      const { view, perId, facId, dayId } = currentState;

      // 1. Settings (Accessible to all)
      if (view === "settings") {
        return (
          <SettingsPanel 
            darkMode={darkMode} 
            toggleTheme={toggleTheme} 
            user={user} 
            onLogout={handleLogout} 
            onLoginClick={() => setShowAuth(true)} 
          />
        );
      }

      // 2. Reports (Protected)
      if (view === "reports") return <ReportsDashboard data={data} />;
      
      // 3. Attendance Sheet (Deepest Level)
      if (perId) {
        return (
          <AttendanceSheet 
            periodData={activePeriod} 
            dayName={activeDay.name} 
            onToggleAttendance={toggleAttendance} 
            onToggleLock={toggleLock} 
            onBack={handleBack} 
          />
        );
      }

      // 4. Timetable (Level 2)
      if (facId) {
        return (
          <Timetable 
            facultyName={activeFaculty.name} 
            schedule={activeFaculty.schedule} 
            selectedDayId={dayId} 
            onSelectDay={selectDay} 
            onSelectPeriod={selectPeriod} 
            onBack={handleBack} 
          />
        );
      }

      // 5. Faculty List (Level 1) - Only if explicitly requested
      if (view === "faculty") {
        return <FacultyList data={data} onSelect={(id) => withAuth(() => selectFaculty(id))} />;
      }

      // 6. DEFAULT: Dashboard Home
      return (
        <DashboardHome 
          user={user} 
          onNavigate={(v) => { 
            if(v==="faculty") withAuth(goToFaculty);
            else if(v==="reports") withAuth(goToReports);
            else if(v==="settings") goToSettings();
          }} 
          onLoginRequest={() => setShowAuth(true)} 
        />
      );
    };

    return (
      <div className="app-layout">
        <Navbar 
          currentView={currentState.view} 
          
          // Navigation Callbacks
          onNavClick={(v) => {
            if(v==="home") goToHome();
            else if(v==="settings") goToSettings();
            else if(v==="reports") withAuth(goToReports);
            else if(v==="faculty") withAuth(goToFaculty);
          }} 
          
          // Data & User Callbacks
          facultyData={data} 
          onSelectFaculty={(id) => withAuth(() => selectFaculty(id))} 
          user={user} 
          onLoginClick={() => setShowAuth(true)}
          
          // History / Browser Control Props
          canGoBack={historyIndex > 0}
          canGoForward={historyIndex < history.length - 1}
          onBack={handleBack}
          onForward={handleForward}
        /> 
        
        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    );
  }

  // C. DEFAULT: LANDING PAGE
  return <LandingPage onGetStarted={() => setIsGuest(true)} />;
};

export default App;