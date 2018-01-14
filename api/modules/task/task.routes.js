const router = require('express').Router();
const TaskController = require('./task.controller');

router.get('/', TaskController.getAllTasks);
router.get('/:id', TaskController.getTask);
router.post('/', TaskController.createTask);
router.patch('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

module.exports = router;