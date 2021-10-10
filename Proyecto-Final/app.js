// dependencies
var express = require("express");
var dotenv = require("dotenv");
var logger = require("morgan");
var path = require("path");
// var favicon = require("serve-favicon");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var flash = require("connect-flash");
var multer = require("multer");
var upload = multer({dest: "uploads/"});

dotenv.config();

require("./database/connection");

var routes = require("./routes/index");
var cartsRouter = require("./routes/carts");
var productsRouter = require("./routes/products");

var app = express();

app.use(logger("dev"));
// app.use(compression());
// app.use(helmet());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(bodyParser);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(cookieParser());
app.use(
    require("express-session")({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);
app.use("/", cartsRouter);
app.use("/", productsRouter);

// passport config
const User = require("./models/user");
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var logger = require('./lib/logger').loggerConsola;

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: err,
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: {},
    });
});



module.exports = app;
