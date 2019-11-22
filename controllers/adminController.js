const Product = require('../models/product')


exports.postAddProduct = (req, res, next) => {
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description

    // Product.create({
    //     title,
    //     price,
    //     imageUrl,
    //     description,
    //     userId: req.user.id
    // })
    req.user.createProduct({
        title,
        price,
        imageUrl,
        description,
    })
     .then((results) => {
            //console.log(results)
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err))

}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId
    const updatedTitle = req.body.title
    const updatedImageUrl = req.body.imageUrl
    const updatedPrice = req.body.price
    const updatedDescription = req.body.description

    Product.findByPk(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.imageUrl = updatedImageUrl;
            product.price = updatedPrice;
            product.description = updatedDescription;
            return product.save()
        })
        .then(results => {
            console.log("UPDATED")
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));

};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId
req.user.getProducts({where:{id:prodId}})
    //Product.findByPk(prodId)
    .then(products => {
        const product = products[0];
            if (!product) {
                return res.redirect('/');

            }

            res.render('admin/edit-product',
                {
                    pageTitle: 'Edit Product',
                    path: '/admin/edit-product',
                    editing: editMode,
                    product: product
                })
        })
        .catch(err => console.log(err))

}

exports.deleteProduct = (req, res, next) => {
    const prodId = req.body.productId
    Product.findByPk(prodId)
        .then(product => {
            return product.destroy()
        }).then(result => {
            res.redirect('/admin/products')

        })
        .catch(err => console.log(err));
}

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product',
        {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            editing: false,

        })
}



exports.getProducts = (req, res, next) => {
   // Product.findAll()
    req.user.getProducts()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                path: '/admin/products',
                pageTitle: 'Admin Products',
            });
        })
        .catch(err => console.log(err));
}

