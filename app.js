const express = require('express');

const app = express();
 const bodyParser= require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/add-product', (req, res, next )=>{
    // console.log('in the secone middle');
    res.send('<form action="/product" method="POST"><input name="title" type="text"> <button type="submit">Add product</button></form>')
});

app.post('/product', (req, res, next)=>{
    console.log(req.body.title);
    res.redirect('/');
})

app.get('/', (req, res, next )=>{
    // console.log('in the secone middle')
    res.send('HOOME')
});


app.listen(3000);
