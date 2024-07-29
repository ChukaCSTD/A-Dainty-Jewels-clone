$(document).ready(function(){
    const endPoint ="http://ecommerce.reworkstaging.name.ng/v2";

    $("#changePass").on("submit", function(event){
        event.preventDefault();
        const formData = {
            old_password: $("#oldPassword").val(),
            new_password: $("#newPassword").val(),
        }
        let valid = validate(formData);

        if (valid){
            $.ajax({
                url: `${endPoint}/merchants/merchant_id/change_passwd`,
                method: "PUT",
                data: formData,
                success: function(res){
                    console.log("sucess", res)
                    alert("password changed successfully")
                    window.location.href = "dashboard.html";
                },
                error: function(err){
                    console.log("error",err);
                }

            });
        }
    });
    function validate(formData){
        let valid = true

        $(".error-message").hide();

        if(formData.old_password === ""){
            valid = false;
            $("#err1").show();
        }else if(formData.old_password.length < 7){
            valid = false;
            $("#err2").show();
        }
        if(formData.new_password === ""){
            valid = false;
            $("#err3").show();
        }else if (formData.new_password.length < 7){
            valid = false;
            $("#err4").show();
        }

        return valid;
    }

})