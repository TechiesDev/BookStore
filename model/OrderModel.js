
const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  orderId: { type: Schema.Types.ObjectId, ref: 'order'},
  books: [
    {
      book: { type: Schema.Types.ObjectId, ref: 'book', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalPrice: { type: Number, required: true },
  shippingAddress: { type: String, required: true },
  paymentStatus: { type: String, required: true },
  deliveryStatus: { type: String, required: true },
  orderDate: { type: Date, default: Date.now },
  status: { type: Boolean, default: 'Pending' }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

