const EmployeeTimeLog = require('../models/employeeTimeLogModel');

// Get all employee time logs
const getAllTimeLogs = async (req, res) => {
  try {
    const timeLogs = await EmployeeTimeLog.find().populate('employeeId', 'name department');
    res.status(200).json({
      success: true,
      data: timeLogs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get time logs by employee ID
const getTimeLogsByEmployee = async (req, res) => {
  try {
    const timeLogs = await EmployeeTimeLog.find({ employeeId: req.params.employeeId }).populate('employeeId', 'name department');
    res.status(200).json({
      success: true,
      data: timeLogs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new time log entry
const createTimeLog = async (req, res) => {
  try {
    const { employeeId, employeeName, department, date, clockIn, clockOut, breakTime, totalHoursWorked, overtimeHours, status, remarks } = req.body;
    const timeLog = new EmployeeTimeLog({
      employeeId,
      employeeName,
      department,
      date,
      clockIn,
      clockOut,
      breakTime,
      totalHoursWorked,
      overtimeHours,
      status,
      remarks
    });

    await timeLog.save();
    res.status(201).json({
      success: true,
      data: timeLog
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update a time log entry
const updateTimeLog = async (req, res) => {
  try {
    const timeLog = await EmployeeTimeLog.findById(req.params.id);
    if (!timeLog) {
      return res.status(404).json({ success: false, message: 'Time log not found' });
    }

    const { clockIn, clockOut, breakTime, totalHoursWorked, overtimeHours, status, remarks } = req.body;
    timeLog.clockIn = clockIn || timeLog.clockIn;
    timeLog.clockOut = clockOut || timeLog.clockOut;
    timeLog.breakTime = breakTime || timeLog.breakTime;
    timeLog.totalHoursWorked = totalHoursWorked || timeLog.totalHoursWorked;
    timeLog.overtimeHours = overtimeHours || timeLog.overtimeHours;
    timeLog.status = status || timeLog.status;
    timeLog.remarks = remarks || timeLog.remarks;

    await timeLog.save();

    res.status(200).json({
      success: true,
      data: timeLog
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a time log entry
const deleteTimeLog = async (req, res) => {
  try {
    const timeLog = await EmployeeTimeLog.findById(req.params.id);
    if (!timeLog) {
      return res.status(404).json({ success: false, message: 'Time log not found' });
    }

    await timeLog.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Time log deleted'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
    getAllTimeLogs,
    getTimeLogsByEmployee,
    createTimeLog,
    updateTimeLog,
    deleteTimeLog
}
