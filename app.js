var express = require('express');
var app = express();

const session = require('express-session');


var server = app.listen(3000);
//var io = require('socket.io').listen(server);
var socketConn = require("./private/socketFiles/socketFunctions.js").listen(server);
var playerLogic = require("./private/gameLogic/playerLogic.js");
var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));


console.log("Listning on port 3000");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var boardRouter = require('./routes/board');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/board', boardRouter);

app.use(express.static("public"));










