const mongoose = require('mongoose');

const employeeTimeLogSchema = new mongoose.Schema({
  employeeId: {
   type: String,
   required: [true, 'Employee ID is required']
  },
  employeeName: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  clockIn: {
    type: String,
    required: false
  },
  clockOut: {
    type: String,
    required: false
  },
  breakTime: {
    type: Number, // in hours
    default: 0
  },
  totalHoursWorked: {
    type: Number, // in hours
    required: false
  },
  overtimeHours: {
    type: Number, // in hours
    default: 0
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Late'],
    default: 'Present'
  },
  remarks: {
    type: String,
    default: ''
  }
});

const EmployeeTimeLog = mongoose.model('EmployeeTimeLog', employeeTimeLogSchema);

module.exports = EmployeeTimeLog;
