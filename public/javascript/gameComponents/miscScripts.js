var muteAllSound = false;

var backgroundAudio;

function changeStateOfButtons(state) {
	var buttonIDs = [
		"#diceBtn",
		"#tradeBtn",
		"#endBtn",
		"#confirmBtn",
		"#cancellBtn",
		"#buildHouseBtn",
		"#buildHotelBtn",
	];
	for (var i = 0; i < buttonIDs.length; i++) {
		$(buttonIDs[i]).prop("disabled", state);
	}
}

function muteSound() {
	if (muteAllSound) {
		muteAllSound = false;
		backgroundAudio.play();
	} else {
		muteAllSound = true;
		backgroundAudio.pause();
		backgroundAudio.currentTime = 0;
	}
}
function showPopupBox(id) {
	$(".popupBox").show();
	$("#tilePicCont").hide();
	$("#hotelBuyBtns").hide();
	$("#tradeStarted").hide();
	$("#buyPrompt").hide();
	$("#errMsg").hide();
	$("#tradePrompt").hide();
	$("#tradeFromServer").hide();
	$("#taxPrompt").hide();
	switch (id) {
		case 0:
			$(".popupBox").hide();
			break;
		case 1:
			//trade popup initial
			$("#tradePrompt").show();
			break;
		case 2:
			//hotel buy
			$("#tilePicCont").show();
			$("#hotelBuyBtns").show();
			break;
		case 3:
			//confirm to buy tile
			$("#tilePicCont").show();
			$("#buyPrompt").show();
			break;
		case 4:
			//trade popup aksing what to trade
			$("#tradePrompt").show();
			$("#tradeStarted").show();
			break;
		case 5:
			//confirmation from server
			$("#tradeFromServer").show();
			break;
		case 6:
			//getting taxed
			$("#taxPrompt").show();
			break;
	}
}

function startBackgroundAudio() {
	backgroundAudio = new Audio("../sound/background.mp3");
	backgroundAudio.volume = 0.3;
	//backgroundAudio.play();
}

function playSound(url) {
	var a = new Audio(url);
	a.volume = 0.3;
	a.play();
}

function chooseSoundClip(id) {
	if (!muteAllSound) {
		var sounds = ["../sound/propBuy.mp3", "../sound/diceRoll.mp3"];
		playSound(sounds[id]);
	}
}
