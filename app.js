const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const path = require('path');
const userRoutes = require('./routes/user');

app.set('view engine', 'pug');
app.set('views','views');

app.use(jsonParser)
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',userRoutes)
 
app.get('/',userRoutes)

app.get('/',(req,res)=>{
    res.render('includes/main-lay.pug');
})



app.listen(process.env.PORT || 3000);