var express = require("express");
var app = express();
var path = require("path");
var favicon = require("serve-favicon");

const session = require("express-session");

let port = process.env.PORT;
if (port == null || port == "") {
	port = 8000;
}

var server = app.listen(port);
//var io = require('socket.io').listen(server);
var socketConn = require("./private/socketFiles/socketFunctions.js").listen(
	server
);

var bodyParser = require("body-parser");
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.use(session({ secret: "ssshhhhh", saveUninitialized: true, resave: true }));

console.log("Listning on port 3000");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var boardRouter = require("./routes/board");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/board", boardRouter);
