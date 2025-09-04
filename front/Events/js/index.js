$(function() {

    getAllNewEvent();
    getAllOldEvent();
    // --- Configuration ---
    const API_BASE_URL = 'http://localhost:5147/api/Admain/'; // Example: Adjust path if needed

    // --- Initialize Swipers ---
    let regionalSwiper = null;
    if ($('.homepage-regional-events-slider').length > 0) {
        regionalSwiper = new Swiper('.homepage-regional-events-slider', {
            slidesPerView: 3,
            spaceBetween: 30,
            loop: false,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
        console.log("Regional Swiper Initialized");
    }

   


    // --- Logout Functionality ---
    $(document).on('click', '#logout-link', function(e) {
        e.preventDefault();
        localStorage.removeItem('jwtToken'); // Clear the token
        sessionStorage.removeItem('jwtToken'); // Clear from session storage too, just in case
        alert("You have been logged out.");
        window.location.href = '/home.html'; // Redirect to home or login page
    });

   $(document).on('click', '#detalis', function(e) {
     var eventId = $(this).data("id"); 
    localStorage.setItem("eventDetailsId",eventId) ;   
        window.location.href = '/Events/eventdetails.html'; // Redirect to home or login page

    });


$.ajax({
  url: 'http://localhost:5147/api/Admain/GetAllNewEvents',
  method: 'GET',
  dataType: 'json',
  success: function(response) {
    console.log(response); // Log the response to check the structure

    // Check if the response has events
    if (response.data && response.data.length > 0) {
      const closestEvent = getClosestEvent(response.data);
      if (closestEvent) {
        setupEventCountdown(closestEvent);
      } else {
        console.log('No valid future events found.');
      }
    } else {
      console.log('No events found or the array is empty');
    }
  },
  error: function(xhr, status, error) {
    console.error('Error fetching data from API:', error);
  }
});

}); 


// --- Helper Functions ---
function displayError(containerSelector, message) {
    console.error("API Error:", message);
    $(containerSelector).html(`<p class="error-message">Error loading events: ${message}. Please try again later.</p>`);
}




function createRegionalEventSlideHtml(event) {
    const placeholderImage = 'images/event-slider-placeholder.jpg';
    const imageUrl = event.imageUrl || placeholderImage;
    const formattedDate = formatDate(event.time);
    return `
        <div class="swiper-slide">
            <figure>
                <img src="${imageUrl}" alt="${event.title || 'Event Image'}">
                <a class="event-overlay-link flex justify-content-center align-items-center" href="#">+</a>
            </figure>
            <div class="entry-header">
                <h2 class="entry-title">${event.title || 'Event Title'}</h2>
            </div>
            <div class="entry-footer">
                <div class="posted-date">${formattedDate}</div>
            </div>
        </div>
    `;
}




function getAllNewEvent() {
    $.ajax({
        url: "http://localhost:5147/api/Admain/GetAllNewEvents",
        type: "GET",
        contentType: "application/json",
        success: function(response) {
            console.log(response);  // Log the response to check its structure
        
            $("#next-events-container").empty();
            var html = '';

            // Loop through the events data
            $.each(response.data, function(index, event) {
                // Log the event to see its structure
                console.log("event", event);  // This will properly log the event object
                
                // Ensure you format the event time correctly
                let formattedDate = formatDate(event.time);

                // Construct the HTML for each event
                html += `
                <div class="col-12 col-sm-6 col-md-4">
                    <div class="next-event-wrap">
                        <figure>
                            <a href="#">
                                <img src="images/nextphoto.jpg" alt="${event.title || 'Event Image'}">
                            </a>
                        </figure>
                        <header class="entry-header">
                            <h3 class="entry-title">${event.title}</h3>
                            <div class="posted-date">${formattedDate}</div>
                        </header>
                       
                        <footer class="entry-footer">
                            <a class="Details" id="detalis" data-id=${event.id}>Details</a>
                        </footer>
                    </div>
                </div>`;
            });

            // Append the generated HTML to the container
            $("#next-events-container").html(html);
        },
        error: function(err) {
            console.log("Cannot get events:", err);
        }
    });
}
function getAllOldEvent() {
    $.ajax({
        url: "http://localhost:5147/api/Admain/GetAllOldEvents",
        type: "GET",
        contentType: "application/json",
        success: function(response) {
            console.log(response);  // Log the response to check its structure
        
            $("#old-events-container").empty();
            var html = '';

            // Loop through the events data
            $.each(response.data, function(index, event) {
                // Log the event to see its structure
                console.log("event", event);  // This will properly log the event object
                
                // Ensure you format the event time correctly
                let formattedDate = formatDate(event.time);

                // Construct the HTML for each event
                if(index%2===0){
                html += `
                <div class="swiper-slide" data-swiper-slide-index="0" style="width: 202px; margin-right: 20px;">
                            <figure>
                                <img src="images/event-slider-1.png" style="width:100%"  alt="">

                                <a class="event-overlay-link flex justify-content-center align-items-center" href="#">+</a>
                            </figure><!-- .hero-image -->

                            <div class="entry-header">
                                <h2 class="entry-title">${event.title}</h2>
                            </div><!--- .entry-header -->

                            <div class="entry-footer">
                                <div class="posted-date">${formattedDate}</div>
                            </div><!-- .entry-footer" -->
                        </div>`;
     }          else{
        html += `
        <div class="swiper-slide" data-swiper-slide-index="0" style="width: 202px; margin-right: 20px;">
                    <figure>
                        <img src="images/event-slider-2.jpg" style="width:100%" alt="">

                        <a class="event-overlay-link flex justify-content-center align-items-center" href="#">+</a>
                    </figure><!-- .hero-image -->

                    <div class="entry-header">
                        <h2 class="entry-title">${event.title}</h2>
                    </div><!--- .entry-header -->

                    <div class="entry-footer">
                        <div class="posted-date">${formattedDate}</div>
                    </div><!-- .entry-footer" -->
                </div>`;
}      });

            // Append the generated HTML to the container
            $("#old-events-container").html(html);
        },
        error: function(err) {
            console.log("Cannot get events:", err);
        }
    });
}function getClosestEvent(events) {
  const now = new Date();
  let closestEvent = null;
  let closestTimeDiff = Infinity;

  // Loop through events to find the closest one
  events.forEach(event => {
    // Log the event date to check format
    console.log('Event date:', event.time);
    
    const eventDate = new Date(event.time); // Assuming event.date is a valid date string

    if (isNaN(eventDate)) {
      console.error('Invalid date format for event:', event);
      return; // Skip invalid dates
    }

    const timeDiff = eventDate - now;
    if (timeDiff > 0 && timeDiff < closestTimeDiff) {
      closestEvent = event;
      closestTimeDiff = timeDiff;
    }
  });

  return closestEvent;
}

function setupEventCountdown(event) {
  const eventDate = new Date(event.time);
    localStorage.setItem("eventDetailsId",event.id) ;   


  // Set the button's href to the event details page
  $('#detalis').attr('href', `/Events/eventdetails.html`);
  const countdown = setInterval(function() {
    const now = new Date();
    const timeRemaining = eventDate - now;

    // If the event has passed, stop the countdown
    if (timeRemaining <= 0) {
      clearInterval(countdown); // Stop the countdown when the event has started
      console.log('Event has started!');
      return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Update the countdown timer on the webpage
    $('.dday').text(days);
    $('.dhour').text(hours);
    $('.dmin').text(minutes);
    $('.dsec').text(seconds);
  }, 1000);
}

// Function to format the date (assuming the event.time is a valid ISO string)
function formatDate(dateString) {
    if (!dateString) return 'Date not available';
    try {
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options); 
    } catch (e) {
        console.error("Error formatting date:", e);
        return dateString;
    }
}
