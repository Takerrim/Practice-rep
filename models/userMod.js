const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}) 

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