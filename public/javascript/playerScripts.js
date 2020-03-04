

var playerList=[];
var whosTurnItIs = -1;

function Player(id,divName,name){
    this.id = id;
    this.divName = divName;
    this.name=name;
    
    
    Object.defineProperties(this, {
        playerID:{
            get: function(){return id}
        },
       
        playerDivName:{
            get: function(){return divName},
            set: function(d){ divName = d}
        },
        playerName:{
            get:()=>{return name}
        },
    })
}
function getPlayerByID(ID){
    var p;
    playerList.forEach(element => {
        if(element.playerID == ID){
            p = element
        }
    });
    return p;
}

function getPlayerNameByID(ID){
    return getPlayerByID(ID).playerName;
}

function getPlayerDiv(ID){
    return getPlayerByID(ID).playerDivName;
}

function checkWhatTilePlayerIsOnByID(ID){
    return getPlayerDiv(ID).parentNode.className;
}

function movePlayer(playerID,newPos){//newPos is just the diceroll
    for(var i = 0; i <playerList.length;i++){
        var pID = playerList[i].playerID;
        if(playerID == pID){ 
            //let divToMove = "."+String(playerList[i].playerDivName);
            //$(divToMove).remove();
            playerList[i].playerDivName.remove();
            document.getElementsByClassName("place"+newPos)[0].appendChild(playerList[i].playerDivName);
            playerList[i].playerPos=newPos;
        }

        if(whosTurnItIs == pID){
            
        }

    }
}

function addProperties(){
    
}

function generatePlayers(playerNames){
    console.log(playerNames)
    for(var i = 0; i != playerNames.length;i++){
        var playerDiv = document.createElement("div");
        playerDiv.innerHTML="My name is " + playerNames[i];
        playerDiv.className="player#"+(i+1);
        document.getElementsByClassName("place0")[0].appendChild(playerDiv);
        var p = new Player((i+1),playerDiv, playerNames[i]);
        p.playerMoney = 1500;
        playerList.push(p);
        p.playerPos = 0;

        var infoCard = document.createElement("div");
        document.getElementsByClassName("playerCards")[0].appendChild(infoCard);
        var playerName = document.createElement("p");
        playerName.innerHTML = p.playerName;
        playerName.className = "infoCardPlayerName";
        infoCard.appendChild(playerName);

        var playerProperties = document.createElement("div");
        playerProperties.className = "infoCardPlayerProperties";
        playerProperties.innerHTML = "This is where the properties will be"
        infoCard.appendChild(playerProperties);

        var playerCards = document.createElement("div");
        playerCards.className = "infoCardPLayerCards"
        playerCards.innerHTML = "this is where the usable cards will be"
        infoCard.appendChild(playerCards);


    }
    whosTurnItIs = 1;
}

function testPlayers(){ // tests i did to fully understand getters and setters in js, left it in for fun
    for(var i = 0; i <playerList.length; i++){
        var p = playerList[i];
        console.log("I am "+p.playerID);
        console.log("I have "+p.playerMoney);
        p.playerMoney=20;
        if(p.playerID % 2){
            p.playerMoney=200000;
        }
        console.log("Now I have "+p.playerMoney)
    }
}


