var customerId=localStorage.getItem("customerId");
$(function(){
 
    getOrder(customerId);

    
    $(document).on("click",".GetDetails",function(){
        var orderId = $(this).data("id"); 
        localStorage.setItem("orderId",orderId);
        window.location.href="/SHOP/OrderUserDetails.html"
    })
   
});

function getOrder(customerId) {
    $.ajax({
        url: `http://localhost:5147/api/Customer/GetAllOrderforUser/$`+customerId, 
        type: "GET",
        contentType: "application/json",
        success: function (response) {
            if (response.success && response.data.length > 0) {
                let tableBody = $("#Getallorder");
                tableBody.empty(); // مسح الجدول قبل إضافة بيانات جديدة

                response.data.forEach(order => {
                    let row = `
                        <tr>
                            <td>${order.title}</td>
                            <td>${order.totalPrice}</td>
                            <td>${new Date(order.recivingDate).toLocaleDateString()}</td>
                            <td>${order.statusPayment }</td>
                            <td><button class="btn btn-info GetDetails" data-id=${order.orderId}>info</button></td>
                        </tr>
                    `;
                    tableBody.append(row);
                });
            } else {
                Swal.fire({
                    title: "No Orders",
                    text: "No orders found for this user.",
                    icon: "info",
                    confirmButtonText: "Ok"
                });
            }
        },
        error: function (err) {
            Swal.fire({
                title: "Fetch Failed!",
                text: "There was an error retrieving the orders.",
                icon: "error",
                confirmButtonText: "Ok"
            });
            console.error("Error:", err);
        }
    });
}
