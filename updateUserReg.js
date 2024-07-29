$(document).ready(function() {
    const endPoint = 'http://ecommerce.reworkstaging.name.ng/v2';
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    $("#updateUserRegform").on("submit", function(e) {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            alert("User not found. Please login first.");
            return;
        }

        const user_id = user.id;
        const formData = {
            first_name: $("#Updatefirstname").val(),
            last_name: $("#Updatelastname").val(),
            email: $("#Updateemail").val(),
            phone: $("#Updatephone").val(),
            password: $("#Updatepassword").val(),
        };

        if (validateRegistration(formData)) {
            $.ajax({
                url: `${endPoint}/users/${user_id}`,
                method: 'PUT',
                contentType: "application/json",
                data: JSON.stringify(formData),
                headers: {
                    "Authorization": `Bearer ${user.token}`
                },
                success: function(res) {
                    console.log("Success", res);
                    if (res) {
                        alert("User updated successfully");
                        localStorage.setItem("user", JSON.stringify(res.data));
                    }
                },
                error: function(err) {
                    console.log("Error", err);
                }
            });
        }
    });

    function validateRegistration(formData) {
        let valid = true;

        const firstNameError = $("#Error1");
        const lastNameError = $("#Error2");
        const emailError = $("#Error3");
        const phoneError = $("#Error4");
        const passwordError = $("#Error5");

        if (formData.first_name === "") {
            valid = false;
            firstNameError.text("Please fill out this field");
        } else {
            firstNameError.text("");
        }

        if (formData.last_name === "") {
            valid = false;
            lastNameError.text("Please fill out this field");
        } else {
            lastNameError.text("");
        }

        if (formData.email === "") {
            valid = false;
            emailError.text("Please fill out this field");
        } else if (!emailRegex.test(formData.email)) {
            valid = false;
            emailError.text("Invalid Email");
        } else {
            emailError.text("");
        }

        if (formData.phone === "") {
            valid = false;
            phoneError.text("Please fill out this field");
        } else {
            phoneError.text("");
        }

        if(formData.password === ""){
            valid = false;
            passwordError.text("please fill out this field");
        }else if(formData.password.length < 7){
            valid = false;
            passwordError.text("Password must be at least 7 characters");
        }else{
            passwordError.text("");
        }

        return valid;
    }
});
