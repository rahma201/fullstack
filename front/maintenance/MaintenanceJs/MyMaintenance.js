 CustomerId=localStorage.getItem("customerId")
$(function(){ 

    $("#waiting").trigger("click");   
      GetAllBookingNotReplyforCustomer(CustomerId);

// Trigger the click event to load the default tab
    $("#Accepted-tab").on("click",function(){
        GetAllBookingAcceptforCustomer(CustomerId);
});

$("#previous-tab").on("click",function(){

    GetAllBookingpreviousforCustomer(CustomerId);
});
$("#waiting").on("click",function(){

    GetAllBookingNotReplyforCustomer(customerId);
}); 
 $(document).on('click','.viewBooking',  function () {
    console.log("viewBooking"+id)
        var id = $(this).data('id');
        $("#bookingModal").modal("show");
      fetchMaintanenceDetails(id);  // Show event details

    });
    $(document).on('click', '.viewnotReplay', function () {
        var id = $(this).data("id");    
        localStorage.setItem("BookingUserId",id)
      window.location.href= "/maintenance/user/MaintenanceResponse.html"
      });


      $(document).on('click','.btn-review',function() {       
         $('#reviewModal').modal('show');

        var maintenanceId = $(this).data('maintenance-id');

        // إعادة تعيين الحقول عند فتح المودال
        selectedRating = 0;
        $('#reviewRating').val(0);
        highlightStars(0);
        $('#reviewName').val('');
        $('#reviewComment').val('');
        $('#reviewMaintenanceId').val(maintenanceId);

    });

    // نظام النجوم (star rating)
    let selectedRating = 0;

    $('#starRating .star').on('mouseenter', function() {
        let val = $(this).data('value');
        highlightStars(val);
    });

    $('#starRating .star').on('mouseleave', function() {
        highlightStars(selectedRating);
    });

    $('#starRating .star').on('click', function() {
        selectedRating = $(this).data('value');
        $('#reviewRating').val(selectedRating);
        highlightStars(selectedRating);
    });



    // إرسال الفورم
    $('#reviewForm').on('click',function(e) {
        e.preventDefault();

      

        var reviewData = {
            comment: $('#reviewComment').val(),
            rating: selectedRating,
            customerId: CustomerId,
            maintenanceId: parseInt($('#reviewMaintenanceId').val()),
            createdAt: new Date().toISOString()
        };

        $.ajax({
            url: 'http://localhost:5147/api/Customer/AddReviewMaintenance',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(reviewData),
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        title: "Success!",
                        text: "Review submitted successfully!",
                        icon: "success",
                        confirmButtonText: "OK"
                    });
                           $('#reviewModal').modal('hide');

                } else {
                    alert('Failed to submit review.');
                }
            },
            error: function(xhr) {
                       Swal.fire({
                        title: "Oops!",
                        text: "Error submitting review. Please try again!",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                console.error(xhr);
            }
        });
    });
});

function GetAllBookingAcceptforCustomer(CustomerId) {
    console.log("Loading Get AllBooking Not Received By Shop...");

    if ($.fn.DataTable.isDataTable("#AcceptedTable")) {
        $("#AcceptedTable").DataTable().destroy();
    }

    $("#AcceptedTable").DataTable({
        "processing": true,
        "serverSide": false,
        "ajax": {
            url: "http://localhost:5147/api/Customer/GetAllBookingAcceptforCustomer/$" + CustomerId,
            type: "GET",
            dataSrc: function (response) {
                console.log("API Response:", response);
                if (response.success && response.data) {
                    return response.data;
                } else {
                 //   alert("Failed to load data. Invalid response format.");
                    return [];
                }
            },
            error: function (xhr, status, error) {
                console.error("AJAX Error:", xhr.status, xhr.responseText);
              ///  alert(`Failed to load orders. Status: ${xhr.status}`);
            }
        },
        "columns": [
            { "data": "bookingId" },
            { "data": "title" },
            { "data": "date" },
            {"data": "statusBookingMaintenance", // لأنك راح تستخدم الداتا كلها
            },
            {
                "data": null,
                "render": function (data, type, row) {
                    return `
                        <button class="btn btn-primary viewBooking" data-id="${row.bookingId}">View</button>
                    `;
                }
            }
        ]

    });
}

function GetAllBookingpreviousforCustomer(CustomerId) {
      console.log("Loading Get AllBooking Not previous By Shop...");

if ($.fn.DataTable.isDataTable("#previousTable")) {
    $("#previousTable").DataTable().destroy();
}

$("#previousTable").DataTable({
    "processing": true,
    "serverSide": false,
    "ajax": {
        url: "http://localhost:5147/api/Customer/GetAllBookingPreviousforCustomer/$" + CustomerId,
        type: "GET",
        dataSrc: function (response) {
            console.log("API Response:", response);
            if (response.success && response.data) {
                return response.data;
            } else {
            //    alert("Failed to load data. Invalid response format.");
                return [];
            }
        },
        error: function (xhr, status, error) {
            console.error("AJAX Error:", xhr.status, xhr.responseText);
          //  alert(`Failed to load orders. Status: ${xhr.status}`);
        }
    },
    "columns": [
        { "data": "bookingId" },
        { "data": "title" },
        { "data": "date" },
        {"data": "statusBookingMaintenance", // لأنك راح تستخدم الداتا كلها
        },
        {
            "data": null,
            "render": function (data, type, row) {
                return `
                        <button class="btn btn-primary viewBooking" data-id="${row.bookingId}">View</button>
 <button class="btn btn-success btn-review" data-maintenance-id="${row.maintenanceId}">Review</button>`;
            }
        }
    ]

});
}
function GetAllBookingNotReplyforCustomer(CustomerId) {
      console.log("Loading Get AllBooking Not Reply By Shop...");

if ($.fn.DataTable.isDataTable("#waitingTable")) {
    $("#waitingTable").DataTable().destroy();
}

$("#waitingTable").DataTable({
    "processing": true,
    "serverSide": false,
    "ajax": {
        url: "http://localhost:5147/api/Customer/GetAllBookingnotConfirmforCustomer/$" + CustomerId,
        type: "GET",
        dataSrc: function (response) {
            console.log("API Response:", response);
            if (response.success && response.data) {
                return response.data;
            } else {
           //    alert("Failed to load data. Invalid response format.");
                return [];
            }
        },
        error: function (xhr, status, error) {
            console.error("AJAX Error:", xhr.status, xhr.responseText);
       //     alert(`Failed to load orders. Status: ${xhr.status}`);
        }
    },
    "columns": [
        { "data": "bookingId" },
        { "data": "title" },
        { "data": "date" },
        {"data": "statusBookingMaintenance", // لأنك راح تستخدم الداتا كلها
        },
        {
            "data": null,
            "render": function (data, type, row) {
                return `
                <button class="btn btn-primary viewnotReplay" data-id="${row.bookingId}" >View</button>
                        `;
            }
        }
    ]

});
}
// Open the modal and fill in the details
function fetchMaintanenceDetails(id) {

   $.ajax({
        url: "http://localhost:5147/api/Customer/GetBooking/" + id, 
        type: "GET",
        success: function(response) {
            if (response.success ) {
             var booking = response.data.booking;
                $('#name-booking').val(booking.title);
                $('#preferred-date').val(booking.date);  // Adjusted for correct date field
                $('#motorcycle-type').val(booking.bikeType);  // Adjusted for correct bikeType field
                $('#motorcycle-image').attr('src',`http://localhost:5147${booking.imageUrl}`);  // Adjusted for correct imageUrl field
                $('#customer-note').val(booking.customerNote);
                $('#maintenance-type').val(booking.statusBookingMaintenance);  // Adjusted for correct maintenance status field
                $('#location').val(booking.location);
                $('#admin-description').val(booking.maintenanceNote);  // Adjusted for correct maintenanceNote field
                $('#maintenance-price').val(booking.totalPrice);  // Adjusted for correct totalPrice field

            } else {
              //  alert("Failed to load booking details.");
            }
        },
        error: function(xhr, status, error) {
            console.error("AJAX Error:", xhr.status, xhr.responseText);
        //    alert("Failed to load booking details.");
        }
    });
}


    function highlightStars(rating) {
        $('#starRating .star').each(function() {
            let val = $(this).data('value');
            if (val <= rating) {
                $(this).addClass('selected');
            } else {
                $(this).removeClass('selected');
            }
        });
    }




