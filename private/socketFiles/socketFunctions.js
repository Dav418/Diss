
var roomFunctiions = require("./roomFunctions.js")
var socket = require("socket.io")
module.exports.listen = function(app){

    io=socket.listen(app);
    exports.sockets = io.sockets;
    io.sockets.on('connection', socket => {
  
        socket.on('room', obj => { // assign the room to the user
          
            const sessionID = socket.id;
      
            var papersPlease = obj.split(",");

            socket.join(papersPlease[0]);
            roomFunctiions.assignRoom(papersPlease, sessionID);
            io.sockets.in(papersPlease[0]).emit('chat_msg', 'New user joined the room!');
            roomFunctiions.printAllRooms();
        });
      
        socket.on("chat_msg", msg =>{
          var keys = Object.keys(socket.rooms);
          for (var i = 0; i < keys.length; i++) { // this will send to all the players in the room (keys[i])
              socket.to(socket.rooms[keys[i]]).emit('chat_msg', msg);
          }
        });
        
        socket.on("dice_roll", msg =>{ // used to sync the dice rolls
          var keys = Object.keys(socket.rooms);
          for (var i = 0; i < keys.length; i++) { 
              socket.to(socket.rooms[keys[i]]).emit('dice_roll', msg);
          }
        });
      
        socket.on("player_move", msg =>{ // used to sync the dice rolls
          var keys = Object.keys(socket.rooms);
          for (var i = 0; i < keys.length; i++) { 
              socket.to(socket.rooms[keys[i]]).emit('dice_roll', msg);
          }
          console.log(msg);
        });
        
      
        socket.on('disconnecting', function() { // will do stuff just before disconnecting. to do stuff after dc do socket.on("disconnect")
      
          var self = Object.keys(this.rooms);
          const sessionID = socket.id;
          roomFunctiions.deleteRoom(self[1],sessionID);
          roomFunctiions.printAllRooms();
      
          });
      });

    }