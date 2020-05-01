var playerLogic = require("./playerLogic.js");
var gameTiles = require("./tileLogic.js");

module.exports = {
	gameTurn: (diceRollNumb, roomTheGameIsHappeningIn) => {
		var gameRoom = findRoom(roomTheGameIsHappeningIn);
		movePlayer(gameRoom, gameRoom.plaTurn, diceRollNumb);
	},
	nextTurn: (roomName) => {
		var gRoom = findRoom(roomName);
		nextTurnLocal(gRoom);
	},
	initialiseGameRoom: (room, playerNames) => {
		var list = playerLogic.initialisePlayers(playerNames);
		var tiles = gameTiles.getCopyOfTIleSet;
		var newGameRoom = new gameRoom(room, list);
		newGameRoom.updateTileSet = tiles;
		allGameRooms.push(newGameRoom);

		clientUpdate(room, playerNames, "start_game");
	},
	getPlayerByIDgl: (room, id) => {
		return findPlayerByID(room, id);
	},
	getRoom: (name) => {
		return findRoom(name);
	},
	buyPropFromBank: (who, whatRoom, what) => {
		var room = findRoom(whatRoom);
		var player = findPlayerByID(room, who);
		var propPrice = gameTiles.getPriceOfProp(what);

		if (player.playerMoney < propPrice) {
			return false;
		} else {
			playerLogic.updateMoney(player, propPrice);
			gameTiles.purchiseProp(
				room,
				player.getPlayerID,
				gameTiles.getTileFromName(what).id
			);
			updateGameClientMoney(room);
		}
		return true;
	},
	printRoomTiles(room, id) {
		console.log(room + " " + id);
		var gRoom = findRoom(room);
		console.log(
			"printing all tiles owned by " + findPlayerByID(gRoom, id).getPlayerName
		);

		var list = gRoom.getTileSet;
		list.forEach((item) => {
			if (item.owned == id) {
				console.log(item);
			}
		});
	},
	bankTax: (roomName, name, cost) => {
		var gRoom = findRoom(roomName);
		var player = findPlayerByName(gRoom, name);
		var temp = player.playerMoney;
		player.playerMoney = temp + cost;
	},
	taxPlayer: (playerToTax, whoOwns, cost, room) => {
		var playerToTaxID = findPlayerByName(room, playerToTax).getPlayerID;
		if (playerToTaxID != whoOwns) {
			changeMoney(playerToTax, whoOwns, cost, room);
			var data = {
				taxedPlayer: playerToTaxID,
				playerGettingTax: whoOwns,
				howMuch: cost,
			};
			clientUpdate(room.roomName, data, "someone_got_taxed");
		}
	},

	testFun: () => {
		console.log("testfun called! ");
	},
	checkOwnershipForHouse: (data) => {
		var whoOwnsFamily = checkWhoOwnsFam(data);
		if (whoOwnsFamily == data.playerID) {
			var canBuild = gameTiles.addHouse(data.propID, findRoom(data.room));
			if (canBuild) {
				var socketio = require("../socketFiles/socketFunctions.js");
				socketio.sockets.to(data.room).emit("build_house_res", data.propID);
			} else {
				var dataRes = {
					errMsg: "You have built 4 houses already!",
					id: data.propID,
					playerID: data.playerID,
				};
				clientUpdate(data.room, dataRes, "err_msg");
			}
		} else {
			var dataRes = {
				errMsg: "You have to own all the colours first!",
				id: data.propID,
				playerID: data.playerID,
			};

			clientUpdate(data.room, dataRes, "err_msg");
		}
	},
	findPlayerUsingName: (room, name) => {
		return findPlayerByName(room, name);
	},
	sendTradeInfo: (data) => {
		var gRoom = findRoom(data.roomName);
		var ownedProps = gameTiles.findAllProps(gRoom, data.playerID);
		var dataRes = {
			whoAsked: data.whoAsked,
			props: ownedProps,
			tradeTarget: data.playerID,
		};
		clientUpdate(data.roomName, dataRes, "what_props_does_id_own_resp");
	},
	checkBal: (data) => {
		var gRoom = findRoom(data.room);
		var player = findPlayerByID(gRoom, data.id);
		var data;

		if (player.playerMoney < data.money) {
			var dataRes = { id: data.id, hasMoney: false };
		} else {
			var dataRes = { id: data.id, hasMoney: true };
		}

		clientUpdate(data.room, dataRes, "check_money_resp");
	},
	askForTrade: (data) => {
		var gRoom = findRoom(data.room);
		var player = findPlayerByID(gRoom, data.whoTrade);

		var dataRes = {
			whosAsking: player.getPlayerName,
			target: data.targetOfTrade,
			whatsBeingTraded: data.tradeList,
			whatsBeingOffered: data.offerList,
			money: data.money,
		};
		clientUpdate(data.room, dataRes, "confirm_trade_from_server");
	},
	sendUserProps: (data) => {
		var gRoom = findRoom(data.roomName);
		var player = findPlayerByID(gRoom, data.id);
		var ownedList = gameTiles.findAllProps(gRoom, player.getPlayerID);

		clientUpdate(data.roomName, ownedList, "list_of_user_owned_props");
	},
	confirmTrade: (data) => {
		var gRoom = findRoom(data.room);
		var takingAway = findPlayerByName(gRoom, data.whoAsked);
		var givingTo = data.targetOf;
		data.askingFor.forEach((item) => {
			var splitStr = item.split(",");
			gameTiles.changeOwnership(splitStr[0], takingAway.getPlayerID, gRoom);
			var data = {
				playerToUpdate: takingAway.getPlayerID,
				propToChange: splitStr[1],
			};
			clientUpdate(gRoom.roomName, data, "prop_update_after_trade");
		});
		data.offerFor.forEach((item) => {
			var splitStr = item.split(",");
			gameTiles.changeOwnership(splitStr[0], givingTo, gRoom);
			var data = {
				playerToUpdate: givingTo,
				propToChange: splitStr[1],
			};
			clientUpdate(gRoom.roomName, data, "prop_update_after_trade");
		});

		changeMoney(takingAway.getPlayerName, givingTo, data.offerMoney, gRoom);

		console.log("printing all tiles owned by players");

		var list = gRoom.getTileSet;
		list.forEach((item) => {
			if (item.owned != -1) {
				console.log(item);
			}
		});
	},
};

var allGameRooms = [];

function checkWhoOwnsFam(data) {
	var gRoom = findRoom(data.room);

	var whoOwnsFamily = gameTiles.checkIfCanBuyHouse(
		data.propID,
		gRoom.getTileSet
	);
	return whoOwnsFamily;
}

function findRoom(roomName) {
	var gRoom = null;
	allGameRooms.forEach((room) => {
		if (roomName == room.getRoomName) {
			gRoom = room;
		}
	});
	return gRoom;
}

function findPlayerByID(room, id) {
	var list = room.getAllPlayers;
	var Player = null;
	list.forEach((p) => {
		if (id == p.getPlayerID) {
			Player = p;
		}
	});
	return Player;
}

function findPlayerByName(room, name) {
	var list = room.getAllPlayers;
	var Player = null;
	list.forEach((p) => {
		if (name == p.getPlayerName) {
			Player = p;
		}
	});
	return Player;
}

function updateGameClientMoney(room) {
	var players = room.getAllPlayers;
	var data = [];
	players.forEach((p) => {
		var pData = { pID: p.getPlayerID, pMoney: p.playerMoney };
		data.push(pData);
	});

	clientUpdate(room.roomName, data, "moneyUpdate");
}

function playerLoose(room, loserPlayer) {
	var players = room.getAllPlayers;
	var remaningPlayers = [];
	players.forEach((p) => {
		if (players != loserPlayer) {
			remaningPlayers.push(p);
		}
	});
	gameTiles.liqudateAssets(room, loserPlayer.id);
	room.getAllPlayers = remaningPlayers;
	room.playersIDout.push(loserPlayer.getPlayerID);
	if (players.length == 1) {
		var name = players[0].getPlayerName;
		clientUpdate(room.roomName, name, "game_over");
	} else {
		clientUpdate(room.roomName, loserPlayer.getPlayerName, "player_loose");
	}
}

function gameRoom(roomName, players) {
	this.roomName = roomName;
	this.players = players; //list of all player objects
	this.turns = 0;
	this.playersTurn = 1;
	this.thisGamesTiles = [];
	this.playersIDout = [];
	// also have decks here

	Object.defineProperties(this, {
		turnNumb: {
			get: () => {
				return this.turns;
			},
			set: (i) => {
				this.turns += i;
			},
		},
		getRoomName: {
			get: () => {
				return this.roomName;
			},
		},
		getAllPlayers: {
			get: () => {
				return this.players;
			},
			set: (i) => {
				this.players = i;
			},
		},
		plaTurn: {
			get: () => {
				return this.playersTurn;
			},
			set: (i) => {
				this.playersTurn = i;
			},
		},
		getTileSet: {
			get: () => {
				return this.thisGamesTiles;
			},
		},
		updateTileSet: {
			set: (t) => {
				this.thisGamesTiles = t;
			},
		},
		loopThroughTileSet: {
			set: () => {
				var g = this.gameTilesl;

				g.forEach((e) => {
					console.log(g.name + ": " + g.owned);
				});
			},
		},
	});
}

function movePlayer(room, who, where) {
	var player = findPlayerByID(room, who);
	var oldPos = player.playerPos;
	var place = playerLogic.updatePlayerPos(player, where);
	if (oldPos > place) {
		console.log("player passed go!");
		var temp = player.playerMoney;
		temp = temp + 200;
		player.playerMoney = temp;
		clientUpdate(room.roomName, who, "player_pass_go");
		updateGameClientMoney(room);
	}

	var data = { playerToMove: who, roll: place };

	clientUpdate(room.roomName, data, "move_player"); // move the player

	gameTiles.tileChecker(room, place, player.getPlayerName);
}
function changeMoney(playerToTax, whoOwns, cost, room) {
	var playerToTax = findPlayerByName(room, playerToTax);
	var playerToTaxMoney = playerToTax.playerMoney;

	playerToTaxMoney = playerToTaxMoney - parseInt(cost);
	playerToTax.playerMoney = playerToTaxMoney;

	var playerToTax2 = findPlayerByID(room, whoOwns);
	var playerToTaxMoney2 = playerToTax2.playerMoney;

	playerToTaxMoney2 = playerToTaxMoney2 + parseInt(cost);
	playerToTax2.playerMoney = playerToTaxMoney2;

	if (playerToTaxMoney < 0) {
		playerLoose(room, playerToTax);
	}

	updateGameClientMoney(room);
}
function nextTurnLocal(room) {
	room.turnNumb = 1;

	var out = room.playersIDout;

	var nextTurn = room.plaTurn;

	out.forEach((playerOutID) => {
		if (nextTurn == playerOutID) {
			nextTurn += 1;
		}
	});
	if (nextTurn == 2) {
		nextTurn = 1;
	} else {
		nextTurn += 1;
	}
	room.plaTurn = nextTurn;

	var data = { playerTurn: nextTurn, turnNum: room.turnNumb };
	clientUpdate(room.roomName, data, "next_turn");
}

function clientUpdate(roomName, data, event) {
	var socketio = require("../socketFiles/socketFunctions.js");
	socketio.sockets.to(roomName).emit(event, data);
	console.log("------------------------");
	console.log("Sent data to room " + roomName);
	console.log("the event was: " + event);
	console.log("and the data was: ");
	console.log(data);
}
