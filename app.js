require('dotenv').config()
const env = process.env
const path = require('path');
const fs = require('fs')
//const https = require('https')

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const csrf = require('csurf')
const flash = require('connect-flash')
const multer = require('multer');
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const { parser } = require('./middleware/imageUpload')
const errorController = require('./controllers/error');
const shopController = require('./controllers/shop');
const isAuth = require('./middleware/isAuth')

const User = require('./models/user');

const app = express();
const store = new MongoDBStore({
  uri: env.DB_URL,
  collection: 'sessions'
});

const csrfProtection = csrf();

// const sslPrivateKey = fs.readFileSync('server.key')
// const sslCert = fs.readFileSync('server.cert')

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {

  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.set('view engine', 'ejs');
app.set('views', 'views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  {
    flags: 'a'
  }
)
//production ready additions
app.use(helmet())
app.use(compression())
app.use(morgan('combined', { stream: accessLogStream }))
app.use(morgan('dev'))


app.use(bodyParser.urlencoded({ extended: false }));
app.use(parser);

app.use(express.static(path.join(__dirname, 'public')));
app.use("/images", express.static(path.join(__dirname, 'images')));
app.use(session(
  {
    secret: env.SECRET,
    resave: false,
    store: store,
    saveUninitialized: false
  }))

app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn
  next()
})

app.use((req, res, next) => {

  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      if (!user) {
        return next()
      }
      req.user = user;
      next();
    })
    .catch(err => {
      next(new Error(err))
      // console.log(err)
    });
});

app.post('/create-order', isAuth, shopController.postOrder);

app.use(csrfProtection);
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken()
  next()
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);
app.use(errorController.get404);

// 
// ERROR HANDLING
//
app.use((error, req, res, next) => {
  console.log("500 auth" + JSON.stringify(req.session));
  res.status(500).render('500', {
    pageTitle: 'Error',
    path: '/500',
    isAuthenticated: req.session.isLoggedIn
  });
  // res.redirect('/500')
})
mongoose
  .connect(env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log("DATABASE CONNETED");
    app.listen(env.PORT || 3000, () => {
      console.log(`App listening on port ${env.PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
