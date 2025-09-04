var customerId=localStorage.getItem("customerId")||0;

$(function(){
    MyProfile(customerId);
    $(document).on("click", "#myMaintance", function() {
        window.location.href = "/maintenance/user/MyMaintenance.html";
    });
    $(document).on('click','#saveProfileBtn', function() {
        console.log("save edite")
        editeCustomerProfile();
    });
    // Handle "Edit" button click
    var fields = ["fullname", "email", "phone", "location", "birthDay", "gender"];

    $('#editProfileBtn').on('click', function() {
        $.each(fields, function(index, field) {
            var div = $('#profile-' + field);
            var value = div.text().trim();
    
            if (field === "birthDay") {
                div.html('<input type="date" class="form-control" id="input-'+ field + '" value="' + value + '">');
            }
             else if (field === "gender") {
                var maleChecked = value.toLowerCase() === "male" ? "checked" : "";
                var femaleChecked = value.toLowerCase() === "female" ? "checked" : "";
                div.html(`
                <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="gender" id="genderMale" value="Male" ${maleChecked}>
                <label class="form-check-label" for="genderMale">Male</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="gender" id="genderFemale" value="Female" ${femaleChecked}>
                <label class="form-check-label" for="genderFemale">Female</label>
            </div>

                `);
            } else {
                div.html('<input type="text" class="form-control" id="input-' + field + '" value="' + value + '">');
            }
        });
    
        $('#editProfileBtn').addClass('d-none');
        $('#saveProfileBtn').removeClass('d-none');
    });
    
});
function MyProfile(id) {
    $.ajax({
        url: `http://localhost:5147/api/Customer/GetCustomerProfile/$`+id,
        type: "GET",
        success: function (response) {
            // الآن ممكن تعبي البيانات في الصفحة
            $("#profile-fullname").text(response.data.username);
            $("#profile-email").text(response.data.email);
            $("#profile-phone").text(response.data.phone);
            $("#profile-location").text(response.data.location);
            var rawDate = response.data.birthDay; // "2025-04-22"
            var dateObj = new Date(rawDate);
            
            var day = String(dateObj.getDate()).padStart(2, '0');
            var month = String(dateObj.getMonth() + 1).padStart(2, '0'); // months are 0-based
            var year = dateObj.getFullYear();
            
            var formattedDate = `${day}/${month}/${year}`;
            
            $("#profile-birthDay").text(formattedDate);         
            $("#profile-gender").text(response.data.gender);
            $("#profile-points").text(response.data.points);
            $("#profile-level").text(response.data.level);
            $("#name").text(response.data.username);
            
            // أو console.log لعرض كل البيانات
            console.log(response);
        },
        error: function (xhr) {
            Swal.fire({
                title: "Oops!",
                text: "Failed to load customer profile.",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    });
}
function editeCustomerProfile(){
    var updatedData = {
        id: customerId,
        username: $('#input-fullname').val(),
        email: $('#input-email').val(),
        phone: $('#input-phone').val(),
        location: $('#input-location').val(),
        birthDay: $('#input-birthDay').val(),
         gender : $('input[name="gender"]:checked').val()
    };

    $.ajax({
        url: 'http://localhost:5147/api/Customer/editeCustomerProfile',
 // تأكد من تحديث هذه الـ URL بشكل صحيح
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(updatedData),
        success: function() {
            MyProfile(customerId) 
            $('#editProfileBtn').removeClass('d-none');
            $('#saveProfileBtn').addClass('d-none');
            Swal.fire({
                title: "Success!",
                text: "Your profile has been updated successfully.",
                icon: "success",
                confirmButtonText: "Great!"
            });
        },
        error: function() {
           
            Swal.fire({
                title: "Oops!",
                text: "Failed to save profile changes.",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    });
}
