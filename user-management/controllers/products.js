const Product = require('../models/products')


const createProduct = async (req,res)=>{
    try{
    const product = await Product.create(req.body)
    res.status(200).json(product)
}catch(error){
    console.log(error)
    res.status(500).json({message: 'Error'})
    }
}


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (!products) {
            return res.status(404).json({ message: 'Products not found' });
        }
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error' });
    }
}


const getProductById = async (req,res) =>{
    try{
        const product = await Product.findById(req.params.id)
        if(!product){
            return res.status(400).json({message: 'Product not found'})
        }
        res.status(200).json(product)
    }catch(error){
        console.log(error)
        res.status(500).json({message: 'Error'})
    }
}


const updateProduct = async (req,res)=>{
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!product){
            return res.status(404).json({message: 'Product not found'})
        }
        res.status(200).json({product, message:'Product has been updated successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Error'})
    }
}


const deleteProduct = async(req,res) =>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if(!product){
            res.status(404).json({message: 'Product not found'})
        }
        res.status(200).json({message:'Product has been successfully removed'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error'})
    }
}


module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct }
