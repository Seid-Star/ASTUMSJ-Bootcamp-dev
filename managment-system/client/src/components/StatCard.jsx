const StatCard = ({
  icon,
  label,
  value,
  percentage,
  isPositive = true,
  date,
}) => {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
          {icon}
        </div>
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            isPositive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {isPositive ? "▲" : "▼"} {percentage}%
        </span>
      </div>
      <p className="mt-4 text-sm text-gray-500">{label}</p>
      <h2 className="mt-1 text-3xl font-bold">{value}</h2>
      <p className="mt-2 text-xs text-gray-400">Update: {date}</p>
    </div>
  );
};
export default StatCard;
