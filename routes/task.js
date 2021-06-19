const { getAllTasks, createTask, updateTask, deleteTask, getSingleTask } = require('../controllers/task');
const protect = require('../middleware/protect');

const router = require('express').Router();

router.route('/project/:id')
    .get(getAllTasks)
    .post(protect, createTask);

router.route('/:taskId/project/:id')
    .get(getSingleTask)
    .put(protect, updateTask)
    .delete(protect, deleteTask);
    

module.exports = router