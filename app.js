var createError = require('http-errors');
var express = require('express');
const mongoIO = require('./io.js');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const collectionName = 'pokemons';

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pokemonRouter = require('./routes/pokemon');

var app = express();

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://root:root123@cluster0-jef2u.azure.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false })); // make request body data available
app.use(bodyParser.json());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pokemons', pokemonRouter);


function writeData(req, res, next) {
	// This is the controller function
	try {
		console.log(req.body)
		mongoIO.writeItems(req.body, collectionName);
		res.send(req.body);	
	} catch (err) {
		next(err);
	}
}

app.post('api/pokemons', writeData)

function readData(req, res, next) {
	function sendDataCallback(err, data) {
		if (err) {
			next(err)
			return
		}
		res.json(data)
	}

	mongoIO.readItem(sendDataCallback, collectionName);	
}

app.get('api/pokemons', readData)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});





module.exports = app;
