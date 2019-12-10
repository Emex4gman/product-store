require('dotenv').config()
const mongodb = require('mongodb')
const env = process.env
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(env.DB_URL, { useUnifiedTopology: true })
    .then(client => {
      console.log('Connected to dataBase')
      _db = client.db()
      callback();
    })
    .catch(err => {
      console.log(err)
      throw err
    })

}

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found'
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb









// const {Sequelize} = require('sequelize');
// const pass = env.DB_PASS;
// const sequelize = new Sequelize('node-complete', 'root', pass, { dialect: 'mysql', host: 'localhost'}  );
// module.exports = sequelize;   

