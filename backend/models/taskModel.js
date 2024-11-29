const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  assignedTo: {
    type:String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed', 'Pending'],
    default: 'Not Started',
  },
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
