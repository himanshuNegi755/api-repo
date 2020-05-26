var express = require('express');
var authRoutes = require('./routes/auth-routes');
var profileRoutes = require('./routes/profile-routes');

require('./config/passport-setup');

var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/ecommerce')
var keys = require('./config/keys');
var cookieSession = require('cookie-session');
var passport = require('passport');

// models
var Product = require('./model/product');
var Cart = require('./model/cart');
var User = require('./model/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const {ObjectId} = require('mongodb');

app.use(cookieSession({
    maxAge: 60*60*1000,  // 7*24* add later after completion of site
    keys: [keys.session.cookieKey]
}));

// initkialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use('/auth', authRoutes);
app.use('http://localhost:3000', profileRoutes);
//app.use('/profile', profileRoutes);


// api methods
app.post('/product', function(request, response) {
    var product = new Product();
    product.productName = request.body.productName;
    product.productType = request.body.productType;
    product.productSize = request.body.productSize;
    product.productPrice = request.body.productPrice;
    product.productImgUrl = request.body.productImgUrl;
    product.save(function(err, savedProduct) {
        if (err) {
            response.status(500).send({error:"Could not save product"});
        } else {
            response.send(savedProduct);
        }
    });
});

app.post('/new-user', function(request, response) {
    var user = new User();
    user.userName = request.body.userName;
    user.userEmail = request.body.userEmail;
    user.userPassword = request.body.userPassword;
    user.save(function(err, savedUser) {
        if (err) {
            response.status(500).send({error:"Could not save user"});
        } else {
            response.send(savedUser);
            console.log('the user created - ' ,savedUser)
        }
    });
});

app.put('/cart/product/delete/', function(request, response) {
    Cart.update({_id:ObjectId(request.body.cartId)}, {$pull : {"products": {$in : [ObjectId(request.body.productId)]}}}, function(err, cart) {
        if (err) {
            response.status(500).send({error: "Could not find the cart"});
        } else {
            /*Cart.find({}).populate({path: 'products', model: 'Product'}).exec(function(err, carts) {
            if(err) {
                response.status(500).send({error: "No wishList"});
            } else {
                response.send(carts);
            }
    });*/

            response.send(cart);

        }
    })
});


app.get('/product', function(request, response) {
   Product.find({}, function(err, products) {
        if(err) {
            response.status(500).send({error: "Could not fetch products"});
        } else {
            response.send(products);
        }
    }); 
});

app.get('/product/product-details/:data', function(request, response) {
   Product.find({_id: ObjectId(request.params.data)}, function(err, products) {
       if(err) {
           response.status(500).send({error: "Could not fetch products"});
       } else {
           response.send(products);
           console.log(products);
       }
   }); 
});

app.get('/product/productType/:data', function(request, response) {
    Product.find({productType: request.params.data}, function(err, products) {
        if(err) {
            response.status(500).send({erroe: "Could not fetch products"});
        } else {
            response.send(products);
        }
    });
});

app.post('/cart', function(request, response) {
    var cart = new Cart();
    cart.title = request.body.title;
    
    cart.save(function(err, newCart) {
        if(err) {
            response.status(500).send({error: "Could not create wishlist"});
        } else {
            response.send(newCart);
        }
    })
});

app.get('/cart', function(request, response) {
    Cart.find({}).populate({path: 'products', model: 'Product'}).exec(function(err, carts) {
        if(err) {
            response.status(500).send({error: "No wishList"});
        } else {
            response.send(carts);
        }
    });
});

app.put('/cart/product/add', function(request, response) {
    Product.findOne({_id: request.body.productId}, function(err, product) {
        if (err) {
            response.status(500).send({error: "Could not add item to cart"});
        } else {
            Cart.update({_id:request.body.cartId}, {$addToSet: {products: product._id}}, function(err, cart) {
                if (err) {
                    response.status(500).send({error: "Could not add item to cart"});
                } else {
                    response.send(cart);
                }
            });
        }
    });
});


// listining for port
app.listen(5000, function() {
    console.log("API running on port 5000...");
});