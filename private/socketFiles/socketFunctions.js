var roomFunctiions = require("./roomFunctions.js");
var socket = require("socket.io");
var dice = require("../gameLogic/diceLogic.js");
var gameLogic = require("../gameLogic/gameLogic.js");
module.exports.listen = function(app) {
	io = socket.listen(app);
	exports.sockets = io.sockets;
	io.sockets.on("connection", socket => {
		socket.on("room", obj => {
			// assign the room to the user
			const sessionID = socket.id;
			console.log(" ");
			console.log(obj);
			console.log(" ");
			socket.join(obj.room);
			roomFunctiions.assignRoom(obj, sessionID);
			socket.to(obj.room).emit("chat_msg", "New user joined the room!");
			roomFunctiions.printAllRooms();
		});

		socket.on("chat_msg", msg => {
			var keys = Object.keys(socket.rooms);
			for (var i = 0; i < keys.length; i++) {
				// this will send to all the players in the room (keys[i])
				socket.to(socket.rooms[keys[i]]).emit("chat_msg", msg);
			}
		});

		socket.on("client_dice_throw", data => {
			console.log("Throwing dice");
			console.log(data);
			let diceRoll1 = dice.diceThrow();
			let diceRoll2 = dice.diceThrow();
			let returnMsg = {
				roll1: diceRoll1,
				roll2: diceRoll2,
				p: data.whoThrow
			};
			io.in(data.gRoom).emit("dice_roll", returnMsg);
			gameLogic.gameTurn(diceRoll1 + diceRoll2, data.gRoom);
		});

		socket.on("userCardsHeld", data => {
			console.log(data.cards);
			var retDat = { cardsToUse: "Array of card pos that can be used" };
			io.in(data.gRoom).emit("userCardsHeldResp1", retDat);
		});

		socket.on("checkTile", data => {
			console.log("Check_tile: ");
			console.log(data);
		});

		socket.on("player_buys_a_prop", data => {
			gameLogic.minusMoney(data.playerID, data.room, data.propName); 
			//take the money from said player 
			gameLogic.updateGameClientProp(data.playerID,data.room, data.propName);
			//update the user Object with the propertiy that has been brought
		});

		socket.on("disconnecting", function() {
			// will do stuff just before disconnecting. to do stuff after dc do socket.on("disconnect")
			var self = Object.keys(this.rooms);
			const sessionID = socket.id;
			roomFunctiions.deleteRoom(self[1], sessionID);
			roomFunctiions.printAllRooms();
		});
	});
};
