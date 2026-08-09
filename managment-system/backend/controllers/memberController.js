const Member = require("../models/Member");
const getMembers = async (req, res, next) => {
  try {
    const { search = "", division, status, page = 1, limit = 10 } = req.query;
    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { memberId: { $regex: search, $options: "i" } },
      ];
    }
    if (division) {
      query.division = division;
    }
    if (status) {
      query.attendanceStatus = status;
    }
    const pageNumber = Math.max(Number(page), 1);
    const limitNumber = Math.max(Number(limit), 1);
    const skip = (pageNumber - 1) * limitNumber;
    const [data, total] = await Promise.all([
      Member.find(query).skip(skip).limit(limitNumber).sort({ createdAt: -1 }),
      Member.countDocuments(query),
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
const getMemberById = async (req, res, next) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }
    res.status(200).json(member);
  } catch (error) {
    next(error);
  }
};
const createMember = async (req, res, next) => {
  try {
    const member = await Member.create(req.body);
    res.status(201).json(member);
  } catch (error) {
    next(error);
  }
};
const updateMember = async (req, res, next) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }
    res.status(200).json(member);
  } catch (error) {
    next(error);
  }
};
const deleteMember = async (req, res, next) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }
    res.status(200).json({
      message: "Member deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
};
