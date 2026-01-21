import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TicketEditPage = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  // Ticket state - replace fields as per your ticket schema
  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    status: "open", // Example statuses: open, in-progress, closed
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch ticket data (mock API call here)
  useEffect(() => {
    async function fetchTicket() {
      try {
        setLoading(true);
        setError(null);
        // Replace with your API call, e.g.:
        // const response = await fetch(`/api/tickets/${ticketId}`);
        // const data = await response.json();

        // Mock data:
        const data = {
          title: "Example Ticket",
          description: "This is a detailed description of the ticket.",
          status: "open",
        };

        setTicket(data);
      } catch (err) {
        setError("Failed to fetch ticket details.",err);
      } finally {
        setLoading(false);
      }
    }

    fetchTicket();
  }, [ticketId]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket((prev) => ({ ...prev, [name]: value }));
  };

  // Update ticket (mock update)
  const handleUpdate = async () => {
    try {
      setLoading(true);
      setError(null);
      // Replace with your API update call, e.g.:
      // await fetch(`/api/tickets/${ticketId}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(ticket),
      // });

      // Mock delay
      await new Promise((r) => setTimeout(r, 500));

      alert("Ticket updated successfully!");
    } catch (err) {
      setError("Failed to update ticket.",err);
    } finally {
      setLoading(false);
    }
  };

  // Delete ticket (mock delete)
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      // Replace with your API delete call, e.g.:
      // await fetch(`/api/tickets/${ticketId}`, { method: "DELETE" });

      // Mock delay
      await new Promise((r) => setTimeout(r, 500));

      alert("Ticket deleted successfully!");
      navigate("/tickets"); // Redirect back to tickets list
    } catch (err) {
      setError("Failed to delete ticket.",err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading ticket details...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-emerald-700 mb-4">Ticket Details</h1>

      <label className="block mb-2 font-semibold">Title</label>
      <input
        type="text"
        name="title"
        value={ticket.title}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded p-2 mb-4"
      />

      <label className="block mb-2 font-semibold">Description</label>
      <textarea
        name="description"
        value={ticket.description}
        onChange={handleChange}
        rows={5}
        className="w-full border border-gray-300 rounded p-2 mb-4"
      />

      <label className="block mb-2 font-semibold">Status</label>
      <select
        name="status"
        value={ticket.status}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded p-2 mb-6"
      >
        <option value="open">Open</option>
        <option value="in-progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>

      <div className="flex space-x-4">
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition"
        >
          Update Ticket
        </button>

        <button
          onClick={handleDelete}
          disabled={loading}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Delete Ticket
        </button>
      </div>
    </div>
  );
};

export default TicketEditPage;
