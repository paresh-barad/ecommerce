const express = require('express');
const router = express.Router();
const Mongoose = require('mongoose');

// Bring in Models & Utils
const Order = require('../../models/order');
const auth = require('../../middleware/auth');

router.post('/add', auth, async (req, res) => {
  
});

// fetch orders api
router.get('/', auth, async (req, res) => {
  
});

module.exports = router;
