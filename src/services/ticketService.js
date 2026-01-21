import { apiFetch } from "./isdapi.js";

// CREATE ticket
export const createTicket = (data) =>
  apiFetch("/tickets", {
    method: "POST",
    body: JSON.stringify(data),
  });

// GET all tickets
export const getTickets = () => apiFetch("/tickets");

// GET ticket by ID
export const getTicketById = (id) => apiFetch(`/tickets/${id}`);

// ADMIN: assign ticket
export const assignTicket = (ticketId, userId) =>
  apiFetch(`/tickets/${ticketId}/assign/${userId}`, {
    method: "POST",
  });

// ADMIN: unassign
export const unassignTicket = (ticketId, userId) =>
  apiFetch(`/tickets/${ticketId}/assign/${userId}`, {
    method: "DELETE",
  });

// GET users assigned to a ticket
export const getTicketAssignees = (ticketId) =>
  apiFetch(`/tickets/${ticketId}/assignees`);
