$(function(){

    countEvents();
    countBookings();
    countOrders();
    countUser();
    getOrderByShop();
    BookingAndOrderInYear();
    BookingByMaintnanece();
});


function countEvents(){
    $.ajax({
        url: 'http://localhost:5147/api/Admain/countEvent',  // URL of your API
        type: 'GET',  // HTTP method
       
        success: function(response) {
            // Check if the request was successful
            if (response.success) {
                // Update the CountEvents element with the returned data
                $('.CountEvents').text(response.data); // Assuming the data field contains the event count
            } else {
                // If there was an error retrieving events, display the message
                $('.CountEvents').text(response.message);
            }
        },
        error: function(xhr, status, error) {
            // If an error occurred in the request, display a generic error message
            $('.CountEvents').text(0);
            
        }
    });

}

function countBookings(){
    $.ajax({
        url: 'http://localhost:5147/api/Admain/countBooking',  // URL of your API
        type: 'GET',  // HTTP method
       
        success: function(response) {
            // Check if the request was successful
            if (response.success) {
                // Update the CountEvents element with the returned data
                $('.countBookings').text(response.data); // Assuming the data field contains the event count
            } else {
                // If there was an error retrieving events, display the message
                $('.countBookings').text(response.message);
            }
        },
        error: function(xhr, status, error) {
            // If an error occurred in the request, display a generic error message
            $('.countBookings').text(0);
            
        }
    });

} function BookingAndOrderInYear(){
       

    let ordersData = [];
    let bookingData = [];
    let labels = [];
    
    // Fetch Orders Data
    $.ajax({
        url: 'http://localhost:5147/api/Admain/OrdersInYearByShop', 
        type: 'GET',  
        success: function(response) {
            if (response.success ) {
                response.data.forEach(function(order) {
                    labels.push(order.storeName);  // Assuming the store name is a label
                    ordersData.push(order.orderCount); // Orders count
                });
                fetchBookingData(); // Fetch the booking data after orders data is available
            } else {
                console.error('No valid orders data');
            }
        },
        error: function(xhr, status, error) {
            console.error("Error fetching orders data:", error);
        }
    });

    // Fetch Booking Data
    function fetchBookingData() {
        $.ajax({
            url: 'http://localhost:5147/api/Admain/BookingInYearByMaintenance',
            type: 'GET',
            success: function(response) {
                if (response.success) {
                    response.data.forEach(function(booking) {
                        bookingData.push(booking.bookingCount);  // Booking count
                    });
                    renderCombinedChart(); // After data is fetched, render the chart
                } else {
                    console.error('No valid booking data');
                    bookingData = new Array(labels.length).fill(0); // If no booking data, fill with 0
                    renderCombinedChart();
                }
            },
            error: function(xhr, status, error) {
                console.error("Error fetching booking data:", error);
                bookingData = new Array(labels.length).fill(0); // If error in fetching, fill with 0
                renderCombinedChart();
            }
        });
    }

    // Render Combined Chart (Orders + Bookings)
    function renderCombinedChart() {
        const ctx = document.getElementById('combinedChart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'bar',  // You can use 'pie' or other types if desired
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Orders',
                        data: ordersData,
                        backgroundColor: '#FF6B6B',
                    },
                    {
                        label: 'Bookings',
                        data: bookingData,
                        backgroundColor: '#36A2EB',
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Store'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Count'
                        },
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Orders and Bookings Overview'
                    },
                    legend: {
                        position: 'top',
                    }
                }
            }
        });
    }

    }
function countOrders(){
    $.ajax({
        url: 'http://localhost:5147/api/Admain/countOrders',  // URL of your API
        type: 'GET',  // HTTP method
       
        success: function(response) {
            // Check if the request was successful
            if (response.success) {
                // Update the CountEvents element with the returned data
                $('.countOrders').text(response.data); // Assuming the data field contains the event count
            } else {
                // If there was an error retrieving events, display the message
                $('.countOrders').text(response.message);
            }
        },
        error: function(xhr, status, error) {
            // If an error occurred in the request, display a generic error message
            $('.countOrders').text(0);
            
        }
    });

}

function countUser(){
    $.ajax({
        url: 'http://localhost:5147/api/Admain/countUser',  // API endpoint
        type: 'GET',  // GET method
        headers: {
            'accept': '*/*'  // Accept all responses
        },
        success: function(response) {
            // Check if the request was successful
            if (response.success) {
                // Update the stats for different periods

                // Update Customers
                $('#sales-today').text(response.data.customrerDay);   // Customers Today
                $('#sales-month').text(response.data.customrerMonth); // Customers This Month
                $('#sales-year').text(response.data.customrerYear);   // Customers This Year
                $('.customerCount').text(response.data.customrer);
                // Update Shops
                $('#shops-today').text(response.data.storeDay);   // Shops Today
                $('#shops-month').text(response.data.storeMonth); // Shops This Month
                $('#shops-year').text(response.data.storeYear);   // Shops This Year
                
                $('.StoresCount').text(response.data.store); 
                // Update Maintenance
                $('#maintenance-today').text(response.data.maintenancesDay);  // Maintenance Today
                $('#maintenance-month').text(response.data.maintenancesMonth); // Maintenance This Month
                $('#maintenance-year').text(response.data.maintenancesYear);  // Maintenance This Year
                $('.maintenancesCount').text(response.data.maintenances); 
                // Optionally, render a chart (using ApexCharts or other chart libraries)
                renderSalesChart(response.data);
            } else {
                // If the response indicates failure, display the message
                $('#sales-today').text(response.message);
            }
        },
        error: function(xhr, status, error) {
            // Handle error case
            console.error("Error fetching data:", error);
            $('#sales-today').text('Error loading data');
        }
    });
}
    // Function to render sales data chart (using ApexCharts or other chart libraries)
    function renderSalesChart(data) {
        var options = {
            series: [{
                name: 'Customer',
                data: [data.customrerDay, data.customrerMonth, data.customrerYear] // Customer series
            }, {
                name: 'Store',
                data: [data.storeDay, data.storeMonth, data.storeYear] // Shop series
            }, {
                name: 'maintenance',
                data: [data.maintenancesDay, data.maintenancesMonth, data.maintenancesYear] // Maintenance series
            }],
            chart: {
                height: 350,
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    endingShape: 'rounded',
                },
            },
            xaxis: {
                categories: ['Today', 'This Month', 'This Year'],
            },
            colors: ['#00E396', '#FF4560', '#3C8D40'],  // Different colors for each category
        };

        var chart = new ApexCharts(document.querySelector("#sales-overview"), options);
        chart.render();
    }
    function getOrderByShop(){
        $.ajax({
            url: 'http://localhost:5147/api/Admain/OrdersByShop' ,
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                if (response.success && response.data) {
                    const orders = response.data;

                    // Prepare chart data
                    const labels = orders.map(order => order.storeName ?? "Unspecified");
                    const data = orders.map(order => order.orderCount);

                    // Generate Pie Chart
                    const ctx = document.getElementById('myPieChart').getContext('2d');
                    new Chart(ctx, {
                        type: 'pie',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Orders per Shop',
                                data: data,
                                backgroundColor: [
                                  '#D21312', '#000000', '#DC143C', '#B22222',
                                  '#4B4B4B', '#2F2F2F', '#A9A9A9', '#696969','#FF3D3D', '#FF6B6B',
                                  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                                  '#9966FF', '#FF9F40', '#66FF66', '#FF66B2',
                                  '#66B2FF', '#D4A5A5'
                                ]
                            }]
                        },
                        options: {
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'right',
                                },
                                title: {
                                    display: true,
                                    text: 'Orders per Shop'
                                }
                            }
                        }
                    });

                    // Optionally display order details dynamically
                    let orderInfoHtml = '';
                    orders.forEach(function(order) {
                        orderInfoHtml += `
                            <div class="store-info">
                                <h5>${order.storeName}</h5>
                                <p>Order Count: ${order.orderCount}</p>
                            </div>
                        `;
                    });

                    // Insert dynamic data into the order-info div
                    $('#order-info').html(orderInfoHtml);

                } else {
                    console.log("No valid data found for chart.");
                }
            },
            error: function() {
                console.log('Failed to load data!');
            }
        });
    
    } 
   
    function BookingByMaintnanece(){

     
    $.ajax({
        url: 'http://localhost:5147/api/Admain/BookingByMaintnanece', // API URL
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response.success && response.data) {
                const bookings = response.data;
               const labels = bookings.map(booking => booking.maintenanceName ?? "Unspecified");
const data = bookings.map(booking => booking.bookingCount);

console.log("Labels: ", labels); // Check the labels
console.log("Data: ", data); // Check the data
                const ctx = document.getElementById('PieChart').getContext('2d');
                if (ctx) {
                    new Chart(ctx, {
                        type: 'pie',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Booking Count per Maintenance',
                                data: data,
                                backgroundColor: [
                                    '#D21312', '#000000', '#DC143C', '#B22222',
                                    '#4B4B4B', '#2F2F2F', '#A9A9A9', '#696969','#FF3D3D', '#FF6B6B',
                                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                                    '#9966FF', '#FF9F40', '#66FF66', '#FF66B2',
                                    '#66B2FF', '#D4A5A5'
                                ]
                            }]
                        },
                        options: {
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'right',
                                },
                                title: {
                                    display: true,
                                    text: 'Bookings per Maintenance'
                                }
                            }
                        }
                    });
                } else {
                    console.error('Chart element not found!');
                }

                // Optionally display booking details dynamically
                var bookingInfoHtml = '';
                bookings.forEach(function(booking) {
                    bookingInfoHtml += `
                        <div class="maintenance-info">
                            <h5>Maintenance Name: ${booking.maintenanceName}</h5>
                            <p>Booking Count: ${booking.bookingCount}</p>
                        </div>
                    `;
                });

                // Insert dynamic data into the booking-info div
                $('#booking-info').html(bookingInfoHtml);

            } else {
                console.log("No valid data found for chart.");
            }
        },
        error: function() {
            console.log('Failed to load data!');
        }
    });

    }

   