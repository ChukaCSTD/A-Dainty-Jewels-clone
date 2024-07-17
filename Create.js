$(document).ready(function () {
    $("#form").on("submit", function (e) {
        e.preventDefault();

        var email = $("#email").val();
        var password = $("#password").val();
        var reType_password = $("#reType_password").val();
        var Fname = $("#Fname").val();
        var Lname = $("#Lname").val();
        var address_1 = $("#address_1").val();
        var city = $("#city").val();
        var state = $("#state").val();
        var postcode = $("#postcode").val();
        var phone = $("#phone").val();

        let emailError = $("#emailError")
        let passwordError = $("#passwordError")
        let reType_passwordError = $("#reType-passwordError")
        let FnameError = $("#FnameError")
        let LnameError = $("#LnameError")
        let address_1Error = $("#address_1Error")
        let cityError = $("#cityError")
        let stateError = $("#stateError")
        let postcodeError = $("#postcodeError")
        let phoneError = $("#phoneError")

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const passRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/

        if (email === "") {
            emailError.text("Please fill out this field.")
        }
        else if (!emailRegex.test(email)) {
            emailError.text("Please enter a valid email address.")
        } else {
            emailError.text("")
        }


        if (password === "") {
            passwordError.text("Passwords must be at least 7 characters and contain both alphabetic and numeric characters.")
        }
        else if (!passRegex.test(password)) {
            passwordError.text("Passwords must be at least 7 characters and contain both alphabetic and numeric characters.")
        } else {
            passwordError.text("")
        }


        if (reType_password === "") {
            reType_passwordError.text("Passwords must be at least 7 characters and contain both alphabetic and numeric characters.")

        } else if (reType_password != password) {
            $("#reType-passwordError").html("Passwords must be at least 7 characters and contain both alphabetic and numeric characters.<br>Confirm Password must match Password.");

        } else {
            reType_passwordError.text("")
        }


        if (Fname === "") {
            FnameError.text("Please fill out this field.")
        } else {
            FnameError.text("")
        }


        if (Lname === "") {
            LnameError.text("Please fill out this field.")
        } else {
            LnameError.text("")
        }


        if (address_1 === "") {
            address_1Error.text("Please fill out this field.")
        } else {
            address_1Error.text("")
        }

        if (city === "") {
            cityError.text("Please fill out this field.")
        } else {
            cityError.text("")
        }

        if (state === "") {
            stateError.text("Please fill out this field.")
        } else {
            stateError.text("")
        }


        if(postcode === ""){
            postcodeError.text("Please fill out this field.")
        }else{
            postcodeError.text("")
        }

        if(phone === ""){
            phoneError.text("Please fill out this field.")
        }else{
            passwordError.text("")
        }
      
    

    })


});