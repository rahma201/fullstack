var eventId = localStorage.getItem("eventId");

$(function () {
    console.log(eventId);

    // Check if eventId is null or undefined before proceeding
    if (!eventId) {
        Swal.fire("Error!", "Event ID is missing in localStorage.", "error");
        return; // Prevent further execution if eventId is not available
    }

    // Destroy the existing DataTable if it exists
    if ($.fn.dataTable.isDataTable('#eventdetils')) {
        $('#eventdetils').DataTable().destroy();
    }

    // Initialize the DataTable with updated settings
    $('#eventdetils').DataTable({
        "processing": false,
        "serverSide": false,
        "ajax": {
            url: 'http://localhost:5147/api/Admain/GetAllUserJoinEvents/' + eventId,  // Use eventId in the API URL
            type: 'GET',
            dataType: 'json',
            dataSrc: function (response) {
                $(".usercount").html(response.data.count); // Update user count

                console.log("API Response:", response);

                // Check if the response is valid and contains data
                if (response.success ) {
                    return response.data.events;
                } else {
                    Swal.fire("Error!", "Failed to load data. Invalid response format.", "error");
                    return []; // Return an empty array to clear the table
                }
            },
            error: function (xhr, status, error) {
                console.error("AJAX Error:", xhr.status, xhr.responseText);
                Swal.fire("Error!", `Failed to load events. Status: ${xhr.status}`, "error");
            }
        },
        "columns": [
        { "data": null, "render": function (data, type, row, meta) {
            return meta.row + 1;  // Adds the index (starting from 1)
        }},
            { "data": "user.username" },
            { "data": "user.phone" },
            { "data": "numberOfGuest" }
        ],
    });
});
  