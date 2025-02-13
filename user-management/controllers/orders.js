const Order = require('../models/orders')
const Product = require('../models/products')


const createOrder = async (req, res) => {
    try {
        const { user, products } = req.body
        console.log(user)
        console.log(products)

        let totalPrice = 0;
        
        for (const item of products) {
            console.log(item)
            const product = await Product.findById(item.product)
            console.log(product)
            
            if (!product) {
                return res.status(404).json({ message: 'Product not found' })
            }
            if (item.quantity > product.stock) {
                return res.status(400).json({ message: 'Insufficient stock' })
            }
            totalPrice += product.price * item.quantity
            console.log(totalPrice)
            product.stock -= item.quantity
            console.log(product.stock)
            await product.save()
        }

        const order = await Order.create({
            user,
            products,
            totalPrice
        })

        res.status(201).json(order)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error' })
    }
}



const getAllOrders = async(req,res)=>{
    try{
        const orders = await Order.find()

        if(!orders){
            return res.status(404).json({message:'Orders not found'})
        }
        res.status(200).json(orders)
    }catch(error){
        console.log(error)
        res.status(500).json({message:'Error'})
    }
}



const getOrderById = async (req,res) =>{
    try{
        const order = await Order.findById(req.params.id)
        if(!order){
            return res.status(400).json({message: 'Order not found'})
        }
        res.status(200).json(order)
    }catch(error){
        console.log(error)
        res.status(500).json({message: 'Error'})
    }
}




const updateOrder = async (req, res) => {
    const { products, user } = req.body
    try {
        const initialOrder = await Order.findById(req.params.id)
        console.log(initialOrder)
        const updatedOrder = await Order.findById(req.params.id)
        console.log(updatedOrder)
        const order = await Order.findById(req.params.id)
        if (!order) {
            return res.status(404).json({ message: 'Order not found' })
        }
        for (item of order.products) {
            console.log(item)
            const product = await Product.findById(item.product)
            if (product) {
                console.log(product.stock)
                console.log(item.quantity)
                product.stock += item.quantity
            }
            await product.save()
        }

        let totalPrice = 0;
        for (const item of products) {
            const product = await Product.findById(item.product)
            console.log(product)
            if (!product) {
                return res.status(404).json({ message: 'Product not found' })
            }
            if (item.quantity > product.stock) return res.status(400).json({ message: 'Insufficient stock' })
            totalPrice += product.price * item.quantity
            product.stock = product.stock - item.quantity
            await product.save()
        }

        order.products = products
        order.totalPrice = totalPrice
        order.user = user

        await order.save()
        res.status(200).json({order, message:'Order has been updated successfully'})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error'})
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
