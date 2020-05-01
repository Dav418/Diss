var tradeProps = [];
var offerProps = [];
var tradeTarget;
function modifyTradeList(prop, push) {
	var str = prop.id + "," + prop.name;
	// for some reason if this was an object the list that is sent to the server will be empty
	if (push) {
		console.log("Adding new item to trade list: ");
		console.log(str);
		tradeProps.push(str);
	} else {
		console.log("Taking away item from trade list: ");
		console.log(str);
		var temp = [];
		tradeProps.forEach((i) => {
			if (i != str) {
				temp.push(i);
			}
		});
		tradeProps = temp;
	}
}
function modifyOfferList(prop, push) {
	var str = prop.id + "," + prop.name;
	if (push) {
		offerProps.push(str);
	} else {
		var temp = [];
		offerProps.forEach((i) => {
			if (i != str) {
				temp.push(i);
			}
		});
		offerProps = temp;
	}
}

function sendTrade() {
	var money = $("#moneyBox").val();
	if ((money = "")) {
		money = 0;
	}
	var data = { money: money, id: myTurn, room: room };
	sendToServer("check_money", data);
}
function confirmTrade() {
	if (tradeTarget != undefined) {
		var cash = $("#moneyBox").val();
		if (cash == "") {
			cash = 0;
		}
		var data = {
			whoTrade: myTurn,
			targetOfTrade: tradeTarget,
			tradeList: tradeProps,
			offerList: offerProps,
			room: room,
			money: cash,
		};
		

		sendToServer("asking_for_trade", data);
	}
}
function tradeProp() {
	//transfer the money from one onto the other player
	//transfer the prop
	//ping the server with the updated information
	showPopupBox(1);
	$("#choseWhoToTrade").empty();
	playerList.forEach((player) => {
		if (player.playerID != myTurn) {
			var data = {
				whoAsked: myTurn,
				playerID: player.playerID,
				roomName: room,
			};
			$("#choseWhoToTrade").append(createPlayerButton(data, player.playerName));
		}
	});
}
function createPlayerButton(data, playerName) {
	return $("<button/>", {
		text: playerName,
		class: "mainBtn",
		click: function () {
			showPopupBox(4);
			sendToServer("what_props_does_id_own", data);
			sendToServer("what_props_do_i_own", { id: myTurn, roomName: room });
		},
	});
}

// your player props

function addUserOwnedProps(data) {
	$("#tradeOfferInit").empty();
	data.forEach((prop) => {
		console.log(prop);
		$("#tradeOfferInit").append(createOfferButton(prop));
	});
}
function createOfferButton(prop) {
	return $("<button/>", {
		text: prop.name,
		class: "mainBtn",
		id: "btnTradeOffer" + prop.id,
		click: function () {
			modifyOfferList(prop, true);
			moveBtnOfferInit(prop);
		},
	});
}
function createOfferButtonAfter(prop) {
	return $("<button/>", {
		text: prop.name,
		class: "mainBtn",
		id: "btnTradeOffer" + prop.id,
		click: function () {
			modifyOfferList(prop, false);
			moveBtnOfferAfter(prop);
		},
	});
}

function moveBtnOfferInit(prop) {
	$("#btnTradeOffer" + prop.id).remove();
	$("#tradeOfferConfirm").append(createOfferButtonAfter(prop));
}

function moveBtnOfferAfter(prop) {
	$("#btnTradeOffer" + prop.id).remove();
	$("#tradeOfferInit").append(createOfferButton(prop));
}

// other players props

function addToTrade(data) {
	if (data.whoAsked == myTurn) {
		var list = data.props;
		tradeTarget = data.tradeTarget;
		$("#tradeAwayInit").empty();
		list.forEach((prop) => {
			console.log(prop);
			$("#tradeAwayInit").append(createTradePropButtonInit(prop));
		});
	}
}

function createTradePropButtonInit(prop) {
	return $("<button/>", {
		text: prop.name,
		class: "mainBtn",
		id: "btnTradeAway" + prop.id,
		click: function () {
			modifyTradeList(prop, true);
			moveBtnInit(prop);
		},
	});
}
function createTradePropButtonAfter(prop) {
	return $("<button/>", {
		text: prop.name,
		class: "mainBtn",
		id: "btnTradeAway" + prop.id,
		click: function () {
			modifyTradeList(prop, false);
			moveBtnAfter(prop);
		},
	});
}

function moveBtnInit(prop) {
	$("#btnTradeAway" + prop.id).remove();
	$("#tradeAwayConfirm").append(createTradePropButtonAfter(prop));
}

function moveBtnAfter(prop) {
	$("#btnTradeAway" + prop.id).remove();
	$("#tradeAwayInit").append(createTradePropButtonInit(prop));
}

var trades = {};

function confirmTradeFromServer(data) {
	if (data.target == myTurn) {
		showPopupBox(5);
		let asking = data.whatsBeingTraded;
		$("#tradeFromServerP").text("Offer from " + data.whosAsking);
		$("#askingFromServer").append("<p>They are asking for: <p>");
		asking.forEach((item) => {
			var temp = item.split(",");
			$("#askingFromServer").append("<p>" + temp[1] + "<p>");
		});
		let offer = data.whatsBeingOffered;
		$("#offerFromServer").append(
			"<p>They are offering $" + data.money + " and:<p>"
		);

		offer.forEach((item) => {
			var temp = item.split(",");
			$("#offerFromServer").append("<p>" + temp[1] + "<p>");
		});

		trades = {
			targetOf: data.target,
			whoAsked: data.whosAsking,
			askingFor: asking,
			offerFor: offer,
			offerMoney: data.money,
			room: room,
		};
	}
}

function userConfirmedtrade() {
	sendToServer("client_trade_confirm", trades);
	showPopupBox(0);
}
