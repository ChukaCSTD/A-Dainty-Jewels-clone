$(document).ready(function(){
    const endPoint = "http://ecommerce.reworkstaging.name.ng/v2";
    const merchant = JSON.parse(localStorage.getItem("merchant"));
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Make sure merchant_id is defined. Replace this with the correct way to get merchant_id.
    const merchant_id = merchant ? merchant.id : ''; 



    $("form#RegForm").on("submit", function(event){
        event.preventDefault();

        const formData = {
            first_name: $("#fname").val(),
            last_name: $("#lname").val(),
            email: $("#email2").val(),
            phone: $("#Phone").val(),
            store_name: $("#Storename").val(),
            descp: $("#description").val(),
            icon: $("#Icon").val(),
            banner: $("#Banner").val(),
            state: $("#State").val(),
            district: $("#District").val(),
            social_media:{
                x: $("#twitter").val(),
                face_book: $("#facebook").val(),
                instagram: $("#instagram").val(),
            },
            phones: $("#Phones").val(),

        };


        let valid = validate(formData);
        
        if (valid){
            $.ajax({
                url: `${endPoint}/merchants/${merchant_id}`,
                method: "PUT",
                data: formData,
                success: function(res){
                    if(res){
                        alert("Registration Update Successful");
                        console.log(res)
                    }
                    // window.localStorage.href = "updateAdminLog.html"
                },
                error: function(err){
                    console.log("error", err);
                },
            });
        }


    });

    function validate(formData){
        let valid = true

        $(".error-message").hide();

        if(formData.first_name === ""){
            valid = false;
            $("#error1").show();
        }
        if(formData.last_name === ""){
            valid = false;
            $("#error2").show();
        }
        if(formData.email === ""){
            valid = false;
            $("#error3").show();
        }else if (!emailRegex.test(formData.email)){
            valid = false;
            $("#error4").show();
        }
        if(formData.phone === ""){
            valid = false;
            $("#error5").show();

        }
        if(formData.store_name === ""){
            valid = false;
            $("#error6").show();
        }
        if(formData.descp === ""){
            valid = false;
            $("#error7").show();
        }
        if(formData.icon === ""){
            valid = false;
            $("#error8").show();
        }
        if(formData.banner === ""){
            valid = false;
            $("#error9").show();
        }
        if(formData.state === ""){
            valid = false;
            $("#error10").show();
        }
        if(formData.district === ""){
            valid = false;
            $("#error11").show();
        }
        if(formData.social_media.x === ""){
            valid = false;
            $("#error12").show();
        }
        if(formData.social_media.face_book === ""){
            valid = false;
            $("#error13").show();
        }
        if(formData.social_media.instagram === ""){
            valid = false;
            $("#error14").show();
        }
        if(formData.phones === ""){
            valid = false;
            $("#error15").show();
        }

        return valid;
    }





});