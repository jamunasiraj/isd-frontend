import { useEffect, useState } from "react";
import { getUsers, deleteUser, updateUser } from "../services/userService.js"; // Add updateUser
import { useNavigate } from "react-router-dom";

const USERS_PER_PAGE = 5;

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [editUserId, setEditUserId] = useState(null);
  const [editForm, setEditForm] = useState({ username: "", role: "" });
  const navigate = useNavigate();

  const loadUsers = async () => {
  setLoading(true);
  try {
    const data = await getUsers();
    const sorted = (data || []).sort((a, b) => a.id - b.id); // sort ascending by id
    setUsers(sorted);
    setPage(1);
    setEditUserId(null);
  } catch (error) {
    alert("Failed to load users: " + error.message);
    setUsers([]);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        alert("User deleted successfully");
        loadUsers();
      } catch (error) {
        alert("Failed to delete user: " + error.message);
      }
    }
  };

  // When clicking edit button, enable edit mode for that user
  const handleEditClick = (user) => {
    setEditUserId(user.id);
    setEditForm({ username: user.username, role: user.role });
  };

  // Handle form changes for edited row
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Save edited user
  const handleSave = async (userId) => {
    try {
      await updateUser(userId, editForm);
      alert("User updated successfully");
      setEditUserId(null);
      loadUsers();
    } catch (error) {
      alert("Failed to update user: " + error.message);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  const pagedUsers = users.slice(
    (page - 1) * USERS_PER_PAGE,
    page * USERS_PER_PAGE
  );

  const goPrev = () => setPage((p) => Math.max(p - 1, 1));
  const goNext = () => setPage((p) => Math.min(p + 1, totalPages));

  if (loading) {
    return <div className="p-6">Loading users...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4  text-emerald-600">User Management</h2>

      <button
        onClick={() => navigate("/register", { state: { isAdminCreating: true } })}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add User
      </button>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Username</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pagedUsers.length === 0 ? (
            <tr>
              <td colSpan={4} className="border border-gray-300 px-4 py-2 text-center">
                No users found.
              </td>
            </tr>
          ) : (
            pagedUsers.map((user) => {
              const isEditing = editUserId === user.id;
              return (
                <tr key={user.id}>
                  <td className="border border-gray-300 px-4 py-2">{user.id}</td>

                  <td className="border border-gray-300 px-4 py-2">
                    {isEditing ? (
                      <input
                        type="text"
                        name="username"
                        value={editForm.username}
                        onChange={handleEditChange}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      user.username
                    )}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {isEditing ? (
                      <select
                        name="role"
                        value={editForm.role}
                        onChange={handleEditChange}
                        className="border p-1 rounded w-full"
                      >
                        <option value="USER">USER</option>
                        <option value="SUPPORT_ENGINEER">SUPPORT_ENGINEER</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="MANAGER">MANAGER</option>
                        <option value="OBSERVER">OBSERVER</option>
                        <option value="AUDITOR">AUDITOR</option>
                        <option value="TEAMLEAD">TEAMLEAD</option>
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>

                  <td className="border border-gray-300 px-4 py-2 space-x-2">
  {isEditing ? (
    <>
      <button
        onClick={() => handleSave(user.id)}
        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
      >
        Save
      </button>
      <button
        onClick={() => handleDelete(user.id)}
        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
      >
        Delete
      </button>
    </>
  ) : (
    <>
      <button
        onClick={() => handleEditClick(user)}
        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
      >
        Edit
      </button>
      <button
        onClick={() => handleDelete(user.id)}
        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
      >
        Delete
      </button>
    </>
  )}
</td>

                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center items-center space-x-4">
        <button
          onClick={goPrev}
          disabled={page === 1}
          className={`px-4 py-2 rounded ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-emerald-600 text-white hover:bg-emerald-700"
          }`}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={goNext}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-emerald-600 text-white hover:bg-emerald-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserManagementPage;
