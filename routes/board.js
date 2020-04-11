var express = require("express");
var router = express.Router();
var swig = require("swig");
var path = require("path");
var rootHTML = path.join(__dirname, "../public/html/board");
var roomFunctions = require("../private/socketFiles/roomFunctions.js");
var roomList = roomFunctions.getRoomList();
var multer = require("multer");
var upload = multer();

router.get("/", upload.none(), function(req, res) {
	//make this into a choice between bots, 2p or 4p
	var sess = req.session;
	if (sess.userObj) {
		var tmpl = swig.compileFile(rootHTML + "/roomChoose.html"),
			renderedHTML = tmpl({
				err: false,
				errMsg: " ",
				rooms: roomList
			});
		res.end(renderedHTML);
	} else {
		res.sendFile("403.html", {
			root: path.join(__dirname, "../public/html/error")
		});
	}
});

router.post("/createNew", upload.none(), function(req, res) {
	var sess = req.session;
	if (sess.userObj) {
		var roomToJoin = req.body.roomName;
		//check if name already exists
		var nameExists = roomFunctions.checkIfExists(roomToJoin);
		if (nameExists) {
			var tmpl = swig.compileFile(rootHTML + "/roomChoose.html"),
				renderedHTML = tmpl({
					err: true,
					errMsg: "Room already exists",
					rooms: roomList
				});
			res.end(renderedHTML);
		}

		var isItPrivate = req.body.private;
		if (isItPrivate && !nameExists) {
			var roomPassword = req.body.roomPass;
			roomFunctions.createPrivateRoom(roomToJoin, roomPassword);
		}
		var tmpl = swig.compileFile(rootHTML + "/board.html"),
			renderedHTML = tmpl({
				room: roomToJoin,
				myName: sess.userObj.userName,
				myTurn: roomFunctions.assignPlayerTurn(roomToJoin)
			});
		res.end(renderedHTML);
	} else {
		res.sendFile("403.html", {
			root: path.join(__dirname, "../public/html/error")
		});
	}
});

router.post("/validate", upload.none(), function(req, res) {
	//TODO
	// if a player leaves a game in progress, a new
	//player should not be able to join a game in progress
	var sess = req.session;
	if (sess.userObj) {
		sess.youMayEnter = false;
		let err = 200;
		var roomName = req.body.roomName;
		var pass = req.body.passWord;
		if (!roomFunctions.checkIfExists(roomName)) {
			err = 418;
		}

		if (
			!(
				req.body.isPrivate &&
				roomFunctions.checkRoomPassword(roomName, pass) &&
				roomFunctions.checkIfExists(roomName)
			)
		) {
			//fail
			err = 419;
		} else {
			sess.youMayEnter = true;
		}
		res.sendStatus(err);
	}
});

router.get("/valid", upload.none(), function(req, res) {
	var sess = req.session;
	console.log("youMayEnter: ");
	console.log(sess.youMayEnter);
	if (sess.userObj && sess.youMayEnter) {
		var roomName = req.param("id");
		var tmpl = swig.compileFile(rootHTML + "/board.html"),
			renderedHTML = tmpl({
				room: roomName,
				myName: sess.userObj.userName,
				myTurn: roomFunctions.assignPlayerTurn(roomName)
			});
		sess.youMayEnter = false;
		res.end(renderedHTML);
	}
}),
	(module.exports = router);
