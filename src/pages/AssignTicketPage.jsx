import React, { useEffect, useState } from "react";
import { getTickets, assignTicket } from "../services/ticketService.js";
import { getUsers } from "../services/userService.js";

const AssignTicketPage = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  // keep as STRING to avoid refresh issues
  const [selectedTicketId, setSelectedTicketId] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const ticketsData = await getTickets();
        const usersData = await getUsers();

        setTickets(Array.isArray(ticketsData) ? ticketsData : []);
        setUsers(Array.isArray(usersData) ? usersData : []);
      } catch (error) {
        alert("Failed to load data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

 
  const handleAssign = async () => {
    if (!selectedTicketId || !selectedUserId) {
      alert("Please select both ticket and user");
      return;
    }

    try {
      //  convert ONLY here
      await assignTicket(
        Number(selectedTicketId),
        Number(selectedUserId)
      );
      setMessage("User assigned to ticket successfully!");
    } catch (error) {
      alert("Failed to assign ticket: " + error.message);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4  text-emerald-600">Assign Ticket to User</h2>

      {/* ===================== */}
      {/* TICKET DROPDOWN */}
      {/* ===================== */}
      <label className="block mb-2 font-semibold">Select Ticket</label>
      <select
        className="w-full mb-4 p-2 border rounded"
        value={selectedTicketId}
        // onChange={(e) => setSelectedTicketId(e.target.value) }
         onChange={(e) => { setSelectedTicketId(e.target.value); setMessage("");          
         }}
        
      >
        <option value="">-- Select Ticket --</option>

        {tickets.map((ticket, index) => (
          <option
            key={ticket.id ?? index}
            value={ticket.id}
          >
            Ticket #{ticket.id} - {ticket.title}
          </option>
        ))}
      </select>

      {/* ===================== */}
      {/* USER DROPDOWN */}
      {/* ===================== */}
      <label className="block mb-2 font-semibold">Select User</label>
      <select
        className="w-full mb-4 p-2 border rounded"
        value={selectedUserId}
         onChange={(e) => {
    setSelectedUserId(e.target.value);
    setMessage("");
  }}
        
      >
        <option value="">-- Select User --</option>

        {users.map((user) => (
          <option key={user.id} value={user.id}>
            User #{user.id} - {user.username} ({user.role})
          </option>
        ))}
      </select>

      <button
        onClick={handleAssign}
        className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
      >
        Assign
      </button>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default AssignTicketPage;
