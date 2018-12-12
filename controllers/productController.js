const Product = require('../models/productModel')


exports.getProducts = (req,res) => {
    Product.find()
    .then(products => {
        res.render('./products/products',{
            pageTitle: 'products',
            path: '/products',
            products: products,
            isAuthenticated: req.session.isLoggedIn
        })
    })
    .catch(err => console.log(err))
}


exports.getAddProduct = (req,res) => {
    res.render('./products/addProduct', {
        pageTitle: 'add product',
        path: '/add-product',
        isAuthenticated: req.session.isLoggedIn
    })
}

exports.postAddProduct = (req,res) => {
    const title = req.body.titleProduct
    const price = req.body.priceProduct
    const imageUrl = req.body.imageProduct
    const description = req.body.descProduct
    const product = new Product({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
        userId: req.user
    })
    return product.save()
    .then((product)=>{
        console.log(product)
        res.redirect('/products')
    })
    .catch(err=> console.log(err))
}

exports.deleteProduct = (req,res) => {
    const prodId = req.body.deleteProdId
    Product.findByIdAndDelete(prodId)
    .then(() => {
        res.redirect('/products')
    })
}

exports.postCart = (req,res) => {
    const prodId = req.body.prodId
    Product.findById(prodId)
    .then(product => {
       return req.user.addToCart(product)
    })
    .then(result => {
        console.log(result)
        res.redirect('/products')
    })
    .catch(err => console.log(err))
}

exports.getView = (req,res) => {
    Product.find()
    .then(products => {
        res.render('main',
        {
            pageTitle: 'Main page',
            path:'/',
            isAuthenticated: req.session.isLoggedIn,
            products: products
        })
    }) 
}



exports.getDetailsProduct = (req,res) => {
    const prodId = req.params.id
    Product.findById(prodId)
    .then(product => {
        res.render('./products/specificProduct' , {
            pageTitle: 'Product',
            path: '/product/:id',
            isAuthenticated: req.session.isLoggedIn,
            product: product
        })
    })
}