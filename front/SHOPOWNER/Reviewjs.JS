
$(document).ready(function () {
    var produactId = localStorage.getItem("produactIdreview") || 0;
    var reviewis = localStorage.getItem("reviewis");
var MotoId = localStorage.getItem("MotoIdreview") || 0;
if (reviewis==="product") {
    console.log("Loading reviews for product...");
  GetAllReviewsByShopProduct(produactId);
} 
else 
{  GetAllReviewsByShop(MotoId);
    }
    console.log("Loading reviews...");
    $(document).on("click",".deleteReview",function(){
        $("#dislikeModal").modal("show");
         reviewId = $(this).data("id");

        console.log("Delete review button clicked");
    });
    $(".save-dislike").click(function () {
        $.ajax({
            url: 'http://localhost:5147/api/ShopOwner/DeleteReviewByStore',
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
                reviewId: reviewId,
                storeNeedDeletedReview: true,
                storeReason: $("#dislikeReason").val()
            }),
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Review Deleted',
                        text: 'The review has been successfully deleted from the store.',
                        confirmButtonText: 'OK'
                    });
                    GetAllReviewsByShop(shopId); // Refresh reviews
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
    
        $("#dislikeModal").modal("hide"); // Hide the modal
    });
});


function GetAllReviewsByShop(MotoId) {
    console.log("Loading reviews for shop...");
    $("#reviewList").empty();


    // إرسال طلب للحصول على المراجعات من الـ API
    $.ajax({
        url: 'http://localhost:5147/api/Shared/GetAllReviewForThisMoto/'+MotoId,
        method: 'GET',
      
        success: function (response) {
            console.log("API Response:", response);

            // التأكد من أن البيانات موجودة
            if (response.success) {
                // إزالة المراجعات القديمة في حالة وجودها

                // استعراض البيانات وإضافتها إلى الـ HTML
                response.data.forEach(function(review) {
                    const reviewHtml = `
                <div class="card review-card p-3" style="width: 18rem;">
                    <div class="card-body d-flex flex-column justify-content-center align-items-center">
                        <div class="review-header text-center">
                            <h5>${review.customer.username}</h5>
                            <p> ${renderStars(review.rating)} </p>
                        </div>
                        <p><strong>Product: </strong>${review.motorcycle.name}</p>
                        <p><strong>Comment: </strong>${review.comment || "No comment"}</p>
                        <button class="btn btn-danger deleteReview" data-id="${review.reviewId}">
                            <i class="fa-solid fa-trash"></i> Delete
                        </button>
                    </div>
                </div>

                    `;

                    // إضافة المراجعة إلى الـ HTML
                    $("#reviewList").append(reviewHtml);
                    localStorage.removeItem("MotoIdreview") 

                });

             
                // إضافة وظيفة لحذف المراجعة عند الضغط على "حذف"
         
            } else {
                Swal.fire("Error!", `Failed to load reviews. `, "error");
                localStorage.removeItem("MotoIdreview") 
            }
        },
        error: function (xhr, status, error) {
            Swal.fire("Error!", `Failed to load reviews. Status: ${xhr.status}`, "error");

            localStorage.removeItem("MotoIdreview") 
        }
    });
}



function GetAllReviewsByShopProduct(produactId) {
    console.log("Loading reviews for shop...");
    $("#reviewList").empty();

    // إرسال طلب للحصول على المراجعات من الـ API
    $.ajax({
        url: 'http://localhost:5147/api/Shared/GetAllReviewForThisProd/'+produactId,
        method: 'GET',
      
        success: function (response) {
            console.log("API Response:", response);

            // التأكد من أن البيانات موجودة
            if (response.success) {
                // إزالة المراجعات القديمة في حالة وجودها

                // استعراض البيانات وإضافتها إلى الـ HTML
                response.data.forEach(function(review) {
                    const reviewHtml = `
                <div class="card review-card p-3" style="width: 18rem;">
                    <div class="card-body d-flex flex-column justify-content-center align-items-center">
                        <div class="review-header text-center">
                            <h5>${review.customer.username}</h5>
                            <p> ${renderStars(review.rating)} </p>
                        </div>
                        <p><strong>Product: </strong>${review.motorcycle.name}</p>
                        <p><strong>Comment: </strong>${review.comment || "No comment"}</p>
                        <button class="btn btn-danger deleteReview" data-id="${review.reviewId}">
                            <i class="fa-solid fa-trash"></i> Delete
                        </button>
                    </div>
                </div>

                    `;

                    // إضافة المراجعة إلى الـ HTML
                    $("#reviewList").append(reviewHtml);
                    localStorage.removeItem("produactIdreview");
                    localStorage.removeItem("reviewis");
                });

             
                // إضافة وظيفة لحذف المراجعة عند الضغط على "حذف"
         
            } else {
                Swal.fire("Error!", `Failed to load reviews. `, "error");
                localStorage.removeItem("produactIdreview");
                localStorage.removeItem("reviewis");
            }
        },
        error: function (xhr, status, error) {
            Swal.fire("Error!", `Failed to load reviews. Status: ${xhr.status}`, "error");

            localStorage.removeItem("produactIdreview");
            localStorage.removeItem("reviewis");
        }
    });


}
function renderStars(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHtml += '<span style="color: gold;">★</span>'; // Filled star
        } else {
            starsHtml += '<span style="color: lightgray;">★</span>'; // Empty star
        }
    }
    return starsHtml;
}
