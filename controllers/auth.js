const User = require('../models/userMod')
const bcrypt = require('bcryptjs')

exports.getLogin = (req,res) => {
  res.render('./auth/login', {
    pageTitle: 'Login',
    path: '/login',
    isAuthenticated: false // when we enter in login page isLoggedIn becomes false
  })

}


exports.postLogin = (req,res) => {
  const email = req.body.email
  const password = req.body.password

  User.findOne({email: email})
  .then(user => {
    if(!user) {
      return res.redirect('/login')
    }
    bcrypt.compare(password, user.password)
    .then(isMatched => { // return true or false
      if(!isMatched) {
        return res.redirect('/login')
      }
      req.session.isLoggedIn  = true // when we are logged in (push submit button) , the property isLoggedIn becomes true
      req.session.user = user // save the current logged user in session
      res.redirect('/')
    }) 
  })
    .catch(err => console.log(err))
}

exports.postLogout = (req,res) => {
  req.session.destroy(err => {
    console.log(err)
    res.redirect('/')
  })
}

exports.getSignUp = (req,res) => {
  res.render('./auth/signup',{
    pageTitle: 'Sign Up',
    path: '/signup',
    isAuthenticated: false
  })
}

exports.postSignUp = (req,res) => {
  const email = req.body.email
  const password = req.body.password
  // hashing password
  bcrypt.hash(password,12)
  .then(hashedPassword => {
    const user = new User({ // create new user with hashed password
      email: email,
      password: hashedPassword
    })
    return user.save()
    .then(() => {
      res.redirect('/login')
    })
  })
  .catch(err => console.log(err))
}