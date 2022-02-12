const express = require('express');
const {
  createTask,
  getTasks,
  getTasksByAlphab,
  getTasksByDate,
  getTasksByStatus,
  update,
  updateCompletedTask,
} = require('../controllers/tasks.controller');
const auth = require('../middlewares/auth');

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', auth, createTask);
router.get('/alphabetical', auth, getTasksByAlphab);
router.get('/date', auth, getTasksByDate);
router.get('/status', auth, getTasksByStatus);
router.get('/', auth, getTasks);
router.put('/:id', auth, update);
router.put('/completed/:id', auth, updateCompletedTask);

module.exports = router;
