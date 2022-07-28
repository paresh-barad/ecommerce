const Mongoose = require('mongoose');
const { Schema } = Mongoose;

const catalogSchema = new Schema({
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    sku: {
        type: String
    },
    name: {
        type: String,
        trim: true
    },
    imageName: {
        type: String
    },
    description: {
        type: String,
        trim: true
    },
    quantity: {
        type: Number
    },
    price: {
        type: Number
    },
    isActive: {
        type: Boolean,
        default: true
    },
    brand: {
        type: String,
        default: null
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }

});
module.exports = Mongoose.model('Catalog', catalogSchema);