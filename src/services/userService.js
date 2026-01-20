import { apiFetch } from "./isdapi";

export const getUsers = () => apiFetch("/admin/users");
export const deleteUser = (id) =>
  apiFetch(`/admin/users/${id}`, { method: "DELETE" });
