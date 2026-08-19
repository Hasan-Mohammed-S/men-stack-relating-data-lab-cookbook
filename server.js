/* eslint-disable prefer-destructuring */
require('dotenv').config();
require('./config/databse');

const express = require('express');

const app = express();

// Middleware
const session = require('express-session');
const MongoStore = require('connect-mongo').MongoStore;
const methodOverride = require('method-override');
const morgan = require('morgan');
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

// CONTROLLERS
const authCtrl = require('./controllers/authCtrl');
const foodsController = require('./controllers/foodsController.js');
const usersController = require('./controllers/usersController.js')

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : '3010';


const path = require('path');





// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride('_method'));
// Morgan for logging HTTP requests
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    })
);

app.use(passUserToView);

// PUBLIC ROUTES
app.get('/', (req, res) => {
    // Check if the user is signed in
    if (req.session.user) {
        // Redirect signed-in users to their applications index
        res.redirect(`/users/${req.session.user._id}/foods`);
    } else {
        // Show the homepage for users who are not signed in
        res.render('index.ejs');
    }
});

app.get('/auth/sign-up', authCtrl.signup);
app.post('/auth/sign-up', authCtrl.register);
app.get('/auth/sign-in', authCtrl.signin);
app.post('/auth/sign-in', authCtrl.login);

// Customer middleware
app.use(isSignedIn);

// PRIVATE ROUTES
app.get('/auth/sign-out', authCtrl.signout);

// Applications
app.get('/users/:userId/foods', foodsController.index);
app.get('/users/:userId/foods/new', foodsController.new);
app.post('/users/:userId/foods', foodsController.create);
app.get('/users/:userId/foods/:foodId', foodsController.show);
app.delete('/users/:userId/foods/:foodId', foodsController.delete);
app.get('/users/:userId/foods/:foodId/edit', foodsController.edit);
app.put('/users/:userId/foods/:foodId', foodsController.update);

// Users
app.get('/users', usersController.index);

app.listen(port, () => {
    console.log(`The express app is ready on port ${port}!`);
});