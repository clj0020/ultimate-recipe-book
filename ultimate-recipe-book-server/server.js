'use strict';

const express = require('express');
const session = require('express-session');
const MemcachedStore = require('connect-memcached')(session);
const path = require('path');
const bodyParser = require('body-parser'); // parses incoming request bodies
const cors = require('cors'); // cors allows us to make a request to our api from a different domain name because it would be blocked if you didn't
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
	console.log('Connected to database ' + config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
	console.log('Database error: ' + err);
});

const app = express();

// // Start Session
// // Configure the session and session storage
// const sessionConfig = {
// 	resave: false,
// 	saveUninitialized: false,
// 	secret: config.secret,
// 	signed: true
// };
//
// if (config.MEMCACHE_URL) {
// 	sessionConfig.store = new MemcachedStore({
// 		hosts: [config.MEMCACHE_URL]
// 	});
// }
//
// app.use(session(sessionConfig));
// // End Session

// // OAuth2
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(require('./config/auth').router);


// const users = require('./routes/users');
const recipes = require('./routes/recipes');
const ingredients = require('./routes/ingredients');

// Port Number
const port = process.env.PORT || 8080;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));


// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
// app.use(passport.initialize());
// app.use(passport.session());

// require('./config/passport')(passport);

// app.use('/users', users);
app.use('/recipes', recipes);
app.use('/ingredients', ingredients);

// Index Route
app.get('/', (req, res) => {
	// res.redirect('/recipes');
	res.status(300).send("Must log in to access api.");
});

app.use((req, res) => {
	res.status(404).send("Not found!");
});

// Basic error handler
app.use((err, req, res, next) => {
	/* jshint unused:false */
	console.error(err);
	// If our routes specified a specific response, then send that. Otherwise,
	// send a generic message so as not to leak anything.
	res.status(500).send(err.response || 'Something broke!');
});

// Start Server
app.listen(port, () => {
	console.log('Server started on port ' + port);
});
