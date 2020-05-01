var roomFunctiions = require("./roomFunctions.js");
var socket = require("socket.io");
var gameLogic = require("../gameLogic/gameLogic.js");

module.exports.listen = function (app) {
	io = socket.listen(app);
	exports.sockets = io.sockets;
	io.sockets.on("connection", (socket) => {
		socket.on("room", (obj) => {
			// assign the room to the user
			const sessionID = socket.id;
			socket.join(obj.room);
			roomFunctiions.assignRoom(obj, sessionID);
			socket.to(obj.room).emit("chat_msg", "New user joined the room!");
		});

		//possible redo
		socket.on("chat_msg", (msg) => {
			var keys = Object.keys(socket.rooms);
			for (var i = 0; i < keys.length; i++) {
				// this will send to all the players in the room (keys[i])
				socket.to(socket.rooms[keys[i]]).emit("chat_msg", msg);
			}
		});

		socket.on("client_dice_throw", (data) => {
			let diceRoll1 = 1;
			let diceRoll2 = 2;
			let returnMsg = {
				roll1: diceRoll1,
				roll2: diceRoll2,
				p: data.whoThrow,
			};
			io.in(data.gRoom).emit("dice_roll", returnMsg);
			gameLogic.gameTurn(diceRoll1 + diceRoll2, data.gRoom);
		});

		socket.on("player_buys_a_prop", (data) => {
			var success = gameLogic.buyPropFromBank(
				data.playerID,
				data.room,
				data.propName
			);
			//take the money from said player
			if (success) {
				var dataRes = {
					playerToUpdate: data.playerID,
					propToAdd: data.propName,
				};
				io.in(data.room).emit("propUpdate", dataRes);
			} else {
				var dataToSend = { playerID: data.playerID, prop: data.propName };
				io.in(data.room).emit("player_no_money", dataToSend);
			}
		});

		socket.on("getMeMyListOfRooms", () => {
			roomFunctiions.updateClient();
		});

		socket.on("player_buys_a_house", (data) => {
			gameLogic.checkOwnershipForHouse(data);
		});
		socket.on("end_turn", (room) => {
			gameLogic.nextTurn(room);
		});
		socket.on("check_money", (data) => {
			gameLogic.checkBal(data);
		});
		socket.on("asking_for_trade", (data) => {
			gameLogic.askForTrade(data);
		});
		socket.on("what_props_do_i_own", (data) => {
			gameLogic.sendUserProps(data);
		});

		socket.on("what_props_does_id_own", (data) => {
			gameLogic.sendTradeInfo(data);
		});
		socket.on("client_trade_confirm", (data) => {
			gameLogic.confirmTrade(data);
		});

		socket.on("disconnecting", function () {
			// will do stuff just before disconnecting. to do stuff after dc do socket.on("disconnect")
			var self = Object.keys(this.rooms);
			const sessionID = socket.id;
			roomFunctiions.deleteRoom(self[1], sessionID);
			roomFunctiions.printAllRooms();
		});
	});
};
