const express = require('express');
const router = express.Router();
const userController = require('../controllers/users')

router.get('/users',userController.getUsers);
router.get('/users/:id',userController.getUserById);
router.get('/users', userController.getAddUser)

router.get('/add-user', userController.addUser);
router.post('/add-user', userController.postUser);


module.exports = router;