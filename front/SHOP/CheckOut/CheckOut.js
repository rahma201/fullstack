
var customerId=localStorage.getItem("customerId");
var totalPrice=localStorage.getItem("totalPrice");
$(function(){
    $("#totalPrice").val(totalPrice)
    $(document).on("click","#CheckOut", function () {
        CreateOrder();
        console.log("CreateOrder")

    });
    
   
});

function CreateOrder() {
    let data = {
        title: $("#title").val(),
        totalPrice: parseFloat($("#totalPrice").val()) || 0,
        customerNote: $("#note").val(),
        recivingDate: $("#recivingDate").val(),
        customerId:customerId, // Replace with dynamic customer ID
        statusPayment: $("#StatusPayment").val(),
        phone: $("#Phone").val(),
        location: $("#Location").val(),
    };
    console.log(data)

    $.ajax({
        url: "http://localhost:5147/api/Customer/AddOrder",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function (response) {
            Swal.fire({
                title: "Order Created!",
                text: "Your order has been placed successfully!",
                icon: "success",
                confirmButtonText: "Ok"
            }).then(() => {
                window.location.href="/SHOP/OrderUser.html"; 
            });
        },
        error: function (err) {
            Swal.fire({
                title: "Order Failed!",
                text: "There was an error creating the order.",
                icon: "error",
                confirmButtonText: "Ok"
            });
            console.error("Error:", err);
        }
    });
}
