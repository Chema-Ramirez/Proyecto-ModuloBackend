const express = require('express');
const Review = require('../models/reviews')
const Product = require('../models/products')
const User = require('../models/users')


const createReview = async(req,res)=>{
    const { productId, userId, rating, review } = req.body;
    if(rating < 1 || rating > 5){
        return res.status(400).json({message:'La puntuación del producto debe ser entre 1 y 5'})
    }

    try {
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({message:'El producto no ha sido encontrado'})
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:'El usuario no ha sido encontrado'})
        }

        const newReview = new Review({
            productId,
            userId,
            rating,
            review
        });

        await newReview.save();
        res.status(201).json(newReview)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Error: no se ha podido crear la valoracion del producto'})
    }
}



const getAllReviews = async (req,res)=>{
    const { productId } = req.params
    try {
        const reviews = await Review.find({ productId })
        if(!reviews){
            return res.status(404).json({message:'No se han encontrado valoraciones'})
        }
        res.status(200).json(reviews)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Error: no se han podido obtener las valoraciones'})
    }
}



const getReviewById = async(req,res)=>{
    const { id } = req.params
    try {
        const review = await Review.findById(id)
        .populate('userId', 'name')
        .populate('productId', 'name')
        
        if(!review){
            return res.status(400).json({message:'La valoracion no ha sido encontrada'})
        }
        res.status(200).json(review)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Error: no se ha podido obtener la valoracion'})
    }
}



const updateReview = async (req,res)=>{
    const { id } = req.params;
    const { rating, review } = req.body;
    if(rating < 1 || rating > 5){
        return res.status(400).json({message:'La puntuación del producto debe ser entre 1 y 5'})
    }

    try {
        const updateReview = await Review.findByIdAndUpdate(
            id,
            { rating, review },
            { new: true }
        );
        if(!updateReview){
            return res.status(400).json({message:'La valoracion no ha sido encontrada'})
        }
        res.status(200).json({updateReview, message:'La valoracion ha sido actualizada correctamente'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Error: no se ha podido actualizar la valoracion'})
    }
}



const deleteReview = async(req,res)=>{
    const { id } = req.params
    try {
        const review = await Review.findByIdAndDelete(id)
        if(!review){
            res.status(404).json({message:'La valoracion no ha sido encontrada'})
        }
        res.status(200).json({message:'La valoracion ha sido eliminada con exito'})
    } catch (error) {
        res.status(500).json({message:'Error: no se ha podido eliminar la valoracion'})
    }
}



module.exports =  { createReview, getAllReviews, getReviewById, updateReview, deleteReview }