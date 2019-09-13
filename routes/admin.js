const express= require('express');

const router =express.Router();

router.get('/add-product', (req, res, next )=>{
    // console.log('in the secone middle');
    res.send('<form action="/product" method="POST"><input name="title" type="text"> <button type="submit">Add product</button></form>')
});

router.post('/product', (req, res, next)=>{
    console.log(req.body.title);
    res.redirect('/');
})



module.exports = router;