 customerId=localStorage.getItem("customerId")||null
$(function(){
$("#withLogin").hide()
    if(customerId==null){
        $("#withLogin").show()
        $("#withoutLogin").hide()
          
    }
    else{  
         $("#withLogin").hide()
           $("#withoutLogin").show()
    }
    $(".LoginModal").modal('hide')
    
    $(".Login").on("click", function() {
        Login();
        console.log("Login clicked");   
    });
    $(".SignUp").on("click", function() {
        RegisterCustomer();
    });
    $(".SignUpShop").on("click", function() {
        RegisterOwnerShop();
    });
    $(".LoginButtonModel").on("click", function () {
        $("#LoginModal").modal("show");
    });
    $(".SignUpMaintenance").on("click", function() {
        RegisterMaintenance();      
          console.log("SignUpMaintenance clicked");   

    });
    $("#getProfile").on("click", function () {
      window.location.href = '/SHOP/Profile.html'; // Redirect to home or login page
    });
    $('.LoginButtonModel').on('click', function () {
					$('.LoginModal').modal('show');
				});
   // --- Logout Functionality ---
    $(document).on('click', '.logout-link', function(e) {
        localStorage.removeItem('jwtToken'); // Clear the token
        sessionStorage.removeItem('jwtToken');localStorage.clear();
 // Clear from session storage too, just in case
      window.location.href = '/SHOP/home.html'; // Redirect to home or login page
    });

});
function setCookie(name, value) {

    let cookieStr = encodeURIComponent(name) + "=" + encodeURIComponent(value) + ";";
    document.cookie = cookieStr;
}
function Login(){
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
               $(".LoginModal").modal('hide')
               Swal.fire({
                title: "Login!",
                text: "Login successful! Welcome back.",
                icon: "success",
                confirmButtonText: "Ok"
        }); 
                localStorage.setItem("UserType",response.data.type);
                if(response.data.type=="Shop"){
                    var shopId=response.data.shopId;
                    localStorage.setItem("ShopId",shopId);
                    window.location.href="/SHOPOWNER/HomeShop.html"
                }
                else if(response.data.type=="Customer"){
                     customerId=response.data.customerId||0;

                    localStorage.setItem("customerId",customerId);
                    $("#withLogin").hide()
           $("#withoutLogin").show()
                }
                else if(response.data.type=="maintenance"){
                    var maintenanceId=response.data.maintenanceId||0;
                    localStorage.setItem("maintenanceId",maintenanceId);
                    window.location.href="/maintenance/WorkShop.html"
                }
                else if(response.data.type=="admin"){
                    var adminId=response.data.adminId||0;
                    localStorage.setItem("adminId",adminId);
                    window.location.href="/admin/Homeadmin.html"
                }   
            
                
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
function RegisterCustomer() {
    var userData = {
        userName: $(".UserNameSignup").val(),
        email: $(".emailSignup").val(),
        password: $(".passwordSignup").val()
    };

    console.log("Customer Data:", userData);  // Debugging to see the data

    $.ajax({
        url: "http://localhost:5147/api/Shared/RegisterCustomer", // Check if the path is correct
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(userData),
        success: function(response) {
            // Clear form fields after success
            $(".UserNameSignup").val("");
            $(".emailSignup").val("");
            $(".passwordSignup").val("");

            Swal.fire({
                title: "Welcome! 🎉",
                text: "Your account was created successfully. Let's get you logged in!",
                icon: "success",
                confirmButtonText: "Let's go!"
            });

            // Switch to login tab after success
            $('#authTabs a[href="#loginTab"]').tab('show');
        },
        error: function(xhr) {
            Swal.fire({
                title: "Create account!",
                text: JSON.parse(xhr.responseText).message,
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    });
}

function RegisterOwnerShop() {
    var formData = new FormData();

    var userName = $(".userNameSignupShop").val();
    var email = $(".emailSignupShop").val();
    var password = $(".passwordSignupShop").val();
    var location = $(".locationSignupShop").val();
    var phone = $(".phonesingupShop").val();
    var licenseFile = $(".licenseSignupShop")[0].files[0];

    console.log("userName: ", userName);
    console.log("email: ", email);
    console.log("licenseFile: ", licenseFile);

    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("location", location);
    formData.append("phone", phone);

    if (licenseFile) {
        formData.append("iamgelicense", licenseFile);
    }

    $.ajax({
        url: "http://localhost:5147/api/Shared/RegisterOwnerShop",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            $(".userNameSignupShop").val("");
            $(".emailSignupShop").val("");
            $(".passwordSignupShop").val("");
            $(".locationSignupShop").val("");
            $(".phonesingupShop").val("");
            $(".licenseSignupShop").val("");

            Swal.fire({
                title: "Almost there! 📧",
                text: "Your account was created successfully. Please wait for the admin to send you an email before you can log in.",
                icon: "success",
                confirmButtonText: "Got it!"
            });
        },
        error: function (xhr) {
            Swal.fire({
                title: "Create account!",
                text: JSON.parse(xhr.responseText).message,
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    });
}

function RegisterMaintenance() {
    var formData = new FormData();

    var maintenanceName = $(".userNameSignupMaintenance").val();
    var email = $(".emailSignupMaintenance").val();
    var password = $(".passwordSignupMaintenance").val();
    var location = $(".locationSignupMaintenance").val();
    var phone = $(".phonesingupMaintenance").val();
    var licenseFile = $(".licenseSignupMaintenance")[0].files[0];

    console.log("Maintenance Data:", {
        maintenanceName: maintenanceName,
        email: email,
        location: location,
        phone: phone,
        licenseFile: licenseFile
    });  // Debugging to see the data

    formData.append("maintenanceName", maintenanceName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("location", location);
    formData.append("phone", phone);

    // Adding the file to FormData
    if (licenseFile) {
        formData.append("iamgelicense", licenseFile);
    }

    $.ajax({
        url: "http://localhost:5147/api/Shared/RegisterMaintenance", // Check if the path is correct
        type: "POST",
        data: formData,
        contentType: false,  // To handle file uploads
        processData: false,  // To avoid jQuery from processing the FormData
        success: function(response) {
            // Clear form fields after success
            $(".userNameSignupMaintenance").val("");
            $(".emailSignupMaintenance").val("");
            $(".passwordSignupMaintenance").val("");
            $(".locationSignupMaintenance").val("");
            $(".phonesingupMaintenance").val("");
            $(".licenseSignupMaintenance").val("");

            Swal.fire({
                title: "Almost there! 📧",
                text: "Your account was created successfully. Please wait for the admin to send you an email before you can log in.",
                icon: "success",
                confirmButtonText: "Got it!"
            });
        },
        error: function(xhr) {
            Swal.fire({
                title: "Create Account!",
                text: JSON.parse(xhr.responseText).message,
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    });
}
