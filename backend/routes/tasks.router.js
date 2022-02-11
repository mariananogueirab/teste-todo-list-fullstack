const express = require('express');
const {createTask, getTasks} = require('../controllers/tasks.controller');
const auth = require('../middlewares/auth');

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', auth, createTask);
router.get('/', auth, getTasks);

module.exports = router;
