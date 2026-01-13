export default function RecentActivity({ activities }) {
  const getIcon = (type) => {
    if (type === "CREATE") return "✨";
    if (type === "UPDATE") return "🔄";
    if (type === "DELETE") return "🗑️";
    return "📌";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-10">
      <h2 className="text-xl font-semibold mb-6">
        Recent Activity
      </h2>

      <div className="space-y-4">
        {activities.map((act) => (
          <div
            key={act._id}
            className="flex gap-4 bg-gray-50 p-4 rounded-lg"
          >
            <div className="text-2xl">
              {getIcon(act.type)}
            </div>

            <div>
              <p className="font-medium text-gray-800">
                {act.message}
              </p>

              {act.meta?.from && (
                <div className="text-sm text-gray-600 mt-1">
                  <span className="bg-gray-200 px-2 py-0.5 rounded">
                    {act.meta.from}
                  </span>
                  {" → "}
                  <span className="bg-gray-200 px-2 py-0.5 rounded">
                    {act.meta.to}
                  </span>
                </div>
              )}

              <p className="text-xs text-gray-500 mt-1">
                {new Date(act.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
