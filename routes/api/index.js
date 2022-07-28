const router = require('express').Router();

const authRoutes = require('./auth');
const sellerRoutes = require('./seller')
const buyerRoutes = require('./buyer')

router.use('/auth', authRoutes);
router.use('/seller', sellerRoutes);
router.use('/buyer', buyerRoutes);


module.exports = router;
