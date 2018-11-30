const User = require('../models/userMod');


exports.getView = (req,res) => {
    res.render('prime',
    {
        pageTitle: 'Main page',
        path:'/'
    })
}

exports.addUser = (req,res) => {
    res.render('addUser', {
        pageTitle: 'Add User',
        path: '/add-user'
    })
}

exports.postUser = (req,res) => {
    const name = req.body.nameUser
    const age = req.body.ageUser
    const email = req.body.emailUser
    const user = new User({
        name: name,
        age: age, 
        email: email}
        )
    user.save()
    .then(()=>{
        res.redirect('/users')
    })
    .catch(err => console.log(err))
}

exports.getAddUsers = (req,res) => {
    const have = true
    User.find()
    .then(users => {
        res.render('users',{
            results: users,
            have:have, 
            pageTitle: 'Users',
            path: '/users'
        })
    })

}

exports.deleteUser = (req,res) => {
    const _id = req.body.userId;
    User.findByIdAndDelete(_id)
    .then(()=>{
        res.redirect('/users')
    })
    .catch(err => console.log(err))
}

exports.updateUser = (req,res) => {
    const _id = req.body.updateId
    const updatedName = req.body.nameUser
    User.findById(_id)
    .then(user => {
         user.name = updatedName
         return user.save()
    })
    .then(()=> {
        res.redirect('/users')
    })
    .catch(err => console.log(err))
}


