class Player {
	constructor(id, name) {
		this.id = id;
		var pos = 0;
		var money = 1500;
		this.name = name;

		Object.defineProperties(this, {
			getPlayerID: {
				get: () => {
					return this.id;
				}
			},
			playerPos: {
				get: () => {
					return pos;
				},
				set: i => {
					pos = i;
				}
			},
			playerMoney: {
				get: () => {
					return money;
				},
				set: i => {
					money = i;
				}
			},
			getPlayerName: {
				get: () => {
					return this.name;
				}
			},
		});
	}
}

module.exports = {
	initialisePlayers: nameList => {
		var playerList = [];
		var i = 1;
		nameList.forEach(player => {
			var newPlayer = new Player(i, player);
			playerList.push(newPlayer);
			i++;
		});
		return playerList;
	},
	updatePlayerPos: (playerToUpdate, newPos) => {
		var currentPos = playerToUpdate.playerPos;
		var newPosCalc = parseInt(newPos, 10) + parseInt(currentPos, 10);
		if (newPosCalc > 39) {
			var rem = parseInt(newPosCalc, 10) - parseInt(39, 10);
			newPosCalc = parseInt(rem, 10);
			
		}

		playerToUpdate.playerPos = newPosCalc;

		return newPosCalc;
	},
	updateMoney: (playerToUpdate, howMuchMoney) => {
		var currentMoney = playerToUpdate.playerMoney;
		var updateMoney = parseInt(currentMoney, 10) - parseInt(howMuchMoney, 10);
		playerToUpdate.playerMoney = updateMoney;
	},
	
};
