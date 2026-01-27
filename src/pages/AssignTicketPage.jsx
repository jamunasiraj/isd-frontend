import React, { useEffect, useState } from "react";
import { getTickets, assignTicket, getTicketAssignees } from "../services/ticketService.js"; 
// NOTE: Added getAssignedUsersForTicket function to fetch assigned users per ticket
import { getUsers } from "../services/userService.js";


const AssignTicketPage = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  // keep as STRING to avoid refresh issues (EXISTING – unchanged)
  const [selectedTicketId, setSelectedTicketId] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");

  const [loading, setLoading] = useState(true);

  // EXISTING success message
  const [message, setMessage] = useState("");

  // 🔹 NEW: error message state
  // WHY: alerts are harsh UX; inline messages feel modern and controllable
  const [error, setError] = useState("");

  // 🔹 NEW: assigning state
  // WHY: prevents double-click submissions & shows progress
  const [assigning, setAssigning] = useState(false);

  // 🔹 NEW: store assigned users for each ticket, key = ticketId, value = array of assigned users [{id, role, username}]
  const [assignedUsers, setAssignedUsers] = useState({});

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const ticketsData = await getTickets();
        const usersData = await getUsers();

        setTickets(Array.isArray(ticketsData) ? ticketsData : []);
        setUsers(Array.isArray(usersData) ? usersData : []);

        // 🔹 NEW: Fetch assigned users for each ticket and store them
        if (Array.isArray(ticketsData) && ticketsData.length > 0) {
          const assignedUsersMap = {};
          // For all tickets, fetch assigned users
          await Promise.all(
            ticketsData.map(async (ticket) => {
              try {
                const assigned = await getTicketAssignees(ticket.id);
                // assigned assumed to be array of user objects with id, role, username
                assignedUsersMap[ticket.id] = assigned;
              } catch {
                assignedUsersMap[ticket.id] = [];
              }
            })
          );
          setAssignedUsers(assignedUsersMap);
        }
      } catch (error) {
        // EXISTING alert kept (functionality unchanged)
        alert("Failed to load data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAssign = async () => {
    // EXISTING validation (unchanged)
    if (!selectedTicketId || !selectedUserId) {
      alert("Please select both ticket and user");
      return;
    }

    try {
      setAssigning(true); // NEW
      setError("");       // NEW
      setMessage("");     // NEW

      // EXISTING logic (unchanged)
      await assignTicket(
        Number(selectedTicketId),
        Number(selectedUserId)
      );

      // 🔹 NEW: Update assignedUsers state for selected ticket after assignment
      // Find assigned user details from users array
      const assignedUser = users.find(u => u.id === Number(selectedUserId));
      setAssignedUsers((prev) => {
        const currentAssigned = prev[selectedTicketId] || [];
        // Prevent duplicates
        if (assignedUser && !currentAssigned.some(u => u.id === assignedUser.id)) {
          return {
            ...prev,
            [selectedTicketId]: [...currentAssigned, assignedUser]
          };
        }
        return prev;
      });

      setMessage("User assigned to ticket successfully!");
    } catch (error) {
      // EXISTING alert kept
      alert("Failed to assign ticket: " + error.message);

      // 🔹 NEW inline error
      setError(error.message || "Assignment failed");
    } finally {
      setAssigning(false); // NEW
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4 text-emerald-600">
        Assign Ticket to User
      </h2>

      {/* ===================== */}
      {/* TICKET DROPDOWN */}
      {/* ===================== */}
      <label className="block mb-2 font-semibold">Select Ticket</label>
      <select
        className="w-full mb-4 p-2 border rounded"
        value={selectedTicketId}
        onChange={(e) => {
          setSelectedTicketId(e.target.value);
          setMessage(""); // EXISTING behavior kept
          setError("");   // NEW: reset error on change
        }}
      >
        <option value="">-- Select Ticket --</option>

        {tickets.length === 0 && (
          <option disabled>No tickets available</option>
        )}

        {tickets.map((ticket, index) => {
          const assigned = assignedUsers[ticket.id] || [];
          // format assigned users string: "role - User #id, role2 - User #id2"
          const assignedText = assigned.length > 0
            ? " (assigned to: " + assigned.map(u => `${u.role} - User #${u.id}`).join(", ") + ")"
            : "";

          return (
            <option
              key={ticket.id ?? index}
              value={ticket.id}
            >
              Ticket #{ticket.id} - {ticket.title}
              {ticket.status ? ` (${ticket.status})` : ""}
              {assignedText}
            </option>
          );
        })}
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
          setMessage(""); // EXISTING behavior kept
          setError("");   // NEW
        }}
      >
        <option value="">-- Select User --</option>

        {users.length === 0 && (
          <option disabled>No users available</option>
        )}

        {users.map((user) => (
          <option key={user.id} value={user.id}>
            User #{user.id} - {user.username} ({user.role})
          </option>
        ))}
      </select>

      {/* ===================== */}
      {/* ASSIGN BUTTON */}
      {/* ===================== */}
      <button
        onClick={handleAssign}
        disabled={
          assigning || !selectedTicketId || !selectedUserId
        } // 🔹 NEW: prevents invalid clicks
        className={`w-full px-4 py-2 rounded text-white transition
          ${
            assigning || !selectedTicketId || !selectedUserId
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700"
          }
        `}
      >
        {/* 🔹 NEW: dynamic button text */}
        {assigning ? "Assigning..." : "Assign"}
      </button>

      {/* ===================== */}
      {/* FEEDBACK MESSAGES */}
      {/* ===================== */}

      {/* EXISTING success message (styled better, not changed) */}
      {message && (
        <p className="mt-4 text-green-600 font-semibold">
          ✅ {message}
        </p>
      )}

      {/* 🔹 NEW error message */}
      {error && (
        <p className="mt-4 text-red-600 font-semibold">
          ❌ {error}
        </p>
      )}
    </div>
  );
};

export default AssignTicketPage;
