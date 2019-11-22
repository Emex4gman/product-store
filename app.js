//core module
const path = require('path');

//Third party pkgs
const express = require('express');
const bodyParser = require('body-parser')

const sequelize = require('./util/database');
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')


const app = express();

//use templating engine
app.set('view engine', 'ejs');
app.set('views', 'views');


// REQURING THE ROUTES
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const pageNotFound = require('./controllers/error')


app.use(bodyParser.urlencoded({extended: false}));
//import our css files
app.use(express.static(path.join(__dirname, 'Public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next()
        })
        .catch(err => console.log(err));
})
// ROUTES
app.use('/admin', adminRoutes);
app.use(shopRoutes);



//404 error page the catch all routes v
app.use(pageNotFound.PageNotFound)

//setting up SQL relations
Product.belongsTo(User, {constraints:true, onDelete: 'CASCADE' })
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem })
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem})


sequelize
    .sync()
    //.sync({ force: true })
    .then(result => {
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) {
            return User.create({ name: 'emex', email: 'emex@test.com' });
        } else { 
            return user; 
            
        }
    })
    .then(user => {
        //console.log(user);
        //return user.createCart();
        return user
    })
    .then(cart => {
       // console.log(cart)
        app.listen(3001);
    })
    .catch(err => {
        console.log(err);
    });
 