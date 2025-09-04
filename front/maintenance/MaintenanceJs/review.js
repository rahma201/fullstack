var maintenanceId = localStorage.getItem("maintenanceId");
    var reviewId ;
$(function() {
    fetchReviewData();
// When dislike button is clicked, show the modal
$(document).on("click",".dislike-btn", function () { 
     reviewId = $(this).data("id"); // Get the reviewId from the data-id attribute
    $("#dislikeModal").modal("show"); // Show the modal
});

// When the save button in the modal is clicked
$(".save-dislike").click(function () { 
    
    // Perform the AJAX call to delete the review
    $.ajax({
        url: 'http://localhost:5147/api/Maintenance/DeleteReviewMaintenanceByMaintenance',
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({
            reviewMaintenanceId: reviewId,
           maintenanceNeedDeletedReview: true,
           maintenanceReason: $("#dislikeReason").val() // Get the reason from the input field
        }),
        success: function(response) {
            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Review Deleted',
                    text: 'The review has been successfully deleted from the store.',
                    confirmButtonText: 'OK'
                }).then(() => {
                    $("#dislikeModal").modal("hide"); // Hide the modal after success
                    GetAllReviewsByShop(shopId); // Refresh reviews
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Deletion Failed',
                    text: response.message || 'Something went wrong while deleting the review.',
                    confirmButtonText: 'OK'
                });
            }
        },
        error: function(xhr, status, error) {
            Swal.fire({
                icon: 'error',
                title: 'Request Error',
                text: xhr.responseText || 'An unexpected error occurred!',
                confirmButtonText: 'OK'
            });
        }
    });
});
});



// Fetch reviews from the API
function fetchReviewData() {
    $.ajax({
        url: `http://localhost:5147/api/Shared/GetReviewMaintenance/$` + maintenanceId,
        type: 'GET',
        dataType: 'json', // Make sure the data returned is in JSON format
        success: function(response) {
            console.log(response.data); // Handle the data sent from the API
            
            // Clear the current reviews before appending new ones
            $("#reviewCard").empty();
            
            // Loop through each review in the response data
            response.data.forEach(function(review) {
                // Dynamically generate the rating stars
                var stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

                var html = `
                    <div class="card review-card p-3">
                        <div class="card-body d-flex flex-column justify-content-center align-items-center">
                            <h5 class="card-title">${review.maintenance.maintenanceName}</h5>

                            <!-- Star Rating -->
                            <div class="mb-2">
                                <span class="text-warning fs-4">${stars}</span>
                            </div>

                            <!-- Comment -->
                            <div class="comment-text">
                                ${review.comment}
                            </div>

                            <!-- Dislike Button (Icon) -->
                            <button class="btn btn-success dislike-btn"  data-id="${review.reviewMaintenanceId}">
                                <i class="fa-solid fa-thumbs-down"></i>
                            </button>
                        </div>
                    </div>
                `;

                // Append each review to the review card container
                $("#reviewCard").append(html);
            });
        },
        error: function(error) {
            console.error('Error fetching review data:', error);
        }
    });
}