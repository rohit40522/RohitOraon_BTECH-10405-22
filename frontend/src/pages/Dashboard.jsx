import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KanbanBoard from "../components/KanbanBoard";
import CreateTask from "../components/CreateTask";
import { useAuth } from "../auth/AuthContext";
import RecentActivity from "../components/RecentActivity";
import api from "../api/axios";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [showCreateTask, setShowCreateTask] = useState(false);
  const [activities, setActivities] = useState([]);
  const [refreshActivity, setRefreshActivity] = useState(false);

  // 🔄 Fetch activity whenever refreshActivity changes
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await api.get("/activity");
        setActivities(res.data);
      } catch (err) {
        console.error("Failed to fetch activity");
      }
    };

    fetchActivity();
  }, [refreshActivity]);

  // Trigger activity refresh
  const triggerActivityRefresh = () => {
    setRefreshActivity((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">

      {/* ===== NAVBAR ===== */}
      <div className="bg-white flex justify-between items-center px-6 py-4 shadow">
        <div className="flex items-center gap-2 text-xl font-semibold text-indigo-600">
          📋 Task Manager
        </div>

        <div className="flex items-center gap-3">
          <span className="text-gray-700">
            Welcome back, <strong>{user?.name}</strong>!
          </span>

          <button
            onClick={() => navigate("/profile")}
            className="bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600"
          >
            Profile
          </button>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="p-8">
        <button
          onClick={() => setShowCreateTask(true)}
          className="bg-blue-500 text-white px-6 py-2 rounded mb-6 hover:bg-blue-600"
        >
          + Add New Task
        </button>

        {/* Notify Dashboard on task changes */}
        <KanbanBoard onActivityChange={triggerActivityRefresh} />

        <RecentActivity activities={activities} />
      </div>

      {showCreateTask && (
        <CreateTask
          onClose={() => setShowCreateTask(false)}
          onCreated={() => {
            setShowCreateTask(false);
            triggerActivityRefresh(); 
          }}
        />
      )}
    </div>
  );
}
