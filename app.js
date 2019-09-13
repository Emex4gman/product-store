//Third party pkgs
const express = require('express');
const bodyParser = require('body-parser')

const app = express();

// REQURING THE ROUTES
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({extended: false}));

// ROUTES
app.use(adminRoutes);
app.use(shopRoutes);



app.listen(3000);