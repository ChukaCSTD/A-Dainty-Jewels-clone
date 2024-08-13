$(document).ready(function () {
    const endPoint ="http://ecommerce.reworkstaging.name.ng/v2";
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    $("#Loginform").on("submit", function (e) {
        e.preventDefault();

        const formData = {
            email: $("#email").val(),
            password: $("#password").val(),
        }
        
        let valid = validate(formData)
        if (valid) {
            $.ajax({
                url: `${endPoint}/users/login`,
                method: "POST",
                data: formData,
                success: function (res){
                    console.log("success", res)
                    if(res.code === 404) {
                        $("#err15").show()
                    }else{
                        alert("login successful")
                        localStorage.setItem("user", JSON.stringify(res))
                        window.location.href = "Home.html"
                    }
                },
                error: function(err){
                    console.log("error", err)
                }
            })


        }

    })


    function validate(formData){
        let valid = true;
        $(".error-message2").hide();
        let emailError = $("#emailError");
        let passwordError = $("#passwordError");



        if (formData.email === "") {
            valid = false;
            emailError.text("Please fill out this field");
        } else if (!emailRegex.test(formData.email)){
            valid = false;
            emailError.text("Please enter a valid email address");
            
        }else { 
            emailError.text("");
        }


        if (formData.password === "") {
            valid = false;
            passwordError.text("Please fill out this field");
        } else if(formData.password.length < 7){
            valid = false
            passwordError.text("Password must be at least 7 characters long");
        }else {
            passwordError.text("");
        }

        return valid;
    }


})