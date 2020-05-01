var imgsInfo = [];

function buyThisProp(prop, id, thisRoom) {
	//take the money
	//ping the server to update the props
	//add it to the prop tab

	var data = { propName: prop, playerID: id, room: thisRoom };
	var msg = "player_buys_a_prop";

	sendToServer(msg, data);
	data = {};
}

function buyBrownProps(thisRoom) {
	var data = { propName: "South Towers", playerID: 1, room: thisRoom };
	var msg = "player_buys_a_prop";
	sendToServer(msg, data);

	var data = { propName: "North Towers", playerID: 1, room: thisRoom };
	var msg = "player_buys_a_prop";
	sendToServer(msg, data);
}

function morgageProp(who) {
	//popup window to ask what prop to morgage
	//transfer money
	//update server
}

function sendToServer(command, data) {
	//data is a object
	//update the room with a command
	socket.emit(command, data);
}

function buildHouses() {
	// this will be a button on the div that will appear when a player clicks on the tile
	//check if the other props are owned by the player
	// if they are then build props
	var data = { propID: findPropFromArray(), playerID: myTurn, room: room };
	var msg = "player_buys_a_house";
	sendToServer(msg, data);
}

function buildHousesResponce(id) {
	$("#house" + id).prepend('<img class="houseImg" src="../image/house.png" />');
}

function buildHotel() {
	$("#hotel" + findPropFromArray()).prepend(
		'<img class="hotelImg" src="../image/hotel.png" />'
	);
}

function findPropFromArray() {
	var id = document.getElementById("tilePic").src;
	var i = -1;
	imgsInfo.some(function (pic) {
		i++;
		return pic.src == id;
	});
	return i;
}

function showCard(id) {
	var text = [
		"Collect $200",
		"South towers, one of the on campus accomidations",
		"Community chest",
		"North towers is the best towers.",
		"Err",
		"Err",
		"Square 2, one of the less busy squares",
		"Chance!",
		"If theres something happening, its happening on square 3!",
		"Square 4 has the best shops on campus.",
		"Oh o your in jail!",
		"Happy days or more commonly known as Bufflo Joes is... not the bets food place on campus. Try Fusion?",
		"Err",
		"Moas' chicken is to die for, especially with the kill me now hot souce!",
		"Hands down the best food place on campus",
		"Err",
		"Lab 1 is where i spent of my days...",
		"Community chest!",
		"... lab c is for a man with refined tastes... ",
		"... and lab 7 is for if you really need to get some work done.",
		//TODO finish this
	];

	showPopupBox(2);
	$("#msgPara").text(text[id]);
	document.getElementById("tilePic").src = imgsInfo[id].src;
}

function preloadInfoImages() {
	// preloads the images if thy are not already stored locally

	var location = [
		"../image/Go-Arrow.jpg", //0
		"../image/tileInfo/south.png", //1
		"../image/cc1.png", //2
		"../image/tileInfo/north.png", //3
		"../image/chance.jpg", //no 4
		"../image/chance.jpg", //no 5
		"../image/tileInfo/sqr2.png", //6
		"../image/chance.jpg", //7
		"../image/tileInfo/sqr3.png", //8,
		"../image/tileInfo/sqr4.png", //9
		"../image/inJail.jpg", //10
		"../image/tileInfo/happy.png", //11
		"../image/chance.jpg", //no 12
		"../image/tileInfo/moa.png", //13
		"../image/tileInfo/fusion.png", //14
		"../image/chance.jpg", //no //15
		"../image/tileInfo/lab1.png", //16
		"../image/cc1.png", //17
		"../image/tileInfo/labC.png", //18
		"../image/tileInfo/lab7.png", //19
		"../image/freeParking.jpg", //20
		"../image/tileInfo/ebs.png", //21
		"../image/cc1.png", //22
		"../image/tileInfo/ltb.png", //23
		"../image/tileInfo/ic.png", //24
		"../image/tileInfo/ebs.png", //no //25
		"../image/tileInfo/kitchen.png", //26
		"../image/tileInfo/star.png", //27
		"../image/tileInfo/ebs.png", //no//28
		"../image/tileInfo/bytes.png", //29
		"../image/goToJail.jpg", //30
		"../image/tileInfo/psych.png", //31
		"../image/tileInfo/robot.png", //32
		"../image/cc1 .png", //33
		"../image/tileInfo/STEM.png", //34
		"../image/tileInfo/ebs.png", //no//35
		"../image/chance.jpg", //36
		"../image/tileInfo/silb.png", //37
		"../image/tileInfo/ebs.png", //no//38
		"../image/tileInfo/lib.png", //39
	];

	for (var i = 0; i < location.length; i++) {
		var img = new Image();
		img.src = location[i];
		imgsInfo.push(img);
	}
}
