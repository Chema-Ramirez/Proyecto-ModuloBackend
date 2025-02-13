const express = require('express');
const Review = require('../models/reviews')
const Product = require('../models/products')
const User = require('../models/users')


const createReview = async(req,res)=>{
    const { productId, userId, rating, review } = req.body;
    if(rating < 1 || rating > 5){
        return res.status(400).json({message:'Product rating must be between 1 and 5'})
    }

    try {
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({message:'Product not found'})
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:'User not found'})
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
        res.status(500).json({message:'Error'})
    }
}



const getAllReviews = async (req,res)=>{
    const { productId } = req.params
    try {
        const reviews = await Review.find({ productId })
        if(!reviews){
            return res.status(404).json({message:'Reviews not found'})
        }
        res.status(200).json(reviews)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Error'})
    }
}



const getReviewById = async(req,res)=>{
    const { id } = req.params
    try {
        const review = await Review.findById(id)
        .populate('userId', 'name')
        .populate('productId', 'name')
        
        if(!review){
            return res.status(400).json({message:'Review not found'})
        }
        res.status(200).json(review)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Error'})
    }
}



const updateReview = async (req,res)=>{
    const { id } = req.params;
    const { rating, review } = req.body;
    if(rating < 1 || rating > 5){
        return res.status(400).json({message:'Product rating must be between 1 and 5'})
    }

    try {
        const updateReview = await Review.findByIdAndUpdate(
            id,
            { rating, review },
            { new: true }
        );
        if(!updateReview){
            return res.status(400).json({message:'Review not found'})
        }
        res.status(200).json({updateReview, message:'Review has been updated successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Error'})
    }
}



const deleteReview = async(req,res)=>{
    const { id } = req.params
    try {
        const review = await Review.findByIdAndDelete(id)
        if(!review){
            res.status(404).json({message:'Review not found'})
        }
        res.status(200).json({message:'Review has been successfully deleted'})
    } catch (error) {
        res.status(500).json({message:'Error'})
    }
}



module.exports =  { createReview, getAllReviews, getReviewById, updateReview, deleteReview }