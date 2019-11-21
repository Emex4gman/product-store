const Product = require('../models/product')
const Cart = require('../models/cart');


exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            // for (let i = 0; i < products.length; i++){
            //     const cartProductData = cart.products.find(prod => prod.id === products[i].id)
            //     if (cartProductData) {
            //         cartProducts.push({ productData: products[i], qty: cartProductData.qty })
            //     }
            // }
            for (product in products) {
            const cartProductData = cart.products.find(prod => prod.id === products[product].id)
            if (cartProductData) {
                cartProducts.push({ productData: products[product], qty: cartProductData.qty })
            }
            }
            
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts
            })
        })
       
    })
    
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId
    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price) 
    })
    res.redirect('/cart')
}

exports.postCartDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, product => {
        Cart.deleteProduct(productId, product.price )
        res.redirect('/cart');
    })
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
    })
}


exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Home',
            path: '/',
        });
    });
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Produts',
            path: '/products',
        });
    });
}   

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products',})
    })
}

exports.getCheckout = ( req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout',
    })
}