export const getToken = () => localStorage.getItem("token");
export const getRole = () => localStorage.getItem("role");

export const isAdmin = () => getRole() === "ADMIN";
