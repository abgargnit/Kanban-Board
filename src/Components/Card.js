import React from 'react';
import './Card.css';
import { IconDict } from '../icons/globalIcons';

function Card({ ticket, user }) {
  const priorityIcons = [IconDict.noPriority, IconDict.imgLowPriority,IconDict.imgMediumPriority, IconDict.imgHighPriority, IconDict.urgentPriority];

  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        <span className="user-avatar">{user?.name[0].toUpperCase()}</span>
      </div>
      <h3 className="card-title">{ticket.title}</h3>
      <div className="card-footer">
        <span className="priority-icon">{priorityIcons[ticket.priority]}</span>
        <span className={`tag tag-${ticket.tag}`}>{ticket.tag}</span>
      </div>
    </div>
  );
}

export default Card;