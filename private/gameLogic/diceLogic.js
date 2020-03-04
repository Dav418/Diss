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
    diceThrow:  ()=>{
        return Math.floor(Math.random() * 6) + 1;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}