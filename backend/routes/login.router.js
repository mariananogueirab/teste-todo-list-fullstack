const express = require('express');
const {login} = require('../controllers/login.controller');

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', login);

module.exports = router;
