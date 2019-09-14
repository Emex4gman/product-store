//core module
const path = require('path');

//Third party pkgs
const express = require('express');
const bodyParser = require('body-parser')

const app = express();


// REQURING THE ROUTES
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
//import our css files
app.use(express.static(path.join(__dirname, 'Public')));
// ROUTES
app.use('/admin', adminRoutes);
app.use(shopRoutes);


//404 error page the catch all routes v
app.use((req, res, next)=>{
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.listen(3000);