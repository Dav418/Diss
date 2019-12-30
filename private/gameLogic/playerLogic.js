class Player {
    constructor(id,name){
        this.id = id;
        var pos = 0;
        var money = 1500;
        var properties = [];
        this.name = name;

        Object.defineProperties(this,{
            getPlayerID:{
                get:()=>{
                    return this.id;
                }
            }
        })
    }
}

function findPlayer(id){
    var player = null;
    playerList.forEach(p => {
        if(p.getPlayerID == id){
            player = p;
        }
    });

    return player;
}

function initialisePlayers(nameList){
    var playerList = [];
    var i = 1;
    nameList.forEach(player => {
        var newPlayer = new Player(i,player);
        playerList.push(newPlayer);
        i++;
    });
    return playerList;
}