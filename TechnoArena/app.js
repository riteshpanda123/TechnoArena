require("dotenv").config();

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var expressLayouts = require('express-ejs-layouts');
var mongoose = require("mongoose");
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require('method-override');
var ejsLint = require('ejs-lint');
var session = require('express-session');
var moment = require('moment');


var indexRoutes = require("./routes/index");
var UserRoutes = require("./routes/users");

const Posts = require('./models/posts');
const DevData = require('./models/devicedata');


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({ extended: true }));
// app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));


// Passport Config
require('./config/passport')(passport);


var url = process.env.DATABASEURL;

mongoose.connect(url,{
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
	});

// //PASSPORT CONFIGURATION
// app.use(require("express-session")({
// 	secret: "Once again Rusty wins cutest dog!!",
// 	resave: false,
// 	saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use(function(req, res, next){
// 	res.locals.currentUser = req.user;
// 	res.locals.error = req.flash("error");
// 	res.locals.success = req.flash("success");
// 	next();
// });


// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Back button cached sessions destroy
app.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


app.use(indexRoutes);
app.use(UserRoutes);



app.listen(process.env.PORT || 3000, () => {
  console.log("The TechnoArena server has started!!!!");
});