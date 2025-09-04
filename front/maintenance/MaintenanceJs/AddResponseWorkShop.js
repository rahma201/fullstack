let bookingId=localStorage.getItem("AddResponsBookingId")
 maintenance=localStorage.getItem("maintenanceId")
$(function() {
    console.log(bookingId)
    showDetails(bookingId) ;
      console.log(maintenance)
// Handle the save button click
$('#save-note').on('click', function() {
    // Collect data from the modal form
   save();
});
});
// Function to show details in modal (read-only)
function showDetails(bookingId) {
    // Fetch details from the API based on the booking ID
    $.ajax({
        url: `http://localhost:5147/api/Customer/GetBooking/`+bookingId, // Modify with the correct endpoint
        type: 'GET',
        success: function(response) {
           var booking =response.data.booking
               var customer =response.data.customer
           console.log(response.data)
           //data.booking
           //data.customer
            // Populate the modal with the fetched data (read-only)
            $('#name-booking').val(booking.title);
            $('#preferred-date').val(booking.date);
            $('#motorcycle-type').val(booking.bikeType);
            $('#motorcycle-image').attr('src', `http://localhost:5147${booking.imageUrl}`);
            $('#customer-note').val(booking.customerNote);
            $('#maintenance-type').val(booking.statusBookingMaintenance);
            $('#location').val(booking.location);
            $('#admin-description').val(booking.adminDescription);
            $('#maintenance-price').val(booking.maintenancePrice);
            customerId=booking.customerId

        },
        error: function(xhr, status, error) {
                   Swal.fire({
                        title: "oops!",
                        text: "Error fetching booking details!",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
            console.error(error);
        }
    });
}
function save(){
    var dataToSend = {
        maintenanceId: maintenance,  // Replace with actual maintenance ID if available
        bookingId: bookingId, // Assuming bookingId is the same as the appointment name here
        customerId: customerId, // Replace with the actual customer ID
        maintenanceNote: $('#admin-description').val(),
        price: $('#maintenance-price').val()
    };

 $.ajax({
        url: 'http://localhost:5147/api/Maintenance/AddNotificationBookingMaintenance', // API endpoint
        type: 'POST',
        data: JSON.stringify(dataToSend),
        contentType: "application/json",

        success: function(response) {
        Swal.fire({
                        title: "Success!",
                        text: "response saved successfully!",
                        icon: "success",
                        confirmButtonText: "OK"
                    });
                 window.location.href= "/maintenance/BookingMaintenance.html"
 // Close the modal after success
        },
        error: function(xhr, status, error) {
            Swal.fire({
                        title: "oops!",
                        text: "can not  save response successfully!",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
           
        }
    });
}