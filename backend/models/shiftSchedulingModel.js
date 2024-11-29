const mongoose = require('mongoose');

const shiftSchedulingSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
  },
  shiftDate: {
    type: Date,
    required: true,
  },
  shiftStartTime: {
    type: String,
    required: true,
  },
  shiftEndTime: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('ShiftSchedule', shiftSchedulingSchema);
