var imgs = new Array();

function throwDice() {
	if (myTurn == whosTurnItIs) {
		clientDiceThrow(whosTurnItIs);
		$("#diceBtn").prop("disabled", true);
	} else {
		appendToConsole("System: Not your turn to throw!");
	}
}

function clientDiceThrow(p) {
	var data = {
		gRoom: room,
		whoThrow: p,
	};
	socket.emit("client_dice_throw", data);
}

function preloadDiceImages() {
	// preloads the images if thy are not already stored locally

	var srcs = [
		"../image/dice/dice1.JPG",
		"../image/dice/dice2.JPG",
		"../image/dice/dice3.JPG",
		"../image/dice/dice4.JPG",
		"../image/dice/dice5.JPG",
		"../image/dice/dice6.JPG",
	];

	for (var i = 0; i < srcs.length; i++) {
		var img = new Image();
		img.src = srcs[i];

		imgs[i] = img;
	}
}
