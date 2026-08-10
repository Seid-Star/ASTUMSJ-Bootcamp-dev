const statusStyles = {
  Active: "bg-green-100 text-green-700",
  "Needs Attention": "bg-yellow-100 text-yellow-700",
  Inactive: "bg-red-100 text-red-700",
  "On Campus": "bg-green-100 text-green-700",
  "Off Campus": "bg-yellow-100 text-yellow-700",
  Withdrawn: "bg-purple-100 text-purple-700",
};
const StatusPill = ({ status }) => {
  const style = statusStyles[status] || "bg-gray-100 text-gray-700";
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${style}`}>
      {status}
    </span>
  );
};
export default StatusPill;
