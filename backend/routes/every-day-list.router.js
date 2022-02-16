const express = require('express');
const {
  createEveryDayTask,
  getTasks,
  getTasksByAlphab,
  update,
  updateCompletedTask,
  taskDelete,
} = require('../controllers/every-day-list.controller');
const auth = require('../middlewares/auth');

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', auth, createEveryDayTask);
router.get('/', auth, getTasks);
router.get('/alphabetical', auth, getTasksByAlphab);
router.put('/:id', auth, update);
router.put('/checked/:id', auth, updateCompletedTask);
router.delete('/:id', auth, taskDelete);

module.exports = router;
