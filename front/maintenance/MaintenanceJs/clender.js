$(function() {
    // Initialize FullCalendar
    
   var maintenanceId = localStorage.getItem("maintenanceId");
$('#calendar').fullCalendar({
defaultView: 'month', 
events: function(start, end, timezone, callback) {
$.ajax({
url: 'http://localhost:5147/api/Maintenance/GetAllBookingAcceptforMantaince/'+maintenanceId,  // Your actual API endpoint
type: 'GET',
dataType: 'json',
success: function(response) {
if (response.success) {
var events = [];
$.each(response.data, function(index, booking) {
if (booking.date && booking.title) {
// Ensure the event is in the selected month
var eventDate = moment(booking.date);
                                        // Only add the event if it is in the selected month
events.push({
title: booking.title,
start: eventDate.toISOString(),  // Convert date to ISO string
description: booking.customerNote || 'No description',  // Default description
location: booking.location || 'No location',  // Default location
customerId: booking.customerId,
maintenanceType: booking.statusBookingMaintenance,
imageUrl: booking.imageUrl || ''  ,
price: booking.totalPrice || ''  ,
customerNote: booking.customerNote || ''  ,
adminDescription: booking.maintenanceNote || ''  ,bikeType: booking.bikeType || ''  ,

});
}
                                    
});
callback(events);  // Pass events to the calendar
} else {
console.log('No events found in response');
}
},
error: function(error) {
console.log('Error fetching bookings:', error);
}
});
},
header: {
left: 'prev,next today',
center: 'title',
right: 'month'  // Only show the month view
},
editable: true,
droppable: true,
// Handle day click (no functionality as we're only showing the month view)
dayClick: function(date, jsEvent, view) {
alert('You clicked on: ' + date.format());  // Display the clicked date
},
// Optional: Prevent view change to week or day view
viewRender: function(view, element) {
if (view.name !== 'month') {
// Switch back to month view if any other view is selected
$('#calendar').fullCalendar('changeView', 'month');
}
},

                // Optional: Handle event clicks
eventClick: function(event, jsEvent, view) {
openBookingModal(event) ; // Displays the clicked event's title
                }
});




 
        });function openBookingModal(bookingData) {
    // Example data (replace this with your dynamic data or API response)
   

    // Populate the modal with the data
    $('#name-booking').val(bookingData.title);
    $('#preferred-date').val(bookingData.date);
    $('#motorcycle-type').val(bookingData.bikeType);
    $('#maintenance-type').val(bookingData.maintenanceType);
    $('#location').val(bookingData.location);
    $('#maintenance-price').val(bookingData.price);
    $('#motorcycle-image').attr('src', `http://localhost:5147${bookingData.imageUrl}`);
    $('#customer-note').val(bookingData.description);
    $('#admin-description').val(bookingData.adminDescription);

    // Show the modal
    $('#bookingModal').modal('show');
  }