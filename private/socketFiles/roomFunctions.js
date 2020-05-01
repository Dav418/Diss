var User = require("../databaseFiles/userCRUD.js");
var gameLogic = require("../gameLogic/gameLogic.js");
var roomList = [];
//TODO: remake how private rooms work cos this shit is broken somehow
function roomObject(room) {
	this.room = room;
	this.numberOfPlayers = 0;
	this.playerList = [];
	this.isRoomFull = false;
	this.roomPassword = null;

	Object.defineProperties(this, {
		roomName: {
			get: () => {
				return this.room;
			},
		},
		playerNumber: {
			get: () => {
				return this.numberOfPlayers;
			},
		},
		changeNumber: {
			set: (n) => {
				this.numberOfPlayers += n;
			},
		},
		addPlayer: {
			set: (p) => {
				this.playerList.push(p);
			},
		},
		removePlayer: {
			set: (i) => {
				this.playerList.splice(i, 1);
			},
		},
		getPlayer: {
			get: () => {
				return this.playerList;
			},
		},
		changeRoomStatus: {
			set: (i) => {
				this.isRoomFull = i;
			},
		},
		checkRoom: {
			get: () => {
				return this.isRoomFull;
			},
		},
		checkPass: {
			get: () => {
				return this.roomPassword;
			},
		},
		assignPass: {
			set: (i) => {
				this.roomPassword = i;
			},
		},
	});
}

function startGame(room) {
	var players = room.getPlayer;
	var playerNamesInGame = [];

	players.forEach((p) => {
		var name = p.split(",");
		playerNamesInGame.push(name[0]);

		var cashPrmise = User.getMoney(name[0]);
		cashPrmise.then((cash) => {
			//take money from each player to start the game
			User.setMoney(name[0], cash.money - 100);
		});
	});
	gameLogic.initialiseGameRoom(room.roomName, playerNamesInGame);
	room.changeRoomStatus = true;
}
module.exports = {
	getRoomList: () => {
		return roomList;
	},
	assignPlayerTurn: (name) => {
		var i = 0;
		roomList.forEach((element) => {
			if (element.roomName == name) i = element.playerNumber;
		});
		return i + 1;
	},
	createPrivateRoom(roomName, password) {
		var i = new roomObject(roomName);
		i.assignPass = password;
		roomList.push(i);
		
	},
	checkRoomPassword(roomName, passWrd) {
		let found = false;
		roomList.forEach((element) => {
			if (element.checkPass == passWrd && element.roomName == roomName) {
				found = true;
			}
		});
		return found;
	},

	assignRoom: (papers, ID) => {
		var found = false;
		roomList.forEach((e) => {
			// e is the "room" object
			if (e.roomName == papers.room) {
				found = true;
				e.changeNumber = 1;
				var string = papers.name + "," + ID;
				e.addPlayer = string;
			}

			//emit socket

			if (
				e.numberOfPlayers == 2 &&
				e.roomName != "generalChat" &&
				!e.checkRoom &&
				e.roomName != "roomChoose"
			) {
				// when theres x players game can start
				console.log("--------SRTING GAME IN " + e.roomName + "---------");
				startGame(e);
			}
		});
		if (!found) {
			var i = new roomObject(papers.room);
			i.changeNumber = 1;
			var string = papers.name + "," + ID;
			i.addPlayer = string;
			roomList.push(i);
		}
		localFunClientUpdate();
	},

	deleteRoom: (r, ID) => {
		var roomZero;
		var found = false;
		roomList.forEach((e) => {
			// iterate over the roomList
			if (e.roomName == r) {
				//room name match room supplied
				e.changeNumber = -1;
				players = e.getPlayer;
				var index = 0;
				players.forEach((element) => {
					//iterate over players in room "e"
					var string = element.split(",");
					if (string[1] == ID) {
						e.removePlayer = index;
					}
					index++;
				});
			}

			if (e.playerNumber == 0) {
				found = true;
				roomZero = e;
			}
		});
		if (found) {
			roomList.splice(roomList.indexOf(roomZero), 1);
		}
	},

	checkIfExists: (i) => {
		let bck = false;
		roomList.forEach((e) => {
			if (e.roomName == i) {
				bck = true;
			}
		});
		return bck;
	},

	printAllRooms: () => {
		console.log("roomList: ");
		roomList.forEach((element) => {
			console.log(element);
		});
	},

	updateClient: () => {
		localFunClientUpdate();
	},
};

function localFunClientUpdate() {
	var data = [];
	roomList.forEach((room) => {

		if (room.roomName != "generalChat" && room.roomName != "roomChoose") {
			var state;
			if (room.checkPass == null) {
				state = "Public";
			} else {
				state = "Private";
			}
			var formatedRoom = {
				roomName: room.roomName,
				pNumb: room.playerNumber,
				roomState: state,
			};
			data.push(formatedRoom);
		}
	});
	var socketio = require("../socketFiles/socketFunctions.js");
	socketio.sockets.to("roomChoose").emit("update_room_data", data);
}
