var maintenanceId =localStorage.getItem("maintenanceId");var workHoursId;
$(document).ready(function () {
    

    getMaintenanceId(maintenanceId) ;
   GetAllServicesForMaintance();
    $("#save").on("click", function () {
        UpdateProfileMaintance();
        UpdateWorkHourse();
    });

    loadMaintenanceStats(maintenanceId);
    loadTopCustomers(maintenanceId);
    loadCountMaintenanc(maintenanceId)

  
});

function getMaintenanceId(maintenanceId) { 
    $.ajax({
        url: `http://localhost:5147/api/Maintenance/GetProfileMaintance/` + maintenanceId,
        type: "GET",
        success: function (response) {
            var data = response.data;
            
            // Fill profile fields
            $("#name").text(data.maintenanc.maintenanceName);
            $("#inputName").val(data.maintenanc.maintenanceName);
            $("#inputEmail").val(data.maintenanc.email);
            $("#inputPhone").val(data.maintenanc.phone);
            $("#inputLocation").val(data.maintenanc.location);
            $("#user-description").val(data.maintenanc.description);
    workHoursId=data.mainWorkHourstenanc.workHoursId
            // Set selected categoryMaintenanceId in the dropdown
            data.maintenanc.categories.forEach(function(service) {
                // Assuming your dropdown has options with value="categoryMaintenanceId"
                
                $("#user-tags").val(service.categoryMaintenanceId);
            });

            GetWorkHourse( data.mainWorkHourstenanc);
        },
      

        // Note: data.ourServies and data.categoryIds can be used if needed
   
    error: function (xhr) {
        Swal.fire({
            title: "Oops!",
            text: "Failed to load your profile.",
            icon: "error",
            confirmButtonText: "Ok"
        });
        // ===== 1. Fetch and Fill Profile Data =====
    }
});
}

function GetAllServicesForMaintance() {    // ===== 1. Fetch and Fill Profile Data ===== 
 

    $.ajax({
        url: `http://localhost:5147/api/Shared/GetAllCategoryMaintenances`,
        type: "GET",
        success: 
        function (response) {
                // Fill profile fields

        // Fill profile fields
        $("#user-tags").empty();
        response.data.forEach(
            function(service) {
            $("#user-tags").append(
                $("<option>", {
                    value: service.categoryMaintenanceId,
                    text: service.name
                })
            );
        });
    },
    
});
}

function UpdateProfileMaintance() {    // ===== 1. Fetch and Fill Profile Data =====
    const updatedData = {
        id: maintenanceId,
        maintenanceName: $("#inputName").val(),
        email: $("#inputEmail").val(),
        phone: $("#inputPhone").val(),
        location: $("#inputLocation").val(),
        maintenanceDescription: $("#user-description").val(),
        categoryIds: $("#user-tags").val().map(id => parseInt(id))  // Replace with selected IDs if needed
    };

    $.ajax({
        url: "http://localhost:5147/api/Maintenance/UpdateProfileMaintance",
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(updatedData),
        success: function (response) {
            if(!response.success)
            Swal.fire({
                title: "successfully!",
                text: "Profile updated successfully!",
                icon: "success",
                confirmButtonText: "Ok"
            });
        },
        error: function () {

            Swal.fire({
                title: "Oops!",
                text: "Error while updating profile!",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    });
}
function convertToTimeString(timeString) {
    if (!timeString || timeString === "") {
        return null;  // قيمة افتراضية في حال كانت الحقول فارغة
    }

    let timeParts = timeString.split(":");
    
    // التأكد من أن الوقت يحتوي على صفر إذا كان الرقم مكونًا من رقم واحد فقط
    let hours = timeParts[0].padStart(2, "0");
    let minutes = timeParts[1].padStart(2, "0");

    return `${hours}:${minutes}`;  // إرجاع الوقت بتنسيق "HH:mm"
}

function UpdateWorkHourse() {
    const workHoursData = {
           
            workHoursId: workHoursId,
            startSunday: convertToTimeString($("#sunday-from").val()),
            endSunday: convertToTimeString($("#sunday-to").val()),
            startMonday: convertToTimeString($("#monday-from").val()),
            endMonday: convertToTimeString($("#monday-to").val()),
            startTuesday: convertToTimeString($("#tuesday-from").val()),
            endTuesday: convertToTimeString($("#tuesday-to").val()),
            startWednesday: convertToTimeString($("#wednesday-from").val()),
            endWednesday: convertToTimeString($("#wednesday-to").val()),
            startThursday: convertToTimeString($("#thursday-from").val()),
            endThursday: convertToTimeString($("#thursday-to").val()),
            startFriday: convertToTimeString($("#friday-from").val()),
            endFriday: convertToTimeString($("#friday-to").val()),
            startSaturday: convertToTimeString($("#saturday-from").val()),
            endSaturday: convertToTimeString($("#saturday-to").val()),
            maintanenceId: maintenanceId
        
    };

    $.ajax({
        url: "http://localhost:5147/api/Maintenance/UpdateWorkHourse",
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(workHoursData),
        success: function (response) {
            if (response.success) {
                Swal.fire({
                    title: "Work hours",
                    text: "Work hours updated successfully.",
                    icon: "success",
                    confirmButtonText: "Ok"
                });
            }
        },
        error: function (xhr, status, error) {
            console.error("Error Details:", xhr.responseText);
            Swal.fire({
                title: "Error",
                text: "An error occurred while updating work hours.",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    });
}

function GetWorkHourse(data){
       $('#WorksHoures').attr('data-Workid', data.workHoursId); 
        $("#sunday-from").val(data.startSunday);
        $("#sunday-to").val(data.endSunday);
        $("#monday-from").val(data.startMonday);
        $("#monday-to").val(data.endMonday);
        $("#tuesday-from").val(data.startTuesday);
        $("#tuesday-to").val(data.endTuesday);
        $("#wednesday-from").val(data.startWednesday);
        $("#wednesday-to").val(data.endWednesday);
        $("#thursday-from").val(data.startThursday);
        $("#thursday-to").val(data.endThursday);
        $("#friday-from").val(data.startFriday);
        $("#friday-to").val(data.endFriday);
        $("#saturday-from").val(data.startSaturday);
        $("#saturday-to").val(data.endSaturday);
   }


// Function to load Maintenance Stats data (for Pie Chart) for a specific maintenance ID
function loadMaintenanceStats(maintenanceId) {
    $.ajax({
        url: `http://localhost:5147/api/maintenance/MaintenanceStats/${maintenanceId}`,
        type: 'GET',
        success: function(response) {
            if (response.success) {
                var data = response.data;
                
                // Display Most Popular Service
                $('#mostPopularService').text(`Most Popular Service: ${data.mostPopularService.bikeType} (${data.mostPopularService.count} bookings)`);  // Corrected property name
                
                // Display Total Services
                $('#totalServices').text(`Total Services: ${data.totalServices}`);
                
                // Display Service Count by Category (e.g., BikeType) in a table
                var serviceCategoryTable = $('#serviceCategoryTable tbody');
                serviceCategoryTable.empty();
                data.serviceCountByCategory.forEach(function(category) {
                    var row = `<tr>
                                   <td>${category.category}</td>
                                   <td>${category.count}</td>
                               </tr>`;
                    serviceCategoryTable.append(row);
                });

                // Create a Pie Chart for Service Count by Category
                createPieChart(data.serviceCountByCategory);

            } else {
               // alert('Error fetching data: ' + response.message);
            }
        },
        error: function(err) {
            console.log('Error: ', err);
        }
    });
}

// Function to create a Pie Chart for Service Count by Category
function createPieChart(serviceCountByCategory) {
    var categories = serviceCountByCategory.map(function(category) {
        return category.category;
    });

    var counts = serviceCountByCategory.map(function(category) {
        return category.count;
    });

    // Get the canvas element by its ID
    var canvas = document.getElementById('servicePieChart');

    // Check if the element exists
    if (canvas) {
        var ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'pie',  // You can change this to 'bar' for a bar chart
            data: {
                labels: categories,
                datasets: [{
                    label: 'Service Count by Category',
                    data: counts,
                    backgroundColor: ['#d21213', '#F4F4F2', '#444444', '#DA0037', '#EDEDED', '#171717'],
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return tooltipItem.label + ': ' + tooltipItem.raw + ' bookings';
                            }
                        }
                    }
                }
            }
        });
    } else {
        console.error("Canvas element with ID 'servicePieChart' not found!");
    }
}



// Function to load Top Customers data for a specific maintenance ID
function loadTopCustomers(maintenanceId) {
    $.ajax({
        url: `http://localhost:5147/api/maintenance/TopCustomers/${maintenanceId}`,  // API endpoint with maintenanceId
        type: 'GET',
        success: function(response) {
            if (response.success) {
                var customers = response.data;
                var tableBody = $('#topCustomersTable tbody');
                tableBody.empty();
                customers.forEach(function(customer) {
                    var row = `<tr>
                                   <td>${customer.username}</td>
                                   <td>${customer.count}</td>
                                 </tr>`;
                    tableBody.append(row);
                });
            } else {
             //   alert('Error fetching data: ' + response.message);
            }
        },
        error: function(err) {
            console.log('Error: ', err);
        }
    });
}

function loadCountMaintenanc(maintenanceId) {
    // Create promises for each AJAX request
    const countMaintenanceInYearPromise = $.ajax({
        url: `http://localhost:5147/api/Maintenance/CountMaintenanceInYear/${maintenanceId}`,
        type: 'GET'
    });

    const monthlyAchievementsPromise = $.ajax({
        url: `http://localhost:5147/api/Maintenance/MonthlyAchievements/${maintenanceId}`,
        type: 'GET'
    });

    const countMaintenanceInDayPromise = $.ajax({
        url: `http://localhost:5147/api/Maintenance/CountMaintenanceInDay/${maintenanceId}`,
        type: 'GET'
    });

    // Wait for all AJAX calls to complete using Promise.all
    Promise.all([countMaintenanceInYearPromise, monthlyAchievementsPromise, countMaintenanceInDayPromise])
        .then(([countMaintenanceInYearResponse, monthlyAchievementsResponse, countMaintenanceInDayResponse]) => {
            // Check if the responses are successful and assign values
            let year = countMaintenanceInYearResponse.success ? countMaintenanceInYearResponse.data : 0;
            let month = monthlyAchievementsResponse.success ? monthlyAchievementsResponse.data : 0;
            let today = countMaintenanceInDayResponse.success ? countMaintenanceInDayResponse.data : 0;

            // Log the data to verify
            console.log(today, month, year);

            // Create the chart after all the data is fetched
            createMaintenanceOverviewChart(today, month, year);
        })
        .catch(err => {
            // Handle errors if any of the AJAX calls fail
            console.log('Error: ', err);
        });
}

// Function to create Monthly Achievements Bar Chart
function createMaintenanceOverviewChart(today, month, year) {
    var options = {
        series: [{
            name: 'Maintenance Count',
            data: [today, month, year], // Maintenance counts for Today, Month, Year
        }],
        chart: {
            height: 350,
            type: 'bar',  // Bar chart type
        },
        plotOptions: {
            bar: {
                horizontal: false,
                endingShape: 'rounded',
            },
        },
        xaxis: {
            categories: ['Today', 'This Month', 'This Year'],  // X-axis labels
        },
        colors: ['#d21213', '#EDEDED', '#171717'],  // Colors for the bars
        title: {
            text: 'Maintenance Overview',
            align: 'center',
            style: {
                fontSize: '18px',
                fontWeight: 'bold',
            }
        },
        grid: {
            borderColor: '#e7e7e7',
            padding: {
                left: 0,
                right: 0,
                top: 20,
                bottom: 0
            }
        }
    };

    // Render the chart inside the sales-overview div
    var chart = new ApexCharts(document.querySelector("#sales-overview"), options);
    chart.render();
}


