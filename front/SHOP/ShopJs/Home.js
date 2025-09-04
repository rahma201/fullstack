$(function(){
    getTopMostPopularMaintenance();
    getTopMostPopularProduct();
    getTopMostPopularMotorcycle();
// 1. إضافة مستمع الحدث لزر "JOIN TICKET"
$('.start-countdown').on('click', function () {
  const eventDate = new Date($(this).data("date"));  // استخدم التاريخ من زر "JOIN TICKET"

  if (isNaN(eventDate.getTime())) {
    console.error("Invalid event time:", eventDate);
  } else {
    const $slide = $(this).closest('.swiper-slide'); // العثور على الشريحة المرتبطة
    initializeCountdown($slide, eventDate);  // بدء العد التنازلي لهذه الشريحة
  }
});



  
    $(document).on("click",".buttonAllProducts", function(){
        console.log("===getAllProduct===");
        getAllProduct(shopclickId)

    });
    $(document).on("click",".ProductDetails", function(){
        console.log("===ProductDetails===");    

        var IdOfProductDetails = $(this).attr("data-id"); 
        localStorage.setItem("idOfProductDetails",IdOfProductDetails)
        window.location.href="/SHOP/Moto-details.html"
    });

    $(".detalis").on("click",function(){

        
        window.location.href="/Events/index.html"
    });
    $(document).on("click",".MotoDetails", function(){
        console.log("===MotoDetails===");

        var IdMotoDetails = $(this).attr("data-id"); 
        localStorage.setItem("idOfMotoDetails",IdMotoDetails)
        window.location.href="/SHOP/Moto-details.html"


    });
    $(document).on("click", ".btnMaintenance", function() {
    console.log("===btnMaintenance clicked===");
    
    var maintenanceId = $(this).attr("data-id");
    localStorage.setItem("maintenanceId", maintenanceId);
    window.location.href = "maintenanceDetails.html";
});

    
$(document).on("click", ".addItemInWhishList", function() {
   
        var productId = $(this).attr("data-id");  
        AddItemWishListInShop(productId,0,customerId);
       
       
  
    
}); 
$(document).on("click", ".addMotoInWhishList", function() {
  
    
    var MotoId = $(this).attr("data-id");  

    AddItemWishListInShop(0,MotoId,customerId);
       
    
});  
$(document).on("click", ".addMaintenanceInWishList", function() {
    var maintenanceId = $(this).attr("data-id");
    AddItemWishListInShop(0, maintenanceId, customerId);
});

$.ajax({
  url: 'http://localhost:5147/api/Admain/GetAllNewEvents',
  method: 'GET',
  dataType: 'json',
  success: function(response) {
    console.log(response); // Log the response to check the structure

    // Check if the response has events
    if (response.data && response.data.length > 0) {
      const closestEvent = getClosestEvent(response.data);
      if (closestEvent) {
        setupEventCountdown(closestEvent);
      } else {
        console.log('No valid future events found.');
      }
    } else {
      console.log('No events found or the array is empty');
    }
  },
  error: function(xhr, status, error) {
    console.error('Error fetching data from API:', error);
  }
});
});





   



    // دالة جلب بيانات الصيانة
    function getTopMostPopularMaintenance() {
        $.ajax({
            url: 'http://localhost:5147/api/Customer/TopMostPopularityMaintenance',
            type: 'GET',
            contentType: 'application/json',
            success: function(response) {
                $("#ListCardMaintaince").empty();
                console.log(response.data)
                var html = '';
                $.each(response.data, function(index, item) {
                    html += `
                    <div class="col-sm-3 col-md-4 col-lg-3 p-b-35 isotope-item women">
                        <div class="block2">
                            <div class="block2-pic hov-img0">
                                <img src="../maintenance/img/maintenance.png" alt="IMG-PRODUCT">
                                <a class="block2-btn quickView flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1" id="btnMaintenance" onclick="localStorage.setItem('maintenanceId', ${item.maintenanceId}); window.location.href='/maintenance/user/maintenanceDetails.html'">
                                    Quick View
                                </a>
                            </div>
                            <div class="block2-txt flex-w flex-t p-t-14">
                                <div class="block2-txt-child1 flex-col-l">
                                    <a class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6" style="margin-left: 20px;">
                                        <span style="color:#222222">Name:</span> <span>${item.name}</span><br>
                                        <span style="color:#222222">Location:</span> <span>${item.location}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                });
                $("#ListCardMaintaince").html(html);
            },
            error: function(err) {
                console.log("Can not get maintenance:", err);
            }
        });
    }

    // دالة جلب بيانات المنتجات
    function getTopMostPopularProduct() {
        $.ajax({
            url: 'http://localhost:5147/api/Customer/TopMostPopularityProduct',
            type: 'GET',
            success: function(response) {
                $("#ListCardItem").empty();
                var s = '';
                $.each(response.data, function(index, item) {
                    s += `
                    <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                        <div class="block2">
                            <div class="block2-pic hov-img0">
                                <img src="http://localhost:5147${item.image}" alt="IMG-PRODUCT" style="width: 100%; height: 260px;">
                                <a class="block2-btn quickView flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1 ProductDetails" data-id="${item.productId}">
                                    Quick View
                                </a>
                            </div>
                            <div class="block2-txt flex-w flex-t p-t-14">
                                <div class="block2-txt-child1 flex-col-14">
                                    <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">${item.name}</a>
                                    <span class="stext-105 cl3" style="margin-left: 20px;color: #FEBA17;">${item.price}</span>
                                </div>
                                <div class="block2-txt-child2 flex-r p-t-3">
                                    <a class="btn-addwish-b2 dis-block pos-relative js-addwish-b2 addItemInWhishList" data-product-id=${item.productId}>
                                      <i class="fa-solid fa-heart" data-product-id=${item.productId}></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                });
                $("#ListCardItem").html(s);
            },
            error: function(err) {
                console.log("Can not get product:", err);
            }
        });
    }

    // دالة جلب بيانات الدراجات النارية
    function getTopMostPopularMotorcycle() {
        $.ajax({
            url: 'http://localhost:5147/api/Customer/TopMostPopularityMotorcycle',
            type: 'GET',
            success: function(response) {
                $("#ListCardMotorcycle").empty();
                var html = '';
                $.each(response.data, function(index, item) {
                    html += `
                    <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                        <div class="block2">
                            <div class="block2-pic hov-img0">
                                <img src="${item.image}" alt="IMG-PRODUCT" style="width: 100%; height: 260px;">
                                <a class="block2-btn quickView flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1 MotoDetails" data-id="${item.motorcycleId}">
                                    Quick View
                                </a>
                            </div>
                            <div class="block2-txt flex-w flex-t p-t-14">
                                <div class="block2-txt-child1 flex-col-14">
                                    <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">${item.name}</a>
                                    <span class="stext-105 cl3" style="margin-left: 20px;color: #FEBA17;">${item.price}</span>
                                </div>
                                <div class="block2-txt-child2 flex-r p-t-3">
                                    <a class="btn-addwish-b2 dis-block pos-relative addMotoInWhishList" data-id=${item.motorcycleId}>
<i class="fa-solid fa-heart"></i>                       
             </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                });
                $("#ListCardMotorcycle").html(html);
            },
            error: function(err) {
                console.log("Can not get motorcycle:", err);
            }
        });
    }


// دالة إضافة إلى المفضلة
function AddItemWishListInShop(productId, MotoId, customerId) {
    customerId = localStorage.getItem("customerId");
    if (customerId != 0 && customerId != null) {
        let data = {
            customerId: customerId,
            productId: productId || null,
            motorcycleId: MotoId || null,
        };

        $.ajax({
            url: "http://localhost:5147/api/Customer/AddWishList",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        title: "Success!",
                        text: "Added to favourite successfully!",
                        icon: "success",
                        confirmButtonText: "OK"
                    });
                    window.location.href = "/SHOP/Wishlist.html";
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to add item to favourite. Please try again.",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                }
            },
            error: function(xhr, status, error) {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to add item to wishlist.",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
        });
    } else {
        Swal.fire({
            title: "Error!",
            text: "Please login first to add items to your wishlist.",
            icon: "error",
            confirmButtonText: "OK"
        }).then((result) => {
            if (result.isConfirmed) {
                $("#authModal").modal("show");
            }
        });
    }
}


// دالة إضافة إلى المفضلة
function AddItemWishListInShop(productId, MotoId, customerId) {
    customerId = localStorage.getItem("customerId");
    if (customerId != 0 && customerId != null) {
        let data = {
            customerId: customerId,
            productId: productId || null,
            motorcycleId: MotoId || null,
        };

        $.ajax({
            url: "http://localhost:5147/api/Customer/AddWishList",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        title: "Success!",
                        text: "Added to favourite successfully!",
                        icon: "success",
                        confirmButtonText: "OK"
                    });
                    window.location.href = "/SHOP/Wishlist.html";
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to add item to favourite. Please try again.",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                }
            },
            error: function(xhr, status, error) {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to add item to wishlist.",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
        });
    } else {
        Swal.fire({
            title: "Error!",
            text: "Please login first to add items to your wishlist.",
            icon: "error",
            confirmButtonText: "OK"
        }).then((result) => {
            if (result.isConfirmed) {
                $("#authModal").modal("show");
            }
        });
    }
}
function getClosestEvent(events) {
  const now = new Date();
  let closestEvent = null;
  let closestTimeDiff = Infinity;

  // Loop through events to find the closest one
  events.forEach(event => {
    // Log the event date to check format
    console.log('Event date:', event.time);
    
    const eventDate = new Date(event.time); // Assuming event.date is a valid date string

    if (isNaN(eventDate)) {
      console.error('Invalid date format for event:', event);
      return; // Skip invalid dates
    }

    const timeDiff = eventDate - now;
    if (timeDiff > 0 && timeDiff < closestTimeDiff) {
      closestEvent = event;
      closestTimeDiff = timeDiff;
    }
  });

  return closestEvent;
}

function setupEventCountdown(event) {
  const eventDate = new Date(event.time);
    localStorage.setItem("eventDetailsId",event.id) ;   
     const eventDetailsUrl = '/Events/index.html'; // Redirect to home or login page


  // Set the button's href to the event details page
  $('.btn.gradient-bg').attr('href', eventDetailsUrl);
  const countdown = setInterval(function() {
    const now = new Date();
    const timeRemaining = eventDate - now;

    // If the event has passed, stop the countdown
    if (timeRemaining <= 0) {
      clearInterval(countdown); // Stop the countdown when the event has started
      console.log('Event has started!');
      return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Update the countdown timer on the webpage
    $('.dday').text(days);
    $('.dhour').text(hours);
    $('.dmin').text(minutes);
    $('.dsec').text(seconds);
  }, 1000);
}

// Function to format the date (assuming the event.time is a valid ISO string)
function formatDate(dateString) {
    if (!dateString) return 'Date not available';
    try {
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options); 
    } catch (e) {
        console.error("Error formatting date:", e);
        return dateString;
    }
}
