$(document).ready(function () {
    const endPoint = 'http://ecommerce.reworkstaging.name.ng/v2';

    
    $("#changeUserPasswordform").on("submit", function (e) {
        e.preventDefault();


        let loggeduser = localStorage.getItem("user");
        let user_id = loggeduser.id;

        
        const formData = {
            old_password: $("#Currentpassword").val(),
            new_password: $("#Newpassword").val()
        };

    
        function validateChangeUserPassword(formData) {
            let valid = true;

            const currentPasswordError = $("#error1");
            const newPasswordError = $("#error2");

            // Validate current password
            if (formData.old_password === "") {
                valid = false;
                currentPasswordError.text("Please enter your current password");
            } else if (formData.old_password.length < 7) {
                valid = false;
                currentPasswordError.text("Password must be at least 7 characters");
            } else {
                currentPasswordError.text("");
            }

            // Validate new password
            if (formData.new_password === "") {
                valid = false;
                newPasswordError.text("New password is required");
            } else if (formData.new_password.length < 7) {
                valid = false;
                newPasswordError.text("Password must be at least 7 characters");
            } else {
                newPasswordError.text("");
            }

            return valid;
        }

    
        if (validateChangeUserPassword(formData)) {
            console.log(formData);
            $.ajax({
                url: `${endPoint}/users/${user_id}/change-passwd`,
                method: 'PUT',
                data: formData,
                success: function (res) {
                    if (res) {
                        alert("Password changed successfully");
                        console.log("success", res)
                        localStorage.setItem("user", JSON.stringify(res.data));
                    }
                    // window.location.href = "home.html"
                },
                error: function (err) {
                    console.log("error", err);
                }
            });
        }
    });
});
