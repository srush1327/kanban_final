import React, { useState, useEffect } from 'react';
import { getTickets } from '../services/api';
import TicketCard from './TicketCard';
import DisplayButton from './DisplayButton';
import '../styles/kanban.css';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState('status');
  const [sortOption, setSortOption] = useState('priority');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTickets();
      setTickets(data.tickets);
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
        if (!acc[ticket.userId]) acc[ticket.userId] = [];
        acc[ticket.userId].push(ticket);
        return acc;
      }, {});
    } else if (grouping === 'priority') {
      groupedTickets = tickets.reduce((acc, ticket) => {
        if (!acc[ticket.priority]) acc[ticket.priority] = [];
        acc[ticket.priority].push(ticket);
        return acc;
      }, {});
    }

    // Sorting within groups
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

  return (
    <div className="kanban-container">
      <DisplayButton grouping={grouping} setGrouping={setGrouping} setSortOption={setSortOption} />
      <div className="kanban-board">
        {Object.keys(groupedTickets).map((group) => (
          <div key={group} className="kanban-column">
            <h2>{group}</h2>
            {groupedTickets[group].map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;