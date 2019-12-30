var gameOver = false;
var playersTurn = 1;
var turns = 0;



function initGame(){
    generatePlayers(4);
}


function gameLoop(playersTurn){
    movePlayer(playersTurn,diceNumb);
    


    if(gameOver){
        console.log("The game lasted " + turns + " turns!")
    }
}

function nextTurn(playersTurn){
    if (playersTurn == 4){
        gameOver = true;
    }else{
        playersTurn++;
    }
}
