const Task = require('../models/taskModel')


const createTask = async (req, res) => {
    try {
      const { taskName, assignedTo, startDate, dueDate, status } = req.body;
      
      const newTask = new Task({
        taskName,
        assignedTo,
        startDate,
        dueDate,
        status,
      });
      
      await newTask.save();
      res.status(201).json({
        message: 'Task created successfully',
        task: newTask,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

const getTasks = async (req, res) => {
    try {
      const tasks = await Task.find().populate('assignedTo', 'name'); 
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  const updateTaskStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { status },
        { new: true } // Returns the updated document
      );
  
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.status(200).json({ message: 'Task status updated successfully', task: updatedTask });
    } catch (error) {
      console.error('Error updating task status:', error);
      res.status(500).json({ message: 'Failed to update task status' });
    }
  };



const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;  

        const deletedTask = await Task.findByIdAndDelete(id);  

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const editTask = async (req, res) => {
    const { id } = req.params;
    const { taskName, assignedTo, startDate, dueDate } = req.body;
  
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        id, 
        { taskName, assignedTo, startDate, dueDate },
        { new: true }
      );
  
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.status(200).json({
        message: 'Task updated successfully',
        task: updatedTask,
      });
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ message: error.message });
    }
  };
  
  

module.exports ={
    createTask,
    getTasks,
    updateTaskStatus,
    deleteTask,
    editTask
}