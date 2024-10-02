
import React from 'react';
import '../styles/display.css';

const DisplayButton = ({ grouping, setGrouping, setSortOption }) => {
  return (
    <div className="display-options">
      <div>
        <label>Group by:</label>
        <select value={grouping} onChange={(e) => setGrouping(e.target.value)}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      <div>
        <label>Sort by:</label>
        <select onChange={(e) => setSortOption(e.target.value)}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
};

export default DisplayButton;
