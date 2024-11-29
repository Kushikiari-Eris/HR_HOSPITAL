// models/Report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Task', 
  },
  reportDetails: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
