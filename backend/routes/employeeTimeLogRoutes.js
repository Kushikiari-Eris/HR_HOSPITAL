const express = require('express');
const router = express.Router();
const employeeTimeLogController = require('../controller/employeeTimeLogController')


router.get('/log', employeeTimeLogController.getAllTimeLogs);
router.get('/log/:id', employeeTimeLogController.getTimeLogsByEmployee);
router.post('/log', employeeTimeLogController.createTimeLog);
router.put('/log/:id', employeeTimeLogController.updateTimeLog);
router.delete('/log/:id', employeeTimeLogController.deleteTimeLog);

module.exports = router;
