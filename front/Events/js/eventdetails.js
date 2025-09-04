    const eventId = localStorage.getItem("eventDetailsId")
    var customerId =localStorage.getItem("customerId")||0;
$(function() {

        getEventDetails(eventId); // جلب تفاصيل الحدث باستخدام AJAX
    

 

    // التعامل مع زيادة و نقصان التذاكر
    $('.decrease-ticket').on('click', function() {
        let countInput = $('.ticket-count');
        let count = parseInt(countInput.val());
        if (count > 1) {
            countInput.val(count - 1);
        }
    });

    $('.increase-ticket').on('click', function() {
        let countInput = $('.ticket-count');
        let count = parseInt(countInput.val());
        countInput.val(count + 1);
    });

    // التعامل مع زر "انضمام للحدث"
    $('#joinEventBtn').on('click', function() {
        handleJoinEvent();
    });

 
});
 function handleJoinEvent() {
       // الحصول على معرف المستخدم (يجب أن يكون مسجل دخول)
if (!customerId || customerId === "0") {
    Swal.fire({
        icon: 'warning',
        title: 'You must be logged in!',
        text: 'You must be logged in to join the event.',
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed) {
            // Show the login modal when "OK" is clicked
            $('.LoginModal').modal('show');
        }
    });
    
}else{


        const ticketCount = parseInt($('.ticket-count').val());
        const ticketData = {
            userId: customerId,
            eventId: eventId,
           numberOfGuest: ticketCount  // لأن المستخدم يتم حسابه كـ 1
        };

        $.ajax({
            url: `http://localhost:5147/api/Admain/JoinEvents`, // API للانضمام للحدث
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(ticketData),
            success: function(response) {
               if (response.success) {
    Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Successfully joined the event!',
    });
} else {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to join the event: ' + response.message,
    });
}

            },
            error: function(xhr, status, error) {
                console.error('Error joining event:', status, error);
Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to join the event: ' + response.message,
    });            }
        });
    }

  }  // جلب تفاصيل الحدث
    function getEventDetails(eventId) {

        $.ajax({
            url: `http://localhost:5147/api/Admain/GetEventById/`+eventId, // API لجلب تفاصيل الحدث
            type: 'GET',
            success: function(response) {
                if (response.success) {
                    displayEventDetails(response.data[0]); // عرض تفاصيل الحدث في الصفحة
                } else {
                    console.error("Failed to load event details:", response.message);
                    $('#eventPageTitle').text('Event Details Not Available');
                    $('.single-event').html('<div class="container"><h2 class="text-danger text-center mt-5">Event details not found.</h2></div>');
                }
            },
            error: function(xhr, status, error) {
                console.error("Error fetching event details:", status, error);
                $('#eventPageTitle').text('Error Loading Event');
            }
        });
    }
    
    // عرض تفاصيل الحدث في الصفحة
    function displayEventDetails(event) {
       $('#title').text(event.title || 'N/A');
    $('#date').text(formatEventDateTime(event.time)); // Format the date

    // Display additional event details
    $('#StartRouts').text(event.startRouts || 'N/A');
    $('#endRouts').text(event.endRouts || 'N/A');
    $('#price').text(`${event.price}` || 'N/A');
    
    // Display additional data
    $('#maxParticipaion').text(event.maxParticipaion || 'N/A');
    $('#eventType').text(event.eventType || 'N/A');
    $('#haveTrollyProvider').text(event.haveTrollyProvider ? 'Yes' : 'No');
    $('#isApproved').text(event.isApproved ? 'Approved' : 'Not Approved');
    
        // عرض الوصف في التبويب 'Description'
        $('.description').text(event.description || 'No description available.');
    }

    // تنسيق تاريخ بدء الحدث
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
            return isoString; // في حالة فشل التنسيق، إرجاع النص الأصلي
        }
    }
