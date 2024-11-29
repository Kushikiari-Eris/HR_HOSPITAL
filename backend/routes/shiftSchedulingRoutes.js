// routes/shiftScheduleRoutes.js
const express = require('express');
const router = express.Router();
const shiftScheduleController = require('../controller/shifSchedulingController');


router.post('/shift', shiftScheduleController.createShift);
router.get('/shift', shiftScheduleController.fetchShifts);
router.put('/shift/:id', shiftScheduleController.updateShift);
router.delete('/shift/:id', shiftScheduleController.deleteShift);

module.exports = router;
