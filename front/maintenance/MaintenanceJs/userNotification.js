const BookingUserId = localStorage.getItem("BookingUserId");
var userId=localStorage.getItem("customerId");
$(function () {
    fetchAllNotifications(BookingUserId);

    $('#allNotificationsTab').on('click', function () {
        fetchAllNotifications(BookingUserId);
    });

    $('#favoriteNotificationsTab').on('click', function () {
        fetchFavoriteNotifications(BookingUserId);
    });

    $('#rejectedNotificationsTab').on('click', function () {
        fetchRejectedNotifications(BookingUserId);
    });

    // التعامل مع أزرار الإعجاب، عدم الإعجاب، القلب داخل كل الإشعارات
    $('#allNotifications').on('click', '.btn-like', function () {
        const id = $(this).data('id');
        handleAccept(id);
    });
    $('#allNotifications').on('click', '.btn-dislike', function () {
        const id = $(this).data('id');
        handleReject(id);
    });
    $('#allNotifications').on('click', '.btn-heart', function () {
        const id = $(this).data('id');
        handleHeart(id);
    });

    // زر الحذف في المفضلة
    $('#favoriteNotifications').on('click', '.btn-delete', function () {
        const id = $(this).data('id');
        handleDelete(id);
    });
});

function fetchAllNotifications(id) {
    const container = $('#allNotifications');
    container.empty();

    $.ajax({
        url: `http://localhost:5147/api/Customer/GetAllNotificationNotReplayCustomer/${id}`,
        method: 'GET',
        success: function (response) {
            if (response && response.data && Array.isArray(response.data)) {
                $.each(response.data, function(index, item) {

                    container.append(`
                      <div class="col-md-4">
                        <div class="card shadow-sm rounded-4 border-0 mb-3">
                          <div class="card-body">
                            <div>
                             <input type="text" class="form-control form-control-sm rounded-3" value="${item.maintenance != null && item.maintenance.maintenanceName ? item.maintenance.maintenanceName : ' '}" readonly>
                                <span id="Location">${item.maintenance != null && item.maintenance.location ? item.maintenance.location : ' '}</span>

                              <span id="date">${formatDate(item.createAt)}</span>
                            </div>
                            <div>
                              <label class="form-label small text-muted">Workshop Note</label>
                              <textarea class="form-control form-control-sm rounded-3" rows="2" readonly>${item.maintenanceNote || ''}</textarea>
                            </div>
                            <div>
                              <label class="form-label small text-muted">Price</label>
                              <input type="text" class="form-control form-control-sm rounded-3" value="${item.price}" readonly>
                            </div>
                            <div class="d-flex justify-content-end align-items-center gap-3">
                              <button class="btn btn-sm btn-outline-success rounded-pill btn-like" data-id="${item.id}">👍</button>
                              <button class="btn btn-sm btn-outline-danger rounded-pill btn-dislike" data-id="${item.id}">👎</button>
                              <button class="btn btn-sm btn-outline-danger rounded-pill btn-heart" data-id="${item.id}">❤️</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    `);
                });
            } else {
                container.append('<p>No notifications found.</p>');
            }
        },
        error: function (error) {
            console.log('There was an error fetching the notifications:', error);
            container.append('<p>There was an error fetching the notifications. Please try again later.</p>');
        }
    });
}

function fetchFavoriteNotifications(id) {
    const container = $('#favoriteNotifications');
    container.empty();

    $.ajax({
        url: `http://localhost:5147/api/Customer/GetAllNotificationfavouriteCustomer/${id}`,
        method: 'GET',
        success: function (response) {
            if (response && response.data && Array.isArray(response.data)) {
                console.log(response.data)
                $.each(response.data, function(index, item) {

                    container.append(`
                      <div class="col-md-4">
                        <div class="card shadow-sm rounded-4 border-0 mb-3">
                          <div class="card-body">
                            <div>
                                      <input type="text" class="form-control form-control-sm rounded-3" value="${item.maintenance != null && item.maintenance.maintenanceName ? item.maintenance.maintenanceName : ' '}" readonly>
                                        <span id="Location">${item.maintenance != null && item.maintenance.location ? item.maintenance.location : ' '}</span>

                              <span id="date">${formatDate(item.createAt)}</span>
                            </div>
                            <div>
                              <label class="form-label small text-muted">Workshop Note</label>
                              <textarea class="form-control form-control-sm rounded-3" rows="2" readonly>${item.maintenanceNote || ''}</textarea>
                            </div>
                            <div>
                              <label class="form-label small text-muted">Price</label>
                              <input type="text" class="form-control form-control-sm rounded-3" value="${item.price}" readonly>
                            </div>
                            <div class="d-flex justify-content-end align-items-center gap-3">
                              <button class="btn btn-sm btn-outline-danger rounded-pill btn-delete" data-id="${item.id}">🗑️</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    `);
                });
            } else {
                container.append('<p>No favorite notifications found.</p>');
            }
        },
        error: function (error) {
            console.log('There was an error fetching the favorite notifications:', error);
            container.append('<p>There was an error fetching the favorite notifications. Please try again later.</p>');
        }
    });
}

function fetchRejectedNotifications(id) {
    const container = $('#rejectedNotifications');
    container.empty();

    $.ajax({
        url: `http://localhost:5147/api/Customer/GetAllNotificationRejectCustomer/${id}`,
        method: 'GET',
        success: function (response) {
            if (response && response.data && Array.isArray(response.data)) {
                $.each(response.data, function(index, item) {

                    container.append(`
                      <div class="col-md-4">
                        <div class="card shadow-sm rounded-4 border-0 mb-3">
                          <div class="card-body">
                            <div>
                        <input type="text" class="form-control form-control-sm rounded-3" value="${item.maintenance && item.maintenance.maintenanceName ? item.maintenance.maintenanceName : ''}" readonly>
<span id="Location">${item.maintenance && item.maintenance.location ? item.maintenance.location : ''}</span>

                              <span id="date">${formatDate(item.createAt)}</span>
                            </div>
                            <div>
                              <label class="form-label small text-muted">Workshop Note</label>
                              <textarea class="form-control form-control-sm rounded-3" rows="2" readonly>${item.maintenanceNote || ''}</textarea>
                            </div>
                            <div>
                              <label class="form-label small text-muted">Price</label>
                              <input type="text" class="form-control form-control-sm rounded-3" value="${item.price}" readonly>
                            </div>
                          </div>
                        </div>
                      </div>
                    `);
                });
            } else {
                container.append('<p>No rejected notifications found.</p>');
            }
        },
        error: function (error) {
            console.log('There was an error fetching the rejected notifications:', error);
            container.append('<p>There was an error fetching the rejected notifications. Please try again later.</p>');
        }
    });
}
function handleAccept(id) {
    $.ajax({
        url: `http://localhost:5147/api/Customer/AddResponseforNotificationBookingFromCustomer`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({
            id: id, // Pass the ID of the booking or notification
            acceptCustomer: true // Indicate that the customer accepted the notification
        }),
        success: function (data) {
            console.log("Accepted:", data);
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Accept operation successful',
                    showConfirmButton: true
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: data.message || 'Unable to update the notification.',
                    showConfirmButton: true
                });
            }
        },
        error: function (error) {
            console.log("Error accepting item:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while accepting.',
                showConfirmButton: true
            });
        }
    });
}

function handleReject(id) {
    $.ajax({
        url: `http://localhost:5147/api/Customer/AddResponseforNotificationBookingFromCustomer`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({
            id: id, // Pass the ID of the booking or notification
            acceptCustomer: false // Indicate that the customer rejected the notification
        }),
        success: function (data) {
            console.log("Rejected:", data);
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Reject operation successful',
                    showConfirmButton: true
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: data.message || 'Unable to update the notification.',
                    showConfirmButton: true
                });
            }
        },
        error: function (error) {
            console.log("Error rejecting item:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while rejecting.',
                showConfirmButton: true
            });
        }
    });
}

function handleHeart(id) {
    $.ajax({
        url: `http://localhost:5147/api/Customer/AddNotificationFavourite/${id}`,
        method: 'PUT',
        headers: {  'Content-Type': 'application/json' },
        success: function (data) {
            console.log("Moved to favorites:", data);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: ' favorites successfully',
                showConfirmButton: true
            });
        },
        error: function (error) {
            console.log("Error moving to favorites:", error);
        }
    });
}

function handleDelete(id) {
    $.ajax({
        url: `http://localhost:5147/api/Customer/DeleteNotificationFavourite/${id}`,
        method: 'PUT',
        headers: {'Content-Type': 'application/json' },
        success: function (data) {
            console.log("Deleted:", data);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Delete operation successful',
                showConfirmButton: true
            });
        },
        error: function (error) {
            console.log("Error deleting item:", error);
        }
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0];
}
