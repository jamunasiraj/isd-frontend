import React, { useEffect, useState } from "react";
import { getTickets } from "../services/ticketService.js";

const TICKETS_PER_PAGE = 5; // change as needed

const TicketListPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getTickets()
      .then((data) => {
        setTickets(data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(tickets.length / TICKETS_PER_PAGE);
  const pagedTickets = tickets.slice(
    (page - 1) * TICKETS_PER_PAGE,
    page * TICKETS_PER_PAGE
  );

  const goPrev = () => setPage((p) => Math.max(p - 1, 1));
  const goNext = () => setPage((p) => Math.min(p + 1, totalPages));

  if (loading) {
    return <div className="p-6">Loading tickets...</div>;
  }

  if (tickets.length === 0) {
    return <div className="p-6">No tickets found.</div>;
  }

  return (
    <div className="p-6">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Urgency</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Owner</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Assignees</th>
          </tr>
        </thead>
        <tbody>
          {pagedTickets.map((t) => (
            <tr key={t.id}>
              <td className="border border-gray-300 px-4 py-2">{t.title}</td>
              <td className="border border-gray-300 px-4 py-2">{t.description}</td>
              <td className="border border-gray-300 px-4 py-2">{t.status}</td>
              <td className="border border-gray-300 px-4 py-2">{t.urgency}</td>
              <td className="border border-gray-300 px-4 py-2">
                {t.owner?.username} ({t.owner?.role})
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {t.assignees?.length > 0
                  ? t.assignees.map((a) => a.username).join(", ")
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="mt-4 flex justify-between items-center max-w-xs mx-auto">
        <button
          onClick={goPrev}
          disabled={page === 1}
          className={`px-4 py-2 rounded ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-emerald-600 text-white hover:bg-emerald-700"
          }`}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={goNext}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-emerald-600 text-white hover:bg-emerald-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TicketListPage;
