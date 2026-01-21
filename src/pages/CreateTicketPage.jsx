import { useState } from "react";
import { createTicket } from "../services/ticketService.js";

const CreateTicketPage = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    urgency: "LOW",
    status: "OPEN",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTicket(form);
      alert("Ticket created successfully");
      setForm({ title: "", description: "", urgency: "LOW", status: "OPEN" });
    } catch (error) {
      alert("Failed to create ticket: " + error.message);
      console.error("Create ticket error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center  text-emerald-600">Create Ticket</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Title"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <textarea
            placeholder="Description"
            className="w-full border border-gray-300 rounded-md p-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />

          <select
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={form.urgency}
            onChange={(e) => setForm({ ...form, urgency: e.target.value })}
          >
            <option>LOW</option>
            <option>MEDIUM</option>
            <option>HIGH</option>
          </select>

          <select
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option>OPEN</option>
            <option>IN_PROGRESS</option>
            <option>RESOLVED</option>
            <option>CLOSED</option>
            <option>REOPENED</option>
          </select>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-md transition"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTicketPage;
