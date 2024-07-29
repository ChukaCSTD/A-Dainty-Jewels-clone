$(document).ready(function(){
    const endPoint ="http://ecommerce.reworkstaging.name.ng/v2";

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;



    $('form#RegForm').on('submit', function(event){
        event.preventDefault();

        const formData = {
            first_name: $("#Fname").val(),
            last_name: $("#Lname").val(),
            email: $("#email").val(),
            password: $("#password").val(),
            phone: $("#number").val(),
            store_name: $("#store_name").val(),
            descp:$("#description").val(),
            icon:$("#icon").val(),
            banner:$("#banner").val(),
            phones: $("#other_number").val(),
        };


        let valid = validate(formData);

        if (valid){
            $.ajax({
                url: `${endPoint}/merchants`,
                method: "POST",
                data: formData,
                success: function(res){
                    console.log(res);
                    if(res.code === 304){
                        $("#err13").show();
                        
                    }else{
                        alert("Registered successfully");
                        localStorage.setItem('merchantId', res.id); // Store the merchant ID
                        window.location.href = "adminlog.html";
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

        if(formData.first_name === ""){
            valid = false;
            $("#err1").show();
            
        }
        if(formData.last_name === ""){
            valid = false;
            $("#err2").show();
            
        }
        if (formData.email === "") {
            valid = false;
            $("#err3").show();
    
        }else if (!emailRegex.test(formData.email)) {
            valid = false;
            $("#err4").show();
        
        }
        if (formData.password === "") {
            valid = false;
            $("#err5").show();
    
        }else if (formData.password.length < 7) {
            valid = false;
            $("#err6").show();
    
        }   
        if (formData.phone === "") {
            valid = false;
            $("#err7").show();
        }
        if (formData.store_name === "") {
            valid = false;
            $("#err8").show();
        
        }
        if (formData.descp === "") {
            valid = false;
            $("#err9").show();

        }
        if (formData.icon === "") {
            valid = false;
            $("#err10").show();
        }
        if (formData.banner === ""){
            valid = false;
            $("#err11").show();
        }
        if (formData.phones === "") {
            valid = false;
            $("#err12").show();
    
        }

        return valid;
    
    }

    
});


