import React from 'react';
import '../styles/ticketCard.css';

// Define a mapping of priority values to labels
const priorityLabels = {
  1: 'Urgent',
  2: 'High',
  3: 'Medium',
  4: 'Low',
};

const TicketCard = ({ ticket }) => {
  const priorityLabel = priorityLabels[ticket.priority] || 'Unknown'; // Get the label based on the priority value
  return (
    <div className="ticket-card">
      <div className="ticket-title">{ticket.title}</div>
      <div className={`ticket-priority ${priorityLabel.toLowerCase()}`}>
        {priorityLabel}
      </div>
    </div>
  );
};

export default TicketCard;