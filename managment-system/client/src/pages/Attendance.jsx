import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAttendance, markAttendance } from "../services/attendanceService";
import { getMembers } from "../services/memberService";

const Attendance = () => {
  const { user } = useAuth();

  const [group, setGroup] = useState("Group 1");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const canEdit = user?.role === "admin" || user?.role === "supervisor";

  useEffect(() => {
    fetchAttendance();
  }, [group, date]);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const [membersResponse, attendanceResponse] = await Promise.all([
        getMembers({
          page: 1,
          pageSize: 100,
        }),
        getAttendance({
          group,
          date,
          page: 1,
          pageSize: 100,
        }),
      ]);

      const members = membersResponse.data || [];
      const records = attendanceResponse.data || [];

      const merged = members.map((member) => {
        const record = records.find((item) => item.member?._id === member._id);

        return {
          member,
          _id: record?._id || member._id,
          status: record?.status || "",
          excused: record?.excused || false,
          excuseReason: record?.excuseReason || "",
        };
      });

      setAttendance(merged);
    } catch (err) {
      console.error(err);

      setError(err.response?.data?.message || "Failed to load attendance");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = (index, status) => {
    if (!canEdit) return;

    setAttendance((current) =>
      current.map((item, i) =>
        i === index
          ? {
              ...item,
              status,
            }
          : item,
      ),
    );
  };

  const updateExcuse = (index) => {
    if (!canEdit) return;

    const reason = window.prompt("Enter excuse reason:");

    if (reason === null) return;

    setAttendance((current) =>
      current.map((item, i) =>
        i === index
          ? {
              ...item,
              excused: true,
              excuseReason: reason,
            }
          : item,
      ),
    );
  };

  const saveAttendance = async () => {
    if (!canEdit) return;

    const data = attendance
      .filter((item) => item.status)
      .map((item) => ({
        memberId: item.member?._id || item.memberId,
        status: item.status,
        excused: item.excused || false,
        excuseReason: item.excuseReason || "",
      }));

    if (data.length === 0) {
      setError("Please mark attendance for at least one member.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await markAttendance({
        group,
        attendance: data,
      });

      setSuccess("Attendance saved successfully.");

      await fetchAttendance();
    } catch (err) {
      console.error(err);

      setError(err.response?.data?.message || "Failed to save attendance");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 text-gray-900 dark:text-white">
      <div className="mb-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          All Attendance &gt; Attendance &gt; {group}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <h1 className="text-2xl font-bold ">Attendance</h1>

          {canEdit && (
            <button
              onClick={saveAttendance}
              disabled={saving}
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          )}
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
            Group
          </label>

          <select
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="Group 1">Group 1</option>
            <option value="Group 2">Group 2</option>
            <option value="Group 3">Group 3</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
            Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-600 dark:bg-red-900/30 dark:text-red-300">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded-lg bg-green-100 p-4 text-green-600 dark:bg-green-900/30 dark:text-green-300">
          {success}
        </div>
      )}

      {loading ? (
        <p className="text-gray-700 dark:text-gray-300">
          Loading attendance...
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white shadow dark:bg-gray-800">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-700 dark:border-gray-700 dark:text-gray-200">
                <th className="p-4">Member Name</th>

                <th className="p-4">Attendance</th>

                <th className="p-4">Excused</th>
              </tr>
            </thead>

            <tbody>
              {attendance.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="p-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    No attendance records found.
                  </td>
                </tr>
              ) : (
                attendance.map((item, index) => (
                  <tr
                    key={item._id}
                    className="border-b border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-200"
                  >
                    <td className="p-4 font-medium">
                      {item.member?.name ||
                        item.member?.fullName ||
                        "Unknown Member"}
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          disabled={!canEdit}
                          onClick={() => updateStatus(index, "Present")}
                          className={`rounded-lg px-4 py-2 transition ${
                            item.status === "Present"
                              ? "bg-green-600 text-white"
                              : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-200"
                          } ${
                            !canEdit
                              ? "cursor-not-allowed opacity-50"
                              : "hover:opacity-90"
                          }`}
                        >
                          Present
                        </button>

                        <button
                          disabled={!canEdit}
                          onClick={() => updateStatus(index, "Absent")}
                          className={`rounded-lg px-4 py-2 transition ${
                            item.status === "Absent"
                              ? "bg-red-600 text-white"
                              : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-200"
                          } ${
                            !canEdit
                              ? "cursor-not-allowed opacity-50"
                              : "hover:opacity-90"
                          }`}
                        >
                          Absent
                        </button>
                      </div>
                    </td>

                    <td className="p-4">
                      <button
                        disabled={!canEdit}
                        onClick={() => updateExcuse(index)}
                        className={`rounded-lg px-4 py-2 transition ${
                          item.excused
                            ? "bg-yellow-500 text-white"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-200"
                        } ${
                          !canEdit
                            ? "cursor-not-allowed opacity-50"
                            : "hover:opacity-90"
                        }`}
                      >
                        {item.excused ? "Excused" : "Heads Up"}
                      </button>
                    </td>
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
export default Attendance;
