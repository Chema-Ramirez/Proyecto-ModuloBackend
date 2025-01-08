const Categorie = require('../models/categories')


const createCategorie = async (req,res)=>{
    try{
    const categorie = await Categorie.create(req.body)
    res.status(200).json(categorie)
}catch(error){
    console.log(error)
    res.status(500).json({message:'Error: no se ha podido crear la categoria'})
    }
}



const getAllCategories = async (req, res) =>{
    try {
        const categories = await Categorie.find();
        if(!categories){
            return res.status(404).json({message: 'No se encontraron categorias'})
        }
        res.status(200).json(categories);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error: no se han podido obtener las categorias'})
    }
};



const getCategorieById = async (req,res)=>{
    try{
        const categorie = await Categorie.findById(req.params.id)
        if(!categorie){
            return res.status(400).json({message:'La categoria no ha sido encontrada'})
        }
        res.status(200).json(categorie)
    }catch(error){
        console.log(error)
        res.status(500).json({message: 'Error: no se ha podido obtener la categoria'})
    }
}



const updateCategorie = async(req,res)=>{
    try {
        const categorie = await Categorie.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!categorie){
            return res.status(404).json({message:'La categoria no ha sido encontrada'})
        }
        res.status(200).json({categorie, message:'La categoria ha sido actualizada correctamente'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Error: no se ha podido actualizar la categoria'})
    }
}



const deleteCategorie = async(req, res)=>{
    try {
        const categorie = await Categorie.findByIdAndDelete(req.params.id)
        if(!categorie){
            res.stattus(404).json({message: 'La categoria no ha sido encontrada'})
        }
        res.status(200).json({message:'La categoria ha sido eliminada con exito'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Error: no se ha podido eliminar la categoria'})
    }
}



module.exports = { createCategorie, getAllCategories, getCategorieById, updateCategorie, deleteCategorie }