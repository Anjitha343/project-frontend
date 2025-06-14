import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TicketList = ({ projectId, token }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    console.log("projectid passed to ticketlist:",projectId);
    const fetchTickets = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/tickets/project/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTickets(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTickets();
  }, [projectId, token]);

  return (
    <div className="p-4">
      <h3 className="text-2xl font-semibold mb-4">Tickets for This Project</h3>

      {tickets.length === 0 ? (
        <p className="text-gray-500">No tickets found for this project.</p>
      ) : (
        <div className="grid gap-4">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition"
            >
              <h4 className="text-xl font-bold text-gray-800">{ticket.title}</h4>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Priority:</strong> {ticket.priority}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Status:</strong> {ticket.status}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Assignee:</strong> {ticket.assignee?.name || 'Unassigned'}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Created At: {new Date(ticket.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketList;
