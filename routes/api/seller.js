const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const auth = require('../../middleware/auth');
const Catalog = require('../../models/catalog');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const Order = require('../../models/order');

const imageStorage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
})

router.post('/create-catalog', [auth, imageUpload.single('image')], async (req, res) => {
    try {
        const { seller, sku, name, description, quantity, price, brand } = req.body;
        if (typeof req.file.filename == 'undefined') {
            return res
                .status(400)
                .json({ error: 'Please upload file.' });
        }
        const imageName = req.file.filename;
        const catalog = new Catalog({
            seller,
            sku,
            name,
            description,
            quantity,
            price,
            brand,
            imageName
        });
        const saveCatalog = await catalog.save();
        res.status(200).json({
            success: true,
            product: saveCatalog
        });
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
});

router.get('/orders', auth, async (req, res) => {
    try {
        let sellerId;
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            let token = req.headers.authorization.split(' ')[1];
            const { secret } = keys.jwt;
            const decoded = jwt.verify(token, secret);
            sellerId = decoded.id
        }
        const orders = await Order.find({ seller: sellerId }).populate('products').populate('buyer').populate('seller');
        res.status(200).json({
            success: true,
            product: orders
        });
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
});


module.exports = router;