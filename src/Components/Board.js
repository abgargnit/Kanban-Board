import React from 'react';
import Column from './Column';
import './Board.css';
import {IconDict}  from '../icons/globalIcons.js'


function Board({ tickets, users, grouping, sorting }) {
  const groupTickets = () => {
    let groups = {};
    
    if (grouping === 'status') {
      groups = {
        'Backlog': {
          icon: IconDict.backlog, tickets: [] },
        'Todo': { icon: IconDict.todo, tickets: [] },
        'In progress': { icon: IconDict.inProgress, tickets: [] },
        'Done': { icon:IconDict.done, tickets: [] },
        'Canceled': { icon: IconDict.cancelled, tickets: [] }
      };
      tickets.forEach(ticket => {
        groups[ticket.status].tickets.push(ticket);
      });
    } else if (grouping === 'user') {
      users.forEach(user => {
        groups[user.name] = { icon: '👤', tickets: [] };
      });
      tickets.forEach(ticket => {
        const user = users.find(u => u.id === ticket.userId);
        if (user) {
          groups[user.name].tickets.push(ticket);
        }
      });
    } else if (grouping === 'priority') {
      groups = {
        'No priority': { icon: IconDict.noPriority, tickets: [] },
        'Urgent': { icon: IconDict.imgUrgentPriority, tickets: [] },
        'High': { icon: IconDict.imgHighPriority, tickets: [] },
        'Medium': { icon: IconDict.imgMediumPriority, tickets: [] },
        'Low': { icon: IconDict.imgLowPriority, tickets: [] }
      };
      tickets.forEach(ticket => {
        const priorityName = ['No priority', 'Low', 'Medium', 'High', 'Urgent'][ticket.priority];
        groups[priorityName].tickets.push(ticket);
      });
    }

    // Sort tickets within each group
    Object.keys(groups).forEach(key => {
      groups[key].tickets.sort((a, b) => {
        if (sorting === 'priority') {
          return b.priority - a.priority;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
    });

    return groups;
  };

  const groupedTickets = groupTickets();

  return (
    <div className="board">
      {Object.entries(groupedTickets).map(([groupName, group]) => (
        <Column 
          key={groupName} 
          title={groupName} 
          icon={group.icon}
          tickets={group.tickets} 
          users={users}
        />
      ))}
    </div>
  );
}

export default Board;