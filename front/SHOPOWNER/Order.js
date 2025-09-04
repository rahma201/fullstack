var shopId=localStorage.getItem("ShopId")

$(function(){
    $("#Received-tab").trigger("click"); // Trigger the click event to load the default tab
    GetAllOrderReceivedByShop(shopId);

    $("#Received-tab").on("click",function(){
     GetAllOrderReceivedByShop(shopId);
});

$("#NotReceived-tab").on("click",function(){

    GetAllOrderNotReceivedByShop(shopId);
});
$("#SaveOrderItemRecived").on("click",function(){

    SaveOrderItemRecived();
});

$(document).on("click", ".viewOrder", function() {
    // جلب الـ bookingId من الـ data-id الخاص بالزر
    var orderId = $(this).data("id");

    // إجراء طلب AJAX لجلب بيانات الطلب بناءً على bookingId
    $.ajax({
        url: `http://localhost:5147/api/ShopOwner/GetOrderByIdForthisShop/$`+orderId+`/$`+shopId, // استخدم رابط الـ API الخاص بك
        method: "GET",
        success: function(response) {
            if (response.success && response.data) {
                // تعبئة بيانات المودال باستخدام البيانات التي تم جلبها
                fillModalData(response.data);
                // فتح المودال بعد تعبئة البيانات
                $('#orderModal').modal('show');
            } else {
                alert("No data found.");
            }
        },
        error: function() {
            alert("Error loading booking details.");
        }
    });
});
$(document).on("click", ".viewReceivedOrder", function() {
    // جلب الـ bookingId من الـ data-id الخاص بالزر
    var orderId = $(this).data("id");

    // إجراء طلب AJAX لجلب بيانات الطلب بناءً على bookingId
    $.ajax({
        url: `http://localhost:5147/api/ShopOwner/GetOrderByIdForthisShop/$`+orderId+`/$`+shopId, // استخدم رابط الـ API الخاص بك
        method: "GET",
        success: function(response) {
            if (response.success && response.data) {
                // تعبئة بيانات المودال باستخدام البيانات التي تم جلبها
              

                console.log(response.data);  ReceivedOrder(response.data);
                // فتح المودال بعد تعبئة البيانات
                $('#orderRecivedModal').modal('show');
            } else {
                alert("No data found.");
            }
        },
        error: function() {
            alert("Error loading booking details.");
        }
    });
});

});

function GetAllOrderNotReceivedByShop(shopId) {
    console.log("Loading Get AllOrder Not Received By Shop...");

    if ($.fn.DataTable.isDataTable("#cardOrderNotReceivedTable")) {
        $("#cardOrderNotReceivedTable").DataTable().destroy();
    }

    $("#cardOrderNotReceivedTable").DataTable({
        "processing": true,
        "serverSide": false,
        "ajax": {
            url: "http://localhost:5147/api/ShopOwner/GetAllOrderNotReceivedByShop/$" + shopId,
            type: "GET",
            dataSrc: function (response) {
                console.log("API Response:", response);
                if (response.success && response.data) {
                    return response.data;
                } else {
                    console.log("Failed to load data. Invalid response format.");
                    return [];
                }
            },
            error: function (xhr, status, error) {
                   console.log(`Failed to load orders. Status: ${xhr.status}`);
            }
        },
        "columns": [
            { "data": "orderId" },
            { "data": "title" },
            { "data": "recivingDate" },

            {
                "data": "totalPrice", // لأنك راح تستخدم الداتا كلها
              
            },
          { "data": "statusPayment" },
           
            {
                "data": null,
                "render": function (data, type, row) {
                    return `
<button class="btn btn-primary viewOrder" data-id="${row.orderId}"><i class="fa-solid fa-circle-info"></i></button>
                    `;
                }
            }
        ]

    });
}

function GetAllOrderReceivedByShop(shopId) {
    console.log("Loading Get AllOrder Not Received By Shop..."); // Debugging log

    if ($.fn.DataTable.isDataTable("#cardOrderReceivedTable")) {
        $("#cardOrderReceivedTable").DataTable().destroy();
    }



    $("#cardOrderReceivedTable").DataTable({
        "processing": false,
        "serverSide": false,
        "ajax": {
            url:  "http://localhost:5147/api/ShopOwner/GetAllOrderReceivedByShop/$" + shopId,
            type: "GET",
            success: function (response) {
                console.log("API Response:", response);

                // Check if the response contains the data property
                if (response.success && response.data) {
                    // Use the data array for the DataTable
                    $("#cardOrderReceivedTable").DataTable().clear().rows.add(response.data).draw();
                    console.log("DataTable initialized with data:", response.data); // Debugging log
                } else {
                       console.log("Failed to load data. Invalid response format.");
                }
            },
            error: function (xhr, status, error) {
                console.error("AJAX Error:", xhr.status, xhr.responseText);
                   console.log(`Failed to load categories. Status: ${xhr.status}`);
            }
        },
        "columns": [
            { "data": "orderId" },
            { "data": "title" },
            { "data": "recivingDate" },

            {
                "data": "totalPrice", // لأنك راح تستخدم الداتا كلها
              
            },
          { "data": "statusPayment" },
           
            {
                "data": null,
                "render": function (data, type, row) {
                    return `
<button class="btn btn-primary viewReceivedOrder" data-id="${row.orderId}"><i class="fa-solid fa-circle-info"></i></button>
                    `;
                }
            }
        ]
    });
}
function fillModalData(data) {
    // Ensure `data` and `data.orders` are valid
    if (!data || !data.orders || !data.orders[0]) {
        console.error("Invalid data received: ", data);
        return;
    }

    var order = data.orders[0];  // Assuming data.orders is an array and we need the first item
    var customer = data.custome || {};  // Default to empty object if `customer` is missing

    // Safely access customer data, fallback to "N/A" if missing
    $('#user-name').val(customer.username || "N/A");
    $('#phone-number').val(customer.phone || "N/A");
    $('#location').val(customer.location || "N/A");

    // Safely access order properties and set fallback values
    let itemName = order.order?.title || "Unnamed Order";  // Default to "Unnamed Order" if missing
    let total = data.price * data.quantity;  // Calculate total if not provided

    $('#item-name').val(itemName);
    $('#recivingDate').val(order.order?.recivingDate ? new Date(order.order.recivingDate).toLocaleDateString() : "N/A");
    $('#total').val(total);
    $('#Customer_nots').val(order.order?.customerNote || "N/A");

    // Reset the 'receivedOrder' checkbox before making decisions
    $('input[name="receivedOrder"]').prop('checked', false);

    // Check if delivery status is available and update the checkboxes accordingly
    if (data.statusDelivery === true) {
        $('#receivedYes').prop('checked', true);
    } else if (data.statusDelivery === false) {
        $('#receivedNo').prop('checked', true);
    } else {
        console.log("Status delivery is undefined or null");
    }

    // Fill the table with order items
    var tableBody = $("#demo-foo-addrow tbody");
    tableBody.empty(); // Clear the table first

    // Create the table row with data
    var newRow = `
        <tr data-id="${order.orderItemId}">
            <td>${order.productId || order.motorcycleId}</td>
            <td>${itemName}</td>
            <td>${order.price}</td>
            <td>${order.quantity}</td>
            <td>${order.size || "N/A"}</td>
            <td>
                <div class="color-circle" data-color="${order.color || "N/A"}" style="background-color: ${order.color || "N/A"};"></div>
            </td>
            <td>${total}</td>
        </tr>
    `;

    // Append the new row to the table
    tableBody.append(newRow);
}



function SaveOrderItemRecived() {

    let status = $('input[name="receivedOrder"]:checked').val(); // "Yes" أو "No"

    if (!status) {
        alert("Please select if the order was received or not.");
        return;
    }

    // تأكد من أن القيمة هي بحروف كبيرة/صغيرة بشكل موحد
    status = status.toLowerCase(); // تحويل القيمة إلى حروف صغيرة

    // نحول "yes" => true و "no" => false
    let statusBool = status === "yes"; // "yes" تصبح true و "no" تصبح false

    console.log("Status received:", status); // تأكد من القيم المسترجعة
    console.log("Status as boolean:", statusBool); // تأكد من التحويل بشكل صحيح

    // جمع كل orderItemId من الجدول
    let items = [];
    $('#orderItem tr').each(function () {
        let orderItemId = $(this).data('id');

        if (orderItemId) {
            items.push({
                orderItemId: orderItemId,
                statusDelivery: statusBool
            });
        }
    });

    console.log("Items:", items); // تحقق من العناصر المجمعة

    if (items.length === 0) {
          Swal.fire({
                title: "Order!",
                text: "No order items found!",
                icon: "error",
                confirmButtonText: "Ok"
            });
        return;
    }

    // إرسالهم دفعة وحدة
    $.ajax({
        url: 'http://localhost:5147/api/ShopOwner/UpdateStautsOrder', // غيّر الرابط حسب السيرفر عندك
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(items),
        success: function (response) {
            if(response.success) {
                Swal.fire({
                    title: "Order!",
                    text: "Updated Order status!",
                    icon: "success",
                    confirmButtonText: "Ok"
                });
                                $("#cardOrderNotReceivedTable").DataTable().ajax.reload(null, false);

                $('#orderModal').modal('hide'); // إغلاق المودال بعد النجاح
            }
        },
        error: function (xhr, status, error) {
            Swal.fire({
                title: "Order!",
                text: "Failed to update order status!",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    });
}
function ReceivedOrder(data) {
    // Ensure `data` and `data.customer` are valid
    if (!data || !data.custome) {
        console.error("Invalid data received: ", data);
        return;
    }

    // Safely access user details (e.g., customer data)
    $('#ReceivedOrder_user-name').val(data.custome.username || "N/A");
    $('#ReceivedOrder_phone-number').val(data.custome.phone || "N/A");
    $('#ReceivedOrder_location').val(data.custome.location || "N/A");

    // Safely access order details
    let itemName = data.orders?.[0]?.order.title || "Unnamed Order";  // Optional chaining to access the first order
    let total = data.orders?.[0]?.price * data.orders?.[0]?.quantity;

    $('#ReceivedOrder_item-name').val(itemName);
    $('#ReceivedOrder_recivingDate').val(data.orders?.[0]?.order.recivingDate ? new Date(data.orders[0].order.recivingDate).toLocaleDateString() : "N/A");
    $('#ReceivedOrder_total').val(total);
    $('#ReceivedOrder_Customer_nots').val(data.orders?.[0]?.order.customerNote || "N/A");

    // Reset 'receivedOrder' checkbox before setting the status
    $('input[name="receivedOrder"]').prop('checked', false);

    // Handle delivery status
    if (data.statusDelivery !== undefined && data.statusDelivery !== null) {
        if (data.statusDelivery === true) {
            $('#ReceivedOrder_receivedYes').prop('checked', true);
        } else if (data.statusDelivery === false) {
            $('#ReceivedOrder_receivedNo').prop('checked', true);
        }
    } else {
        console.log("Status delivery is undefined or null");
    }

    // Fill the table with order items
    var tableBody = $("#ReceivedOrder_demo-foo-addrow tbody");
    tableBody.empty(); // Clear the table first

    data.orders.forEach(order => {
        var newRow = `
            <tr data-id="${order.orderItemId}">
                <td>${order.productId || order.motorcycleId}</td>
                <td>${order.name || "N/A"}</td>
                <td>${order.price}</td>
                <td>${order.quantity}</td>
                <td>${order.size || "N/A"}</td>
                <td>
                    <div class="color-circle" data-color="${order.color || "N/A"}" style="background-color: ${order.color || "N/A"};"></div>
                </td>
                <td>${total}</td>
            </tr>
        `;
        tableBody.append(newRow);
    });
}
