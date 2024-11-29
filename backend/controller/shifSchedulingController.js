const ShiftSchedule = require('../models/shiftSchedulingModel')


const createShift = async (req, res) => {
  const { employeeName, shiftDate, shiftStartTime, shiftEndTime, position } = req.body;
  try {
    const newShift = new ShiftSchedule({ employeeName, shiftDate, shiftStartTime, shiftEndTime, position });
    await newShift.save();
    res.status(201).json(newShift);
  } catch (err) {
    res.status(400).json({ message: 'Error creating shift', error: err });
  }
};


const fetchShifts = async (req, res) => {
  try {
    const shifts = await ShiftSchedule.find();
    res.status(200).json(shifts);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching shifts', error: err });
  }
};


const updateShift = async (req, res) => {
  const { id } = req.params;
  const { employeeName, shiftDate, shiftStartTime, shiftEndTime, position } = req.body;
  try {
    const updatedShift = await ShiftSchedule.findByIdAndUpdate(
      id,
      { employeeName, shiftDate, shiftStartTime, shiftEndTime, position },
      { new: true }
    );
    res.status(200).json(updatedShift);
  } catch (err) {
    res.status(400).json({ message: 'Error updating shift', error: err });
  }
};


const deleteShift = async (req, res) => {
  const { id } = req.params;
  try {
    await ShiftSchedule.findByIdAndDelete(id);
    res.status(200).json({ message: 'Shift deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting shift', error: err });
  }
};

module.exports = {
    createShift,
    fetchShifts,
    updateShift,
    deleteShift
}
