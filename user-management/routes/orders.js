const express = require('express')
const router = express.Router()
const {createOrder, getAllOrders, updateOrder, deleteOrder, getOrderById, getAllOrdersByUserId } = require('../controllers/orders')

router.post('/create', createOrder)
router.get('/', getAllOrders)
router.get('/user/:userId', getAllOrdersByUserId)
router.get('/:orderId', getOrderById);
router.put('/:id', updateOrder)
router.delete('/:id', deleteOrder)

module.exports = router