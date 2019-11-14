//core module
const path = require('path');

//Third party pkgs
const express = require('express');
const bodyParser = require('body-parser')

const app = express();

//use templating engine
app.set('view engine', 'ejs');
app.set('views', 'views');


// REQURING THE ROUTES
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const pageNotFound=require('./controllers/error')
app.use(bodyParser.urlencoded({extended: false}));
//import our css files
app.use(express.static(path.join(__dirname, 'Public')));
// ROUTES
app.use('/admin', adminRoutes);
app.use(shopRoutes);



//404 error page the catch all routes v
app.use(pageNotFound.PageNotFound)

app.listen(3001, (req, res) => {
    console.log('port 3001')
});