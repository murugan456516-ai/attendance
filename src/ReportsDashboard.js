import React from "react";

const ReportsDashboard = ({ data }) => {
  // 1. Flatten the data to find all LOCKED classes
  const lockedClasses = [];
  
  data.forEach(faculty => {
    faculty.schedule.forEach(day => {
      day.periods.forEach(period => {
        if (period.isLocked) {
          // Calculate stats for this specific class
          const total = period.students.length;
          const present = period.students.filter(s => s.status === "Present").length;
          const percentage = Math.round((present / total) * 100);
          
          lockedClasses.push({
            id: period.id,
            facultyName: faculty.name,
            subject: period.subject,
            day: day.name,
            time: period.time,
            present,
            total,
            percentage
          });
        }
      });
    });
  });

  return (
    <div className="container">
      <h1>Attendance Reports</h1>
      
      {/* SUMMARY CARDS */}
      <div className="stats-grid" style={{marginBottom: '30px'}}>
        <div className="stat-card blue">
          <span className="stat-num">{lockedClasses.length}</span>
          <span className="stat-label">Classes Conducted</span>
        </div>
        <div className="stat-card green">
          <span className="stat-num">
             {lockedClasses.length > 0 
               ? Math.round(lockedClasses.reduce((acc, curr) => acc + curr.percentage, 0) / lockedClasses.length) 
               : 0}%
          </span>
          <span className="stat-label">Avg Attendance</span>
        </div>
      </div>

      {/* RECENT REPORTS LIST */}
      <h3>Recent Locked Classes</h3>
      {lockedClasses.length > 0 ? (
        <div className="list-group">
          {lockedClasses.map((item, index) => (
            <div key={index} className="list-item" style={{cursor: 'default'}}>
              <div style={{display:'flex', flexDirection:'column'}}>
                <span style={{fontWeight:'bold'}}>{item.subject}</span>
                <span style={{fontSize:'0.85rem', color:'#666'}}>
                  {item.facultyName} | {item.day}
                </span>
              </div>
              
              <div style={{textAlign:'right'}}>
                <div className={`status-badge ${item.percentage < 50 ? 'absent' : 'present'}`}>
                  {item.percentage}% Present
                </div>
                <div style={{fontSize:'0.75rem', marginTop:'5px', color:'#999'}}>
                  {item.present}/{item.total} Students
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No attendance records found. Lock a class to see it here.</p>
        </div>
      )}
    </div>
  );
};

export default ReportsDashboard;