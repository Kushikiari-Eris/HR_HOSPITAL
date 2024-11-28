const mongoose = require('mongoose');

const trainingScheduleSchema = new mongoose.Schema({
    programName: { type: String, required: true },
    trainer: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    duration: { type: String, required: true },
    location: { type: String, required: true },
    participants: { type: [String], required: true },
    remarks: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('TrainingSchedule', trainingScheduleSchema);
