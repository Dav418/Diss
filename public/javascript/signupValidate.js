function checkForm(form){
    if(form.name.value == "" && form.email.value =="" && form.password.value == "" ){
        alert("Cmon man fill out the form at least");
        form.name.focus();
        return false;
    }

    if(form.password.value != form.confirmPassword.value){
        alert("Passwords dont match!");
        form.password.focus();
        return false;
    }

    if(form.name.value == ""){
        alert("Username cant be empty!!!");
        form.name.focus();
        return false;
    }
    if (form.email.value ==""){
        alert("Email cant be empty!!!");
        form.email.focus();
        return false;
    }

    if(form.password.value == ""){
        alert("Password cant be empty!");
        form.password.focus();
        return false;
    }

        return true;
  }