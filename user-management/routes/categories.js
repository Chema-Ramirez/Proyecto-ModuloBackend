const express = require('express')
const router = express.Router()
const { createCategorie, getAllCategories, getCategorieById, updateCategorie, deleteCategorie } = require('../controllers/categories')


router.post('/', createCategorie)
router.get('/', getAllCategories)
router.get('/:id', getCategorieById)
router.put('/:id', updateCategorie)
router.delete('/:id', deleteCategorie)


module.exports = router