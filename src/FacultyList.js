import React from "react";

const FacultyList = ({ data, onSelect }) => {
  return (
    <div className="container">
      <h1>Select Faculty</h1>
      <div className="grid-2">
        {data.map((f) => (
          <div key={f.id} className="card" onClick={() => onSelect(f.id)}>
            <h3>{f.name}</h3>
            <p className="subject-tag">{f.assignedSubject}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyList;