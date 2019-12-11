require('dotenv').config()
const env = process.env
//core module
const path = require('path');

//Third party pkgs
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
//const mongoConnect = require('./util/database').mongoConnect
const User = require('./models/user')
const app = express();

//use templating engine
app.set('view engine', 'ejs');
app.set('views', 'views');


// REQURING THE ROUTES
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const pageNotFound = require('./controllers/error')


app.use(bodyParser.urlencoded({ extended: false }));
//import our css files
app.use(express.static(path.join(__dirname, 'Public')));

app.use((req, res, next) => {
  User.findById('5dd8479e8f66d60f4839d4fb')
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next()
    })
    .catch(err => console.log(err));

})
// ROUTES
app.use('/admin', adminRoutes);
app.use(shopRoutes);



//404 error page the catch all routes v
app.use(pageNotFound.PageNotFound)


mongoose.connect(env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(result => {
  console.log("DATABASE CONNETED");
  app.listen(3001);
}).catch(err => console.log(err))
