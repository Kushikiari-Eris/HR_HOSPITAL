const express = require('express')
const router = express.Router()
const taskController = require('../controller/taskController')


router.post('/task', taskController.createTask);
router.get('/task', taskController.getTasks);
router.patch('/task/:id/update', taskController.updateTaskStatus);
router.delete('/task/:id/delete', taskController.deleteTask);
router.put('/task/:id/edit', taskController.editTask);



module.exports = router