import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { MdPendingActions } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { FaCheckCircle } from "react-icons/fa";

import api from "../api/axios";
import TaskCard from "./TaskCard";

/* ================= COLUMN CONFIG ================= */
const COLUMNS = [
  {
    id: "pending",
    title: "Pending",
    icon: MdPendingActions,
    color: "text-orange-500"
  },
  {
    id: "in-progress",
    title: "In Progress",
    icon: GiProgression,
    color: "text-blue-500"
  },
  {
    id: "completed",
    title: "Completed",
    icon: FaCheckCircle,
    color: "text-green-600"
  }
];

export default function KanbanBoard() {
  const [tasks, setTasks] = useState([]);

  /* ================= FETCH TASKS ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks");
        setTasks(res.data);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      }
    };

    fetchTasks();
  }, []);

  /* ================= DELETE TASK (UI ONLY) ================= */
  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task._id !== taskId));
  };

  /* ================= DRAG & DROP ================= */
  const onDragEnd = async (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const newStatus = destination.droppableId;

    try {
      await api.put(`/tasks/${draggableId}`, { status: newStatus });

      setTasks((prev) =>
        prev.map((task) =>
          task._id === draggableId
            ? { ...task, status: newStatus }
            : task
        )
      );
    } catch (err) {
      console.error("Failed to update task status", err);
    }
  };

  /* ================= AUTH CHECK ================= */
  if (!localStorage.getItem("token")) {
    return (
      <div className="p-6 text-center text-gray-500">
        Please log in to view your tasks.
      </div>
    );
  }

  /* ================= EMPTY STATE ================= */
  if (tasks.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p className="text-lg font-medium">No tasks yet 👋</p>
        <p className="text-sm mt-2">
          Create your first task to get started.
        </p>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COLUMNS.map((column) => {
          const columnTasks = tasks.filter(
            (task) => task.status === column.id
          );

          const Icon = column.icon;

          return (
            <Droppable droppableId={column.id} key={column.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white rounded-xl shadow-md p-4 min-h-[420px]"
                >
                  {/* ===== COLUMN HEADER ===== */}
                  <div
                    className={`flex items-center justify-between mb-3 ${column.color}`}
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      <Icon size={20} />
                      <span>{column.title}</span>
                    </div>

                    <span className="text-sm text-gray-500">
                      {columnTasks.length}
                    </span>
                  </div>

                  <hr className="mb-4" />

                  {/* ===== TASKS ===== */}
                  {columnTasks.map((task, index) => (
                    <Draggable
                      draggableId={task._id}
                      index={index}
                      key={task._id}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-3"
                        >
                          <TaskCard
                            task={task}
                            onDelete={handleDeleteTask}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
}
