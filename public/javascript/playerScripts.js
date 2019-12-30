

var playerList=[];

function Player(id,divName){
    this.id = id;
    this.divName = divName;
    
    
    Object.defineProperties(this, {
        playerID:{
            get: function(){return id}
        },
       
        playerDivName:{
            get: function(){return divName},
            set: function(d){ divName = d}
        },
       

    })

}

function movePlayer(playerID,newPos){//newPos is just the diceroll
    console.log("inside player move")
    for(var i = 0; i <playerList.length;i++){
        
        var pID = playerList[i].playerID;
        console.log(pID)
        if(playerID == pID){
            console.log("if statement true")
            var pPos = playerList[i].playerPos; // current position
            var newPosCalc = parseInt(newPos,10) + parseInt(pPos,10);
            if(newPosCalc > 39){
                console.log("checking if > 39")
                var rem = parseInt(newPosCalc,10) - parseInt(39,10);
                newPosCalc = parseInt(rem,10); 
                console.log(newPosCalc);
            }
            
            playerList[i].playerDivName.remove();
            document.getElementsByClassName("place"+newPosCalc)[0].appendChild(playerList[i].playerDivName);
            playerList[i].playerPos=newPosCalc;
          
            
        }
    }
}

function addProperties(){
    
}

function generatePlayers(playerNames){
    console.log(playerNames)
    for(var i = 0; i != playerNames.length;i++){
        console.log("i: "+i)
        var playerDiv = document.createElement("div");
        playerDiv.innerHTML="My name is " + playerNames[i];
        playerDiv.className="player#"+(i+1);
        document.getElementsByClassName("place0")[0].appendChild(playerDiv);
        var p = new Player(i,playerDiv,playerNames[i]);
        p.playerMoney = 1500;
        playerList.push(p);
        p.playerPos = 0;
        console.log("p.pos in generate "+p.playerPos)
        console.log("new plaer! " + playerDiv.className);
    }
    
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


