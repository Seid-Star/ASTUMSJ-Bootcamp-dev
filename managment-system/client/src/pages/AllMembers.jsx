import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMembers } from "../services/memberService";
const AllMembers = () => {
  const { user } = useAuth();
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchMembers = async () => {
        try {
          setLoading(true);
          setError("");
          const response = await getMembers({
            search,
            ...filters,
            page,
            pageSize,
          });
          setMembers(response.data || []);
        } catch (err) {
          console.error(err);
          setError(err.response?.data?.message || "Failed to load members");
        } finally {
          setLoading(false);
        }
      };
      fetchMembers();
    }, 300);
    return () => clearTimeout(timer);
  }, [search, filters, page, pageSize]);
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">All Members</h1>
          <p className="text-gray-500">Manage all members</p>
        </div>
        {user?.role === "admin" && (
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
            Add Member
          </button>
        )}
      </div>
      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-600">
          {error}
        </div>
      )}
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search members..."
          className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {loading ? (
        <p>Loading members...</p>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white shadow">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="p-4">Name</th>
                <th className="p-4">Member ID</th>
                <th className="p-4">Division</th>
                <th className="p-4">Attendance</th>
                <th className="p-4">Year</th>
                <th className="p-4">Status</th>

                {user?.role === "admin" && <th className="p-4">Action</th>}
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member._id} className="border-b">
                  <td className="p-4">{member.fullName || member.name}</td>
                  <td className="p-4">{member.memberId}</td>
                  <td className="p-4">{member.division}</td>
                  <td className="p-4">{member.attendance || "N/A"}</td>
                  <td className="p-4">{member.year}</td>
                  <td className="p-4">{member.status}</td>
                  {user?.role === "admin" && (
                    <td className="p-4">
                      <button className="mr-2 text-blue-600">Edit</button>
                      <button className="text-red-600">Delete</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllMembers;
