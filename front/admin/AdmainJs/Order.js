$(document).ready(function() {
    // جلب بيانات الطلبات عند تحميل الصفحة
    $.ajax({
        url: 'http://localhost:5147/api/Admain/GetAllOrder',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            // إضافة البيانات إلى الجدول
            var tableBody = $('#cardOrderReceivedTable tbody');
            tableBody.empty(); // تنظيف الجدول قبل إضافة الصفوف الجديدة

            $.each(response.data, function(index, order) {
                var row = '<tr>' +
                          '<td>' + (index + 1) + '</td>' +
                          '<td>' + order.title + '</td>' +
                          '<td>' + order.recivingDate + '</td>' +
                          '<td>' + order.totalPrice + '</td>' +
                          '<td>' + order.statusPayment + '</td>' +
                          `<td><button class="btn btn-info view-details" data-id="${order.orderId}"><i class="fa-solid fa-circle-info"></i></button></td>   `+
                          '</tr>';
                tableBody.append(row);
            });

            // تفعيل DataTables
            $('#cardOrderReceivedTable').DataTable();
        },
        error: function(error) {
            console.log('Error:', error);
        }
    });

    // عرض تفاصيل الطلب عند الضغط على زر "View Details"
    $(document).on('click', '.view-details', function() {
        var orderId = $(this).data('id');
        $('#orderModal').modal('show');
        console.log(orderId)
        $.ajax({
            url: 'http://localhost:5147/api/Admain/GetOrderDetails/' + orderId,
            type: 'GET',
            success: function(response)
             {
                // عرض تفاصيل الطلب في المودال
                fillModalData(response.data)
             
            },
            error: function(error) {
                console.log('Error:', error);
            }
        });
    });
});
function fillModalData(data) {
    // تعبئة بيانات العميل
    $('#user-name').val(data.order.customer.username || "N/A");
    $('#phone-number').val(data.order.customer.phone || "N/A");
    $('#location').val(data.order.customer.location || "N/A");
    $('#email').val(data.order.customer.email || "N/A");

    // تعبئة تفاصيل الطلب
    let itemName = data.order.title || "Unnamed Order";
    let total = data.order.totalPrice || 0;

    $('#item-name').val(itemName);
    $('#recivingDate').val(data.order.recivingDate ? new Date(data.order.recivingDate).toLocaleDateString() : "N/A");
    $('#total').val(total);
    $('#Customer_nots').val(data.order.customerNote || "N/A");

    // تعبئة حالة استلام الطلب
    $('input[name="receivedOrder"]').prop('checked', false); // إلغاء التحديد أولاً

    if (data.orderItems[0]?.statusDelivery !== null) {
        // إذا كانت الاستلام true أو false
        if (data.orderItems[0].statusDelivery === true) {
            $('#receivedYes').prop('checked', true);
        } else if (data.orderItems[0].statusDelivery === false) {
            $('#receivedNo').prop('checked', true);
        }
    }

    // تعبئة الجدول داخل المودال
    var tableBody = $("#demo-foo-addrow tbody");
    tableBody.empty(); // إفراغ الجدول أولاً

    // تعبئة كل عنصر في الجدول
    data.orderItems.forEach(function(item) {
        var newRow = `
            <tr data-id="${item.orderItemId}">
                <td>${item.productId || item.motorcycleId || "N/A"}</td>
                <td>${item.name || "No Name"}</td>
                <td>${item.price || "N/A"}</td>
                <td>${item.quantity || 0}</td>
                <td>${item.size || "N/A"}</td>
                <td>
                    <div class="color-circle" data-color="${item.color || "transparent"}" style="background-color: ${item.color || "transparent"};"></div>
                </td>                 

                <td>${item.price * item.quantity || 0}</td>  <td>${item.storeName || "N/A"}</td>
            </tr>
        `;
        tableBody.append(newRow);
    });
}
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
        return isoString; // Return original string if formatting fails
    }
}