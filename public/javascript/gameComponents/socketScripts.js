function updateMoneyFromServer(dat) {
	dat.forEach((ele) => {
		var p = getPlayerByID(ele.pID);
		p.updateMoney = ele.pMoney;
		var temp = document.getElementsByClassName(
			"infoCardName" + p.playerName
		)[0];
		temp.innerHTML = p.playerName + " has currently : $" + p.getMoney;
	});
}

function startGameFromServer(msg) {
	generatePlayers(msg);
	backgroundAudio = new Audio();
	appendToConsole("Starting a new game with : " + msg);
	let name = getPlayerNameByID(whosTurnItIs);
	appendToConsole("System: It is " + name + "'s turn!");
	if (whosTurnItIs == myTurn) {
		changeStateOfButtons(false);
	}
}

function diceRollFromServer(msg) {
	let name = getPlayerNameByID(msg.p);
	let totRoll = msg.roll1 + msg.roll2;
	appendToConsole("System: " + name + " threw a " + totRoll + "!");
	chooseSoundClip(1);
	document.getElementById("dice1").src = imgs[msg.roll1 - 1].src;
	document.getElementById("dice2").src = imgs[msg.roll2 - 1].src;
}

function taxPlayerFromServer(data) {
	sendSystemMsg(
		data.playerWhoGotTaxed +
			" landed on " +
			data.tile +
			" and got taxed by " +
			getPlayerNameByID(data.whoGotMoney) +
			" $" +
			data.taxVal +
			"!"
	);
}

function playerNoMoneyMsgFromServer(data) {
	appendToConsole(
		getPlayerNameByID(data.playerID) +
			" tried to buy " +
			data.prop +
			" but didnt have enouth money!"
	);
}

var propToBuy = {};

function playerTileBuyConfirm(data) {
	if (data.playerName == myName) {
		propToBuy = data;
		showCard(data.id);
		showPopupBox(3);
		$("#buyPara").text("Would you like to buy " + data.name);
	}
}
function buyConfirmed() {
	console.log(propToBuy);
	buyThisProp(propToBuy.name, myTurn, room);
	sendSystemMsg(myName + " has decided to buy " + propToBuy.name + "!");
	showPopupBox(0);
}
function buyCancell() {
	sendSystemMsg(myName + " has declined to buy " + propToBuy.name + "!");
	showPopupBox(0);
	propToBuy = {};
}

function nextTurnFromServer(data) {
	whosTurnItIs = data.playerTurn;
	let name = getPlayerNameByID(whosTurnItIs);
	appendToConsole("System: It is " + name + "'s turn!");
	if (whosTurnItIs == myTurn) {
		changeStateOfButtons(false);
	}
}

function updatePropTable(data) {
	var player = getPlayerByID(data.playerToUpdate);
	var props = player.playerProps;
	props.push(data.propToAdd);
	player.playerProps = props;

	var temp = document.getElementsByClassName("prop#" + data.propToAdd)[0];
	temp.innerHTML = player.playerName;
	chooseSoundClip(0);
}
function updatePropTableTrade(data) {
	var player = getPlayerByID(data.playerToUpdate);
	console.log("Player: ");
	console.log(player);
	var temp = document.getElementsByClassName("prop#" + data.propToChange)[0];
	temp.innerHTML = player.playerName;
}

function playerLost(name) {
	if (name == myName) {
		console.log("You lost!");
		changeStateOfButtons(true);
	}
}
function playerWin(name) {
	console.log("You won!");
	$("p")
		.add(name + " won the game!")
		.appendTo("#gameOver");
}

function displayErr(data) {
	if (data.playerID == myTurn) {
		showCard(data.id);
		$("#errMsg").show();
		$("#errMsg").text(data.errMsg);
	}
}

function displayTaxInfo(data) {
	if (myTurn == data.taxedPlayer) {
		showPopupBox(6);
		$("#taxPara").text(
			"You got taxed by " +
				getPlayerNameByID(data.playerGettingTax) +
				" $" +
				data.howMuch +
				"!"
		);
	}
	if (myTurn == data.playerGettingTax) {
		$("#taxPara").text(
			"You taxed " +
				getPlayerNameByID(data.taxedPlayer) +
				" $" +
				data.howMuch +
				"!"
		);
		showPopupBox(6);
	}
}

function sendMsg() {
	socket.emit("chat_msg", myName + ": " + $("#usermsg").val());
	appendToConsole(myName + ": " + $("#usermsg").val());
	$("#usermsg").val("");
}

function sendSystemMsg(msg) {
	socket.emit("chat_msg", "System: " + msg);
	appendToConsole("System: " + msg);
}

function appendToConsole(msg) {
	$("#chatBox").append(msg + "\n");
}
