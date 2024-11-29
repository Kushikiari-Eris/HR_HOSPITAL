// controllers/reportController.js
const Report = require('../models/reportsModel');

// Create a new report
const createReport = async (req, res) => {
  try {
    const { taskId, reportDetails } = req.body;

    // Validate input
    if (!taskId || !reportDetails) {
      return res.status(400).json({ message: 'Task ID and report details are required.' });
    }

    const report = new Report({ taskId, reportDetails });
    await report.save();

    res.status(201).json({ message: 'Report created successfully.', report });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create report.', error: error.message });
  }
};

// Get all reports
const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().populate('taskId', 'name'); // Populates task details if required
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reports.', error: error.message });
  }
};

// Get a report by ID
const getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id).populate('taskId', 'name');

    if (!report) {
      return res.status(404).json({ message: 'Report not found.' });
    }

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch report.', error: error.message });
  }
};

// Update a report
const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { reportDetails } = req.body;

    const report = await Report.findByIdAndUpdate(id, { reportDetails }, { new: true });

    if (!report) {
      return res.status(404).json({ message: 'Report not found.' });
    }

    res.status(200).json({ message: 'Report updated successfully.', report });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update report.', error: error.message });
  }
};

// Delete a report
const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await Report.findByIdAndDelete(id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found.' });
    }

    res.status(200).json({ message: 'Report deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete report.', error: error.message });
  }
};

module.exports = {
    createReport,
    getAllReports,
    getReportById,
    updateReport,
    deleteReport
}
