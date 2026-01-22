import React, { useContext, useEffect, useState } from "react";
import { getTickets, updateTicket } from "../services/ticketService.js";
import AuthContext from "../contexts/AuthContext.jsx";

const TICKETS_PER_PAGE = 5;

const TicketListPage = () => {
  const { user } = useContext(AuthContext);

  // Read role from localStorage
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

  // Normalize username
  const userNameLower = user?.username?.toLowerCase();
  

  /**
   * EDIT PERMISSION LOGIC
   * RULE:
   * - ADMIN → can edit
   * - ASSIGNEE → can edit
   * - OWNER → cannot edit
   */
  const canEditTicket = (ticket) => {
    const isAdmin = role === "ADMIN";

    const isAssignee = ticket.assignees?.some(
      (a) => a.username?.toLowerCase() === userNameLower
    );


    return isAdmin || isAssignee;
  };

  // FILTERING (UNCHANGED)
  const filteredTickets = tickets.filter((t) => {
    

    const matchesText =
      t.title.toLowerCase().includes(searchText.toLowerCase()) ||
      t.description.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus = statusFilter ? t.status === statusFilter : true;
    const matchesUrgency = urgencyFilter ? t.urgency === urgencyFilter : true;

    const isOwner = t.owner?.username?.toLowerCase() === userNameLower;
    const isAssignee = t.assignees?.some(
      (a) => a.username?.toLowerCase() === userNameLower
    );

    const canView = role === "ADMIN" || isOwner || isAssignee;

    return matchesText && matchesStatus && matchesUrgency && canView;
  });

  // PAGINATION (UNCHANGED)
  const totalPages = Math.ceil(filteredTickets.length / TICKETS_PER_PAGE);
  const pagedTickets = filteredTickets.slice(
    (page - 1) * TICKETS_PER_PAGE,
    page * TICKETS_PER_PAGE
  );

  const goPrev = () => setPage((p) => Math.max(p - 1, 1));
  const goNext = () => setPage((p) => Math.min(p + 1, totalPages));

  // EDIT HANDLERS (UNCHANGED)
  const handleEditClick = (ticket) => {
    setEditTicketId(ticket.id);
    setEditedDescription(ticket.description);
    setEditedStatus(ticket.status);
  };

  const handleSaveClick = async (ticketId) => {
    try {
      const originalTicket = tickets.find((t) => t.id === ticketId);

      const updates = {
        title: originalTicket.title,
        description: editedDescription,
        status: editedStatus,
        urgency: originalTicket.urgency,
      };

      const updatedTicket = await updateTicket(ticketId, updates);

      setTickets((prev) =>
        prev.map((t) => (t.id === ticketId ? updatedTicket : t))
      );

      setEditTicketId(null);      
    } catch (error) {
      console.error("Failed to update ticket:", error);
      alert("Failed to save changes");
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading tickets...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-emerald-600">
        Ticket List
      </h1>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Id</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Urgency</th>
            <th className="border px-4 py-2">Owner</th>
            <th className="border px-4 py-2">Assignees</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {pagedTickets.map((t) => (
            <tr key={t.id}>
              <td className="border px-4 py-2">{t.id}</td>
              <td className="border px-4 py-2">{t.title}</td>

              <td className="border px-4 py-2">
                {editTicketId === t.id ? (
                  <input
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="border px-2 py-1 w-full"
                  />
                ) : (
                  t.description
                )}
              </td>

              <td className="border px-4 py-2">
                {editTicketId === t.id ? (
                  <select
                    value={editedStatus}
                    onChange={(e) => setEditedStatus(e.target.value)}
                  >
                    <option value="OPEN">OPEN</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="RESOLVED">RESOLVED</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                ) : (
                  t.status
                )}
              </td>

              <td className="border px-4 py-2">{t.urgency}</td>
              <td className="border px-4 py-2">{t.owner?.username}</td>
              <td className="border px-4 py-2">
                {t.assignees?.map((a) => a.username).join(", ") || "-"}
              </td>

              <td className="border px-4 py-2">
                {canEditTicket(t) && (
                  editTicketId === t.id ? (
                    <button
                      onClick={() => handleSaveClick(t.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(t)}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                  )
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center gap-4">
        <button onClick={goPrev} disabled={page === 1}>
          Prev
        </button>
        <span>{page} / {totalPages}</span>
        <button onClick={goNext} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TicketListPage;
