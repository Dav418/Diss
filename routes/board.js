var express = require('express');
var router = express.Router();
var swig  = require('swig');
var User = require("../private/databaseFiles/userCRUD.js");

var path = require('path');

var rootHTML = path.join(__dirname, '../public/html/board')

var roomFunctions = require("../private/socketFiles/roomFunctions.js")
var roomList = roomFunctions.getRoomList();

var playerFunctions = require("../private/gameLogic/playerLogic.js")

router.get('/', function(req, res) { //make this into a choice between bots, 2p or 4p
  var sess= req.session;

  if(sess.userObj){

    var tmpl = swig.compileFile(rootHTML+"/roomChoose.html"),
    renderedHTML = tmpl({
      rooms : roomList,
    });
    
    res.end(renderedHTML);
  }else{
    res.sendFile('403.html', {root: path.join(__dirname, '../public/html/error')});
  }
});

router.get('/game', function(req, res) {
  //TODO
  // if a player leaves a game in progress, a new
  //player should not be able to join a game in progress

  var sess= req.session;
  console.log()
  console.log('inside /game')
  console.log()
  if(sess.userObj){
    var foundRoom = false;
    var myName = sess.userObj.userName;
    var roomToJoin = Math.random().toString(36).substr(2, 9);

    roomList.forEach(element => {
      if(element.roomName != "generalChat" && element.playerNumber <= 4 ){
        if(!foundRoom){
          roomToJoin = element.roomName;
          foundRoom = true;
        }
      }   
    });
    var tmpl = swig.compileFile(rootHTML+"/board.html"),
    renderedHTML = tmpl({
      room : roomToJoin,
      myName: myName
    });
    res.end(renderedHTML);
      
  }else{
    res.sendFile('403.html', {root:path.join(__dirname, '../public/html/error')});
  }
});

module.exports = router;