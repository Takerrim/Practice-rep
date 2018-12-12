const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        items:[{
           product: {
               type: Schema.Types.ObjectId,
               required:true,
               ref: 'Product'
           }
        }]
    }
}) 

userSchema.methods.addToCart = function (product) {
  const cartItem = this.cart.items.find(item => { // find product by id
      return item.product.toString() === product._id.toString()
  })
    const updatedCartItems = [...this.cart.items] // copy items
    
  if(cartItem) return; // if there is the product in user cart items , don't add it

  if(this.cart.items.length >= 0){ // if there are products in user cart items , add product in cart items array
      updatedCartItems.push({
          product: product
      })
    }
  const updatedCart = { // update cart items 
    items: updatedCartItems
 }
    this.cart = updatedCart // save items in cart
    return this.save() // save  user with update cart items
}

const User = mongoose.model('User', userSchema)


module.exports = User







// const getDb = require('../api/database').getDb
// const ObjectId = require('mongodb').ObjectId

// class User {
//     constructor(name,age,email,id) {
//         this.name = name
//         this.age = age
//         this.email = email
//         this._id = new ObjectId(id)
//     }

//     save() {
//         const db = getDb()
//         return db.collection('practice')
//         .insertOne(this)
//         .then(() => {
//             console.log('User is inserted')
//         })
//         .catch(err => console.log(err))
//     }
    
//    static findAll () {
//        const db = getDb();
//        return db.collection('practice')
//        .find().toArray() // turn it into array for iterate in view
//        .then(users => {
//            return users
//        })
//        .catch(err => console.log(err))
//    }

//    static deleteUser (userId) {
//     const db = getDb();
//     return db.collection('practice')
//     .deleteOne({_id: new ObjectId(userId)})
//     .then(result=>{
//         console.log("User is deleted");
//     })
//     .catch(err => {
//         console.log(err)
//         throw err;
//     })
//    }

//    static updateUser (id,name) {
//        const db = getDb()
//        return db.collection('practice')
//        .updateOne({_id: new ObjectId(id)}, {$set: {name: name}})
//        .then(user => {
//             console.log('User is updated')
//             return user
//        })
//        .catch(err => console.log(err))
//    }
// }