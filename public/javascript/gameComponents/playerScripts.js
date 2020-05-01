var playerList = [];
var whosTurnItIs = -1;

function Player(id, divName, name) {
	this.id = id;
	this.divName = divName;
	this.name = name;
	this.money = 1500;
	this.props = [];
	this.pos = 0;

	Object.defineProperties(this, {
		playerID: {
			get: function () {
				return id;
			},
		},

		playerDivName: {
			get: function () {
				return divName;
			},
			set: function (d) {
				divName = d;
			},
		},
		playerName: {
			get: () => {
				return name;
			},
		},

		updateMoney: {
			set: (i) => {
				this.money = i;
			},
		},

		getMoney: {
			get: () => {
				return this.money;
			},
		},
		playerProps: {
			get: () => {
				return this.props;
			},
			set: (i) => {
				this.props = i;
			},
		},
	});
}
function getPlayerByID(ID) {
	var p;
	playerList.forEach((element) => {
		if (element.playerID == ID) {
			p = element;
		}
	});
	return p;
}

function getPlayerNameByID(ID) {
	return getPlayerByID(ID).playerName;
}

function GetPlayerMoneyByID(ID) {
	return getPlayerByID(ID).getMoney;
}

function getPlayerDiv(ID) {
	return getPlayerByID(ID).playerDivName;
}

function checkWhatTilePlayerIsOnByID(ID) {
	return getPlayerDiv(ID).parentNode.className;
}

function movePlayer(playerID, newPos) {
	//newPos is just the diceroll
	var player;
	for (var i = 0; i < playerList.length; i++) {
		var pID = playerList[i].playerID;
		if (playerID == pID) {
			player = playerList[i];
		}
	}

	var oldPos = player.playerPos;
	var distance = parseInt(newPos) - parseInt(oldPos);
	for (var i = 1; i < distance + 1; i++) {
		var p = parseInt(oldPos) + i;
		player.playerDivName.remove();
		document
			.getElementsByClassName("place" + p)[0]
			.appendChild(player.playerDivName);
	}
	player.playerPos = newPos;
}

function endTurn() {
	socket.emit("end_turn", room);
	changeStateOfButtons(true);
}

function generatePlayers(playerNames) {
	for (var i = 0; i != playerNames.length; i++) {
		var playerDiv = document.createElement("div");
		playerDiv.innerHTML = "My name is " + playerNames[i];
		playerDiv.className = "player#" + (i + 1);
		document.getElementsByClassName("place0")[0].appendChild(playerDiv);
		var p = new Player(i + 1, playerDiv, playerNames[i]);
		p.playerMoney = 1500;
		playerList.push(p);
		p.playerPos = 0;

		var infoCard = document.createElement("div");
		document.getElementsByClassName("playerCards")[0].appendChild(infoCard);
		var playerName = document.createElement("p");
		playerName.innerHTML = p.playerName + " has currently : $" + p.getMoney;
		playerName.className = "infoCardName" + p.playerName;
		infoCard.appendChild(playerName);
	}
	whosTurnItIs = 1;
}

function testPlayers() {
	// tests i did to fully understand getters and setters in js, left it in for fun
	for (var i = 0; i < playerList.length; i++) {
		var p = playerList[i];
		console.log("I am " + p.playerID);
		console.log("I have " + p.playerMoney);
		p.playerMoney = 20;
		if (p.playerID % 2) {
			p.playerMoney = 200000;
		}
		console.log("Now I have " + p.playerMoney);
	}
}

function generateTable() {
	var number_of_rows = 28;
	var number_of_cols = 2;
	var table_body = $("<table/>");
	table_body.addClass("propertiesTable");

	var table_head = $("<tr>");
	var head_data1 = $("<th>").text("Prop Name");
	table_head.append(head_data1);

	var head_data2 = $("<th>").text("Who owns");
	table_head.append(head_data2);

	table_body.append(table_head);

	for (var i = 0; i < number_of_rows; i++) {
		var row = $("<tr>");
		table_body.append(row);
		for (var j = 0; j < number_of_cols; j++) {
			if (j == 0) {
				var data = $("<td>");
				data.text(findTile(i));
				row.append(data);
			} else {
				var data = $("<td>");
				data.addClass("prop#" + findTile(i));
				data.append("Bank");
				row.append(data);
			}
		}
	}

	$("#propTab").append(table_body);
}

function findTile(i) {
	var temp = null;
	gameTiles.forEach((element) => {
		if (element.id == i) {
			temp = element.name;
		}
	});

	if (temp != null) {
		return temp;
	} else {
		return "err";
	}
}

var gameTiles = [
	{ id: 0, name: "South Towers", cost: 60 },
	{ id: 1, name: "North Towers", cost: 60 },
	{ id: 2, name: "place holder 3", cost: 200 },
	{ id: 3, name: "Square 2", cost: 100 },
	{ id: 4, name: "Square 3", cost: 100 },
	{ id: 5, name: "Square 4", cost: 100 },
	{ id: 6, name: "Happy Days", cost: 140 },
	{ id: 7, name: "place holder 8", cost: 150 },
	{ id: 8, name: "Moa", cost: 140 },
	{ id: 9, name: "Fusion", cost: 160 },
	{
		id: 10,
		type: "prop-station",
		name: "placeholder 11",
		cost: 200,
	},
	{ id: 11, name: "IT lab 1", cost: 180 },
	{ id: 12, name: "IT lab C", cost: 180 },
	{ id: 13, name: "IT lab 7", cost: 200 },
	{ id: 14, name: "EBS", cost: 220 },
	{ id: 15, name: "LTB", cost: 220 },
	{ id: 16, name: "Ivor Crewe", cost: 240 },
	{
		id: 17,
		type: "prop-station",
		name: "placeholder 18",
		cost: 200,
	},
	{ id: 18, name: "The Kitchen", cost: 260 },
	{ id: 19, name: "Starbucks", cost: 260 },
	{ id: 20, name: "placeholder 21", cost: 150 },
	{ id: 21, name: "Bytes", cost: 280 },
	{ id: 22, name: "Psychology Building", cost: 300 },
	{ id: 23, name: "Robotics Building", cost: 300 },
	{ id: 24, name: "STEM", cost: 320 },
	{
		id: 25,
		type: "prop-station",
		name: "placeholder 26",
		cost: 200,
	},
	{ id: 26, type: "dblue1", name: "SILB", cost: 350 },
	{ id: 27, type: "dblue2", name: "Library", cost: 400 },
];
