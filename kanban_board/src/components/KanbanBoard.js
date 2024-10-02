

import React, { useState, useEffect } from 'react';
import { getTickets } from '../services/api';
import TicketCard from './TicketCard';
import DisplayButton from './DisplayButton';
import '../styles/kanban.css';
import highPriorityIcon from '../assets/high.png';
import mediumPriorityIcon from '../assets/med.png';
import lowPriorityIcon from '../assets/low.png';
import nop from '../assets/nop.png';
import urgent from '../assets/urgent.png';
import progress from '../assets/inp.png';
import yellow from '../assets/yellow.jpg';
import grey from '../assets/grey.png';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState('status');
  const [sortOption, setSortOption] = useState('priority');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTickets();
      setTickets(data.tickets);
      setUsers(data.users);
    };

    fetchData();
  }, []);

  const getGroupedTickets = () => {
    let groupedTickets = {};
    if (grouping === 'status') {
      groupedTickets = tickets.reduce((acc, ticket) => {
        if (!acc[ticket.status]) acc[ticket.status] = [];
        acc[ticket.status].push(ticket);
        return acc;
      }, {});
    } else if (grouping === 'user') {
      groupedTickets = tickets.reduce((acc, ticket) => {
        const userName = users.find(user => user.id === ticket.userId)?.name || "Unknown User";
        if (!acc[userName]) acc[userName] = [];
        acc[userName].push(ticket);
        return acc;
      }, {});
    } else if (grouping === 'priority') {
      groupedTickets = tickets.reduce((acc, ticket) => {
        if (!acc[ticket.priority]) acc[ticket.priority] = [];
        acc[ticket.priority].push(ticket);
        return acc;
      }, {});
    }

    Object.keys(groupedTickets).forEach((group) => {
      groupedTickets[group].sort((a, b) => {
        if (sortOption === 'priority') return b.priority - a.priority;
        if (sortOption === 'title') return a.title.localeCompare(b.title);
        return 0;
      });
    });

    return groupedTickets;
  };

  const groupedTickets = getGroupedTickets();

  const priorityIcons = {
    0: nop,
    1: urgent,  
    2: highPriorityIcon, // High
    3: mediumPriorityIcon, // Medium
    4: lowPriorityIcon, // Low
  };

  const statusIcons = {
    "Todo": yellow, 
    "In progress": progress, 
    "Backlog": grey, 
  };

  const statusLabels = ["Todo", "In progress", "Backlog"];
  const priorityLabels = ["No Priority", "Urgent", "High", "Medium", "Low"];

  return (
    <div className="kanban-container">
      <DisplayButton grouping={grouping} setGrouping={setGrouping} setSortOption={setSortOption} />
      <div className="kanban-board">
        {Object.keys(groupedTickets).map((group) => (
          <div key={group} className="kanban-column">
            <h2 className="kanban-label">
              <span>
                {grouping === 'priority' ? (
                  <>
                    <img 
                      src={priorityIcons[group]} 
                      alt={`${priorityLabels[group]} Icon`} 
                      style={{ width: '22px', height: '20px', marginRight: '5px' }} 
                    />
                    {priorityLabels[group]} {/* Display priority label */}
                  </>
                ) : (
                  <>
                    <img 
                      src={statusIcons[group]} 
                      style={{ width: '22px', height: '20px', marginRight: '5px' }} 
                      alt={`${group} Icon`} 
                    />
                    {group} {/* Use the group directly for status labels */}
                  </>
                )}
              </span>
              <span className="item-count">{groupedTickets[group].length}</span>
              <span className="extra-icons">+ ...</span>
            </h2>
            {groupedTickets[group].map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} users={users} grouping={grouping} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
