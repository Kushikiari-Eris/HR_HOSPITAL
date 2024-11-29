const express = require('express')
const router = express.Router()
const reportController = require('../controller/reportsController')

router.post('/reports', reportController.createReport);     
router.get('/reports', reportController.getAllReports);         
router.get('/reports/:id', reportController.getReportById);      
router.put('/reports/:id', reportController.updateReport);        
router.delete('/reports/:id', reportController.deleteReport);     

module.exports = router