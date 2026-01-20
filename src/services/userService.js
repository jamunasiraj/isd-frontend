import { apiFetch } from "./isdapi";

export const getUsers = () => apiFetch("/admin/users");
export const getUserById = (id) => apiFetch(`/admin/users/${id}`);
export const deleteUser = (id) =>
  apiFetch(`/admin/users/${id}`, { method: "DELETE" });
export const createUser = (userData) =>
  apiFetch("/admin/users", {
    method: "POST",
    body: JSON.stringify(userData),
  });
export const updateUser = (id, userData) =>
  apiFetch(`/admin/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(userData),
  });
