$(function() {
    // Check if DataTable already exists, if so destroy it
    if ($.fn.dataTable.isDataTable('#Maintance_accept_table')) {
        $('#Maintance_accept_table').DataTable().destroy();
    }

    // Initialize DataTable
    $("#Maintance_accept_table").DataTable({
        "processing": true,
        "serverSide": false, // Adjust to true if you want server-side processing
        "ajax": {
            url: 'http://localhost:5147/api/Admain/GetAllBooking',  // URL for your API
            type: 'GET',
            dataSrc: function(response) {
                if (response.success) {
                    return response.data;  // Assuming data is in the 'data' field in response
                } else {
                    Swal.fire("Error!", "Failed to load data. Invalid response format.", "error");
                    return [];
                }
            },
            error: function(xhr, status, error) {
                Swal.fire("Error!", `Failed to load bookings. Status: ${xhr.status}`, "error");
            }
        },
        "columns": [
            { "data": "bookingId" },
            { "data":"maintenanceId"  },
            { "data": "title" },
            { "data": "totalPrice" },
                { 
                "data": "date", 
                
            },               
            {
                "data": null,
                "render": function (data, type, row) {
                    return `
                        <button class='btn btn-info btn-sm show-info' data-id="${row.id}">Info</button>
                    `;
                }
            }
        ]
    });
});


function GetProfileMaintance(id){
$.ajax({
  url: 'http://localhost:5147/api/Maintenance/GetProfileMaintance'+id,
  type: 'GET',
  headers: {
    'accept': '*/*'
  },
  success: function(response) {
    if (response.success) {
      var maintenance = response.data.maintenanc;
      
      // Check if maintenance object is not null
      if (maintenance !== null) {
        // You can now access properties of maintenance
      return  maintenance.maintenanceName || " ";
     
      } else {
        console.log("Maintenance data is null.");
      }
    } else {
      console.log("Failed to retrieve maintenance data: " + response.message);
    }
  },
  error: function(xhr, status, error) {
    console.log("An error occurred: " + error);
  }
});
}

function formatEventDateTime(isoString) {
    if (!isoString) return 'N/A';
    try {
        const date = new Date(isoString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    } catch (e) {
        console.error("Error formatting date:", e);
        return isoString; // Return original string if formatting fails
    }
}