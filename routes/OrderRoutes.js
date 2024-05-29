const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');
const { authenticateUser,authenticateToken } = require('../middleware/Authorization');

// User Order
router.post('/createuserorder', authenticateUser, orderController.createOrder);
router.get('/getall/:userid', authenticateUser, orderController.getAllOrdersForUser); //Only User Order
router.get('/getuserorder/:orderid', authenticateUser, orderController.getOrderById);

// Cancel Order
router.patch('/cancelorder/:orderid', authenticateUser, orderController.cancelOrder);


//Admin Order
router.get('/getalluserorders', authenticateToken, orderController.getAllUserOrder);
router.get('/getuserorders/:userid', authenticateToken, orderController.getUserById);
router.patch('/admincancelorder/:userid/:orderid', authenticateToken, orderController.admincancelOrder);


module.exports = router;


