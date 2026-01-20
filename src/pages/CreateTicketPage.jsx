import { useState } from "react";
import { createTicket } from "../services/ticketService.js";

const CreateTicketPage = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    urgency: "LOW",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTicket(form);
    alert("Ticket created successfully");
    setForm({ title: "", description: "", urgency: "LOW" });
  };

  return (
    <div className="p-6 max-w-xl">
      <h2 className="text-2xl font-bold mb-4">Create Ticket</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Title"
          className="w-full border p-2"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <select
          className="w-full border p-2"
          value={form.urgency}
          onChange={(e) => setForm({ ...form, urgency: e.target.value })}
        >
          <option>LOW</option>
          <option>MEDIUM</option>
          <option>HIGH</option>
        </select>

        <button className="bg-emerald-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateTicketPage;
