import { apiFetch } from "./isdapi";

export const assignTicket = (ticketId, userId) =>
  apiFetch(`/tickets/${ticketId}/assign/${userId}`, { method: "POST" });

export const unassignTicket = (ticketId, userId) =>
  apiFetch(`/tickets/${ticketId}/assign/${userId}`, { method: "DELETE" });
