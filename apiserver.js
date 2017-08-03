var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
const session = require('express-session');
const MongoStore = require ('connect-mongo')(session);

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// APIS
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/books');
var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error:'));

// SET UP SESSIONS
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 2}, // 2 days in ms
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
}));

// SAVE SESSIONS
app.post('/cart', function(req, res) {
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function(err) {
    if(err) {
      throw err;
    }
    res.json(req.session.cart);
  })
})

app.get('/cart', function(req, res) {
  if(typeof req.session.cart !== 'undefined') {
    res.json(req.session.cart);
  }
});

var Books = require('./models/books.js');

// POST
app.post('/books', function (req, res) {
  var book = req.body;
  Books.create(book, function(err, books) {
    if(err) {
      throw err;
    }
    res.json(books);
  })
});

// GET
app.get('/books', function (req, res) {
  Books.find(function(err, books) {
    if(err) {
      throw err;
    }
    res.json(books);
  })
});

// DELETE
app.delete('/books/:_id', function (req, res) {
  var query = {_id: req.params._id}
  Books.remove(query, function(err, books) {
    if(err) {
      throw err;
    }
    res.json(books);
  })
})

// UPDATE
app.put('/books/:_id', function (req, res) {
  var book = req.body;
  var query = req.params._id
  // if the field doesn't exist, $set will set a new field
  var update = {
    '$set':{
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price
    }
  };
  
  // returns the updated document by passing 'new' flag
  var options = {new: true};

  Books.findOneAndUpdate(query, update, options, function (err, books) {
    if(err) {
      throw err;
    }
    res.json(books);
  })
})

// END APIS

app.listen(3001, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("API server listening at http://localhost:3001")
})