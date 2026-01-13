import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

export default function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [user, setUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/users/me");
        setUser(res.data);
      } catch {
        setMessage("Failed to load profile");
      }
    };
    fetchUser();
  }, []);

  // Update password
  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!newPassword || !confirmPassword) {
      setMessage("Please fill both password fields");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      await api.put("/users/me", { password: newPassword });
      setMessage("Password updated successfully");

      setTimeout(() => navigate("/"), 800);
    } catch {
      setMessage("Password update failed");
    }
  };

  // Delete profile
  const handleDeleteProfile = async () => {
    const confirmDelete = window.confirm(
      "This will permanently delete your account and all tasks. Continue?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete("/users/me");
      logout();
      navigate("/login");
    } catch {
      alert("Failed to delete profile");
    }
  };

  if (!user) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded-xl w-full max-w-md"
      >
        <h2 className="px-3 py-2 text-lg font-semibold mb-4 bg-blue-500 text-white text-center rounded">
          Profile Settings
        </h2>

        {message && (
          <p className="mb-3 text-sm text-blue-600 text-center">
            {message}
          </p>
        )}

        {/* Name (read-only) */}
        <label htmlFor="">Name :</label>
        <input
          className="w-full mb-2 px-3 py-2 border rounded-lg bg-gray-100 text-gray-700"
          value={user.name}
          disabled
        />

        {/* Email (read-only) */}
        <label htmlFor="">Email :</label>
        <input
          className="w-full mb-4 px-3 py-2 border rounded-lg bg-gray-100 text-gray-700"
          value={user.email}
          disabled
        />

        {/* New Password */}
        <label htmlFor="">New Password :</label>
        <input
          className="w-full mb-2 px-3 py-2 border rounded-lg"
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        {/* Confirm Password */}
        Confirm Password :
        <input
          className="w-full mb-4 px-3 py-2 border rounded-lg"
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div className="flex justify-between items-center mt-4">
          {/* Delete Profile */}
          <button
            type="button"
            onClick={handleDeleteProfile}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Delete Profile
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-900"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
