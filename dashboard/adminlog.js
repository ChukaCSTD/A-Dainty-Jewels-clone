$(document).ready(function(){
    const endPoint ="http://ecommerce.reworkstaging.name.ng/v2";

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;



    $("#LoginForm").on("submit", function(event){
        event.preventDefault();

        const formData = {
          email: $("#Email").val(),
          password: $("#Password").val(),
        }
        let valid = validate(formData);

        if (valid){
            $.ajax({
                url: `${endPoint}/merchants/login`,
                method: "POST",
                data: formData,
                success: function(res){
                    console.log("success", res)
                    if (res.code === 404) {
                        $('#err5').show()
                    }else{
                        alert('login successful')
                        // localStorage.setItem("merchant",JSON.stringify(res)); 
                        window.location.href = "dashboard.html";
                    }
                },
                error: function(err){
                    console.log("error", err);
                }
            });
        }

    });

    function validate(formData){
        let valid = true

        $(".error-message").hide();

        if (formData.email === "") {
            valid = false
            $("#err1").show();
        }else if (!emailRegex.test(formData.email)) {
            valid = false
            $("#err2").show();
            
        }
        if (formData.password === "") {
            valid = false
            $("#err3").show();
        }else if (formData.password.length < 7) {
            valid = false
            $("#err4").show();
        } 
        
        return valid;
    }


});