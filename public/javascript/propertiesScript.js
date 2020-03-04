
function buyThisProp(prop, id,thisRoom){
    //take the money
    //ping the server to update the props
    //add it to the prop tab

    var data = {propName : prop, playerID : id, room: thisRoom};
    var msg = "player_buys_a_prop";
    updateServer(msg,data);
  
}

function tradeProp(from,to){
    //transfer the money from one onto the other player
    //transfer the prop
    //ping the server with the updated information
}

function morgageProp(who){
    //popup window to ask what prop to morgage
    //transfer money
    //update server
}

function updateServer(command,data){
    //data is a object
    //update the room with a command
    socket.emit(command,data);
}
