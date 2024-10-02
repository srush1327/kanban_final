


//expppppppppppp
import React from 'react';
import '../styles/ticketCard.css';
import highPriorityIcon from '../assets/high.png';
import mediumPriorityIcon from '../assets/med.png';
import lowPriorityIcon from '../assets/low.png';
import nop from '../assets/nop.png';
import urgent from '../assets/urgent.png';
import progress from '../assets/inp.png';
import yellow from '../assets/yellow.jpg';
import grey from '../assets/grey.png';

const TicketCard = ({ ticket, users, grouping }) => {
  console.log(ticket)
  const user = users.find(user => user.id === ticket.userId);
  const userInitials = user ? user.name.split(' ').map(n => n[0]).join('') : '';

  // Define status icons
  const statusIcons = {
    "Todo": <img src={yellow} style={{ width: '15px', height: '15px' }}/>, 
    "In progress": <img src={progress} style={{ width: '15px', height: '15px' }}/>,
    "Backlog": <img src={grey} style={{ width: '15px', height: '15px' }}/>,
  };

  // Define priority labels
  const priorityLabels = ["No Priority", "Urgent", "High", "Medium", "Low"];
  const priorityIcons = {
    1: <img src={nop} alt="no Priority" style={{ width: '15px', height: '15px' }} />,
    1: <img src={urgent} alt="urgent Priority" style={{ width: '15px', height: '15px' }} />,
    2: <img src={highPriorityIcon} alt="High Priority" style={{ width: '15px', height: '15px' }} />, // High
    3: <img src={mediumPriorityIcon} alt="Medium Priority" style={{ width: '15px', height: '15px' }} />, // Medium
    4: <img src={lowPriorityIcon} alt="Low Priority" style={{ width: '15px', height: '15px' }} />, // Low
  };

  return (
    <div className="ticket-card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        <span className="user-initials" style={{ backgroundColor: getUserColor(userInitials) }}>{userInitials}</span>
      </div>
      <div className="ticket-status">
        {ticket.status ==='Todo' ?  statusIcons['Todo'] : ticket.status ==='In progress' ? statusIcons['In progress'] : statusIcons['Backlog']} 
        {/* {grouping === 'priority' && (
          <span className="priority-label">
             
          </span>
        )} */}
         <div className="ticket-title">{ticket.title}</div>
      </div>
     
      
      <div className="ticket-tag">{ticket.tag}</div>
    
    </div>
  );
};

// Helper function to get user icon color based on initials
const getUserColor = (initials) => {
  const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6'];
  return colors[initials.charCodeAt(0) % colors.length];
}

export default TicketCard;
