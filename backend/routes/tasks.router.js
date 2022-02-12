const express = require('express');
const {
  createTask,
  getTasks,
  getTasksByAlphab,
  getTasksByDate,
  getTasksCompleted,
  getTasksNotCompleted,
} = require('../controllers/tasks.controller');
const auth = require('../middlewares/auth');

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', auth, createTask);
router.get('/alphabetical', auth, getTasksByAlphab);
router.get('/date', auth, getTasksByDate);
router.get('/completed', auth, getTasksCompleted);
router.get('/not-completed', auth, getTasksNotCompleted);
router.get('/', auth, getTasks);

module.exports = router;
