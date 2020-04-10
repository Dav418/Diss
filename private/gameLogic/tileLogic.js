var gameTiles = [
	{ id: 0, type: "special", name: "Go" },
	{ id: 1, type: "prop", name: "brown prop 1", cost: 60, owned: -1 },
	{ id: 2, type: "chest", name: "community chest" },
	{ id: 3, type: "prop", name: "brown prop 2", cost: 60, owned: -1 },
	{ id: 4, type: "special", name: "income tax" },
	{ id: 5, type: "prop-station", name: "place holder 3", cost: 200, owned: -1 },
	{ id: 6, type: "prop", name: "blue 1", cost: 100, owned: -1 },
	{ id: 7, type: "chest", name: "chance" },
	{ id: 8, type: "prop", name: "blue 2", cost: 100, owned: -1 },
	{ id: 9, type: "prop", name: "blue 3", cost: 100, owned: -1 },
	{ id: 10, type: "jail", name: "In jail" },
	{ id: 11, type: "prop", name: "pink 1", cost: 140, owned: -1 },
	{ id: 12, type: "prop-comp", name: "place holder 8", cost: 150, owned: -1 },
	{ id: 13, type: "prop", name: "pink 2", cost: 140, owned: -1 },
	{ id: 14, type: "prop", name: "pink 3", cost: 160, owned: -1 },
	{
		id: 15,
		type: "prop-station",
		name: "placeholder 11",
		cost: 200,
		owned: -1
	},
	{ id: 16, type: "prop", name: "orng 1", cost: 180, owned: -1 },
	{ id: 17, type: "chest", name: "community chest" },
	{ id: 18, type: "prop", name: "orng 2", cost: 180, owned: -1 },
	{ id: 19, type: "prop", name: "orng 3", cost: 200, owned: -1 },
	{ id: 20, type: "special", name: "free parining" },
	{ id: 21, type: "prop", name: "red 1", cost: 220, owned: -1 },
	{ id: 22, type: "chest", name: "chance" },
	{ id: 23, type: "prop", name: "red 2", cost: 220, owned: -1 },
	{ id: 24, type: "prop", name: "red 3", cost: 240, owned: -1 },
	{
		id: 25,
		type: "prop-station",
		name: "placeholder 18",
		cost: 200,
		owned: -1
	},
	{ id: 26, type: "prop", name: "yellow 1", cost: 260, owned: -1 },
	{ id: 27, type: "prop", name: "yellow 2", cost: 260, owned: -1 },
	{ id: 28, type: "prop-comp", name: "placeholder 21", cost: 150, owned: -1 },
	{ id: 29, type: "prop", name: "yellow 3", cost: 280, owned: -1 },
	{ id: 30, type: "jail", name: "go to jail" },
	{ id: 31, type: "prop", name: "green 1", cost: 300, owned: -1 },
	{ id: 32, type: "prop", name: "green 2", cost: 300, owned: -1 },
	{ id: 33, type: "chest", name: "community chest" },
	{ id: 34, type: "prop", name: "green 3", cost: 320, owned: -1 },
	{
		id: 35,
		type: "prop-station",
		name: "placeholder 26",
		cost: 200,
		owned: -1
	},
	{ id: 36, type: "chest", name: "chance" },
	{ id: 37, type: "prop", name: "blue 1", cost: 350, owned: -1 },
	{ id: 38, type: "special", name: "pay 100" },
	{ id: 39, type: "prop", name: "blue 2", cost: 400, owned: -1 }
];

function checkPlayerTile(room, place, playerName) {
	var tilePlayerIsOn = figureOutWhatTileThePlayerIsOn(room, place);
	var gameLogic = require("./gameLogic.js");
	switch (tilePlayerIsOn.type) {
		case "special":
			// special
			var socketio = require("../socketFiles/socketFunctions.js");
			var data = {
				playerName: playerName,
				type: "special" + tilePlayerIsOn.name
			};
			socketio.sockets.to(room.roomName).emit("player_tile", data); // move the player
			break;
		case "prop":
			if (tilePlayerIsOn.owned == -1) {
				gameLogic.testFun();
				// no one ownes it, send msg to player asking to buy
				var socketio = require("../socketFiles/socketFunctions.js");
				var data = { playerName: playerName, name: tilePlayerIsOn.name };
				socketio.sockets.to(room.roomName).emit("player_tile_buy", data);
				//sent to client. if user clics yes then they emit player_buys_a_prop
				//from socketFunctions
			} else {
				//someone does own it
				var tax = tilePlayerIsOn.cost;
				var who = tilePlayerIsOn.owned;
				gameLogic.taxPlayer(playerName, who, tax, room);
			}
			break;
		case "chest":
			//do chest stuff

			if(tilePlayerIsOn.name == "community chest"){
				
			}
			var socketio = require("../socketFiles/socketFunctions.js");
			socketio.sockets.to(room.roomName).emit("player_tile", data);
			break;
		case "prop-station":
			//do station stuff
			var socketio = require("../socketFiles/socketFunctions.js");
			var data = {
				playerName: playerName,
				type: "prop-station " + tilePlayerIsOn.name
			};
			socketio.sockets.to(room.roomName).emit("player_tile", data);
			break;
		case "jail":
			//send player to jail
			var socketio = require("../socketFiles/socketFunctions.js");
			var data = {
				playerName: playerName,
				type: "jail " + tilePlayerIsOn.name
			};
			socketio.sockets.to(room.roomName).emit("move_Player_To_Jail", data);
			break;
		case "prop-stat":
			//do staion stuff
			var socketio = require("../socketFiles/socketFunctions.js");
			var data = {
				playerName: playerName,
				type: "prop-stat " + tilePlayerIsOn.name
			};
			socketio.sockets.to(room.roomName).emit("player_tile", data);
			break;
	}
}

function figureOutWhatTileThePlayerIsOn(room, pos) {
	var t;
	var tiles = room.getTileSet;
	tiles.forEach(tile => {
		if (tile.id == pos) {
			t = tile;
		}
	});
	return t;
}

module.exports = {
	tileChecker: (room, place, playerName) => {
		checkPlayerTile(room, place, playerName);
	},
	getCopyOfTIleSet: gameTiles,
	getPriceOfProp: name => {
		var t;
		gameTiles.forEach(tile => {
			if (tile.name == name) {
				t = tile;
			}
		});
		return t.cost;
	},
	getTileByName: name => {
		var t;
		gameTiles;
	}
};
