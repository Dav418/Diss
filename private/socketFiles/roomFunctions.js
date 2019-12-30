var User = require("../databaseFiles/userCRUD.js");
var playerFunctions = require("../gameLogic/playerLogic.js")
var roomList = [];

function roomObject(room){
  this.room=room;
  this.numberOfPlayers = 1;
  this.playerList=[];

  Object.defineProperties(this,{
    roomName:{
      get: ()=> {return this.room}
    },
    playerNumber:{
      get: ()=> {return this.numberOfPlayers}
    },
    changeNumber:{
      set: (n)=> {this.numberOfPlayers+= n;}
    },
    addPlayer:{
      set: (p)=> {
      
        this.playerList.push(p);}
    },
    removePlayer:{
      set:(i)=>{
          this.playerList.splice(i,1);
      }
    },
    getPlayer:{
      get:()=>{
        return this.playerList;
      }
    }
  })
}
module.exports= {
    getRoomList: ()=>{
      return roomList;
    },

    assignRoom: (papers,ID)=>{ // papers are room[0] than name[1]
    var found = false;
    
    roomList.forEach(e => {
        if(e.roomName == papers[0]){
          found = true;
          e.changeNumber = 1;
          var string = papers[1] + ","+ID
          e.addPlayer = string;
        }

        if(e.numberOfPlayers == 2){ // when theres 4 players game can start
          var players = e.getPlayer;
          var playerNamesInGame = [];

          players.forEach(p =>{
            var name = p.split(',');
            playerNamesInGame.push(name[0]);

            var cashPrmise = User.getMoney(name[0]);
            cashPrmise.then(cash =>{ //take money from each player to start the game
              User.setMoney(name[0],cash.money - 100);
            })
          })

          var socketio = require("./socketFunctions.js");
          socketio.sockets.to(e.roomName).emit("start_game", playerNamesInGame)
          
        }
    });
    if(!found){
        var i = new roomObject(papers[0]);
        var string = papers[1] + ","+ID
        i.addPlayer = string;
        roomList.push(i);
    }
    },

    deleteRoom: (r,ID)=> {
        var roomZero;
        var found = false;
        roomList.forEach(e => { // iterate over the roomList
            if(e.roomName == r){ //room name match room supplied
                e.changeNumber = -1;
                players = e.getPlayer;
                var index = 0;
                players.forEach(element => { //iterate over players in room "e"
                    var string = element.split(",");
                    if(string[1] == ID){
                    e.removePlayer = index;
                    }
                    index++;
                });
            }

        if(e.playerNumber == 0){
            found=true;
            roomZero = e;
        }
    });
        if(found){
            roomList.splice(roomList.indexOf(roomZero), 1);
        }
    },

    printAllRooms: ()=> {
        console.log("roomList: ")
        roomList.forEach(element => {
            console.log(element);
        });
    }

}