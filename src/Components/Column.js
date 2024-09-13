import React from 'react';
import Card from './Card';
import './Column.css';

function Column({ title, icon, tickets, users }) {
  return (
    <div className="column">
      <h2 className="column-header">
        <span className="column-icon">{icon}</span>
        {title}
        <span className="ticket-count">{tickets.length}</span>
      </h2>
      {tickets.map(ticket => (
        <Card key={ticket.id} ticket={ticket} user={users.find(u => u.id === ticket.userId)} />
      ))}
    </div>
  );
}

export default Column;