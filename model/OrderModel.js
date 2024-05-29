
const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  books: [
    {
      book: { type: Schema.Types.ObjectId, ref: 'book', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalPrice: { type: Number, required: true },
  shipping_address: {type: String, required: true},
  payment_status: {type: String, required: true},
  delivery_status: {type: String, required: true},
  orderDate: { type: Date, default: Date.now },
  status: { type: Boolean, default: 'Pending' }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

