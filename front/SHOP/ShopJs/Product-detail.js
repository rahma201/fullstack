let productId= localStorage.getItem("idOfProductDetails");
let MotoId= localStorage.getItem("idOfMotoDetails");
let customerId= localStorage.getItem("customerId");
let selectedColor = '';  
$(function() {       
     console.log("customerId+customerId"+customerId)

    // --- Get Product Details ---
        fetchProductDetails(productId);
        $("#additemtoCart").on("click",function(){
          
                   AddItemInCart(productId,null,customerId);
         
             
        });    
            $("#additemtoWishList").on("click",function(){
            if(customerId!=undefined||customerId===null||customerId==0)
                {
                    AddItemWishList(productId,0,customerId);
                }
            else
               {
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to add item to cart. Please login in the first",
                        icon: "error",
                        confirmButtonText: "OK"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $("#LoginModal").show();
                        }
                    });
               }
        }); 
            
    $(document).on("click","#Login", function(){
        Loginshop();

    });
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
    
    
            // Optionally display an error message to the user
    });
        // Optionally display an error message to the user




    function fetchProductDetails(productId) {
        console.log("productID:" + productId)
        $.ajax({
            url: `http://localhost:5147/api/Customer/GetProduct/$`+productId, // Replace with your actual API endpoint
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    console.log("response.data: " + response.data)
                    console.log("response: " + response)
                 
                    
                    updateProductDetails(response.data);
                    fetchReviews(productId);

                } else {
                    console.error('Error fetching product details:', response.message);
                    // Optionally display an error message to the user
                }
            },
            error: function(xhr, status, error) {
                console.error('AJAX error fetching product details:', status, error);
                // Optionally display an error message to the user
            }
        });
    }

    function updateProductDetails(product) {
        $("#GetItemBread").text(product.name);
        $('#name').text(product.name);
        $('#price').text('$' + product.price);
        $('#description').text(product.description);
        console.log( product)
       

        // Update the main product image
            $('#ImagePRODUCT').attr('src', product.images);
            $('#Image').attr('href', product.images);
            $('#ImageItemSlick3').attr('data-thumb', product.images); // If used by gallery script
    

        // Populate the size dropdown
        const sizeSelect = $('select[name="time"]').eq(0);
        sizeSelect.empty();
        if (product.sizes) {
            let sizesArray;
            if (typeof product.sizes === 'string') {
                sizesArray = product.sizes.split(',').map(size => size.trim()); // Split by comma and trim whitespace
            } else if (Array.isArray(product.sizes)) {
                sizesArray = product.sizes;
                console.log(sizesArray)
            }

            if (sizesArray.length > 0) {
                $.each(sizesArray, function(index, size) {
                    sizeSelect.append(`<option value="${size}">${size}</option>`);
                });
            }
        }
        const colorContainer = $('#color-container'); // Container for color circles
        colorContainer.empty(); // Clear previous colors
        
        // Populate the color dropdown
        if (product.colors) {
            let colorsArray = [];
            if (typeof product.colors === 'string') {
                colorsArray = product.colors.split(',').map(color => color.trim());
            } else if (Array.isArray(product.colors)) {
                colorsArray = product.colors;
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
        // Update SKU and Categories
        $('.bg6 span:first-child').text('SKU: ' + (product.productId || 'N/A'));
        $('.bg6 span:last-child').text('Categories: ' + (product.categoryId || 'N/A'))
    }
  
    function AddItemInCart(productId,MotoId,customerId){
        customerId=localStorage.getItem("customerId");
        if(customerId!=0 &&customerId!=null&&customerId!=undefined){
            
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
        }
        else{
            Swal.fire({
                title: "Error!",
                text: "Failed to add item to wishList. Please login in the first",
                icon: "error",
                confirmButtonText: "OK"
            }).then((result) => {
                if (result.isConfirmed) {
                    $(".authModalInProductDetails").modal("show");

                }
            });
            return;
        }
    }
    function fetchReviews(productId) {
        $.ajax({
            url: "http://localhost:5147/api/Shared/GetAllReviewForThisItem",
            type: "GET",
            data: { productId: productId, motorcycleId: 0 },// Adjust the API endpoint if needed
            dataType: 'json',
            success: function(response) {
                if (response.success && response.data) {
                    displayReviews(response.data);
                } else {
                    console.log('No reviews found or error fetching reviews:', response.message);
                    displayNoReviews();
                }
            },
            error: function(xhr, status, error) {
                console.error('AJAX error fetching reviews:', status, error);
                displayNoReviews();
            }
        });
    }
    
    function displayReviews(reviews) {
        console.log("reviews"+reviews)
        const reviewsContainer = $('#reviews .row .col-sm-10 .p-b-30');
        reviewsContainer.empty(); // Clear any existing reviews
    
        if (reviews.length > 0) {
            reviews.forEach(review => {
                const reviewHtml = `
                    <div class="flex-w flex-t p-b-68">
                        <div class="wrap-pic-s size-109 bor0 of-hidden m-r-18 m-t-6">
                            <img src="/SHOP/images/person.png" alt="AVATAR">
                        </div>
    
                        <div class="size-207">
                            <div class="flex-w flex-sb-m p-b-17">
                                <span class="mtext-107 cl2 p-r-20">
                                     ${review.customer.username || 'N/A'}
                                </span>
    
                                <span class="fs-18 cl11">
                                    ${renderRatingStars(review.rating)}
                                </span>
                            </div>
    
                            <p class="stext-102 cl6">
                                ${review.comment || 'No comment provided.'}
                            </p>
                        </div>
                    </div>
                `;
                reviewsContainer.append(reviewHtml);
            });
    
            // Update the review count in the tab link
            $('.nav-tabs a[href="#reviews"]').text(`Reviews (${reviews.length})`);
        } else {
            displayNoReviews();
        }
    }
    
    function displayNoReviews() {
        const reviewsContainer = $('#reviews .row .col-sm-10 .p-b-30');
        reviewsContainer.html('<p class="stext-102 cl6">No reviews yet.</p>');
        $('.nav-tabs a[href="#reviews"]').text('Reviews (0)');
    }
    
    function renderRatingStars(rating) {
        console.log("rating"+rating)
        let starsHtml = '';
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                starsHtml += '<i class="zmdi zmdi-star"></i>';
            } else if (i === Math.floor(rating) && rating % 1 !== 0) {
                starsHtml += '<i class="zmdi zmdi-star-half"></i>';
            } else {
                starsHtml += '<i class="zmdi zmdi-star-outline"></i>';
            }
        }
        return starsHtml;
    }
    function AddItemWishList(productId,MotoId,customerId){
        customerId=localStorage.getItem("customerId");

        if(customerId!=0 &&customerId!=null){
            
          
        
        let data = {
            customerId: customerId,
            productId: productId || null, // Send null if empty
            motorcycleId:MotoId|| null, // Send null if empty
        };

        $.ajax({
            url: "http://localhost:5147/api/Customer/AddWishList", // Adjust API route
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (response) {
                if (response.success) {
                    console.log("addwishlist")
                    Swal.fire({
                        title: "Success!",
                        text: "add to favourite successfully!",
                        icon: "success",
                        confirmButtonText: "OK"
                    });
                       window.location.href="/SHOP/Wishlist.html"
           

                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to add item to favourite. Please try again.",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                                }
            },
            error: function (xhr, status, error) {
                console.error("Error adding item to favourite:", error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to add item to favourite. Please try again.",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
        });
        }
        else{
            Swal.fire({
                title: "Error!",
                text: "Failed to add item to wishList. Please login in the first",
                icon: "error",
                confirmButtonText: "OK"
            }).then((result) => {
                if (result.isConfirmed) {
                    $(".authModalInProductDetails").modal("show");

                }
            });
            return;
        }
    }
    
