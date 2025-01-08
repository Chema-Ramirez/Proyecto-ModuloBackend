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
                return res.status(404).json({ message: 'El producto no ha sido encontrado' })
            }
            if (item.quantity > product.stock) {
                return res.status(400).json({ message: 'No hay suficiente stock del producto deseado' })
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
        res.status(500).json({ message: 'Error: no se ha podido crear el pedido' })
    }
}



const getAllOrders = async(req,res)=>{
    try{
        const orders = await Order.find()

        if(!orders){
            return res.status(404).json({message:'No se han encontrado pedidos'})
        }
        res.status(200).json(orders)
    }catch(error){
        console.log(error)
        res.status(500).json({message:'Error: no se ha podido obtener los pedidos'})
    }
}



const getOrderById = async (req,res) =>{
    try{
        const order = await Order.findById(req.params.id)
        if(!order){
            return res.status(400).json({message: 'El pedido no ha sido encontrado'})
        }
        res.status(200).json(order)
    }catch(error){
        console.log(error)
        res.status(500).json({message: 'Error: no se ha podido obtener el pedido'})
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
            return res.status(404).json({ message: 'El pedido no ha sido encontrado' })
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
                return res.status(404).json({ message: 'El producto no ha sido encontrado' })
            }
            if (item.quantity > product.stock) return res.status(400).json({ message: 'No hay suficiente stock  del producto deseado' })
            totalPrice += product.price * item.quantity
            product.stock = product.stock - item.quantity
            await product.save()
        }

        order.products = products
        order.totalPrice = totalPrice
        order.user = user

        await order.save()
        res.status(200).json({order, message:'El pedido ha sido actualizado correctamente'})

    } catch (error) {
        console.log(error)
        res.status(500).json('message: Error: no se ha podido actualizar el pedido')
    }
}




const deleteOrder = async(req,res) =>{
    try {
        const order = await Order.findByIdAndDelete(req.params.id)
        if(!order){
            res.status(404).json({message: 'El pedido no ha sido encontrado'})
        }
        res.status(200).json({message:'El pedido ha sido eliminado con exito'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error: no se ha podido eliminar el pedido'})
    }
}



module.exports = { createOrder,getAllOrders, getOrderById, updateOrder, deleteOrder }
