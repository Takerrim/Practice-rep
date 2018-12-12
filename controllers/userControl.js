const User = require('../models/userMod');


exports.addUser = (req,res) => {
    res.render('./users/addUser', {
        pageTitle: 'Add User',
        path: '/add-user',
        isAuthenticated: req.session.isLoggedIn
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
        res.render('./users/users',{
            results: users,
            have:have, 
            pageTitle: 'Users',
            path: '/users',
            isAuthenticated: req.session.isLoggedIn
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

exports.getEditUser = (req,res) => {
    const userId = req.params.id
    User.findById(userId)
    .then(user => {
        res.render('./users/editUser' ,{
            user: user,
            pageTitle: 'edit User',
            path: '/users/edit-user',
            isAuthenticated: req.session.isLoggedIn
        })
    })
}

exports.editUser = (req,res) => {
    const _id = req.body.updateId
    const updatedName = req.body.nameUser
    const updateAge = req.body.ageUser
    const updateEmail = req.body.emailUser
    User.findById(_id)
    .then(user => {
         user.name = updatedName
         user.age = updateAge
         user.email = updateEmail        
         return user.save()
    })
    .then(()=> {
        res.redirect('/users')
    })
    .catch(err => console.log(err))
}


