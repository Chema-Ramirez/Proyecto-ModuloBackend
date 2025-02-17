const mongoose = require('mongoose')
const Order = require('../models/orders')
const Product = require('../models/products')


const createOrder = async (req, res) => {
    try {
        const { user, products } = req.body

        if (!user || !products || products.length === 0) {
            return res.status(400).json({ message: 'User and products are required' })
        }

        let totalPrice = 0

        for (const item of products) {
            const product = await Product.findById(item.product)
            if (!product) {
                return res.status(404).json({ message: 'Product not found' })
            }
            if (item.quantity > product.stock) {
                return res.status(400).json({ message: 'Insufficient stock' })
            }
            totalPrice += product.price * item.quantity
            product.stock -= item.quantity
            await product.save()
        }

        const order = await Order.create({
            user,
            products,
            totalPrice,
            status: 'Pending',
        });

        res.status(201).json(order)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error creating order' })
    }
}


const getAllOrders = async (req, res) => {
    try {
        const userId = req.params.userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' })
        }
        const orders = await Order.find({ user: userId }).populate('products.product');
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'Orders not found' });
        }
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error' });
    }
};


const getOrderById = async (req, res) => {
    try {
        const userId = req.params.userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' })
        }
        const orders = await Order.find({ user: userId }).populate('products.product')
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'Orders not found' })
        }
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error' });
    }
}


const updateOrder = async (req, res) => {
    const { products, user } = req.body
    try {
        const order = await Order.findById(req.params.id)
        if (!order) {
            return res.status(404).json({ message: 'Order not found' })
        }

        for (const item of order.products) {
            const product = await Product.findById(item.product)
            if (product) {
                product.stock += item.quantity
                await product.save()
            }
        }

        let totalPrice = 0;
        for (const item of products) {
            const product = await Product.findById(item.product)
            if (!product) {
                return res.status(404).json({ message: 'Product not found' })
            }
            if (item.quantity > product.stock) {
                return res.status(400).json({ message: 'Insufficient stock' })
            }
            totalPrice += product.price * item.quantity
            product.stock -= item.quantity
            await product.save()
        }

        order.products = products;
        order.totalPrice = totalPrice;
        order.user = user;

        await order.save()
        res.status(200).json({ order, message: 'Order has been updated successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error' })
    }
}

const deleteOrder = async(req,res) =>{
    try {
        const order = await Order.findByIdAndDelete(req.params.id)
        if(!order){
            res.status(404).json({message: 'Order not found'})
        }
        res.status(200).json({message:'Order has been deleted successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error'})
    }
}


module.exports = { createOrder,getAllOrders, getOrderById, updateOrder, deleteOrder }
