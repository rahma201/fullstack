
var cartId =0;
let customerId= localStorage.getItem("customerId")||0;

$(function(){
    
    GetCart(customerId);
    $(document).on("click", ".how-itemcart1", function() {
    var cartItemId=$(this).data("id");
        console.log("delete");
        DeleteItemInCart(cartItemId)
    });
    $(document).on("click", ".btn-num-product-down, .btn-num-product-up", function () {
        let wrapper = $(this).closest(".wrap-num-product");
        let input = wrapper.find("input.num-product");
        let currentValue = parseInt(input.val());
        let price = parseFloat(input.data("price")); // استرجاع السعر من `data-price`
        let cartItemId = input.data("id"); // استرجاع ID للعنصر في السلة
    
        if ($(this).hasClass("btn-num-product-down") && currentValue > 1) {
            currentValue -= 1;
        } else if ($(this).hasClass("btn-num-product-up")) {
            currentValue += 1;
        }
    
        input.val(currentValue); 
    
        let totalPrice = price * currentValue;
        wrapper.closest("tr").find(".totalPriceOfThisItem span").text(totalPrice.toFixed(2)); 
    
        calculateTotalCartPrice();
    
        console.log(`Item ID: ${cartItemId}, Price: ${price}, Quantity: ${currentValue}, Total: ${totalPrice}`);
    });
    
    $(document).on("click","#CreateOrder",function(){
       var totalPrice= $("#TotalPriceOfCart").html(); 
        localStorage.setItem("totalPrice",totalPrice);
        window.location.href="/SHOP/CheckOut/CheckOut.html"

    });
    
}); 
function calculateTotalCartPrice() {
    let totalCartPrice = 0;

    $(".totalPriceOfThisItem span").each(function () {
        totalCartPrice += parseFloat($(this).text()); // جمع أسعار كل العناصر
    });

    $("#TotalPriceOfCart").html(totalCartPrice.toFixed(2)); 
}
function GetAllItemInCart(cartId){

    $.ajax({
        url: "http://localhost:5147/api/Customer/GetItemsInCart/$"+cartId ,
        type: "GET",
        contentType: "application/json",
        success: function(response) {
            console.log(response);  // Log the response to check its structure
        if(response.data.length===0){
            $(".Cart").hide() 
            $("#Cartemty").show() 
        }
       else if(!response.success){
            console.log("Error fetching cart:", response.message);
            $(".Cart").hide() 
            $("#Cartemty").show() 
        }
        else if(response.success){

            $("#Cartemty").hide() 
            $(".Cart").show()
            var html = '';
            $("#ListOfItemInCart").empty()
var totalCartPrice=0;
            $.each(response.data, function(index, item) {
                console.log("product", item); // Log each item to check its structure
                let totalItemPrice = (item.price * item.quantity).toFixed(2); // السعر الإجمالي لهذا العنصر
    totalCartPrice += parseFloat(totalItemPrice); // إضافة السعر إلى المجموع الكلي

                html += `			
                    <tr class="table_row">
                        <td class="column-1">
                            <div class="how-itemcart1" data-id="${item.cartItemId}">
                                <img src="${item.image}" alt="IMG">
                            </div>
                        </td>
                        <td class="column-2">${item.name}</td>
                        <td class="column-3 priceOfThisItem">$ <span>${item.price.toFixed(2)}</span></td>
                        <td class="column-3">
                        ${item.size||""}      
                              <span class="circle" style="background-color: ${item.color};"></span>
                        </td>
                        <td class="column-4">
                            <div class="wrap-num-product flex-w m-l-auto m-r-0">
                                <div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                                    <i class="fs-16 zmdi zmdi-minus"></i>
                                </div>
            
                                <input class="mtext-104 cl3 txt-center num-product" type="number" 
                                    name="num-product2" value="${item.quantity}" data-price="${item.price}" 
                                    data-id="${item.cartItemId}">
            
                                <div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                                    <i class="fs-16 zmdi zmdi-plus"></i>
                                </div>
                            </div>
                        </td>
                        <td class="column-5 totalPriceOfThisItem">$ <span>${(item.price * item.quantity).toFixed(2)}</span></td>
                    </tr>`;
            });
            
        
            $("#ListOfItemInCart").html(html);
            $("#TotalPriceOfCart").html(totalCartPrice.toFixed(2))
         } },        
        error: function(err) {
            $(".Cart").hide()

            console.log("Can not get product:", err);
            $("#ListOfItemInCart").empty()

        }
    });
  
}
function DeleteItemInCart(cartItemId){  

    $.ajax({
        url: `http://localhost:5147/api/Customer/DeleteItemInCart/$`+cartItemId,
        type: "DELETE",
   
       
        success: function (data) {
            if (data.success) {
                Swal.fire({
                    title: "Product!",
                    text: "Product deleted successfully!",
                    icon: "success",
                    confirmButtonText: "Ok"
                });

                // Remove the row from DataTable
                GetAllItemInCart();
                        } 
                        else {
                Swal.fire({
                    title: "Product!",
                    text: "Cannot delete this Product!",
                    icon: "error",
                    confirmButtonText: "Ok"
                });
            }
        },
        error: function (err) {
            Swal.fire({
                title: "Product!",
                text: "Cannot delete this Product!",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    });
}

function GetCart(userId){
    $(".Cart").hide() 

    $.ajax({
        url: `http://localhost:5147/api/Customer/GetCartByCustomerId/$`+userId, // تأكد من استخدام المتغير userId بشكل صحيح
        type: "GET",
        contentType: "application/json",
        success: function(response) {
            console.log(response);  // Log the response to check its structure
    
            if (response.success) {
                 cartId = response.data; // الوصول إلى CartId الذي تم إرجاعه
    
                // قم باستخدام cartId حسب الحاجة
                console.log("Cart ID:", cartId);
                GetAllItemInCart(cartId)

            } else {
                console.log("Error fetching cart:", response.message);
            }
        },        
        error: function(err) {
            console.log("Can not get cart:", err);
            $(".Cart").hide() 
            $("#Cartemty").show()
        }
    });
    
  
}