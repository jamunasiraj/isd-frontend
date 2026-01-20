import React from "react";
import { useParams } from "react-router-dom";

const TicketDetailPage = () => {
  const { ticketId } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-emerald-700">
        Ticket Details
      </h1>

      <p className="mt-4 text-gray-700">
        Ticket ID: <span className="font-semibold">{ticketId}</span>
      </p>

      {/* Later you will fetch ticket details by ID */}
    </div>
  );
};

export default TicketDetailPage;  
