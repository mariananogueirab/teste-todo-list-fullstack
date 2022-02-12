const express = require('express');
const {createUser} = require('../controllers/user.controller');

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', createUser);

module.exports = router;
