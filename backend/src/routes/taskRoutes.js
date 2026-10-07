const express = require('express');
const { createTaskController, getTasksController, updateTaskController, deleteTaskController } = require('../controllers/taskController');

const router = express.Router();

router.post('/', createTaskController);
router.get('/', getTasksController);
router.patch('/:id', updateTaskController);
router.delete('/:id', deleteTaskController);
module.exports = router;