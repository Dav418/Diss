function checkForm(form){

    if(form.name.value == "" && form.pw.value ==""){
        alert("Cmon man fill out the form at least");
        form.un.focus();
        return false;
    } 

    if(form.name.value == ""){
        alert("Username cant be empty!!!");
        form.un.focus();
        return false;
    }

    if(form.pw.value == ""){
        alert("Password cant be empty!");
        form.pw.focus();
        return false;
    }
    
        return true;
  }