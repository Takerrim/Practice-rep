const express = require('express')
const app = express()
//const bodyParser = require('body-parser')
const path = require('path')
const userRoutes = require('./routes/user')
const logger = require('morgan')
const mongoose = require('mongoose')
//const mongoConnect = require('./api/database').mongoConnect
//const User = require('./models/userMod');

app.set('view engine', 'ejs')
app.set('views','views')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/',userRoutes)
 
app.get('/',userRoutes)

app.get('/', userRoutes)

// app.use((req,res,next)=>{
//     User.findAll()
//     .then(user =>{
//         req.user = user;
//     })
//     .catch(err => console.log(err));
//     next();
// })

mongoose.connect('mongodb+srv://Taker:morgott22@clustersecond-erq9e.mongodb.net/user?retryWrites=true')
.then(result => {
    console.log('connected')
    app.listen(process.env.PORT || 3000)
})

