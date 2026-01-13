import { deleteTaskPermanently } from "../api/tasks";
import { MdDeleteForever } from "react-icons/md";



export default function TaskCard({ task, onDelete }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTaskPermanently(task._id);
      onDelete(task._id); // update UI
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  return (
    <div
      className="
        bg-gray-100 rounded-lg p-3 shadow-sm
        transition duration-200 ease-in-out
        transform hover:scale-[1.03] hover:shadow-lg
        relative
      "
    >
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 text-red-500 cursor-pointer hover:text-red-700"
        title="Delete task"
      >
        <MdDeleteForever />
      </button>

      <h4 className="font-medium text-gray-800">
        {task.title}
      </h4>

      {task.description && (
        <p className="text-sm text-gray-600 mt-1">
          {task.description}
        </p>
      )}

      {task.due_date && (
        <p className="text-xs text-gray-500 mt-2">
          Due: {new Date(task.due_date).toDateString()}
        </p>
      )}
    </div>
  );
}
