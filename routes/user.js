const express = require('express')
const router = express.Router()
const userController = require('../controllers/userControl')

//get user
//router.get('/users/:id',userController.getUserById);
router.get('/users', userController.getAddUsers)

router.get('/', userController.getView)

// delete user
router.post('/users', userController.deleteUser)

router.get('/add-user', userController.addUser)
//create user
router.post('/add-user', userController.postUser)

//update user
router.post('/users/update-user', userController.updateUser)


module.exports = router

