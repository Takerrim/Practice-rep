const router = require('express').Router()
const productController = require('../controllers/productController')

// products
router.get('/products', productController.getProducts)


// add-products
router.get('/add-product', productController.getAddProduct)
router.post('/add-product', productController.postAddProduct)

//delete product
router.post('/delete-product', productController.deleteProduct)


router.get('/', productController.getView)
router.get('/product/:id', productController.getDetailsProduct)

router.post('/carts', productController.postCart)
module.exports = router