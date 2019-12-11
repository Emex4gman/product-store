const Product = require('../models/product')



exports.postAddProduct = (req, res, next) => {
  const title = req.body.title
  const imageUrl = req.body.imageUrl
  const price = req.body.price
  const description = req.body.description
  const product = new Product(
    title,
    price,
    imageUrl,
    description

  )
  product.create()
    .then((results) => {
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

  const product = new Product(updatedTitle, updatedPrice, updatedImageUrl, updatedDescription, prodId)
  product.save()
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
  Product.findById(prodId)
    .then(product => {
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
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.deleteById(prodId)
    .then(result => {
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
  Product.fetchAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        path: '/admin/products',
        pageTitle: 'Admin Products',
      });
    })
    .catch(err => console.log(err));
}

