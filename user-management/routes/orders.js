const express = require('express')
const router = express.Router()
const {createOrder, getAllOrders, updateOrder, deleteOrder, getOrderById } = require('../controllers/orders')

router.post('/', createOrder)
router.get('/', getAllOrders)
router.get('/:id', getOrderById)
router.put('/:id', updateOrder)
router.delete('/:id', deleteOrder)

module.exports = router