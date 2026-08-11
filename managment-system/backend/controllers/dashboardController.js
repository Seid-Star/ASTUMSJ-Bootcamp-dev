const Member = require("../models/Member");
const Attendance = require("../models/Attendance");
const getDashboardStats = async (req, res, next) => {
  try {
    const [totalMembers, divisions, totalAttendance, presentAttendance] =
      await Promise.all([
        Member.countDocuments(),
        Member.distinct("division"),
        Attendance.countDocuments(),
        Attendance.countDocuments({ status: "Present" }),
      ]);

    const totalDivisions = divisions.length;
    const attendanceRate =
      totalAttendance === 0
        ? 0
        : Math.round((presentAttendance / totalAttendance) * 100);
    const upcomingSessions = 0;

    res.status(200).json({
      success: true,
      data: {
        totalMembers,
        totalDivisions,
        attendanceRate,
        upcomingSessions,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAttendanceOverview = async (req, res, next) => {
  try {
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;

    const data = await Attendance.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(previousYear, 0, 1),
            $lt: new Date(currentYear + 1, 0, 1),
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          total: { $sum: 1 },
          present: {
            $sum: {
              $cond: [{ $eq: ["$status", "Present"] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          rate: {
            $cond: [
              { $eq: ["$total", 0] },
              0,
              {
                $round: [
                  {
                    $multiply: [{ $divide: ["$present", "$total"] }, 100],
                  },
                  0,
                ],
              },
            ],
          },
        },
      },
      {
        $sort: {
          year: 1,
          month: 1,
        },
      },
    ]);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const overview = months.map((month, index) => {
      const thisYearData = data.find(
        (item) => item.year === currentYear && item.month === index + 1,
      );
      const lastYearData = data.find(
        (item) => item.year === previousYear && item.month === index + 1,
      );

      return {
        month,
        thisYear: thisYearData?.rate || 0,
        lastYear: lastYearData?.rate || 0,
      };
    });

    res.status(200).json({
      success: true,
      data: overview,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
  getAttendanceOverview,
};
