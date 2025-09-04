$(function(){
    
    $("#login").click(function() {
        Login();
    });
    
});
function Login(){
    let userName = $("#usernameLogin").val();
    let password = $("#passwordLogin").val();
    let data = {
        userName: userName,
        password: password
    };
    $.ajax({
        url: "http://localhost:5147/api/Shared/LoginGoverment",
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(response){
            console.log("API Response:", response);
            if(response.success){
        
               $("#usernameLogin").val("");
               $("#passwordLogin").val("");
             
                 window.location.href="/Goverment/event.html"
                
            } 
            else {
                Swal.fire({
                    title: "Login!",
                    text: "can not Login." + response.message,
                    icon: "error",
                    confirmButtonText: "Ok"
            }); 
            }
        },
        error: function(xhr, status, error){
            let err = JSON.parse(xhr.responseText);
                        Swal.fire({
                title: "Login!",
                text:  err.message, 
                icon: "error",
                confirmButtonText: "Ok"
        }); 
        }
    });
}