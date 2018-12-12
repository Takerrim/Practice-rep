const express = require('express')
const app = express()
const path = require('path')
//const userRoutes = require('./routes/user')
const logger = require('morgan')
const mongoose = require('mongoose')
//const mongoConnect = require('./api/database').mongoConnect
const User = require('./models/userMod')
const productRoutes = require('./routes/product')
const authRoutes = require('./routes/auth')

const session = require('express-session') // import session module
const MongoDBStore = require('connect-mongodb-session')(session) // store our session in the database
const MONGODB_URI = 'mongodb+srv://Taker:nornor35@clustersecond-erq9e.mongodb.net/user?retryWrites=true' // db uri
const store = new MongoDBStore({
    uri: MONGODB_URI, // set db address
    collection: 'sessions' // name of collection where we want to store our sessions
})

app.set('view engine', 'ejs')
app.set('views','views')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))

// session
app.use(session({
    secret: 'best secret', //  secret used to sign the session ID cookie , in order to identify that
    resave: false, // don't rewrite for every event
    saveUninitialized: false,
    store: store // set where it will be stored in db
}))


app.use((req,res,next)=>{ // middleware handlers paste in begining your application in order to other handlers have access info in this middleware
    if(!req.session.user) {
        return next() // if there isn't user , go next middlewares
    }
    User.findById(req.session.user._id) // for define user object and not a user data for access user methods
    .then(user =>{
       req.user = user // we write a custom property in request object
       next()
    })
    .catch(err => console.log(err))
})

app.use('/', productRoutes)

app.use('/', authRoutes)


mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('connected')
    app.listen(process.env.PORT || 3000)
})

