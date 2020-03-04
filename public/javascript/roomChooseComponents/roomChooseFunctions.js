// var socket=io.connect();
// socket.on('connect', ()=> {

//     console.log("socet established: " + socket)
//     let obj = {
//         room: "roomChoose",
//         name: "undecidedDumDum"
//     }
//     socket.emit("room", obj)
//     socket.on('update_room_data', (data)=> {

//         console.log("recived: "+data)

//         if($("#roomTableID:has(#roomTable)")){
//             var actualTable = $("#roomTabletbodyID");
//             actualTable.empty();
//         }else{
//             var actualTable = $("roomTableID");
//             var table = $('<table>').addClass('roomTable');
//             var tableHead = "<tr><th>&nbsp;</th><th>Room Name</th><th>Player Number</th><th>State</th></tr>";
//             table.append(tableHead);

//             actualTable = table;
//         }
//         data.forEach(item => {
//             console.log("Room name: "+item.roomName)
//             if(item.roomState == "Private"){
//                 var btn = "<button onclick=askForPassword('" + item.roomName + "',true)>Join</button>"
//                 var priv = "Private"
//             }else{
//                 var btn = "<button onclick=askForPassword('" + item.roomName + "',false)>Join</button>"
//                 var priv = "Public"
//             }
//             actualTable.append("<tr> <td> "+ btn+"</td> <td>"+item.roomName+ "</td> <td> "+item.pNumb +"</td> <td> "+ priv +"</td></tr>")                       
//         })
    
//     });

//     $( "#roomTableID" ).load(window.location.href + " #roomTableID>*", "");

// });


function hideShowPasswordFeild(box){
    document.getElementById("roomPass").readOnly = !(box.checked);
}

function checkForm(form){
if(form.roomCreate.value == ""){
    alert("Cant be empty!");
    form.roomName.focus();
    return false;
} 
    return true;
}

function askForPassword(roomName,isPrivate){
    if(isPrivate){
        var passWord = prompt("Password?");
        var checking = true;
        var cancel = false;
    }else{
        var checking = false;
        var cancel = false;
    }
    
    while(checking){
        if(passWord == ""){
            alert("Password cant be empty!")
            var passWord = prompt("Password?");
        }else if(passWord){
            checking = false;
        }else{
            cancel = true;
        }
    }
    if(!cancel){
        var formData = new FormData();
        formData.append("roomName", roomName)
        formData.append("isPrivate", isPrivate)
        if(isPrivate){
            formData.append("passWord", passWord);
        }
        

        fetch("/board/validate", {
            method : "POST",
            enctype: "multipart/form-data",
            body: formData
        })
         .then(responce =>{
                var stat = responce.status;
                if(stat == 200){
                 //redirect
                 window.location.replace("board/valid?id="+roomName)
                }else if(stat == 418){//no room
                    alert("Room doesnt exist anymore. This is most likely a server error")
                }
                else if(stat == 419){
                    alert("Wrong pass")
                }
             
         })
       
    }
}

// export const passCheck = (n,p) =>{askForPassword(n,p)}