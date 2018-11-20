const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControl')

//get user
router.get('/users',userController.getUsers);
router.get('/users/:id',userController.getUserById);
router.get('/users', userController.getAddUser)
// update user
router.put('/users/:id', userController.updateUser);
// delete user
router.delete('/users/:id', userController.deleteUser);


router.get('/add-user', userController.addUser);
//create user
router.post('/add-user', userController.postUser);


module.exports = router;

