var maintenanceId=localStorage.getItem("maintenanceId")
$(function () {
    const bookingId = 7; // Replace with dynamic value if needed
    const customerId = 3; // Replace with dynamic value if needed

    // Load booking details on page load
    loadBookingDetails(bookingId);

    // Handle Save button click
    $('#save-note').on('click', function () {
        const maintenanceData = getMaintenanceFormData(bookingId, customerId);
        submitMaintenanceDetails(maintenanceData);
    });

    // ---------------------- Functions ----------------------

    // Load and display booking info in form fields
    function loadBookingDetails(bookingId) {
        $.ajax({
            url: `http://localhost:5147/api/Customer/GetBooking/`+bookingId,
            method: 'GET',
            success: function (response) {
                if (response.success) {
                    fillBookingForm(response.data.booking);
                    console.log(response.data.booking)
                } else {
                    showAlert("Error", "Booking data not found.", "error");
                }
            },
            error: function () {
                showAlert("Error", "Failed to load booking info", "error");
            }
        });
    }

    // Populate the form fields
    function fillBookingForm(data) {
        $('#name-booking').val(`#${data.title}`);
        $('#preferred-date').val(data.date ?? "");
        $('#motorcycle-type').val(data.bikeType ?? "");
        $('#customer-note').val(data.customerNote ?? "");
        $('#maintenance-type').val(data.statusBookingMaintenance ?? "");
        $('#location').val(data.location ?? "");
        $('#admin-description').val(data.maintenanceNote ?? "");
        $('#maintenance-price').val(data.totalPrice ?? "");
        $('img').attr('src',`http://localhost:5147`+data.imageUrl );
    }

    // Collect data from form fields
    function getMaintenanceFormData(bookingId, customerId) {
        return {
            maintenanceId: maintenanceId, // Replace with actual ID if available
            bookingId: bookingId,
            customerId: customerId,
            maintenanceNote: $('#admin-description').val(),
            price: $('#maintenance-price').val()
        };
    }

    // Submit the data via POST to the API
    function submitMaintenanceDetails(data) {
        $.ajax({
            url: 'http://localhost:5147/api/Maintenance/AddNotificationBookingMaintenance',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(data),
            success: function (res) {
                if (res.success) {
                    playAlert();
                    showAlert("Success", "Maintenance details saved!", "success");
                } else {
                    showAlert("Warning", "Something went wrong!", "warning");
                }
            },
            error: function () {
                showAlert("Error", "API communication failed!", "error");
            }
        });
    }

    // SweetAlert2 with optional sound
    function showAlert(title, text, icon) {
        document.getElementById('alert-sound').play();
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            confirmButtonText: 'Ok'
        });
    }

    // Optional: play sound only
    function playAlert() {
        document.getElementById('alert-sound').play();
    }
});
