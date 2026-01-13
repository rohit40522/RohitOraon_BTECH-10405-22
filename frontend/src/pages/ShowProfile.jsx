import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, taskRes] = await Promise.all([
          api.get("/users/me"),
          api.get("/tasks"),
        ]);

        setUser(userRes.data);
        setTasks(taskRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  const totalTasks = tasks.length;
  const pending = tasks.filter(t => t.status === "pending").length;
  const inProgress = tasks.filter(t => t.status === "in-progress").length;
  const completed = tasks.filter(t => t.status === "completed").length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">

        <h2 className="text-2xl font-semibold mb-4">Profile</h2>

        {/* User Info */}
        <div className="mb-6">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p>
            <strong>Joined:</strong>{" "}
            {new Date(user.createdAt).toDateString()}
          </p>
        </div>

        {/* Task Stats */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Task Statistics</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatBox label="Total" value={totalTasks} />
            <StatBox label="Pending" value={pending} />
            <StatBox label="In Progress" value={inProgress} />
            <StatBox label="Completed" value={completed} />
          </div>
        </div>

      </div>
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="bg-gray-200 p-4 rounded text-center">
      <p className="text-lg font-bold">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
}
