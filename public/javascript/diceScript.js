var imgs = new Array();

// async function throwDice(){
//     var diceNum= Math.floor(Math.random() * 6) + 1;
//     for(let j = 0; j < 10; j++){
//         if (j % 2 == 0){
//             diceNum= Math.floor(Math.random() * 6) + 1;
//             document.getElementById("dice").src=imgs[diceNum-1].src;
//             socket.emit("dice_roll", imgs[diceNum-1].src);
//             await sleep(100);
      
//         }
//     }

//     var slp = 0;
//     for (let i = 10; i > 0; i--) {
//         if (i % 2 == 0){
//             slp=slp + 200;
//             diceNum2= Math.floor(Math.random() * 6) + 1;
//             while(diceNum==diceNum2){diceNum2= Math.floor(Math.random() * 6) + 1;}
//             document.getElementById("dice").src=imgs[diceNum2-1].src;
//             socket.emit("dice_roll", imgs[diceNum2-1].src);
//           await sleep(slp);
//         console.log(i);
//         }
//       }
//       document.getElementById("dice").src=imgs[diceNum-1].src;
//       socket.emit("dice_roll", imgs[diceNum-1].src);
//       socket.emit('chat_msg', 'System: And the dice rolled is: '+ diceNum);
//       $("#chatBox").append('System: And the dice rolled is: '+ diceNum +"\n");
      
// };

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

function clientDiceThrow(){
  var data = {room: "{{room}}" , playerNumb: p}
  socket.emit("client_dice_throw", data); // still need to get a way of getting "my" player numb
}

function setTheDice(who){
  var i = 1;
  $("#dice").prop("onclick", false);
  playerList.forEach(p => {
    if(i == who){
      whosTurn = p.getPlayerName;
      $("#dice").prop("onclick", true);
    }else{
      i++;
    }
  });
}


function preloadDiceImages() { // preloads the images if thy are not already stored locally 
  
  var srcs = ["../image/dice/dice1.JPG","../image/dice/dice2.JPG",
  "../image/dice/dice3.JPG","../image/dice/dice4.JPG",
  "../image/dice/dice5.JPG","../image/dice/dice6.JPG"];

  for(var i =0; i < srcs.length;i++){
    
    var img = new Image();
    img.src= srcs[i];
    console.log(img.src)
    imgs[i] = img;
  }
}






