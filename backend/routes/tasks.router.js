const express = require('express');
const {createTask} = require('../controllers/tasks.controller');

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', createTask);

module.exports = router;
