const Order = require('../model/OrderModel');
const { createToken } = require('../utils/Utils');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { userId, books, totalPrice, shipping_address, payment_status, delivery_status } = req.body;
    const order = new Order({ userId, books, totalPrice, shipping_address, payment_status, delivery_status, status: true });
    const savedOrder = await order.save();
    const token = createToken(savedOrder);
    res.status(201).json({ token, savedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderid);
    order ? res.status(200).json(order) : res.status(404).json({ message: 'Order not found' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get order', error });
  }
};

// Get all orders for a specific user
const getAllOrdersForUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userid });
    orders.length ? res.status(200).json(orders) : res.status(404).json({ message: 'No orders found for this user' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get orders', error });
  }
};

// Cancel an order
const cancelOrder = async (req, res) => {
  try {
    const { orderid: orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.status = false;
    const updatedOrder = await order.save();
    res.status(200).json({ updatedOrder, message: 'Order Cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel order', error });
  }
};

// Admin: Get all orders
const getAllUserOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    orders.length ? res.status(200).json(orders) : res.status(404).json({ message: 'No orders found' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get orders', error });
  }
};

// Admin: Get all orders for a specific user
const getUserById = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userid });
    orders.length ? res.status(200).json(orders) : res.status(404).json({ message: 'User Orders not found' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get orders', error });
  }
};

// Admin: Cancel a specific user's order
const admincancelOrder = async (req, res) => {
  try {
    const { userid, orderid } = req.params;
    const order = await Order.findOne({ _id: orderid, userId: userid });
    if (order) {
      order.status = false;
      const updatedOrder = await order.save();
      res.status(200).json({ updatedOrder, message: 'Order Cancelled successfully' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel order', error });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  getAllOrdersForUser,
  cancelOrder,
  getAllUserOrder,
  getUserById,
  admincancelOrder
};