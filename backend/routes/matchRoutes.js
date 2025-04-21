
const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.post('/create', matchController.createMatch);
router.post('/:matchId/delivery', matchController.addDelivery);
router.get('/:matchId', matchController.getScore);

module.exports = router;
