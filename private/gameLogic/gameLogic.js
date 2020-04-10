var playerLogic = require("./playerLogic.js");
var gameTiles = require("./tileLogic.js");

module.exports = {
	gameTurn: (diceRollNumb, roomTheGameIsHappeningIn) => {
		var gameRoom = findRoom(roomTheGameIsHappeningIn);
		movePlayer(gameRoom, gameRoom.plaTurn, diceRollNumb);

		//checkForCards();//check for any cheat/quest cards
		//checkPlayerTile(gameRoom);//check the tile
		//console.log("Checked the tile! ")
		//checkForCards()//check for any cheat/quest cards

		nextTurn(gameRoom); //pass the turn to other player
	},
	initialiseGameRoom: (room, playerNames) => {
		var list = playerLogic.initialisePlayers(playerNames);
		var tiles = gameTiles.getCopyOfTIleSet;
		var newGameRoom = new gameRoom(room, list);
		newGameRoom.updateTileSet = tiles;
		allGameRooms.push(newGameRoom);
		var socketio = require("../socketFiles/socketFunctions.js"); //start the game
		socketio.sockets.to(room).emit("start_game", playerNames);
	},
	getPlayerByIDgl: (room, id) => {
		return findPlayerByID(room, id);
	},
	getRoom: name => {
		return findRoom(name);
	},
	minusMoney: (who, whatRoom, what) => {
		var room = findRoom(whatRoom);
		updateSingleRoom(what, who, room);

		var player = findPlayerByID(room, who);
		playerLogic.updateMoney(player, gameTiles.getPriceOfProp(what));
		updateGameClientMoney(room);
	},
	taxPlayer: (playerToTax, whoOwns, cost, room) => {
		var playerToTax = findPlayerByName(room, playerToTax);
		var playerToTaxMoney = playerToTax.playerMoney;
		playerToTaxMoney = playerToTaxMoney - cost;
		playerToTax.playerMoney = playerToTaxMoney;

		var playerToTax2 = findPlayerByID(room, whoOwns);
		var playerToTaxMoney2 = playerToTax2.playerMoney;
		playerToTaxMoney2 = playerToTaxMoney2 + cost;
		playerToTax2.playerMoney = playerToTaxMoney;

		updateGameClientMoney(room);
	},
	updateGameClientProp: (playerID, roomName, propName) => {
		var room = findRoom(roomName);
		var player = findPlayerByID(room, playerID);
		console.log(player.getPlayerName);
		playerLogic.addProp(player, propName);

		var data = { playerToUpdate: player.getPlayerID, propToAdd: propName };
		var socketio = require("../socketFiles/socketFunctions.js"); //start the game
		socketio.sockets.to(roomName).emit("propUpdate", data);
	},
	testFun: () => {
		console.log("testfun called! ");
	}
};

var allGameRooms = [];

function findRoom(roomName) {
	var gRoom = null;
	allGameRooms.forEach(room => {
		if (roomName == room.getRoomName) {
			gRoom = room;
		}
	});
	return gRoom;
}

function findPlayerByID(room, id) {
	var list = room.getAllPlayers;
	var Player = null;
	list.forEach(p => {
		if (id == p.getPlayerID) {
			Player = p;
		}
	});
	return Player;
}

function findPlayerByName(room, name) {
	var list = room.getAllPlayers;
	var Player = null;
	list.forEach(p => {
		if (name == p.getPlayerName) {
			Player = p;
		}
	});
	return Player;
}

function updateSingleRoom(what, who, room) {
	var g = room.getTileSet;
	g.forEach(e => {
		if (e.name == what) {
			e.owned = who;
		}
	});
	room.updateTileSet = g;
}

function updateGameClientMoney(room) {
	var socketio = require("../socketFiles/socketFunctions.js");
	var players = room.getAllPlayers;
	var data = [];
	players.forEach(p => {
		var pData = { pID: p.getPlayerID, pMoney: p.playerMoney };
		data.push(pData);
	});
	socketio.sockets.to(room.roomName).emit("moneyUpdate", data);
}

function gameRoom(roomName, players) {
	this.roomName = roomName;
	this.players = players; //list of all player objects
	this.turns = 0;
	this.playersTurn = 1;
	this.thisGamesTiles = [];
	// also have decks here

	Object.defineProperties(this, {
		turnNumb: {
			get: () => {
				return this.turns;
			},
			set: i => {
				this.turns += i;
			}
		},
		getRoomName: {
			get: () => {
				return this.roomName;
			}
		},
		getAllPlayers: {
			get: () => {
				return this.players;
			}
		},
		plaTurn: {
			get: () => {
				return this.playersTurn;
			},
			set: i => {
				this.playersTurn = i;
			}
		},
		getTileSet: {
			get: () => {
				return this.thisGamesTiles;
			}
		},
		updateTileSet: {
			set: t => {
				this.thisGamesTiles = t;
			}
		},
		loopThroughTileSet: {
			set: () => {
				var g = this.gameTilesl;

				g.forEach(e => {
					console.log(g.name + ": " + g.owned);
				});
			}
		}
	});
}

function movePlayer(room, who, where) {
	var player = findPlayerByID(room, who);
	var place = playerLogic.updatePlayerPos(player, where);
	console.log("inside movePlayer: " + place);
	var socketio = require("../socketFiles/socketFunctions.js");
	var data = { playerToMove: who, roll: place };
	socketio.sockets.to(room.roomName).emit("move_player", data); // move the player
	console.log("playerName: " + player.getPlayerName);
	gameTiles.tileChecker(room, place, player.getPlayerName);
}

function nextTurn(room) {
	room.turnNumb = 1;

	var nextTurn = room.plaTurn;
	if (nextTurn == 2) {
		nextTurn = 1;
	} else {
		nextTurn += 1;
	}
	room.plaTurn = nextTurn;
	console.log("Sending over next turn data");
	var socketio = require("../socketFiles/socketFunctions.js");
	var data = { playerTurn: nextTurn, turnNum: room.turnNumb };
	socketio.sockets.to(room.roomName).emit("next_turn", data);
}
