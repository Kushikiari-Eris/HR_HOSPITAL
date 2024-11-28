const TrainingSchedule = require('../models/scheduleTrainingModel');

// Get all training schedules
const getAllSchedules = async (req, res) => {
    try {
        const schedules = await TrainingSchedule.find();
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single training schedule by ID
const getScheduleById = async (req, res) => {
    try {
        const schedule = await TrainingSchedule.findById(req.params.id);
        if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
        res.status(200).json(schedule);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new training schedule
const createSchedule = async (req, res) => {
    const { programName, trainer, date, time, duration, location, participants, remarks } = req.body;

    try {
        const newSchedule = new TrainingSchedule({
            programName,
            trainer,
            date,
            time,
            duration,
            location,
            participants,
            remarks
        });

        const savedSchedule = await newSchedule.save();
        res.status(201).json(savedSchedule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing training schedule
const updateSchedule = async (req, res) => {
    try {
        const updatedSchedule = await TrainingSchedule.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedSchedule) return res.status(404).json({ message: 'Schedule not found' });
        res.status(200).json(updatedSchedule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a training schedule
const deleteSchedule = async (req, res) => {
    try {
        const deletedSchedule = await TrainingSchedule.findByIdAndDelete(req.params.id);
        if (!deletedSchedule) return res.status(404).json({ message: 'Schedule not found' });
        res.status(200).json({ message: 'Schedule deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllSchedules,
    getScheduleById,
    createSchedule,
    updateSchedule,
    deleteSchedule
};
