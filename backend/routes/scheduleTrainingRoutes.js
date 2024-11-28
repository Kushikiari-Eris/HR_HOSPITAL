const express = require('express')
const scheduleTraining = require('../controller/scheduleTrainingController')
const router = express.Router()

router.get('/schedule', scheduleTraining.getAllSchedules)
router.get('/schedule/:id', scheduleTraining.getScheduleById)
router.post('/schedule', scheduleTraining.createSchedule)
router.put('/schedule/:id', scheduleTraining.updateSchedule)
router.delete('/schedule/:id', scheduleTraining.deleteSchedule)

module.exports = router