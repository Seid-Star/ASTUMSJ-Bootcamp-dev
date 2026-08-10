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
    <div className="p-6 text-gray-900 dark:text-white">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">All Members</h1>

          <p className="text-gray-500 dark:text-gray-400">Manage all members</p>
        </div>

        {user?.role === "admin" && (
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
            Add Member
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-600 dark:bg-red-900/30 dark:text-red-300">
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
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
        />
      </div>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading members...</p>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white shadow dark:bg-gray-800">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-left dark:border-gray-700">
                <th className="p-4 text-gray-700 dark:text-gray-200">Name</th>

                <th className="p-4 text-gray-700 dark:text-gray-200">
                  Member ID
                </th>

                <th className="p-4 text-gray-700 dark:text-gray-200">
                  Division
                </th>

                <th className="p-4 text-gray-700 dark:text-gray-200">
                  Attendance
                </th>

                <th className="p-4 text-gray-700 dark:text-gray-200">Year</th>

                <th className="p-4 text-gray-700 dark:text-gray-200">Status</th>

                {user?.role === "admin" && (
                  <th className="p-4 text-gray-700 dark:text-gray-200">
                    Action
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {members.length === 0 ? (
                <tr>
                  <td
                    colSpan={user?.role === "admin" ? 7 : 6}
                    className="p-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    No members found.
                  </td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr
                    key={member._id}
                    className="border-b border-gray-200 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50"
                  >
                    <td className="p-4 text-gray-900 dark:text-white">
                      {member.fullName || member.name}
                    </td>

                    <td className="p-4 text-gray-700 dark:text-gray-300">
                      {member.memberId}
                    </td>

                    <td className="p-4 text-gray-700 dark:text-gray-300">
                      {member.division}
                    </td>

                    <td className="p-4 text-gray-700 dark:text-gray-300">
                      {member.attendance || "N/A"}
                    </td>

                    <td className="p-4 text-gray-700 dark:text-gray-300">
                      {member.year || "N/A"}
                    </td>

                    <td className="p-4 text-gray-700 dark:text-gray-300">
                      {member.status || "N/A"}
                    </td>

                    {user?.role === "admin" && (
                      <td className="p-4">
                        <button className="mr-3 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                          Edit
                        </button>

                        <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllMembers;
