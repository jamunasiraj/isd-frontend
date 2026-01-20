import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/userService.js";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {users.map((u) => (
        <div key={u.id} className="flex justify-between border p-2">
          <span>{u.username}</span>
          <button
            onClick={() => deleteUser(u.id)}
            className="text-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserManagementPage;
