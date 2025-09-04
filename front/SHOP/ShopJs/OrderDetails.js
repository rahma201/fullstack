// ====================================================================
// SECTION: Global Variables & Initial Setup
// ====================================================================
var customerId = localStorage.getItem("customerId") || "DUMMY_CUSTOMER_789";

$(function() {
    var orderId = localStorage.getItem("orderId") || "DUMMY-ORD-001";
    if (orderId) {
        getOrderDetails(orderId);
    } else {
        console.error("Order ID not found in localStorage.");
        Swal.fire("Error", "Could not find Order ID to load details.", "error");
    }

    // Review Modal Setup & Variables (Updated for Stars)
    const reviewModal = $('#reviewModal');
    const closeBtn = $('.close-modal-btn');
    const starContainer = reviewModal.find('.stars');
    const commentTextArea = $('#reviewComment');
    const submitBtn = $('#submitReviewBtn');
    const modalProductIdField = $('#modalProductId');
    const modalMotorcycleIdField = $('#modalMotorcycleId');
    const modalStoreIdField = $('#modalStoreId');

    let selectedRating = 0;
    let currentOrderItemId = null;

    // Review Button Click Handler (Opens Modal)
    $('#ListOfItemInCart').on("click", ".review", function() {
        const motorcycleId = $(this).attr("data-motorcycle");
        const productId = $(this).attr("data-product");
        const button = $(this);
        currentOrderItemId = button.data("id");
        const storeId = button.attr("data-store-id");

        modalProductIdField.val(productId || '');
        modalMotorcycleIdField.val(motorcycleId || '');
        modalStoreIdField.val(storeId || '');

        selectedRating = 0;
        starContainer.children('div').removeClass('selected-rating');
        commentTextArea.val('');
        submitBtn.prop('disabled', false).text('Send Review');
        reviewModal.show();
    });

    // Modal Interaction Logic (Rating, Close, Submit)
    closeBtn.on('click', function() {
        reviewModal.hide();
    });

    $(window).on('click', function(event) {
        if ($(event.target).is(reviewModal)) {
            reviewModal.hide();
        }
    });

    // Star Rating Interaction: Hover & Click
    starContainer.on('mouseenter', 'div', function() {
        const rating = parseInt($(this).data('rating'));
        highlightStars(rating);
    });

    starContainer.on('mouseleave', function() {
        highlightStars(selectedRating);
    });

    starContainer.on('click', 'div', function() {
        selectedRating = parseInt($(this).data('rating'));
        highlightStars(selectedRating);
        console.log("Rating selected:", selectedRating);
    });

    function highlightStars(rating) {
        starContainer.children('div').each(function() {
            const starRating = parseInt($(this).data('rating'));
            if (starRating <= rating) {
                $(this).addClass('selected-rating');
            } else {
                $(this).removeClass('selected-rating');
            }
        });
    }

    // Handle Review Submission (AJAX POST to Backend)
    submitBtn.on('click', function() {
        const comment = commentTextArea.val().trim();
        const productId = modalProductIdField.val();
        const motorcycleId = modalMotorcycleIdField.val();
        const storeId = modalStoreIdField.val();

        if (selectedRating === 0) {
            Swal.fire('Rating Required', 'Please select a rating by clicking a star.', 'warning');
            return;
        }
        if (!customerId) {
            Swal.fire('Error', 'Could not identify user. Please log in again.', 'error');
            return;
        }

        submitBtn.prop('disabled', true).text('Sending...');

        const reviewData = {
            comment: comment,
            rating: selectedRating,
            customerId: parseInt(customerId),
            productId: productId ? parseInt(productId) : null,
            motorcycleId: motorcycleId ? parseInt(motorcycleId) : null,
            storeId: parseInt(storeId)
        };

        console.log("Submitting review data (dummy - no actual call):", reviewData);

        // Simulate API Call Success (remove for real usage)
        setTimeout(function() {
            reviewModal.hide();
            const reviewCell = $(`#review-cell-${currentOrderItemId}`);
            if (reviewCell.length > 0) {
                reviewCell.html('<span class="review-thank-you" style="color: green; font-weight: bold;">Thanks for your review!</span>');
            }
            Swal.fire('Success!', 'Your review has been submitted (Simulated).', 'success');
        }, 800);

        // Uncomment for real AJAX call
       
        $.ajax({
            url: 'http://localhost:5147/api/Customer/AddReview',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(reviewData),
            success: function(response) {
                if (response.success) {
                    reviewModal.hide();
                    const reviewCell = $(`#review-cell-${currentOrderItemId}`);
                    if (reviewCell.length > 0) {
                        reviewCell.html('<span class="review-thank-you" style="color: green; font-weight: bold;">Thanks for your review!</span>');
                    }
                    Swal.fire({
                        title: 'Success!',
                        text: response.message || 'Your review has been submitted.',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    });
                } else {
                    Swal.fire('Submission Failed', response.message || 'Could not save the review. Please try again.', 'error');
                    submitBtn.prop('disabled', false).text('Send Review');
                }
            },
            error: function(xhr, status, error) {
                Swal.fire('Request Error', 'An error occurred while sending your review. Please try again.', 'error');
                submitBtn.prop('disabled', false).text('Send Review');
            }
        });
     
    });
});

// ====================================================================
// SECTION: Function to Get Order Details (No Changes)
// ====================================================================
function getOrderDetails(orderId) {
    $.ajax({
        url: `http://localhost:5147/api/Customer/GetOrderDetails/$` + orderId,
        type: "GET",
        contentType: "application/json",
        success: function(response) {
            if (response.success && response.data) {
                let tableBody = $("#ListOfItemInCart");
                tableBody.empty();

                let order = response.data.order;
                let orderItems = response.data.orderItems;
                $(".orderId").html(order.orderId);
                let date = new Date(order.recivingDate);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const formatted = `${year}-${month}-${day}`;
                $(".orderDate").html(formatted);

                orderItems.forEach(item => {
                    console.log(item)
                    if(item.statusDelivery){
                    let reviewButton = `
                        <button data-store-id="${item.storeId}" 
                                data-product="${item.product?.productId}"  
                                data-motorcycle="${item.motorcycle?.motorcycleId}" 
                                data-id="${item.orderItemId}" 
                                class="btn btn-primary review">
                                <i class="fa-solid fa-star" style="color:#D21312"></i>
                        </button>`;

                    let row = `
                        <tr>
                            <td class="column-1"><img src="http://localhost:5147${item.product?.images || item.motorcycle?.images}" alt="Product Image" width="50"></td>
                            <td class="column-1">${item.product?.name || item.motorcycle?.name}</td>
                            <td class="column-2">$${item.price.toFixed(2)}</td>
                            <td class="column-3">${item.size || ''} <span class="circle" style="background-color: ${item.color};"></span></td>
                            <td class="column-4">${item.quantity}</td>
                            <td class="column-5">$${(item.price * item.quantity).toFixed(2)}</td>
                            <td class="column-6" id="review-cell-${item.orderItemId}">${reviewButton}</td>
                        </tr>
                    `;  tableBody.append(row);}
                    else{
                   let row = `
                        <tr>
                            <td class="column-1"><img src="http://localhost:5147${item.product?.images || item.motorcycle?.images}" alt="Product Image" width="100"></td>
                            <td class="column-1">${item.product?.name || item.motorcycle?.name}</td>
                            <td class="column-2">$${item.price.toFixed(2)}</td>
                            <td class="column-3">${item.size || ''} <span class="circle" style="background-color: ${item.color};"></span></td>
                            <td class="column-4">${item.quantity}</td>
                            <td class="column-5">$${(item.price * item.quantity).toFixed(2)}</td>
                            <td class="column-6" id="review-cell-${item.orderItemId}">Wait to receive your 
                            order then addd a review </td>
                        </tr>
                    `;  tableBody.append(row);}
                });
            } else {
                Swal.fire({
                    title: "Order Not Found",
                    text: `No details found for order ID ${orderId}.`,
                    icon: "info",
                    confirmButtonText: "OK"
                });
            }
        },
        error: function(err) {
            Swal.fire({
                title: "Error",
                text: "Failed to retrieve order details.",
                icon: "error",
                confirmButtonText: "OK"
            });
            console.error("Error:", err);
        }
    });
}
