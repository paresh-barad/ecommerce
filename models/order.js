const Mongoose = require('mongoose');
const { Schema } = Mongoose;

const OrderSchema = new Schema({
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Catalog'
    }
  ],
  totalPrice: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: 'Not processed',
    enum: ['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
  }
});
module.exports = Mongoose.model('Order', OrderSchema);
