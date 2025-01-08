const Product = require('../models/products')


const createProduct = async (req,res)=>{
    try{
    const product = await Product.create(req.body)
    res.status(200).json(product)
}catch(error){
    console.log(error)
    res.status(500).json({message: 'Error: no se ha podido crear el producto'})
    }
}



const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (!products) {
            return res.status(404).json({ message: 'No se encontraron productos' });
        }
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error: no se han podido obtener los productos' });
    }
}



const getProductById = async (req,res) =>{
    try{
        const product = await Product.findById(req.params.id)
        if(!product){
            return res.status(400).json({message: 'El producto no ha sido encontrado'})
        }
        res.status(200).json(product)
    }catch(error){
        console.log(error)
        res.status(500).json({message: 'Error: no se ha podido obtener el producto'})
    }
}



const updateProduct = async (req,res)=>{
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!product){
            return res.status(404).json({message: 'El producto no ha sido no encontrado'})
        }
        res.status(200).json({product, message:'El producto ha sido actualizado correctamente'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Error: no se ha podido actualizar el producto'})
    }
}



const deleteProduct = async(req,res) =>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if(!product){
            res.status(404).json({message: 'El producto no ha sido encontrado'})
        }
        res.status(200).json({message:'El producto ha sido eliminado con exito'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error: no se ha podido eliminar el producto'})
    }
}



module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct }
