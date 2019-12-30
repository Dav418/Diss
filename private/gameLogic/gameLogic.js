var playerLogic = require("./playerLogic.js");

module.exports = {
    gameTurn:(diceRollNumb, roomTheGameIsHappeningIn)=>{
        var gameRoom = findRoom(roomTheGameIsHappeningIn);

        allGameRooms.forEach(room => {
            if(room.roomName == roomTheGameIsHappeningIn){
                movePlayer(room.roomName, room.plaTurn, diceRollNumb)
            }
        });

        checkForCards();//check for any cheat/quest cards
        checkPlayerTile();//check the tile
        checkForCards()//check for any cheat/quest cards
        nextTurn(roomTheGameIsHappeningIn)//pass the turn to other player
    },
    initialiseGameRoom:(room, playerNames)=>{
        var newGameRoom = new gameRoom(room, initialisePlayers(playerNames));
        allGameRooms.push(newGameRoom);
    }
}

var allGameRooms = [];

function findRoom(roomName){
    var gRoom = null;
    allGameRooms.forEach(room => {
        if(roomName == room.getRoomName){
            gRoom = room;
        }
    });
    return gRoom;
}

function gameRoom(roomName, players){
    this.roomName = roomName;
    this.players = players;
    this.turns = 0;
    this.playersTurn = 1;
    // also have decks here

    Object.defineProperties(this,{
        turnNumb: {
            get: () =>{
                return this.turns;
            },
            set: (i)=>{
                this.turns += i;
            }
        },
        getRoomName:{
            get:()=>{
                return this.roomName;
            }
        },
        getAllPlayers:{
            get:()=>{
                return this.playerNames;
            }
        },
        plaTurn:{
            get:()=>{
                return this.playersTurn;
            },
            set:(i)=>{
                this.playersTurn = i;
            }
        }

    });
}

function movePlayer(room,who,where){
    var socketio = require("./socketFunctions.js");
    var data = {playerToMove: who, roll:where}
    socketio.sockets.to(room).emit("move_player", data) // move the player
}

function checkForCards(cardsToCheckFor){}

function checkPlayerTile(){}

function nextTurn(roomName){
    allGameRooms.forEach(room => {
        if(room.getRoomName == roomName){
            room.turnNumb = 1;

            var nextTurn = room.plaTurn;
            if(nextTurn == 4){
                nextTurn  = 1;
            }else{
                nextTurn += 1;
            }
            room.plaTurn = nextTurn;

            var socketio = require("./socketFunctions.js");
            var data = {playerTurn: nextTurn, turnNum:room.turnNumb};
            socketio.sockets.to(roomName).emit("next_turn", data);


        }
    });
    

    
}