var gameTiles = [
	{ id: 0, type: "special", name: "tax", cost: 200, family: "special" },
	{
		id: 1,
		type: "prop",
		name: "South Towers",
		cost: 60,
		owned: -1,
		family: "brown",
		taxHouse: { 0: 2, 1: 10, 2: 30, 3: 90, 4: 160 },
		taxColSetAndHotel: { 0: 4, 1: 250 },
		houseCount: 0,
		hotel: false,
		houseAndHotelCost: 50,
	},
	{ id: 2, type: "chest", name: "community chest", family: "special" },
	{
		id: 3,
		type: "prop",
		name: "North Towers",
		cost: 60,
		owned: -1,
		family: "brown",
		taxHouse: { 0: 4, 1: 20, 2: 60, 3: 180, 4: 320 },
		taxColSetAndHotel: { 0: 8, 1: 450 },
		houseCount: 0,
		hotel: false,
		houseAndHotelCost: 50,
	},
	{ id: 4, type: "special", name: "tax", cost: -200, family: "special" },
	{
		id: 5,
		type: "prop-station",
		name: "place holder 3",
		cost: 200,
		owned: -1,
		family: "special",
	},
	{
		id: 6,
		type: "prop",
		name: "Square 2",
		cost: 100,
		owned: -1,
		family: "bblue",
		taxHouse: { 0: 6, 1: 30, 2: 90, 3: 270, 4: 400 },
		taxColSetAndHotel: { 0: 12, 1: 550 },
		houseCount: 0,
		hotel: false,
		houseAndHotelCost: 50,
	},
	{ id: 7, type: "chest", name: "chance", family: "special" },
	{
		id: 8,
		type: "prop",
		name: "Square 3",
		cost: 100,
		owned: -1,
		family: "bblue",
		taxHouse: { 0: 6, 1: 30, 2: 90, 3: 270, 4: 400 },
		taxColSetAndHotel: { 0: 12, 1: 550 },
		houseCount: 0,
		hotel: false,
		houseAndHotelCost: 50,
	},
	{
		id: 9,
		type: "prop",
		name: "Square 4",
		cost: 100,
		owned: -1,
		family: "bblue",
		taxHouse: { 0: 8, 1: 40, 2: 100, 3: 300, 4: 450 },
		taxColSetAndHotel: { 0: 12, 1: 600 },
		houseCount: 0,
		hotel: false,
		houseAndHotelCost: 50,
	},
	{ id: 10, type: "jail", name: "In jail", family: "special" },
	{
		id: 11,
		type: "prop",
		name: "Happy Days",
		cost: 140,
		owned: -1,
		family: "pink",
		taxHouse: { 0: 6, 1: 30, 2: 90, 3: 270, 4: 400 },
		taxColSetAndHotel: { 0: 12, 1: 550 },
		houseCount: 0,
		hotel: false,
		houseAndHotelCost: 100,
	},
	{
		id: 12,
		type: "prop-comp",
		name: "place holder 8",
		cost: 150,
		owned: -1,
		family: "special",
	},
	{
		id: 13,
		type: "prop",
		name: "Moa",
		cost: 140,
		owned: -1,
		family: "pink",
		taxHouse: { 0: 10, 1: 50, 2: 150, 3: 450, 4: 625 },
		taxColSetAndHotel: { 0: 20, 1: 750 },
		houseCount: 0,
		hotel: false,
		houseAndHotelCost: 100,
	},
	{
		id: 14,
		type: "prop",
		name: "Fusion",
		cost: 160,
		owned: -1,
		family: "pink",
		taxHouse: { 0: 12, 1: 60, 2: 180, 3: 500, 4: 700 },
		taxColSetAndHotel: { 0: 24, 1: 900 },
		houseCount: 0,
		hotel: false,
		houseAndHotelCost: 100,
	},
	{
		id: 15,
		type: "prop-station",
		name: "placeholder 11",
		cost: 200,
		owned: -1,
		family: "special",
	},
	{
		id: 16,
		type: "prop",
		name: "IT lab 1",
		cost: 180,
		owned: -1,
		family: "orange",
		taxHouse: { 0: 14, 1: 70, 2: 200, 3: 550, 4: 750 },
		taxColSetAndHotel: { 0: 12, 1: 950 },
		houseCount: 0,
		hotel: false,
		houseAndHotelCost: 100,
	},
	{ id: 17, type: "chest", name: "community chest", family: "special" },
	{
		id: 18,
		type: "prop",
		name: "IT lab C",
		cost: 180,
		owned: -1,
		family: "orange",
		taxHouse: { 0: 14, 1: 70, 2: 200, 3: 550, 4: 750 },
		taxColSetAndHotel: { 0: 12, 1: 950 },
		houseCount: 0,
		hotel: false,
		houseAndHotelCost: 100,
	},
	{
		id: 19,
		type: "prop",
		name: "IT lab 7",
		cost: 200,
		owned: -1,
		family: "orange",
		taxHouse: { 0: 16, 1: 80, 2: 220, 3: 600, 4: 800 },
		taxColSetAndHotel: { 0: 32, 1: 1000 },
		houseCount: 0,
		hotel: false,
		houseAndHotelCost: 100,
	},
	{
		id: 20,
		type: "special",
		name: "free parining",
		family: "special",
	},
	{
		id: 21,
		type: "prop",
		name: "EBS",
		cost: 220,
		owned: -1,
		family: "red",
		taxHouse: { 0: 20, 1: 100, 2: 300, 3: 750, 4: 925 },
		taxColSetAndHotel: { 0: 40, 1: 1100 },
		houseCount: 0,
		hotel: false,
		houseAndHotelCost: 150,
	},
	{ id: 22, type: "chest", name: "chance", family: "special" },
	{
		id: 23,
		type: "prop",
		name: "LTB",
		cost: 220,
		owned: -1,
		family: "red",
		taxHouse: { 0: 18, 1: 90, 2: 250, 3: 700, 4: 875 },
		taxColSetAndHotel: { 0: 40, 1: 1050 },
		houseCount: 0,
		hotel: false,
		houseAndHotelCost: 150,
	},
	{
		id: 24,
		type: "prop",
		name: "Ivor Crewe",
		cost: 240,
		owned: -1,
		family: "red",
		taxHouse: { 0: 18, 1: 90, 2: 250, 3: 700, 4: 875 },
		taxColSetAndHotel: { 0: 40, 1: 1050 },
		houseCount: 0,
		hotel: false,
		houseAndHotelCost: 150,
	},
	{
		id: 25,
		type: "prop-station",
		name: "placeholder 18",
		cost: 200,
		owned: -1,
		family: "special",
	},
	{
		id: 26,
		type: "prop",
		name: "The Kitchen",
		cost: 260,
		owned: -1,
		family: "yellow",
		taxHouse: { 0: 24, 1: 120, 2: 360, 3: 850, 4: 1025 },
		taxColSetAndHotel: { 0: 48, 1: 1200 },
		houseCount: 0,
		hotel: false,
		houseAndHotelCost: 150,
	},
	{
		id: 27,
		type: "prop",
		name: "Starbucks",
		cost: 260,
		owned: -1,
		family: "yellow",
		taxHouse: { 0: 22, 1: 1100, 2: 330, 3: 800, 4: 975 },
		taxColSetAndHotel: { 0: 44, 1: 1150 },
		houseCount: 0,
		hotel: false,
		houseAndHotelCost: 150,
	},
	{
		id: 28,
		type: "prop-comp",
		name: "placeholder 21",
		cost: 150,
		owned: -1,
		family: "special",
	},
	{
		id: 29,
		type: "prop",
		name: "Bytes",
		cost: 280,
		owned: -1,
		family: "yellow",
		taxHouse: { 0: 22, 1: 110, 2: 330, 3: 800, 4: 975 },
		taxColSetAndHotel: { 0: 40, 1: 1150 },
		houseCount: 0,
		hotel: false,
		houseAndHotelCost: 150,
	},
	{ id: 30, type: "jail", name: "go to jail", family: "special" },
	{
		id: 31,
		type: "prop",
		name: "Psychology Building",
		cost: 300,
		owned: -1,
		family: "greeen",
		taxHouse: { 0: 26, 1: 130, 2: 390, 3: 900, 4: 1100 },
		taxColSetAndHotel: { 0: 52, 1: 1275 },
		houseCount: 0,
		hotel: false,
		houseAndHotelCost: 200,
	},
	{
		id: 32,
		type: "prop",
		name: "Robotics Building",
		cost: 300,
		owned: -1,
		family: "greeen",
		taxHouse: { 0: 26, 1: 130, 2: 390, 3: 900, 4: 1100 },
		taxColSetAndHotel: { 0: 52, 1: 1275 },
		houseCount: 0,
		hotel: false,
		houseAndHotelCost: 200,
	},
	{ id: 33, type: "chest", name: "community chest", family: "special" },
	{
		id: 34,
		type: "prop",
		name: "STEM",
		cost: 320,
		owned: -1,
		family: "greeen",
		taxHouse: { 0: 28, 1: 150, 2: 450, 3: 1000, 4: 1200 },
		taxColSetAndHotel: { 0: 56, 1: 1400 },
		houseCount: 0,
		hotel: false,
		houseAndHotelCost: 200,
	},
	{
		id: 35,
		type: "prop-station",
		name: "placeholder 26",
		cost: 200,
		owned: -1,
		family: "special",
	},
	{ id: 36, type: "chest", name: "chance", family: "special" },
	{
		id: 37,
		type: "prop",
		name: "SILB",
		cost: 350,
		owned: -1,
		family: "dbluel",
		taxHouse: { 0: 50, 1: 200, 2: 600, 3: 1400, 4: 1700 },
		taxColSetAndHotel: { 0: 100, 1: 2000 },
		houseCount: 0,
		hotel: false,
		houseAndHotelCost: 200,
	},
	{ id: 38, type: "special", name: "tax", cost: -200, family: "special" },
	{
		id: 39,
		type: "prop",
		name: "Library",
		cost: 400,
		owned: -1,
		family: "dblue",
		taxHouse: { 0: 35, 1: 175, 2: 500, 3: 1100, 4: 1200 },
		taxColSetAndHotel: { 0: 70, 1: 1500 },
		houseCount: 0,
		hotel: false,
		houseAndHotelCost: 200,
	},
];

function checkPlayerTile(room, place, playerName) {
	var tilePlayerIsOn = figureOutWhatTileThePlayerIsOn(room, place);
	console.log("Tile player is on: ");
	console.log(tilePlayerIsOn);
	var gameLogic = require("./gameLogic.js");
	switch (tilePlayerIsOn.type) {
		case "special":
			// special
			if (tilePlayerIsOn.name == "tax") {
				gameLogic.bankTax(room.roomName, playerName, tilePlayerIsOn.cost);
			}
			break;
		case "prop":
			if (tilePlayerIsOn.owned == -1) {
				// no one ownes it, send msg to player asking to buy
				var socketio = require("../socketFiles/socketFunctions.js");
				var data = {
					playerName: playerName,
					name: tilePlayerIsOn.name,
					id: tilePlayerIsOn.id,
				};
				socketio.sockets.to(room.roomName).emit("player_tile_buy", data);
				//sent to client. if user clics yes then they emit player_buys_a_prop
				//from socketFunctions
			} else {
				//someone does own it
				var playerID = gameLogic.findPlayerUsingName(room, playerName);

				var tax = checkHowMuchToTax(
					room.getTileSet,
					tilePlayerIsOn.id,
					playerID
				);
				var who = tilePlayerIsOn.owned;
				gameLogic.taxPlayer(playerName, who, tax, room);
				var data = {
					playerWhoGotTaxed: playerName,
					tile: tilePlayerIsOn.name,
					whoGotMoney: who,
					taxVal: tax,
				};
				var socketio = require("../socketFiles/socketFunctions.js");
				socketio.sockets.to(room.roomName).emit("tax_msg", data);
			}
			break;
		case "chest":
			//do chest stuff
			if (tilePlayerIsOn.name == "community chest") {
			}
			var socketio = require("../socketFiles/socketFunctions.js");
			socketio.sockets.to(room.roomName).emit("player_tile", data);
			break;
		case "prop-station":
			//do station stuff
			var socketio = require("../socketFiles/socketFunctions.js");
			var data = {
				playerName: playerName,
				type: "prop-station " + tilePlayerIsOn.name,
			};
			socketio.sockets.to(room.roomName).emit("player_tile", data);
			break;
		case "jail":
			//send player to jail
			var socketio = require("../socketFiles/socketFunctions.js");
			var data = {
				playerName: playerName,
				type: "jail " + tilePlayerIsOn.name,
			};
			socketio.sockets.to(room.roomName).emit("move_Player_To_Jail", data);
			break;
		case "prop-stat":
			//do staion stuff
			var socketio = require("../socketFiles/socketFunctions.js");
			var data = {
				playerName: playerName,
				type: "prop-stat " + tilePlayerIsOn.name,
			};
			socketio.sockets.to(room.roomName).emit("player_tile", data);
			break;
	}
}

function figureOutWhatTileThePlayerIsOn(room, pos) {
	var t;
	var tiles = room.getTileSet;
	tiles.forEach((tile) => {
		if (tile.id == pos) {
			t = tile;
		}
	});
	return t;
}
function checkHowMuchToTax(tileList, propID, playerID) {
	var t;
	var returnVal;
	tileList.forEach((tile) => {
		if (tile.id == propID) {
			t = tile;
		}
	});
	var whoOwnsThisPropFam = checkIfCanBuyHouseLocal(propID, tileList);
	if (playerID != whoOwnsThisPropFam) {
		returnVal = t.taxHouse[0];
	} else {
		var houseCount = t.houseCount;
		if (t.hotel) {
			returnVal = t.taxColSetAndHotel[1];
		}
		if (houseCount == 0) {
			returnVal = t.taxColSetAndHotel[0];
		} else {
			returnVal = t.taxHouse[houseCount];
		}
	}
	return returnVal;
}
function checkIfCanBuyHouseLocal(propID, tileSet) {
	var familyName;
	tileSet.forEach((tile) => {
		if (propID == tile.id) {
			familyName = tile.family;
		}
	});
	var familyNameTileSetList = [];
	tileSet.forEach((tile) => {
		if (tile.family == familyName) {
			familyNameTileSetList.push(tile); //oh o
		}
	});
	var ownedBy = familyNameTileSetList[0].owned;
	var canBuild = true;
	familyNameTileSetList.forEach((tile) => {
		if (tile.owned != ownedBy) {
			canBuild = false;
		}
	});
	if (canBuild) {
		return ownedBy;
	} else {
		return -1;
	}
}

module.exports = {
	tileChecker: (room, place, playerName) => {
		checkPlayerTile(room, place, playerName);
	},
	getCopyOfTIleSet: gameTiles,
	getPriceOfProp: (name) => {
		var t;

		gameTiles.forEach((tile) => {
			if (tile.name == name) {
				t = tile;
			}
		});
		return t.cost;
	},
	addHouse: (propID, gRoom) => {
		var tileSet = gRoom.getTileSet;
		var returnBool;
		tileSet.forEach((tile) => {
			if (tile.id == propID) {
				var temp = tile.houseCount;
				if (temp == 4) {
					returnBool = false;
				} else {
					temp = temp + 1;
					tile.houseCount = temp;

					returnBool = true;
				}
			}
		});
		if (returnBool) {
			gRoom.updateTileSet = tileSet;
		}
		return returnBool;
	},
	checkIfCanBuyHouse: (propID, tileSet) => {
		return checkIfCanBuyHouseLocal(propID, tileSet);
	},
	findAllProps: (gRoom, playerID) => {
		var owned = [];
		var tiles = gRoom.getTileSet;
		console.log("Tiles in the game: ");
		tiles.forEach((t) => {
			console.log(t);
			if (t.owned == playerID) {
				var temp = { id: t.id, name: t.name };
				owned.push(temp);
			}
		});
		return owned;
	},
	getTileFromID: (id, tileList) => {
		var t;
		tileList.forEach((tile) => {
			if (id == tile.id) {
				t = tile;
			}
		});
		return t;
	},
	getTileFromName: (name) => {
		var t;
		gameTiles.forEach((tile) => {
			if (name == tile.name) {
				t = tile;
			}
		});
		return t;
	},
	purchiseProp: (room, playerID, tileID) => {
		var tiles = room.getTileSet;
		tiles.forEach((tile) => {
			if (tile.id == tileID) {
				tile.owned = playerID;
			}
		});
		room.updateTileSet = tiles;
	},
	getListOfNamesFromListOfID: (IDs) => {
		var returnList = [];
		IDs.forEach((id) => {
			gameTiles.forEach((t) => {
				if (id == t.id) {
					returnList.push(id.name);
				}
			});
		});
		return returnList;
	},
	changeOwnership: (id, newOwner, gRoom) => {
		var tileSet = gRoom.getTileSet;
		tileSet.forEach((tile) => {
			if (tile.id == id) {
				tile.owned = newOwner;
				console.log("Foudn new Owner!");
				console.log(tile);
			}
		});
		gRoom.updateTileSet = tileSet;
	},
	liqudateAssets: (room, playerID) => {
		var tileList = room.getTileSet;
		tileList.forEach((tile) => {
			if (tile.owned == playerID) {
				tile.owned = -1;
				var socketio = require("../socketFiles/socketFunctions.js");
				socketio.sockets.to(room.roomName).emit("bank_asset", tile.name);
			}
		});
		room.updateTileSet = tileList;
	},
};
