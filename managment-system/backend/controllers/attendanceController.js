const Attendance = require("../models/Attendance");

/**
 * @desc    Get paginated attendance records with optional filtering
 * @route   GET /api/attendance
 * @access  Private
 */
const getAttendance = async (req, res, next) => {
  try {
    const { group, date, search, page = 1, limit = 10 } = req.query;
    const query = {};

    if (group) {
      query.group = group;
    }

    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      query.date = {
        $gte: start,
        $lte: end,
      };
    }

    const pageNumber = Math.max(Number(page), 1);
    const limitNumber = Math.max(Number(limit), 1);
    const skip = (pageNumber - 1) * limitNumber;

    const [data, total] = await Promise.all([
      Attendance.find(query)
        .populate("member", "name email memberId")
        .populate("markedBy", "fullName name email")
        .skip(skip)
        .limit(limitNumber)
        .sort({ date: -1 }),
      Attendance.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / limitNumber) || 1;

    res.status(200).json({
      success: true,
      data,
      total,
      page: pageNumber,
      totalPages,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Bulk mark or update attendance for a specific day
 * @route   POST /api/attendance
 * @access  Private (Admin / Supervisor)
 */
const markAttendance = async (req, res, next) => {
  try {
    const { attendance, group, date } = req.body;

    if (!Array.isArray(attendance) || attendance.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Attendance array is required and cannot be empty",
      });
    }

    // Set range boundaries safely without mutating the original Date object inside mapping
    const baseDate = date ? new Date(date) : new Date();

    const startOfDay = new Date(baseDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(baseDate);
    endOfDay.setHours(23, 59, 59, 999);

    const operations = attendance.map((item) => {
      const memberId = item.member || item.memberId;

      return {
        updateOne: {
          filter: {
            member: memberId,
            date: {
              $gte: startOfDay,
              $lte: endOfDay,
            },
          },
          update: {
            $set: {
              member: memberId,
              status: item.status,
              excused: item.excused ?? false,
              excuseReason: item.excuseReason || "",
              group: group || item.group || "Group 1",
              markedBy: req.user?._id,
              date: baseDate,
            },
          },
          upsert: true,
        },
      };
    });

    await Attendance.bulkWrite(operations);

    res.status(200).json({
      success: true,
      message: "Attendance records saved successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a single attendance record by ID
 * @route   PUT /api/attendance/:id
 * @access  Private (Admin)
 */
const updateAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("member", "name email memberId")
      .populate("markedBy", "fullName name email");

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found",
      });
    }

    res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete single attendance record
 * @route   DELETE /api/attendance/:id
 * @access  Private (Admin)
 */
const deleteAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Attendance record deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAttendance,
  markAttendance,
  updateAttendance,
  deleteAttendance,
};