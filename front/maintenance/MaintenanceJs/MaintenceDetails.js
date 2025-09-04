 let maintenanceId = localStorage.getItem("maintenanceclickId");
 $(function(){
   

    // 1. جلب بيانات الورشة: الاسم، البريد، الهاتف، الوصف

    getDetails(maintenanceId);
    GetWorkHourseByMaintanceId(maintenanceId)
    // 3. جلب مواعيد العمل
    GetReviewMaintenance(maintenanceId)

    $("#saveMaintainceBtn").on("click", function () { 
saveBookingMaintenance();});
});


function getDetails(maintenanceId){
    $.ajax({
        url: `http://localhost:5147/api/Maintenance/GetProfileMaintance/`+ maintenanceId,
        type: "GET",
        success: function (response) {
            if(response.success){
            const data=response.data;

            $("#workshopName").text(data.maintenanc.maintenanceName);
            $("#workshopDescription").text(data.maintenanc.description);
            const servicesList = $("#services-list").empty();
        // Set selected categoryMaintenanceId in the dropdown
        data.maintenanc.categories.forEach(function(service) {
                servicesList.append(`<li>→ ${service.name}</li>`);
            });
         } },
        error: function (xhr, status, error) {
            console.error("Error loading profile data:", error);
        }
    });

}function formatTimeToAMPM(time) {
    let [hours, minutes] = time.split(':').map(Number);  // Split and convert to numbers
    let period = hours >= 12 ? 'PM' : 'AM';  // Determine AM/PM
    hours = hours % 12;  // Convert hour to 12-hour format
    if (hours === 0) {
        hours = 12;  // Handle midnight (00:00)
    }
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;  // Format time
}

// Function to format and display work hours



function GetWorkHourseByMaintanceId(){
    $.ajax({
        url: `http://localhost:5147/api/Maintenance/GetWorkHourseByMaintanceId/$`+maintenanceId,
        type: "GET",
        success: function (response) {
            const data=response.data
            const days = [
                { name: "Sunday", start: data.startSunday, end: data.endSunday },
                { name: "Monday", start: data.startMonday, end: data.endMonday },
                { name: "Tuesday", start: data.startTuesday, end: data.endTuesday },
                { name: "Wednesday", start: data.startWednesday, end: data.endWednesday },
                { name: "Thursday", start: data.startThursday, end: data.endThursday },
                { name: "Friday", start: data.startFriday, end: data.endFriday },
                { name: "Saturday", start: data.startSaturday, end: data.endSaturday }
            ];

            const hoursList = $("#work-hours").empty();

            $.each(days, function (_, day) {
                if (day.start === "00:00" && day.end === "00:00") {
                    hoursList.append(`<li class="closed"><span>${day.name}</span><span>We're Closed</span></li>`);
                } else {
                    hoursList.append(`<li class=""><span>${day.name}</span><span>${formatTimeToAMPM(day.start)} - ${formatTimeToAMPM(day.end)}</span></li>`);
                }
            });
        },
        error: function (xhr, status, error) {
            console.error("Error loading work hours:", error);
        }
    });
}

function GetReviewMaintenance(maintenanceId) {

    // Send a GET request using AJAX to fetch the review
    $.ajax({
    url: 'http://localhost:5147/api/Shared/GetReviewMaintenance/' + maintenanceId,  // API URL with the review ID
    type: 'GET',
    dataType: 'json', // Expecting JSON response
    success: function(response) {
      // Assuming the API returns fields like 'name', 'comment', 'rating', adjust based on your response structure
      $('#Name').text(response.data.name);  // Insert the review name
      $('#Comment').text(response.data.comment);  // Insert the review comment
      $('#Rating').text(response.data.rating);  // Insert the review rating
      

    },
    error: function(xhr, status, error) {
      console.log("Error fetching review: " + error);
      // Display an error message if something goes wrong
      $('#Review').text('Error fetching review');
    }

    });
  }

  
  function saveBookingMaintenance() {
    // Assume maintenanceId is available (e.g., fetched from localStorage or hardcoded)
    const customerId = localStorage.getItem("customerId") || undefined;
    console.log(customerId);

    if (customerId != 0 && customerId != null && customerId != undefined) {
        let formData = new FormData();

        // Appending form data
        formData.append('title', $('#titleMoto').val());
        formData.append('date', $('#date').val());
        formData.append('customerNote', $('#description').val());
        formData.append('customerId', customerId); // Customer ID
        formData.append('location', $('#location').val());
        formData.append('bikeType', $('#bikeType').val());
        formData.append('maintenanceId', maintenanceId); // Add maintenanceId to the form data

        // If a bike image is provided, add it to the form data
        let imageFile = $('#bikeImage')[0].files[0];
        if (imageFile) {
            formData.append('imageUrl', imageFile);
        }

        // Sending AJAX request
        $.ajax({
            url: 'http://localhost:5147/api/Customer/AddSpecificBooking',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                if (response.success) {
                    $("#MaintenanceModal").modal("hide");
                    Swal.fire({
                        title: "Success!",
                        text: "Booking saved successfully!",
                        icon: "success",
                        confirmButtonText: "OK"
                    });
                    // Reset form or close modal here
                } else {
                    Swal.fire({
                        title: "Oops!",
                        text: "Something went wrong while saving the booking.",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                }
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    title: "Oops!",
                    text: "Failed to send the request. Please try again.",
                    icon: "error",
                    confirmButtonText: "OK"
                });
                console.error("AJAX Error:", status, error);
            }
        });
    } else {
        // If customer is not logged in
        Swal.fire({
            title: "Error!",
            text: "Failed to add item to wishList. Please login first",
            icon: "error",
            confirmButtonText: "OK"
        }).then((result) => {
            if (result.isConfirmed) {
                $("#authModal").modal("show");
            }
        });
        return;
    }
}
