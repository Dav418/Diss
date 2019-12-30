module.exports= { 
        throwTheDice: (typeOfThrow,roomTo)=> {
            var msg;
        switch(typeOfThrow){
            case 1 : 
                msg = "jail"
            break;

            case 2 :
                msg = "lotto"
            break;

            case 3 :
                msg = "normal"
            break;
        }
            io.to(roomTo).emit("dice_change", msg)
        
    },
    diceThrow: async ()=>{
        var diceNum= Math.floor(Math.random() * 6) + 1;
        for(let j = 0; j < 10; j++){
            if (j % 2 == 0){
                diceNum= Math.floor(Math.random() * 6) + 1;
                await sleep(100);
          
            }
        }
    
        var slp = 0;
        for (let i = 10; i > 0; i--) {
            if (i % 2 == 0){
                slp=slp + 200;
                diceNum2= Math.floor(Math.random() * 6) + 1;
                while(diceNum==diceNum2){diceNum2= Math.floor(Math.random() * 6) + 1;}
              await sleep(slp);
            }
          }
          
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}