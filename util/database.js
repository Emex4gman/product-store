require('dotenv').config()
const env = process.env
const {Sequelize} = require('sequelize');
const pass = env.DB_PASS;

const sequelize = new Sequelize('node-complete', 'root', pass, { dialect: 'mysql', host: 'localhost'}  );


module.exports = sequelize;     
