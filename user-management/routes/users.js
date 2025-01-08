const express = require('express')
const authenticate = require("../middlewares/auth")
const { getUserById, getAllUsers, updateUser, deleteUser } = require('../controllers/users')
const router = express.Router()


router.get('/:id', getUserById)
router.get('/', getAllUsers)
router.put('/:id', authenticate, updateUser)
router.delete('/:id', authenticate, deleteUser)


module.exports = router