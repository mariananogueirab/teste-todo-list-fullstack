const express = require('express');
const {
  createCommitment,
  getCommitments,
  getCommitmentsByDate,
  update,
  commitmentDelete,
} = require('../controllers/commitments.controller');
const auth = require('../middlewares/auth');

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', auth, createCommitment);
router.get('/', auth, getCommitments);
router.get('/date', auth, getCommitmentsByDate);
router.put('/:id', update);
router.delete('/:id', commitmentDelete);

module.exports = router;
