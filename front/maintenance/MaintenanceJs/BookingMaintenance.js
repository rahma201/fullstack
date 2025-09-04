var maintenanceId = localStorage.getItem("maintenanceId");
$(function () {
    // When the "Appointments not answered" button is clicked
    $('#NoReplyTable').on('click', '.show-info', function () {
       var bookingId = $(this).data('id');
       localStorage.setItem("AddResponsBookingId",bookingId)
        // Redirect to AddResponseWorkShop.html with the bookingId as a query parameter
        window.location.href = 'AddResponseWorkShop.html';
   });

    // When clicking the "View" button in the "Accepted" tab
    $(document).on('click', '.show-info-accepted', function () {
        var bookingId = $(this).data('id');
        // Fetch and display the details in the modal for "Accepted"
        fetchBookingDetails(bookingId, 'Accepted');
    });

    // When clicking the "View" button in the "Rejected" tab
    $(document).on('click', '.show-info-rejected', function () {
        var bookingId = $(this).data('id');
        // Fetch and display the details in the modal for "Rejected"
        fetchBookingDetails(bookingId, 'Rejected');
    });

    fetchNotReplyData();
  // Fetch data for the "Not Answered" tab
    $('#notReply-tab').on('click', function () {
        fetchNotReplyData();
        console.log("not replay")
    });
    // Optional: Hide the modal when clicking on a close button
    $('#Rejected-ContactContainer').on('click', '.btn-close', function () {
        $('#Rejected-ContactContainer').fadeOut(); // Hide the modal
    });

    // Fetch data for the "Accepted" tab
    $('#Accepted-tab').on('click', function () {
        fetchAcceptedData();
    });

    // Fetch data for the "Rejected" tab
    $('#Rejected-tab').on('click', function () {
        fetchRejectedData();
    });

  

});

    // Fetch data for the "Accepted" tab
    function fetchAcceptedData() {
        if ($.fn.dataTable.isDataTable('#AcceptedTable')) {
            $('#AcceptedTable').DataTable().destroy();
        }
        $("#AcceptedTable").DataTable({
        
            "processing": true,
            "serverSide": false,
            "ajax": {
                url: 'http://localhost:5147/api/Maintenance/GetAllBookingAcceptforMantaince/'+maintenanceId,
                type: 'GET',
                dataSrc: function (response) {
                    if (response.data) {
                        return response.data;
                    } else {
                        Swal.fire("Error!", "Failed to load data.", "error");
                        return [];
                    }
                },
                error: function (xhr, status, error) {
                    Swal.fire("Error!", "Failed to load events.", "error");
                }
            },
            "columns": [
                { "data": "bookingId" },
                { "data": "title" },
                { "data": "bikeType" },
                { "data": "statusBookingMaintenance" },
{ 
                "data": "date", 
                "render": function (data) {
                    // Ensure the data is valid and formatted properly
                    return data ? formatTime(data) : "Invalid Date";
                }
            },                   {
                    "data": null,
                    "render": function (data, type, row) {
                        return `
                            <button class="btn btn-info btn-sm show-info-accepted" data-id="${row.bookingId}">View</button>
                        `;
                    }
                }
            ]
        });
    }

    // Fetch data for the "Rejected" tab
    function fetchRejectedData() {
        if ($.fn.dataTable.isDataTable('#RejectedTable')) {
            $('#RejectedTable').DataTable().destroy();
        }
        $("#RejectedTable").DataTable({
            "processing": true,
            "serverSide": false,
            "ajax": {
                url: 'http://localhost:5147/api/Maintenance/GetAllBookingRejectforMantaince/'+maintenanceId,
                type: 'GET',
                dataSrc: function (response) {
                    if (response.data) {
                        return response.data;
                    } else {
                        Swal.fire("Error!", "Failed to load data.", "error");
                        return [];
                    }
                },
                error: function (xhr, status, error) {
                    Swal.fire("Error!", "Failed to load events.", "error");
                }
            },
            "columns": [
                   { "data": "bookingId" },
                { "data": "title" },
                { "data": "bikeType" },
                { "data": "statusBookingMaintenance" },
{ 
                "data": "date", 
                "render": function (data) {
                    // Ensure the data is valid and formatted properly
                    return data ? formatTime(data) : "Invalid Date";
                }
            },                   {
                    "data": null,
                    "render": function (data, type, row) {
                        return `
                            <button class="btn btn-info btn-sm show-info-rejected" data-id="${row.bookingId}">View</button>
                        `;
                    }
                }
            ]
        });
    }

    // Fetch data for the "Not Answered" tab
    function fetchNotReplyData() {
        if ($.fn.dataTable.isDataTable('#NoReplyTable')) {
            $('#NoReplyTable').DataTable().destroy();
        }
        $("#NoReplyTable").DataTable({
            "processing": true,
            "serverSide": false,
            "ajax": {
                url: 'http://localhost:5147/api/Maintenance/GetAllBookingNotReplyforMantaince/'+maintenanceId,
                type: 'GET',
                dataSrc: function (response) {
                  if (response.data) {
                        return response.data;
                    } else {
                        Swal.fire("Error!", "Failed to load data.", "error");
                        return [];
                    }
                },
                error: function (xhr, status, error) {
                    Swal.fire("Error!", "Failed to load events.", "error");
                }
            },
            "columns": [
                { "data": "bookingId" },
                { "data": "title" },
                { "data": "bikeType" },
                { "data": "statusBookingMaintenance" }
                ,{ 
                "data": "date", 
                "render": function (data) {
                    // Ensure the data is valid and formatted properly
                    return data ? formatTime(data) : "Invalid Date";
                }
            },   
                {
                    "data": null,
                    "render": function (data, type, row) {
                        return `
                            <button class="btn btn-info btn-sm show-info" data-id="${row.bookingId}">View</button>
                        `;
                    }
                }
            ]
        });
    }
    // Function to fetch and show booking details in the modal
    function fetchBookingDetails(bookingId, tab) {
        // Example of how to fetch details (you can replace this with an actual API call)
        $.ajax({
            url: 'http://localhost:5147/api/Maintenance/GetBookingDetails/' + bookingId,
            type: 'GET',
            success: function (response) {
                if (response.success) {
                    // Populate modal fields with the fetched details
                    $('#name-booking').val(response.data.appointmentName);
                    $('#preferred-date').val(response.data.preferredDate);
                    $('#motorcycle-type').val(response.data.motorcycleType);
                    $('#motorcycle-image').attr('src', response.data.motorcycleImageUrl);
                    $('#customer-note').val(response.data.customerNote);
                    $('#maintenance-type').val(response.data.maintenanceType);
                    $('#location').val(response.data.location);
                    $('#admin-description').val(response.data.adminDescription);
                    $('#maintenance-price').val(response.data.maintenancePrice);

                    // Show the modal (make it visible)
                    $('#Rejected-ContactContainer').fadeIn();
                } else {
                    Swal.fire("Error!", "Failed to load booking details.", "error");
                }
            },
            error: function (xhr, status, error) {
                Swal.fire("Error!", "Failed to load data.", "error");
            }
        });
    }
    function formatTime(dateString) {
    // Convert the date string into a Date object
    let date = new Date(dateString);
    
    // Extract the date components
    let year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month starts from 0, add leading zero if necessary
    let day = date.getDate().toString().padStart(2, '0'); // Add leading zero if necessary
    let hours = date.getHours().toString().padStart(2, '0'); // Add leading zero if necessary
    let minutes = date.getMinutes().toString().padStart(2, '0'); // Add leading zero if necessary

    // Return formatted time in "yy-mm-dd hh:mm" format
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}
