const express = require('express');
const taskController = require('../controllers/taskControllers');
const authController = require('../controllers/authController');

const router = express.Router();

//TASKS´ ROUTES
router
  .route('/')
  .get(taskController.getAllTasks)
  .post(taskController.createTask);
router
  .route('/:id')
  .get(taskController.getTask)
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;
