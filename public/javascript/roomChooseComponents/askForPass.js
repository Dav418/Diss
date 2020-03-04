export const passCheck = (n,p) =>{askForPassword(n,p)}

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

