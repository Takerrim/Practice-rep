const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const userRoutes = require('./routes/user')

app.set('view engine', 'pug');
app.set('views','views');

app.use(jsonParser)
app.use(bodyParser.urlencoded({extended:true}))



app.get('/',(req,res)=>{
    res.send('hello');
})

app.use('/',userRoutes)
 
 app.get('/',userRoutes)





app.listen(process.env.PORT || 3000);