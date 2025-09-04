
$(function(){
    GetDeletebyAdmainReview();
      GetDeleteReviewMaintenance();
    $(document).on('click', '.open-review', function () {
        let username = $(this).data("username");
        let comment = $(this).data("comment");
        let itemName = $(this).data("itemname");
        let itemImage = $(this).data("itemimage");
    
        $("#modalUserName").text(username);
        $("#modalItemName").text(itemName);
        $("#modalComment").text(comment);
    
        $("#reviewModal").modal("show");
    });
    $(document).on('click', '.remove-note', function () {
        let reviewId = $(this).data("reviewid");
    
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to delete this review?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: `http://localhost:5147/api/Admain/DeleteReviewByAdmain`,
                    type: "PUT",
                    data: JSON.stringify({ reviewId: reviewId }), // إرسال الـ id في الجسم إذا الـ API يحتاجه
                    contentType: "application/json",
                    success: function (response) {
                        Swal.fire("Deleted!", "The review has been deleted.", "success");
                        GetDeletebyAdmainReview(); // refresh list
                    },
                    error: function () {
                        Swal.fire("Error!", "Failed to delete the review.", "error");
                    }
                });
            }
        });
    });
        

    $(document).on('click', '.open-maintenance-review', function () {
        let username = $(this).data("username");
        let comment = $(this).data("comment");
        let maintenanceName = $(this).data("maintenancename");
        let maintenanceImage = $(this).data("maintenanceimage");

        $("#modalUserName").text(username);
        $("#modalItemName").text(maintenanceName);
        $("#modalComment").text(comment);

        $("#reviewModal").modal("show");
    });

    $(document).on('click', '.remove-maintenance-review', function () {
        let reviewMaintenanceId = $(this).data("reviewmaintenanceid");

        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to delete this maintenance review?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: `http://localhost:5147/api/Admain/DeleteReviewMaintenanceByAdmain`,
                    type: "PUT",
                    data: JSON.stringify({ reviewMaintenanceId: reviewMaintenanceId }),
                    contentType: "application/json",
                    success: function (response) {
                        Swal.fire("Deleted!", "The maintenance review has been deleted.", "success");
                         $(".review").empty();
                        GetDeleteReviewMaintenance(); // refresh list
                    },
                    error: function () {
                        Swal.fire("Error!", "Failed to delete the maintenance review.", "error");
                    }
                });
            }
        });
    });
});


function GetDeletebyAdmainReview() {
    $.ajax({
        url: `http://localhost:5147/api/Admain/GetDeleteReviewbyAdmain`, 
        type: "GET",
        contentType: "application/json",
        success: function (response) {
            if (response.success) {
                let tableBody = $(".review");
                tableBody.empty(); // مسح الجدول قبل إضافة بيانات جديدة

                response.data.forEach(review => {
                    let row = `
                                <div class="col-md-4 single-note-item all-category">
                                <div class="card card-body">
                                    <span class="side-stick"></span>
                                    <h6 class="note-title text-truncate w-75 mb-0" data-noteHeading="Book a Ticket for Movie">${review.storeName}</h6>
                                    <p class="note-date fs-2">${formatDate(review.createAt)}</p>
                                    <div class="note-content">
                                        <p class="note-inner-content" data-noteContent="Blandit tempus porttitor aasfs. Integer posuere erat a ante venenatis."> 
${review.storeNeedDeletedReview}                                        
                                        </p>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <a class="link me-1 open-review"
   data-username="${review.userName}"
   data-comment="${review.comment}"
   data-itemname="${review.itemName}"
   data-itemimage="${review.itemImage}">
    <i class="ti ti-star fs-4 review"></i>
</a>
<a class="link text-danger ms-2 remove-note"
   data-reviewid="${review.reviewId}">
    <i class="ti ti-trash fs-4"></i>
</a>

                                    
                                               
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    `;
                    tableBody.append(row);
                });
            } 
        },
        error: function (err) {
        
            console.log("Error:", err);
        }
    });
}

function GetDeleteReviewMaintenance() {
    $.ajax({
        url: `http://localhost:5147/api/Admain/GetDeleteReviewMaintenancebyAdmain`,
        type: "GET",
        contentType: "application/json",
        success: function (response) {
            if (response.success) {
                let tableBody = $(".review");
           var  data=    response.data
                // Ensure data exists and loop through the reviews
               data.forEach(review => {
                    let row = `
                        <div class="col-md-4 single-note-item all-category">
                            <div class="card card-body">
                                <span class="side-stick bg-warning"></span>
                                <h6 class="note-title text-truncate w-75 mb-0">${review.maintenance.maintenanceName}</h6>
                                <p class="note-date fs-2">${formatDate(review.createdAt)}</p>
                                <div class="note-content">
                                    <p class="note-inner-content">${review.comment}</p> <!-- Use review.comment instead of review.reviewText -->
                                </div>
                                <div class="d-flex align-items-center">
                                    <a class="link me-1 open-maintenance-review"
                                        data-username="${review.customer.username}"
                                        data-comment="${review.comment}"
                                        data-maintenancename="${review.maintenance.maintenanceName}"
                                        data-maintenanceimage="${review.maintenance.maintenanceImage}">
                                        <i class="ti ti-eye fs-4 review"></i>
                                    </a>
                                    <a class="link text-danger ms-2 remove-maintenance-review"
                                        data-reviewmaintenanceid="${review.reviewMaintenanceId}">
                                        <i class="ti ti-trash fs-4"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    `;
                    tableBody.append(row);
                });
            } else {
                Swal.fire("Error!", "No reviews found.", "error");
            }
        },
        error: function (err) {
            console.error("Error:", err);
        }
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // الشهور تبدأ من 0
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}
