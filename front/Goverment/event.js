$(function () {
    // When the tabs are clicked, fetch the respective data
    $('#event-accept-tab').click(function () {
        fetchConfirmData();
    });

    $('#event-reject-tab').click(function () {
        fetchRejectData();
    });

    $('#event-noreply-tab').click(function () {
        fetchNotReplayData();
    });

    // When clicking the "View" button in the "No Replay" tab
    $(document).on('click', '.view-btn', function () {
        var title = $(this).data('title');
        var startPoints = $(this).data('startpoints');
        var endPoints = $(this).data('endpoints');
        var maxParticipation = $(this).data('maxparticipation');
        var description = $(this).data('description');

        // Fill the modal with data
        $('#modalTitleValue').text(title);
        $('#modalStartPoints').text(startPoints);
        $('#modalEndPoints').text(endPoints);
        $('#modalMaxParticipation').text(maxParticipation);
        $('#modalDescription').text(description);

        // Show the modal
        $('#infoModal').modal('show');
    });
    $(document).on('click', '.btn-info', function () {
        var eventId = $(this).data("id");    
        console.log(eventId)  
      fetchEventDetails(eventId);  // Show event details
    });
    // When the page loads, start fetching data for the first tab
    fetchConfirmData();
    // When clicking the "✔️" (Approve) button in the "No Replay" tab
$(document).on('click', '.approve-btn', function () {
    var eventId = $(this).data('id');
    // Show SweetAlert2 confirmation popup
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to approve this event?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, approve!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            // Send approval to the API
            approveEvent(eventId);
        }
    });
});

// When clicking the "❌" (Reject) button in the "No Replay" tab
$(document).on('click', '.reject-btn', function () {
    var eventId = $(this).data('id');
    // Show SweetAlert2 confirmation popup
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to reject this event?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, reject!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            // Send rejection to the API
            rejectEvent(eventId);
        }
    });
});

});

// Fetch data for the "Confirm" tab
function fetchConfirmData() {
    if ($.fn.dataTable.isDataTable('#event_accept_table')) {
        $('#event_accept_table').DataTable().destroy();
    }
    $("#event_accept_table").DataTable({
        "processing": true,
        "serverSide": false,
        "ajax": {
            url: 'http://localhost:5147/api/Admain/GetAllAcceptResponseEventFromGoverments',
            type: 'GET',
            dataSrc: function (response) {
                if (response.data) {
                    return response.data;
                } else {
                    Swal.fire("Error!", "Failed to load data. Invalid response format.", "error");
                    return [];
                }
            },
            error: function (xhr, status, error) {
                Swal.fire("Error!", `Failed to load events. Status: ${xhr.status}`, "error");
            }
        },
        "columns": [
            { "data": "id" },
            { "data": "title" },
            { "data": "startRouts" },
            { "data": "endRouts" },
 { 
                "data": "time", 
                "render": function (data) {
                    // Ensure the data is valid and formatted properly
                    return data ? formatTime(data) : "Invalid Date";
                }
            },               { "data": "maxParticipaion" },
             {
                "data": null,
                "render": function (data, type, row) {
                    return `

            <button class='btn btn-info btn-sm show-info' data-id="${row.id}"><i class="fa-solid fa-circle-info "></i></button>

                    `;
                }
            }
        ]
    });
}

// Fetch data for the "Reject" tab
function fetchRejectData() {
    if ($.fn.dataTable.isDataTable('#event_reject_table')) {
        $('#event_reject_table').DataTable().destroy();
    }
    $("#event_reject_table").DataTable({
        "processing": true,
        "serverSide": false,
        "ajax": {
            url: 'http://localhost:5147/api/Admain/GetAllRejectResponseEventFromGoverments',
            type: 'GET',
            dataSrc: function (response) {
                if (response.data) {
                    return response.data;
                } else {
                    Swal.fire("Error!", "Failed to load data. Invalid response format.", "error");
                    return [];
                }
            },
            error: function (xhr, status, error) {
                Swal.fire("Error!", `Failed to load events. Status: ${xhr.status}`, "error");
            }
        },
        "columns": [
            { "data": "id" },
            { "data": "title" },
            { "data": "startRouts" },
            { "data": "endRouts" },
 { 
                "data": "time", 
                "render": function (data) {
                    // Ensure the data is valid and formatted properly
                    return data ? formatTime(data) : "Invalid Date";
                }
            },               { "data": "maxParticipaion" },
            {
                "data": null,
                "render": function (data, type, row) {
                    return `

            <button class='btn btn-info btn-sm show-info' data-id="${row.id}"><i class="fa-solid fa-circle-info "></i></button>

                    `;
                }
            }
        ]
    });
}

// Fetch data for the "No Replay" tab
function fetchNotReplayData() {
    if ($.fn.dataTable.isDataTable('#event_noreply_table')) {
        $('#event_noreply_table').DataTable().destroy();
    }
    $("#event_noreply_table").DataTable({
        "processing": true,
        "serverSide": false,
        "ajax": {
            url: 'http://localhost:5147/api/Admain/GetAllEventWaitResponseFromGoverments',
            type: 'GET',
            dataSrc: function (response) {
                if (response.data) {
                    return response.data;
                } else {
                    Swal.fire("Error!", "Failed to load data. Invalid response format.", "error");
                    return [];
                }
            },
            error: function (xhr, status, error) {
                Swal.fire("Error!", `Failed to load events. Status: ${xhr.status}`, "error");
            }
        },
        "columns": [
            { "data": "id" },
            { "data": "title" },
            { "data": "startRouts" },
            { "data": "endRouts" },
 { 
                "data": "time", 
                "render": function (data) {
                    // Ensure the data is valid and formatted properly
                    return data ? formatTime(data) : "Invalid Date";
                }
            },               { "data": "maxParticipaion" },
            {
                "data": null,
                "render": function (data, type, row) {
                    return `
                                <button class='btn btn-info btn-sm show-info' data-id="${row.id}">    <i class="fa-solid fa-circle-info "></i>
</button>

                        <button class='btn btn-success approve-btn' data-id="${row.id}"><i class="fa-solid fa-check"></i></button>
                        <button class='btn btn-danger  reject-btn' data-id="${row.id}">❌</button>
                    `;
                }
            }
        ]
    });
}

// Function to approve the event
function approveEvent(eventId) {
    $.ajax({
        url: 'http://localhost:5147/api/Admain/AddResponseEventFromGoverment', // Remove eventId from URL
        type: 'PUT',
        contentType: 'application/json', // Set content type to JSON
        data: JSON.stringify({ 
            isApproved: true,
            id: eventId // Include eventId in the JSON data
        }),
        success: function (response) {
            fetchNotReplayData(); // Reload the data   
             Swal.fire('Approved!', 'The event has been approved successfully.', 'success');

        },
        error: function (error) {
            Swal.fire('Error!', 'An error occurred while approving the event.', 'error');
        }
    });
}

// Function to reject the event
function rejectEvent(eventId) {
    $.ajax({
        url: 'http://localhost:5147/api/Admain/AddResponseEventFromGoverment', // Remove eventId from URL
        type: 'PUT',
        contentType: 'application/json', // Set content type to JSON
        data: JSON.stringify({ 
            isApproved: false,
            id: eventId // Include eventId in the JSON data
        }),
        success: function (response) {  
            fetchNotReplayData(); // Reload the data
            Swal.fire('Rejected!', 'The event has been rejected successfully.', 'success');
        },
        error: function (error) {
            Swal.fire('Error!', 'An error occurred while rejecting the event.', 'error');
        }
    });
}
function fetchEventDetails(eventId) {
    $.ajax({
        url: `http://localhost:5147/api/Admain/GetEventById/`+eventId,
        type: 'GET',
        success: function (response) {
            if(response.success){
            showEventDetails(response.data[0]);
         } 
            else{
                            Swal.fire('Error!', 'Error fetching event details.', 'error');

                // Call the function to display event details in the modal
        }},
        error: function (error) {
                            Swal.fire('Error!', 'Error fetching event details.', 'error');
        }
    });
}

// عرض تفاصيل الحدث في المودال
function showEventDetails(eventData) {
    console.log(eventData) 
    $('#eventDetailModal').modal('show');
    $('#modalTitle').val(eventData.title);
    $('#modalDescription').val(eventData.description);
    $('#modalStartRouts').val(eventData.startRouts);
    $('#modalEndRouts').val(eventData.endRouts);
    $('#modalTime').val(eventData.time);
    $('#modalDuration').val(eventData.duration);
    $('#modalMaxParticipaion').val(eventData.maxParticipaion);
    $('#modalPrice').val(eventData.price);
    $('#modalEventType').val(eventData.eventType);
// Assuming eventData haveTrollyProvider is a boolean value
$('#modalTrollyProvider').prop('checked', eventData.haveTrollyProvider);


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

