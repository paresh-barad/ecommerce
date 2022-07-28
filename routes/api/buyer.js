const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const auth = require('../../middleware/auth');
const Catalog = require('../../models/catalog');
const mongoose = require('mongoose');
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const Order = require('../../models/order');

router.get('/list-of-sellers', auth, async (req, res) => {
    try {
        const sellers = await User.find({ userType: "seller" }).select({
            firstName:1,
            lastName:1,
            _id:1,
            email:1,
            userType:1,
            created:1,
        });
        res.status(200).json({
            success: true,
            product: sellers
        });
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
});

router.get('/seller-catalog/:seller_id', auth, async (req, res) => {
    try {
        const sellerId = req.params.seller_id;
        const catalogs = await Catalog.find({ seller: sellerId });
        res.status(200).json({
            success: true,
            product: catalogs
        });
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
});

router.post('/create-order/:seller_id', auth, async (req, res) => {
    try {
        let sellerId = mongoose.Types.ObjectId(req.params.seller_id);
        let { catalogIds } = req.body;
        catalogIds = catalogIds.map(function(el) { return mongoose.Types.ObjectId(el) })
        const catalogs = await Catalog.aggregate(
            [{
                $match: { seller: sellerId, _id: {$in: catalogIds }}
            },
            { $group: { _id: null, totalPrice: { $sum: "$price" } } }
            ]
        )
        let { totalPrice } = catalogs[0];
        let buyerId;
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            let token = req.headers.authorization.split(' ')[1];
            const { secret } = keys.jwt;    
            const decoded = jwt.verify(token, secret);  
            buyerId = decoded.id  
        }
        
        const order = new Order({
            seller: sellerId,
            buyer: buyerId,
            products: catalogIds,
            totalPrice
        });
        const orderSave = await order.save();
        res.status(200).json({
            success: true,
            product: orderSave
        });
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
});

module.exports = router;