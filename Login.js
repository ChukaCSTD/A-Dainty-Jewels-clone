$(document).ready(function(){

$("#Loginform").on("submit", function(e){
    e.preventDefault();

    var email = $("#email").val();
    var password = $("#password").val();


    let emailError = $("#emailError")
    let passwordError = $("#passwordError")



    if(email === ""){
        emailError.text("Please fill out this field");
    }else{
        emailError.text("");
    }


    if(password === ""){
        passwordError.text("Please fill out this field");
    }else passwordError.text("")
    
})


})