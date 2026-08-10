import { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalDivisions: 0,
    attendanceRate: 0,
    upcomingSessions: 0,
  });

  const [attendanceOverview, setAttendanceOverview] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [statsResponse, attendanceResponse] = await Promise.all([
          api.get("/dashboard/stats"),
          api.get("/dashboard/attendance-overview"),
        ]);

        setStats(statsResponse.data);
        setAttendanceOverview(attendanceResponse.data);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message || "Failed to load dashboard data",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="rounded-lg bg-red-100 p-4 text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-gray-500">Total Members</p>
          <h2 className="mt-2 text-3xl font-bold">{stats.totalMembers}</h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-gray-500">Total Divisions</p>
          <h2 className="mt-2 text-3xl font-bold">{stats.totalDivisions}</h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-gray-500">Attendance Rate</p>
          <h2 className="mt-2 text-3xl font-bold">{stats.attendanceRate}%</h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-gray-500">Upcoming Sessions</p>
          <h2 className="mt-2 text-3xl font-bold">{stats.upcomingSessions}</h2>
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">Attendance Overview</h2>

        <div className="space-y-2">
          {attendanceOverview.map((item) => (
            <div
              key={item.month}
              className="flex justify-between border-b py-2"
            >
              <span>{item.month}</span>

              <span>
                This year: {item.thisYear}% | Last year: {item.lastYear}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
