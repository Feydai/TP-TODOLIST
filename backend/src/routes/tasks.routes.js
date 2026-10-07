const express = require('express');
const { createTaskController, getTasksController, getTaskController, updateTaskController, deleteTaskController } = require('../controllers/taskController');
const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();

router.use(requireAuth);
router.post('/', createTaskController);
router.get('/', getTasksController);
router.get('/:id', getTaskController);
router.patch('/:id', updateTaskController);
router.delete('/:id', deleteTaskController);
module.exports = router;