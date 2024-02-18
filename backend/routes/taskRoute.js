const express = require('express');
const {
  createTask,
  deleteTask,
  updateTask,
  getTasks,
} = require('../controllers/taskController');
const { protect } = require('../controllers/authController');

const router = express.Router();

router.use(protect);

router.get('/', getTasks);
router.post('/', createTask);
router.post('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

module.exports = router;
