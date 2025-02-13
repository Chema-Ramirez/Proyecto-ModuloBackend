const Categorie = require('../models/categories')


const createCategorie = async (req,res)=>{
    try{
    const categorie = await Categorie.create(req.body)
    res.status(200).json(categorie)
}catch(error){
    console.log(error)
    res.status(500).json({message:'Error'})
    }
}



const getAllCategories = async (req, res) =>{
    try {
        const categories = await Categorie.find();
        if(!categories){
            return res.status(404).json({message: 'Categories not found'})
        }
        res.status(200).json(categories);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error'})
    }
};



const getCategorieById = async (req,res)=>{
    try{
        const categorie = await Categorie.findById(req.params.id)
        if(!categorie){
            return res.status(400).json({message:'Categorie not found'})
        }
        res.status(200).json(categorie)
    }catch(error){
        console.log(error)
        res.status(500).json({message: 'Error'})
    }
}



const updateCategorie = async(req,res)=>{
    try {
        const categorie = await Categorie.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!categorie){
            return res.status(404).json({message:'Categorie not found'})
        }
        res.status(200).json({categorie, message:'Categorie has been updated successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Error'})
    }
}



const deleteCategorie = async(req, res)=>{
    try {
        const categorie = await Categorie.findByIdAndDelete(req.params.id)
        if(!categorie){
            res.stattus(404).json({message: 'Categorie not found'})
        }
        res.status(200).json({message:'Categorie has been updated successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Error'})
    }
}



module.exports = { createCategorie, getAllCategories, getCategorieById, updateCategorie, deleteCategorie }