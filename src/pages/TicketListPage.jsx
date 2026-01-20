import React, { useEffect, useState } from "react";
import { getTickets } from "../services/ticketService.js";

const TicketListPage = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getTickets().then(setTickets);
  }, []);

  return (
    <div>
      {tickets.map((t) => (
        <div key={t.id} className="card">
          <h3>{t.title}</h3>
          <p>{t.description}</p>
          <span>{t.urgency}</span>
        </div>
      ))}
    </div>
  );
};

export default TicketListPage;
