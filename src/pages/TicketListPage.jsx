import React, { useContext, useEffect, useState } from "react";
import { getTickets, updateTicket } from "../services/ticketService.js"; // <-- import updateTicket
import AuthContext from "../contexts/AuthContext.jsx";

const TICKETS_PER_PAGE = 5;

const TicketListPage = () => {
  const { user } = useContext(AuthContext);

  // Read token and role directly from localStorage
  const role = localStorage.getItem("role");

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [editTicketId, setEditTicketId] = useState(null);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedStatus, setEditedStatus] = useState("");

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState("");
  
  useEffect(() => {
    getTickets()
      .then((data) => {
        const sorted = (data || []).slice().sort((a, b) => a.id - b.id);
        setTickets(sorted);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredTickets = tickets.filter((t) => {
    const matchesText =
      t.title.toLowerCase().includes(searchText.toLowerCase()) ||
      t.description.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus = statusFilter ? t.status === statusFilter : true;

    const matchesUrgency = urgencyFilter ? t.urgency === urgencyFilter : true;

    return matchesText && matchesStatus && matchesUrgency;
  });

  const totalPages = Math.ceil(filteredTickets.length / TICKETS_PER_PAGE);
  const pagedTickets = filteredTickets.slice(
    (page - 1) * TICKETS_PER_PAGE,
    page * TICKETS_PER_PAGE
  );

  const goPrev = () => setPage((p) => Math.max(p - 1, 1));
  const goNext = () => setPage((p) => Math.min(p + 1, totalPages));

  const handleEditClick = (ticket) => {
    setEditTicketId(ticket.id);
    setEditedDescription(ticket.description);
    setEditedStatus(ticket.status);
  };

  const handleSaveClick = async (ticketId) => {
    try {
      // Find the original ticket from state
      const originalTicket = tickets.find((t) => t.id === ticketId);

      // Prepare data to update, including required fields
      const updates = {
        title: originalTicket.title, // ensure title included
        description: editedDescription,
        status: editedStatus,
        urgency: originalTicket.urgency, // ensure urgency included
      };

      // Call API to update ticket in backend
      const updatedTicket = await updateTicket(ticketId, updates);

      // Update local state with updated ticket returned from server
      setTickets((prev) =>
        prev.map((t) => (t.id === ticketId ? updatedTicket : t))
      );

      setEditTicketId(null);
    } catch (error) {
      console.error("Failed to update ticket:", error);
      alert("Failed to save changes. Please try again.");
    }
  };

  if (loading)
    return <div className="p-6 text-center text-gray-600">Loading tickets...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-emerald-600">
        Ticket List
      </h1>

      {(user?.role === "ADMIN" || role === "ADMIN") && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search title or description"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          >
            <option value="">All Status</option>
            <option value="OPEN">OPEN</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="RESOLVED">RESOLVED</option>
            <option value="CLOSED">CLOSED</option>
          </select>

          <select
            value={urgencyFilter}
            onChange={(e) => setUrgencyFilter(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          >
            <option value="">All Urgency</option>
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>
      )}

      <table className="min-w-full border-collapse border border-gray-300 shadow-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Id</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Urgency</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Owner</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Assignees</th>
            {(user?.role === "ADMIN" || role === "ADMIN") && (
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            )}
          </tr>
        </thead>

        <tbody>
          {pagedTickets.map((t) => (
            <tr key={t.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{t.id}</td>
              <td className="border border-gray-300 px-4 py-2">{t.title}</td>

              <td className="border border-gray-300 px-4 py-2">
                {editTicketId === t.id ? (
                  <input
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                ) : (
                  t.description
                )}
              </td>

              <td className="border border-gray-300 px-4 py-2">
                {editTicketId === t.id ? (
                  <select
                    value={editedStatus}
                    onChange={(e) => setEditedStatus(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  >
                    <option value="">All Status</option>
                    <option value="OPEN">OPEN</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="RESOLVED">RESOLVED</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                ) : (
                  t.status
                )}
              </td>

              <td className="border border-gray-300 px-4 py-2">{t.urgency}</td>
              <td className="border border-gray-300 px-4 py-2">{t.owner?.username}</td>
              <td className="border border-gray-300 px-4 py-2">
                {t.assignees?.map((a) => a.username).join(", ") || "-"}
              </td>

              {(user?.role === "ADMIN" || role === "ADMIN") && (
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  {editTicketId === t.id ? (
                    <button
                      onClick={() => handleSaveClick(t.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(t)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
                    >
                      Edit
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex justify-center items-center space-x-6 max-w-xs mx-auto">
        <button
          onClick={goPrev}
          disabled={page === 1}
          className={`px-4 py-2 rounded ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700 text-white"
          } transition`}
        >
          Prev
        </button>
        <span className="font-semibold text-gray-700">
          {page} / {totalPages}
        </span>
        <button
          onClick={goNext}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700 text-white"
          } transition`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TicketListPage;
