$(function () {
    // Submit event data using POST
    $("#Save").click(function () {
        addEvent();
    });

    // Fetch data when tabs are clicked
    $('#event-reject-tab').click(function () {
        fetchEventReject();
    });

    $('#event-Notsent-tab').click(function () {
        fetchEventNotSent();
    });

    $('#event-noreply-tab').click(function () {
        fetchEventNoReply(); 
    });
    $('#event-accept-tab').trigger('click');
    fetchEventAcceptResponse();
    $('#event-accept-tab').click(function () {
        fetchEventAcceptResponse();
    });

    $(document).on('click', '.btn-eventdetils', function () {
    var eventId = $(this).data("id");  // احصل على الـ eventId
localStorage.setItem("eventId",eventId)
  

    // توجيه المستخدم إلى صفحة EventDetils.html مع تمرير الـ eventId في الرابط
    window.location.href = '/admin/EventDetils.html' ;
});

    // Handle "Info" button click to show event details
    $(document).on('click', '.btn-info', function () {
        var eventId = $(this).data("id");    
        console.log(eventId)  
      fetchEventDetails(eventId);  // Show event details
    });

    // Handle "Send" button click to confirm before sending the event
    $(document).on('click', '.send-event', function () {
        var eventId = $(this).data("id"); // Get event ID
        // Show SweetAlert2 confirmation dialog before sending
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to send this event to the government?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, send it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(eventId)
                sendEventToGoverment(eventId); 
                
                
                
                // Send event to government
            }
        });
    });
});

// Function to send event to government
function sendEventToGoverment(eventId) {
    $.ajax({
        url: 'http://localhost:5147/api/Admain/SendEventToGoverments?id='+eventId, // Updated URL with 's' at the end
        type: 'PUT',
        success: function (response) {
            Swal.fire('Sent!', 'The event has been sent to the government.', 'success');
            fetchEventNotSent(); // Reload the "Not Sent" events
        },
        error: function (error) {
            console.log('Error sending event:', error);
            Swal.fire('Error!', 'An error occurred while sending the event.', 'error');
        }
    });
}

// Function to add an event
function addEvent() {
    let haveTrollyProvider = $("#haveTrollyProvider").val() === "true";  // Converts to boolean (true or false)
    var eventData = {
        title: $("#title").val(),
        description: $("#description").val(),
        startRouts: $("#startRouts").val(),
        endRouts: $("#endRouts").val(),
        time: $("#Time").val(),
        duration: parseInt($("#duration").val()),
        maxParticipaion: parseInt($("#maxParticipaion").val()),
        price: parseFloat($("#price").val()),
        haveTrollyProvider: haveTrollyProvider,
        eventType: $("#eventType").val()
    };

    // Send POST request to add the event
    $.ajax({
        url: 'http://localhost:5147/api/Admain/AddEvent',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(eventData),
        success: function (response) {
            if (response.success) {
                $("#addEventModal").modal('hide');
                      $("#eventNotsenttable").DataTable().ajax.reload();

                Swal.fire("Successfully!", "Event added successfully!", "success");
            }
        },
        error: function (error) {
            $("#addEventModal").modal('hide');
            Swal.fire("Oops!", "Can't add event successfully!", "error");
        }
    });
}

// Fetch all rejected events (GET)
function fetchEventReject() {
    if ($.fn.dataTable.isDataTable('#event_reject_table')) {
        $('#event_reject_table').DataTable().destroy();
    }
    $("#event_reject_table").DataTable({
        "processing": false,
        "serverSide": false,
        "ajax": {
            url: 'http://localhost:5147/api/Admain/GetAllRejectResponseEventFromGoverments',
            type: 'GET',
            dataSrc: function (response) {
                console.log("API Response:", response);
                if (response.success && response.data) {
                    return response.data;
                } else {
                    Swal.fire("Error!", "Failed to load data. Invalid response format.", "error");
                    return [];
                }
            },
            error: function (xhr, status, error) {
                console.error("AJAX Error:", xhr.status, xhr.responseText);
                Swal.fire("Error!", `Failed to load events. Status: ${xhr.status}`, "error");
            }
        },
        "columns": [
            { "data": "id" },
            { "data": "title" },
            { "data": "startRouts" },
            { "data": "endRouts" },
            { "data": "time" },
            {
                "data": null,
                "render": function (data, type, row) {
                    return `

<button class="btn btn-info btn-sm show-info" data-id="${row.id}">
    <i class="fa-solid fa-circle-info"></i>
</button>
                    `;
                }
            }
        ],
        "createdRow": function (row, data, dataIndex) {
            // Store event data into the row element using .data()
            $(row).data('title', data.title)
                .data('startRouts', data.startRouts)
                .data('endRouts', data.endRouts)
                .data('time', data.time)
                .data('duration', data.duration)
                .data('maxParticipaion', data.maxParticipaion)
                .data('price', data.price)
                .data('eventType', data.eventType)
                .data('haveTrollyProvider', data.haveTrollyProvider);
        }
    });
}

// Fetch all events that haven't been sent to government (GET)
function fetchEventNotSent() {
    if ($.fn.dataTable.isDataTable('#eventNotsenttable')) {
        $('#eventNotsenttable').DataTable().destroy();
    }
    $("#eventNotsenttable").DataTable({
        "processing": true,
        "serverSide": false,
        "ajax": {
            url: 'http://localhost:5147/api/Admain/GetAllEventDoesNotSendToGoverments',
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
            },            {
                "data": null,
                "render": function (data, type, row) {
                    return `

<button class="btn btn-info btn-sm show-info" data-id="${row.id}">
    <i class="fa-solid fa-circle-info"></i></button>

<button data-id=${row.id} class='btn btn-primary btn-sm send-event'><i class="fa-solid fa-paper-plane"></i></button>

<button class="btn btn-eventdetils btn-sm show-info" data-id="${row.id}">
    <i class="fa-solid fa-user"></i>
</button>

                    `;
                }
            
            }
        ]
    });
}

function fetchEventNoReply() {
        if ($.fn.dataTable.isDataTable('#event_noreply_table')) {
            $('#event_noreply_table').DataTable().destroy();
        }
        $("#event_noreply_table").DataTable({
            "processing": false,
            "serverSide": false,
            "ajax": {
                url: 'http://localhost:5147/api/Admain/GetAllEventWaitResponseFromGoverments',
            type: 'GET',
            dataSrc: function (response) {
                if (response.success) {
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
            },            {
                "data": null,
                "render": function (data, type, row) {
                    return `

<button class="btn btn-info btn-sm show-info" data-id="${row.id}">
    <i class="fa-solid fa-circle-info"></i>
</button>
                    `;
                }
            
            }
        ]
    });
}

function fetchEventAcceptResponse() {
    if ($.fn.dataTable.isDataTable('#event_accept_table')) {
        $('#event_accept_table').DataTable().destroy();
    }
    $("#event_accept_table").DataTable({
        "processing": false,
        "serverSide": false,
        "ajax": {
            url: 'http://localhost:5147/api/Admain/GetAllAcceptResponseEventFromGoverments',
            type: 'GET',
            dataSrc: function (response) {
                if (response.success) {
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
            },            {
                "data": null,
                "render": function (data, type, row) {
                    return `

<button class="btn btn-info btn-sm show-info" data-id="${row.id}">
    <i class="fa-solid fa-circle-info"></i>
</button>

<button class="btn btn-eventdetils btn-sm show-info" data-id="${row.id}">
    <i class="fa-solid fa-user"></i>
</button>
                    `;
                }
            }
        ]
    });
}

// Show event details in modal
function fetchEventDetails(eventId) {
    $.ajax({
        url: `http://localhost:5147/api/Admain/GetEventById/`+eventId,
        type: 'GET',
        success: function (response) {
            if(response.success){
            showEventDetails(response.data[0]);
         } 
            else{
                alert(`Error fetching event details`);// Call the function to display event details in the modal
        }},
        error: function (error) {
            alert(`Error fetching event details: ${error.responseText}`);
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
    $('#modalTime').val(formatTime
        (eventData.time));
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

