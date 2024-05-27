const Order = require('../model/OrderModel');

// Create a new order
const createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json({newOrder, message: res.__("order.ordr_sucs")});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json({orders, message: res.__("order.gtall_ordr")});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order){
            return res.status(404).json({ message:res.__("order.ordr_nt_fnd") });
        }
        res.status(200).json({order,message:res.__("order.get_ordr")});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an order
const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) return res.status(404).json({ message:res.__("order.ordr_nt_fnd") });
        res.status(200).json({updatedOrder, message:res.__("order.ordr_updt") });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {createOrder, getAllOrders, getOrderById,updateOrder}