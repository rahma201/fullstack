customerId= localStorage.getItem("customerId");
let selectedColor = '';  
$(function(){
    GetAllItemInWishList(customerId)
    $(document).on("click", ".how-itemcart1", function() {
    var cartItemId=$(this).data("id");
        console.log("delete");
        DeleteItemInCart(cartItemId)
    });
  
    
    $(document).on("click","#CreateOrder",function(){
        window.location.href="/SHOP/CheckOut/CheckOut.html"

    });
        $(document).on("click",".delete-icon",function(){

        let wishListId = $(this).data("wishlist-id");
        DeleteItemInWishList(wishListId);
    });
    let productId;
    let MotoId ;
    let color;
    let size;
        $(document).on("click",".add-to-cart",function(){
            $("#productModal").modal("show");

        productId  = $(this).data("product-id") || null;
         MotoId = $(this).data("moto-id") || null;
         customerId = $(this).data("customer-id");
         color = $(this).data("color") || null;
         size = $(this).data("size");
         console.log(productId)
         if(productId!=null){
            $("#sizeContionure").show()
         const sizeSelect = $('select[name="time"]').eq(0);
         sizeSelect.empty();
         if (size) {
             let sizesArray;
             if (typeof size === 'string') {
                 sizesArray = size.split(',').map(size => size.trim()); // Split by comma and trim whitespace
             } else if (Array.isArray(size)) {
                 sizesArray = size;
                 console.log(sizesArray)
             }
 
             if (sizesArray.length > 0) {
                 $.each(sizesArray, function(index, size) {
                     sizeSelect.append(`<option value="${size}">${size}</option>`);
                 });
             }
         }
        }
        else{
            $("#sizeContionure").hide()
        }
         const colorContainer = $('#color-container'); // Container for color circles
         colorContainer.empty(); // Clear previous colors
         
         // Populate the color dropdown
         if (color) {
             let colorsArray = [];
             if (typeof color === 'string') {
                 colorsArray = color.split(',').map(color => color.trim());
             } else if (Array.isArray(color)) {
                 colorsArray =color;
             }
         
             if (colorsArray.length > 0) {
                 let selectedColor = colorsArray[0]; // Default first color
                 $('#color-preview').css('background-color', selectedColor); // Set default color
         
                 // Display all colors as clickable circles
                 $.each(colorsArray, function(index, hexColor) {
                     colorContainer.append(`
                         <div class="color-circle" data-color="${hexColor}" style="background-color: ${hexColor};"></div>
                     `);
                 });
         
              
             }
            }
    });
    $(document).on("click","#additemtoCart",function(){
        $("#productModal").modal("hide")
        
        AddItemInCart(productId, MotoId, customerId);
    });
    // Capture color click event
$(document).on('click', '.color-circle', function () {
    // Remove the 'selected' class and 'data-selected' attribute from all color circles
    $('.color-circle').removeClass('selected').attr('data-selected', 'false');
    
    // Add the 'selected' class and set 'data-selected' to 'true' on the clicked color circle
    $(this).addClass('selected').attr('data-selected', 'true');
    
    // Optionally, if you want to apply a border or change the background color around the selected color
    // (For example, you can use a border or a special background effect)
    $(this).css({
        'border': '2px solid #000', // Adding a black border around the selected color
        'box-shadow': '0px 0px 10px rgba(0, 0, 0, 0.3)' // Optional, to add a glow effect
    });

    // Reset the style for non-selected colors
    $(this).siblings().css({
        'border': 'none',
        'box-shadow': 'none'
    });

    // Optionally, update a preview of the selected color
    selectedColor = $(this).css('background-color');
    $('#color-preview').css('background-color', selectedColor); // Update the color preview
});
}); 

function GetAllItemInWishList(customerId) {
    $.ajax({
        url: `http://localhost:5147/api/Customer/GetWishList/$`+customerId,
        type: "GET",
        contentType: "application/json",
        success: function(response) {
            console.log(response); // لعرض استجابة الـ API للتحقق من البيانات
            
            $("#wishlist").empty(); // تفريغ القائمة قبل الإضافة الجديدة

            if (!response.data) {
                console.error("Wishlist data is empty or undefined.");
                return;
            }

            let html = '';
            
            $.each(response.data, function(index, item) {
                let imageUrl = 'default-image.png'; // صورة افتراضية إذا لم تكن هناك صورة
                
                if (item.motorcycle && item.motorcycle.images) {
                    imageUrl = `http://localhost:5147${item.motorcycle.images}`;
                } else if (item.product && item.product.images) {
                    imageUrl = `http://localhost:5147${item.product.images}`;
                }
                
                html += `			
                    <tr data-id="${item.wishListId}">
                        <td><img src="${imageUrl}" alt="Product Image" style="width:120px"> ${item.motorcycle ? item.motorcycle.name : (item.product ? item.product.name : 'Unknown')}</td>
                        <td><span class="price">$${item.motorcycle ? item.motorcycle.price : (item.product ? item.product.price : 'N/A')}</span></td>
                        <td>
                            <button class="add-to-cart"
                                    data-Moto-id="${item.motorcycleId || ''}"
                                    data-product-id="${item.productId || ''}"
                                    data-size=${ item.product ? item.product.sizes : 'none'}

                                    data-color=${item.motorcycle ? item.motorcycle.colors : (item.product ? item.product.colors : 'none')}
                                    data-customer-id="${customerId}">
                                Add to Cart
                            </button>
                        </td>
                        <td>
                            <span class="delete-icon" 
                                  data-wishlist-id="${item.wishListId}">
                                🗑️
                            </span>
                        </td>
                    </tr>`;
            });

            $("#wishlist").html(html);

            // **تفعيل الأحداث بعد تحميل القائمة**
          
        },
        error: function(err) {
            console.log("Can not get wishlist:", err);
            $("#wishlist").empty();
        }
    });
}

function DeleteItemInWishList(WishListId){  

    $.ajax({
        url: `http://localhost:5147/api/Customer/DeleteWishList/$`+WishListId,
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
                GetAllItemInWishList(customerId);
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

function AddItemInCart(productId,MotoId,customerId){
    if (!selectedColor ) {
        // If no color is selected, you can set a default color (e.g., black)
        Swal.fire({
            title: "Error!",
            text: "Please select a color!",
            icon: "error",
            confirmButtonText: "OK"
       
        });
        return;
    }
    else{
    let cartItemData = {
        customerId: customerId,
        productId: productId || null, // Send null if empty
        motorcycleId:MotoId, // Send null if empty
        quantity: $("#quantity").val(),
        color: selectedColor,
        size: $("#size").val(),
    };

    $.ajax({
        url: "http://localhost:5147/api/Customer/AddItemInCart", // Adjust API route
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(cartItemData),
        success: function (response) {
            if (response.success) {
                console.log(response)
                Swal.fire({
                    title: "Success!",
                    text: "add to cart successfully!",
                    icon: "success",
                    confirmButtonText: "OK"
               
                });
                  
                window.location.href="/SHOP/shoping-cart.html"


            } else {
                Swal.fire({title: "Error!",
                    text: "Failed to add item to cart. Please try again.",
                    icon: "error",
                    confirmButtonText: "OK"
                });
                            }
        },
        error: function (xhr, status, error) {
            console.error("Error adding item to cart:", error);
            Swal.fire({
                title: "Error!",
                text: "Failed to add item to cart. Please try again.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    });

}}