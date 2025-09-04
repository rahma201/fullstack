$(function(){
     
    $(document).on("click",".Login", function(){
        LoginShop();

    }); 
    $(document).on("click",".signUpLogin", function(){
        RegisterCustomer();

    }); 
    
});
function LoginShop(){
    let userName = $(".usernameLogin").val();
    let password = $(".passwordLogin").val();
    let data = {
        userName: userName,
        password: password
    };
    $.ajax({
        url: "http://localhost:5147/api/Shared/Login",
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(response){
            console.log("API Response:", response);
            if(response.success){
                setCookie("jwtToken", response.data.token);
               $(".usernameLogin").val("");
               $(".passwordLogin").val("");
               $(".authModalInProductDetails").modal("hide")

               Swal.fire({
                title: "Login!",
                text: "Login success. ",
                icon: "success",
                confirmButtonText: "Ok"
        });              

        
        localStorage.setItem("UserType",response.data.type);
              
                 if(response.data.type=="Customer"){
                    var customerId=response.data.customerId||0;
                    localStorage.setItem("customerId",customerId);
                }
            } 
            else {
                Swal.fire({
                    title: "Login!",
                    text: "Login failed. " + response.message,
                    icon: "error",
                    confirmButtonText: "Ok"
            }); 
            }
        },
        error: function(xhr, status, error){
            console.error("AJAX Error:", xhr.status, xhr.responseText);
            Swal.fire({
                title: "Login!",
                text: "can not get this account " + xhr.status,
                icon: "error",
                confirmButtonText: "Ok"
        }); 
        }
    });
}
function setCookie(name, value) {

    let cookieStr = encodeURIComponent(name) + "=" + encodeURIComponent(value) + ";";

    document.cookie = cookieStr;
}


function RegisterCustomer(){
  
    var userData = {
        userName: $("#UserNameSignup").val(),
        email: $("#emailSignup").val(),
        password: $("#passwordSignup").val()
    };

    $.ajax({
        url: "http://localhost:5147/api/Shared/RegisterCustomer", // تحقق من صحة المسار
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(userData),
        success: function (response) { 
              $("#login-tab").trigger("click"); 

            Swal.fire({
                title: "Success!",
                text: "Account created successfully!" ,
                icon: "success",
                confirmButtonText: "Ok"
        }); 
     
        

        },
        error: function (xhr) {

            Swal.fire({
                title: "create!",
                text: "can not get this account " + xhr.responseText,
                icon: "error",
                confirmButtonText: "Ok"
        }); 
        }
    });

}