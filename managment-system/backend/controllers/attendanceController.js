const Attendance = require("../models/Attendance");
const getAttendance = async (req, res, next) => {
  try {
    const { group, date, page = 1, limit = 10 } = req.query;
    const query = {};
    if (group) {
      query.group = group;
    }
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);
      query.date = {
        $gte: start,
        $lt: end,
      };
    }
    const pageNumber = Math.max(Number(page), 1);
    const limitNumber = Math.max(Number(limit), 1);
    const skip = (pageNumber - 1) * limitNumber;
    const [data, total] = await Promise.all([
      Attendance.find(query)
        .populate("member", "name memberId")
        .populate("markedBy", "fullName email")
        .skip(skip)
        .limit(limitNumber)
        .sort({ date: -1 }),
      Attendance.countDocuments(query),
    ]);
    const totalPages = Math.ceil(total / limitNumber);
    res.status(200).json({
      data,
      total,
      page: pageNumber,
      totalPages,
    });
  } catch (error) {
    next(error);
  }
};
const markAttendance = async (req, res, next) => {
  try {
    const { attendance } = req.body;
    if (!Array.isArray(attendance) || attendance.length === 0) {
      return res.status(400).json({
        message: "Attendance array is required",
      });
    }
    const today = new Date();
    const operations = attendance.map((item) => ({
      updateOne: {
        filter: {
          member: item.memberId,
          date: {
            $gte: new Date(today.setHours(0, 0, 0, 0)),
            $lt: new Date(new Date().setHours(24, 0, 0, 0)),
          },
        },
        update: {
          member: item.memberId,
          status: item.status,
          excused: item.excused ?? false,
          group: req.body.group || "Group 1",
          markedBy: req.user._id,
          date: new Date(),
        },
        upsert: true,
      },
    }));
    await Attendance.bulkWrite(operations);
    res.status(200).json({
      message: "Attendance saved successfully",
    });
  } catch (error) {
    next(error);
  }
};
const updateAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!attendance) {
      return res.status(404).json({
        message: "Attendance record not found",
      });
    }
    res.status(200).json(attendance);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAttendance,
  markAttendance,
  updateAttendance,
};
