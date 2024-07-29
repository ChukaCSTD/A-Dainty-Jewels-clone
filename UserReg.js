$(document).ready(function () {
    const endPoint = "http://ecommerce.reworkstaging.name.ng/v2";

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        
    $("#Regform").on("submit", function (e) {
        e.preventDefault();

        const formData  = {
            first_name: $("#Fname").val(),
            last_name: $("#Lname").val(),
            email: $("#email").val(),
            password: $("#password").val(),
            phone: $("#phone").val(),
        }
         
        let valid = validate(formData)

        if (valid) {
            $.ajax({
                url: `${endPoint}/users`,
                method: "POST",
                data: formData,
                success: function (res) {
                    console.log(res)
                    if(res.code === 304){
                        $("#err10").show()
                    }else{
                        alert("registered successfully")
                        // window.location.href = "Userlog.html"
                    }
                },
                error: function (err) {
                    console.log("error", err)
                }
            });

        }

        
    });

    function validate(formData){
        let valid = true;
        $("#error-message2").hide();
        let FnameError= $("#err1");
        let LnameError= $("#err2");
        let emailError= $("#err3");
        let passwordError= $("#err4");
        let phoneError= $("#err5");


        if (formData.first_name === "") {
            valid = false;
            FnameError.text("Please fill out this field.")
        } else {
            FnameError.text("")
        }

        if (formData.last_name === "") {
            valid = false;
            LnameError.text("Please fill out this field.")
        } else {
            LnameError.text("")
        }

        if (formData.email === "") {
            valid = false;
            emailError.text("Please fill out this field.")
        }
        else if (!emailRegex.test(formData.email)) {
            valid = false;
            emailError.text("Please enter a valid email address.")
        } else {
            emailError.text("")
        }


        if (formData.password === "") {
            valid = false;
            passwordError.text("Please fill out this field");
        } else if (formData.password.length < 7) {
            valid = false;
            passwordError.text("Password must be at least 7 characters");
        } else {
            passwordError.text("");
        }
        

        if(formData.phone === ""){
            valid = false;
            phoneError.text("Please fill out this field.")
        }else{
            phoneError.text("")
        }

        return valid;
    }

});