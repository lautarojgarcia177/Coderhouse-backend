const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'public/profile_pictures/'});
const productsController = require('../api/products');
const cartsController = require('../api/carts');
const usersController = require('../api/users');
const consoleLogger = require('../lib/logger').loggerConsole;
const emailSender = require('../lib/email');

router.get("/", (req, res) => {
    res.render("index", {user: req.user});
});

router.get("/register", (req, res) => {
    res.render("register", {});
});

router.get('/profile', (req, res, next) => {
    res.render("profile", {user: req.user});
});

router.get('/products', (req, res, next) => {
    const products = productsController.findAll().then(products => {
        res.render("products", {user: req.user, products});
    });
});

router.get('/checkout', async (req, res, next) => {
    const cart = await cartsController.findOne({user: req.user.id});
    for (let cp of cart.products) {
        const product = await productsController.findById(cp.product.toString());
        cp.title = product.title;
    }
    res.render("checkout", {user: req.user, cart});
});

router.post("/register", upload.single("photo"), (req, res, next) => {
    const newUser = {
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
        address: req.body.address,
        age: req.body.age,
        phone: req.body.phone,
    }
    User.register(
        new User(newUser),
        req.body.password,
        (err, user) => {
            if (err) {
                return res.render("register", {error: err.message});
            }
            // Upload profile picture
            // console.log(req.file);
            // Create new cart for this user
            cartsController.create({
                products: [],
                user: user._doc._id
            }).then(() => {
                usersController.findAll().then((users) => {
                    const user = users.find(u => u.username == req.body.username && u.email == req.body.email)
                    usersController.update(user._id.toString(), {photoFileName: req.file.filename}).then(() => {
                        passport.authenticate("local")(req, res, () => {
                            req.session.save((err) => {
                                if (err) {
                                    return next(err);
                                }
                                res.redirect("/");
                            });
                        });
                    })
                })
            })
                .catch(err => consoleLogger.warn('there was an error creating the cart', err));
        }
    );
});

router.get("/login", (req, res) => {
    res.render("login", {user: req.user, error: req.flash("error")});
});

router.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    (req, res, next) => {
        req.session.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect("/");
        });
    }
);

router.get("/logout", (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect(308,"/");
    });
});

router.get('/confirmPurchase', async (req, res, next) => {
    const cart = await cartsController.findOne({user: req.user.id});
    await emailSender.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>',
        to: req.user.email,
        subject: "Your purchase", // Subject line
        text: "Thanks for your purchase,", // plain text body
        html: "<b>Your purchase</b>" + cart.products, // html body
    });
    cart.products = [];
    await cartsController.update(cart._id.toString(), cart);
    res.redirect('/purchaseConfirmed');
});

router.get('/purchaseConfirmed', (req, res, next) => {
    res.render("purchaseConfirmed", {user: req.user});
});


router.get("/ping", (req, res) => {
    res.status(200).send("pong!");
});

module.exports = router;
