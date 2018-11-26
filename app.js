const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const userRoutes = require('./routes/user')
const morgan = require('morgan')

const mongoConnect = require('./api/database').mongoConnect
//const User = require('./models/userMod');

app.set('view engine', 'ejs')
app.set('views','views')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
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


mongoConnect(()=>{
    app.listen(process.env.PORT || 3000)
})
