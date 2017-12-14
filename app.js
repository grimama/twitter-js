const express = require( 'express' );
const nunjucks = require('nunjucks');
const app = express(); // creates an instance of an express application
var morgan = require('morgan');
var bodyParser = require('body-parser')
const routes = require('./routes')
const path = require ('path');
var socketio = require('socket.io');

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', {noCache: true});


var server = app.listen(3000, function(){
  console.log('server listening')
})

var io = socketio.listen(server);

app.use(express.static(path.join(__dirname, '/public')));

app.use(function (req, res, next) {
  // do your logging here
  // call `next`, or else your app will be a black hole — receiving requests but never properly responding

  console.log(req.method, req.path)  // prints out to the shell, the type of request we are receiving. ie GET, PUT, POST, DELETE
  //console.log(req.path) // prints out to the shell, the address/url that the request came from. ie '/' or '/news'
  //console.log(res)
  next();
})


app.use('/', routes(io))

// app.get('/', function(req, res){
//   res.render('index', locals)
// })





