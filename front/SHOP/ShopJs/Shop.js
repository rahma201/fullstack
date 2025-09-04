
let customerId= localStorage.getItem("customerId")||0;
var shopclickId=0;
let selectedSort = null;
let selectedColor = null;
let selectedStartPrice = null;
let selectedEndPrice = null;
var clickCategory="Motorcycle";
console.log(customerId)
$(function() {
    GetAllMotorcycle(shopclickId);
    $(document).trigger("click","#motorcycle");
    $( ".buttonAllMoto").trigger("click");

    $(document).on("click","#getProfile", function(){
        window.location.href="/SHOP/Profile.html"
    });
    getAllShop();
    $(document).on("click",".buttonCategory", function(){
        var filterValue = $(this).data("filter")||1;
        console.log("Category"+filterValue);
        getAllProductbyCategory(filterValue);

    });
    $(document).on("click","#Login", function(){
        Loginshop();

    });
    $(document).on("click",".buttonAllProducts", function(){
        console.log("===getAllProduct===");
        getAllProduct(shopclickId)

    });
    $(document).on("click",".ProductDetails", function(){
        console.log("===ProductDetails===");    

        var IdOfProductDetails = $(this).attr("data-id"); 
        localStorage.setItem("idOfProductDetails",IdOfProductDetails)
        window.location.href="/SHOP/Product-detail.html"

    });
    $(document).on("click",".MotoDetails", function(){
        console.log("===MotoDetails===");

        var IdMotoDetails = $(this).attr("data-id"); 
        localStorage.setItem("idOfMotoDetails",IdMotoDetails)
        window.location.href="/SHOP/Moto-details.html"


    });
    $(document).on("click",".AddProductToCart", function(){
        console.log("===AddProductToCart===");
        AddProductToCart()

    });
    $(document).on("click", ".shopclick", function() {
         shopclickId = $(this).attr("data-id");  // Get shop ID from the clicked element
        // Perform any action with the shopId, like redirecting
     $("#Categories").show();
     $("#ListCardItem").empty();
     GetMotorcycleByType();
     GetAllMotorcycle(shopclickId);
 
    }); 
$(document).on("click", "#Products", function() {
    clickCategory="Products";
        getAllCategoryProduct(parseInt(shopclickId));
        getAllProduct();
}); 
$(document).on("click", ".Motorcycle", function() {
    clickCategory="Motorcycle";
    GetMotorcycleByType();
}); 
$(document).on("click", ".GetAllUsedMoto", function() {
        GetUsedAllMotorcycle(shopclickId);
}); 
$(document).on("click", ".GetAllNewMoto", function() {

    GetNewAllMotorcycle(shopclickId)
}); 
$(document).on("click", ".buttonAllMoto", function() {
    GetAllMotorcycle(shopclickId);
    
});
let customerId = localStorage.getItem("customerId") ||"-1"; // تحديث القيمة أولًا

$(document).on("click", ".addItemInWhishList", function() {
   
        var productId = $(this).attr("data-product-id");  
        AddItemWishListInShop(productId,0,customerId);
       
       
  
    
}); 
$(document).on("click", ".addMotoInWhishList", function() {
  
    
    var MotoId = $(this).attr("data-id");  

    AddItemWishListInShop(0,MotoId,customerId);
       
    
});  
///////////////////////////search//////////////////////////////////////
$(".buttonSearch").on("click", function(){
    let searchText = $(".searchInput").val().toLowerCase();

    if (searchText === "") {
            if(clickCategory==="Motorcycle")
                 {
                    GetAllMotorcycle(); // هذا دالة بتعرض الكل، تأكدي إنها موجودة
                 }
            else if(clickCategory==="Products")
            {    
                 getAllProduct(shopclickId);
                }
                
    } else {
        
            if(clickCategory==="Motorcycle")
                {
          searchMotorcycle(searchText); // هذا دالة بتعرض الكل، تأكدي إنها موجودة
                }
           else if(clickCategory==="Products")
           {searchProduct(searchText);}
        }
    

});


$(document).on("keyup", "#searchInput", function () {
    
    let searchText = $(this).val().trim();

    if (searchText.length === 0) {
        if(clickCategory==="Motorcycle"){
      GetAllMotorcycle(shopclickId); // هذا دالة بتعرض الكل، تأكدي إنها موجودة
}
        else if(clickCategory==="Products")
        {    
             getAllProduct(shopclickId);
            }
            
} else {
  
        if(clickCategory==="Motorcycle")
            {
      searchMotorcycle(searchText); // هذا دالة بتعرض الكل، تأكدي إنها موجودة
            }
       else if(clickCategory==="Products")
       {searchProduct(searchText);}
    }
});


// عند الضغط على أي عنصر فلتر
$(document).on("click", ".filter-link", function (e) {
    e.preventDefault();

    let filterType = $(this).data("filter-type");
    let value = $(this).data("value");

    // نحفظ القيمة حسب نوع الفلتر
    switch (filterType) {
        case "sort":
            selectedSort = value;
            break;
        case "color":
            selectedColor = value;
            break;
        case "price":
            let prices = value.split("-");
            selectedStartPrice = prices[0];
            selectedEndPrice = prices[1] || null;
            break;
    }

    if(clickCategory==="Motorcycle")
        {
  filterMotorcycle(); // هذا دالة بتعرض الكل، تأكدي إنها موجودة
        }
   else if(clickCategory==="Products")
   { filterProduct();}
});



});

function getAllShop() {
    $.ajax({
        url: "http://localhost:5147/api/Shared/GetAllShop",  // Corrected endpoint
        type: "GET",
        contentType: "application/json",
        success: function(response) {
            console.log(response);  // Log response to verify structure

            var html = '';
            $("#ShopCards").empty();  // Clear existing shop cards
           
            $.each(response.data, function(index, shop) {  // Assuming response.data contains an array of shops
                console.log("Shop:", shop);  // Log each shop object
                    if(index==0){ 
                        shopclickId=shop.storeId
                        GetMotorcycleByType();
                        GetAllMotorcycle(shopclickId);

                    }
                // Add 'active' class to the first shop
                var activeClass = (index === 0) ? 'active' : '';  // Check if it's the first shop
        
                var shopHtml = `
                    <a class="nav-link swiper-slide text-center shopclick ${activeClass}" data-id="${shop.storeId}">
                        <div class="category-item">${shop.storeName}</div>
                    </a>
                `;

                html += shopHtml;  // Append shop HTML
            });

            $("#ShopCards").append(html);  // Append all shops to the container

            // Trigger the first shop click to load its data
            if (response.data.length > 0) {
                // Simulate a click on the first shop
                $(".shopclick:first").click();
            }
        },
        error: function(err) {
            console.log("Cannot get shops:", err);
        }
    });
}


function getAllCategoryProduct(shopId) {
    let base = `http://localhost:5147/api/Shared/GetAllCategoryProductByShop/$`+shopId;

    $.ajax({
        url: base,
        type: "GET",
        contentType: "application/json",
        success: function(response) {
            console.log(response);  // Log the response to check its structure
        
            var html = '';
            
            if (response.success==="false") {
                html += `<button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5  active buttonAllProducts">
                            All Products
                        </button>`;
            } else {
                html += `<button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 buttonAllProducts active" >
                            All Products
                        </button>`;
                
                $.each(response.data, function(index, item) {
                    console.log(item);  // Log each item to see its structure
                    html += `<button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5  buttonCategory" data-filter="${item.categoryProductId}">
                                ${item.name}
                            </button>`;
                });
            }
        
            $("#GetAllSubCategory").html(html);
            $(".buttonAllProducts:first").click();
        },        
        error: function(err) {
            console.log("Cannot get subcategory:", err);
        }
    });
}
function getAllProductbyCategory(CategoryId) {
    $.ajax({
        url: "http://localhost:5147/api/Customer/GetProductbyCategory/$" + CategoryId,
        type: "GET",
        contentType: "application/json",
        success: function(response) {
            console.log(response);  // Log the response to check its structure
        
            var html = '';
            $("#ListCardItem").empty()

                $.each(response.data, function(index, item) {
                    console.log("poduct"+item);  // Log each item to see its structure
                    html += `	
                    <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
					<!-- Block2 -->
					<div class="block2">
						<div class="block2-pic hov-img0">
						                    <img src="${item.images}" alt="IMG-PRODUCT" style="width: 100%; height: 260px;">


							<a class="block2-btn flex-c-m  	quickView stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1 ProductDetails" data-id="${item.productId}">
								Quick View
							</a>
						</div>

						<div class="block2-txt flex-w flex-t p-t-14">
							<div class="block2-txt-child1 flex-col-14 ">
								<a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
								${item.name}
								</a>

								<span class="stext-105 cl3" style="margin-left: 20px;color: #FEBA17;">
								${item.price}
								</span>
							</div>

							<div class="block2-txt-child2 flex-r p-t-3">
								<a  class="btn-addwish-b2 dis-block pos-relative js-addwish-b2 addItemInWhishList" data-product-id=${item.productId}>
                                                 <i class="fa-solid fa-heart loveicon"  data-product-id=${item.productId}></i>     

								</a>
							</div>
						</div>
					</div>
				</div>

			`;
                });
            
        
            $("#ListCardItem").html(html);
        },        
        error: function(err) {
            console.log("Can not get product:", err);
            $("#ListCardItem").empty()

        }
    });
}

function getAllProduct(storeId) {
    $.ajax({
        url: "http://localhost:5147/api/Customer/GetAllProduct/$" +storeId,
        type: "GET",
        contentType: "application/json",
        success: function(response) {
            console.log(response);  // Log the response to check its structure
        
            $("#ListCardItem").empty()
            var html = '';
        
                $.each(response.data, function(index, item) {
                    console.log("poduct"+item);  // Log each item to see its structure
                    html += `	
                    <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
					<!-- Block2 -->
					<div class="block2">
						<div class="block2-pic hov-img0">
						                    <img src="${item.images}" alt="IMG-PRODUCT" style="width: 100%; height: 260px;">


							<a class="block2-btn flex-c-m quickView stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1 ProductDetails" data-id="${item.productId}">
								Quick View
							</a>
						</div>

						<div class="block2-txt flex-w flex-t p-t-14">
							<div class="block2-txt-child1 flex-col-14 ">
								<a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
								${item.name}
								</a>

								<span class="stext-105 cl3" style="margin-left: 20px;color: #FEBA17;">
								${item.price}
								</span>
							</div>

							<div class="block2-txt-child2 flex-r p-t-3">
								<a  class="btn-addwish-b2 dis-block pos-relative js-addwish-b2 addItemInWhishList" data-product-id=${item.productId}>
                                                 <i class="fa-solid fa-heart loveicon"  data-product-id=${item.productId}></i>     

								</a>
							</div>
						</div>
					</div>
				</div>

			`;
                });
            
        
            $("#ListCardItem").html(html);
        },        
        error: function(err) {
            console.log("Can not get product:", err);
        }
    });
}
function GetMotorcycleByType() {

    $("#GetAllSubCategory").empty();

              var  html = `<button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 GetAllSubCategory active  buttonAllMoto" data-filter="*">
                            All Moto
                        </button>
                        <button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5  GetAllSubCategory GetAllUsedMoto" data-filter="*">
                          Used
                        </button>
                          <button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5  GetAllSubCategory GetAllNewMoto" data-filter="*">
                          New
                        </button>`;
                     

        
            $("#GetAllSubCategory").html(html);
         $(".GetAllSubCategory:first").click();
}
function GetUsedAllMotorcycle(shopclickId){
    $.ajax({
        url: "http://localhost:5147/api/Customer/GetAllUsedMotorcycle/$"+shopclickId ,
        type: "GET",
        contentType: "application/json",
        success: function(response) {
            console.log(response);  // Log the response to check its structure
        
            $("#ListCardItem").empty()
            var html = '';
        
                $.each(response.data, function(index, item) {
                    console.log("poduct"+item);  // Log each item to see its structure
                    html += `	
                    <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
					<!-- Block2 -->
					<div class="block2">
						<div class="block2-pic hov-img0">
                    <img src="${item.images}" alt="IMG-PRODUCT" style="width: 100%; height: 260px;">
							<a class="block2-btn quickView flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1 MotoDetails" data-id="${item.motorcycleId}">
								Quick View
							</a>
						</div>
						<div class="block2-txt flex-w flex-t p-t-14">
							<div class="block2-txt-child1 flex-col-l ">
								<a  class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
								${item.name}
								</a>

								<span class="stext-105 cl3" style="margin-left: 20px;color: #FEBA17;">
								${item.price}
								</span>
							</div>

							<div class="block2-txt-child2 flex-r p-t-3" >
								<a class="btn-addwish-b2 dis-block pos-relative js-addwish-b2 addMotoInWhishList" data-id=${item.motorcycleId}>
                                                 <i class="fa-solid fa-heart loveicon"></i>     

								</a>
							</div>
						</div>
					</div>
				</div>

			`;
                });
            
        
            $("#ListCardItem").html(html);
        },        
        error: function(err) {
            console.log("Can not get product:", err);
        }
    });   
}
function GetNewAllMotorcycle(shopclickId){
    $.ajax({
        url: "http://localhost:5147/api/Customer/GetAllNewMotorcycle/$"+shopclickId ,
        type: "GET",
        contentType: "application/json",
        success: function(response) {
            console.log(response);  // Log the response to check its structure
        
            $("#ListCardItem").empty()
            var html = '';
        
                $.each(response.data, function(index, item) {
                    console.log("poduct"+item);  // Log each item to see its structure
                    html += `	
                    <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
					<!-- Block2 -->
					<div class="block2">
						<div class="block2-pic hov-img0">
                    <img src="${item.images}" alt="IMG-PRODUCT" style="width: 100%; height: 260px;">
							<a class="block2-btn quickView flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1 MotoDetails" data-id="${item.motorcycleId}">
								Quick View
							</a>
						</div>
						<div class="block2-txt flex-w flex-t p-t-14">
							<div class="block2-txt-child1 flex-col-l ">
								<a  class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
								${item.name}
								</a>

								<span class="stext-105 cl3" style="margin-left: 20px;color: #FEBA17;">
								${item.price}
								</span>
							</div>

							<div class="block2-txt-child2 flex-r p-t-3">
								<a class="btn-addwish-b2 dis-block pos-relative addMotoInWhishList" data-id=${item.motorcycleId}>
                                                 <i class="fa-solid fa-heart loveicon"></i>     
								</a>
							</div>
						</div>
					</div>
				</div>

			`;
                });
            
        
            $("#ListCardItem").html(html);
        },        
        error: function(err) {
            console.log("Can not get product:", err);
        }
    });   
}
function GetAllMotorcycle(shopclickId){
    $.ajax({
        url: "http://localhost:5147/api/Customer/GetAllMotorcycle/$"+shopclickId ,
        type: "GET",
        contentType: "application/json",
        success: function(response) {
            console.log(response);  // Log the response to check its structure
        
            $("#ListCardItem").empty()
            var html = '';
        
                $.each(response.data, function(index, item) {
                    console.log("poduct"+item);  // Log each item to see its structure
                    html += `	
                    <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women" >
					<!-- Block2 -->
					<div class="block2">
						<div class="block2-pic hov-img0">
                    <img src="${item.images}" alt="IMG-PRODUCT" style="width:100%; height: 260px ;">
							<a class="block2-btn quickView flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1 MotoDetails" data-id="${item.motorcycleId}">
								Quick View
							</a>
						</div>
						<div class="block2-txt flex-w flex-t p-t-14 " >
							<div class="block2-txt-child1 flex-col-l ">
								<a" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
								${item.name}
								</a>

								<span class="stext-105 cl3" style="margin-left: 20px;color: #FEBA17;">
								${item.price}
								</span>
							</div>

							<div class="block2-txt-child2 flex-r p-t-3">
								<a  class="btn-addwish-b2 dis-block pos-relative addMotoInWhishList" data-id=${item.motorcycleId}>
                                                 <i class="fa-solid fa-heart loveicon" ></i>     
								</a>
							</div>
						</div>
					</div>
				</div>

			`;
                });
            
        
            $("#ListCardItem").html(html);
        },        
        error: function(err) {
            console.log("Can not get product:", err);
        }
    });   
}
function AddItemWishListInShop(productId,MotoId,customerId){
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
            Swal.fire({
                title: "Error!",
                text: "Failed to add item to wishitem",
                icon: "error",
                confirmButtonText: "OK"
            })}
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
        $("#LoginModal").modal("show");

            }
        });
        return;
    }
}

function LoginShop(){
    let userName = $("#usernameLogin").val();
    let password = $("#passwordLogin").val();
    let data = {
        userName: userName,
        password: password
    };
    $.ajax({
        url: "http://localhost:5147/api/Shared/Login",
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(response){
            console.log("API Response:", response);
            if(response.success){
                setCookie("jwtToken", response.data.token);
               $("#usernameLogin").val("");
               $("#passwordLogin").val("");
               $("#login-form").hide();
                localStorage.setItem("UserType",response.data.type);
                if(response.data.type=="Shop"){
                    var shopId=response.data.shopId;
                    localStorage.setItem("ShopId",shopId);
                }
                else if(response.data.type=="Customer"){
                    var customerId=response.data.customerId||0;
                    localStorage.setItem("customerId",customerId);
                }
            } 
            else {
                Swal.fire({
                    title: "Login!",
                    text: "Login failed. " + response.message,
                    icon: "error",
                    confirmButtonText: "Ok"
            }); 
            }
        },
        error: function(xhr, status, error){
            console.error("AJAX Error:", xhr.status, xhr.responseText);
            Swal.fire({
                title: "Login!",
                text: "Login failed. " + xhr.status,
                icon: "error",
                confirmButtonText: "Ok"
        }); 
        }
    });
}

function searchProduct(searchValue){
    console.log(searchValue)
    $.ajax({
        url: "http://localhost:5147/api/Customer/SearchProduct?name=" + searchValue,
        type: "GET",
        contentType: "application/json",
        success: function(response) {
            if (response.data.length === 0|| response.success === false) {
                
                $("#ListCardItem").html(`
                    <p>No results found. </p>
                    <br>
                    <p> Try searching for something else.</p>
                    `);
                

            }
            else{
            console.log(response);  // Log the response to check its structure
        
              
            $("#ListCardItem").empty()
            var html = '';
        
            $.each(response.data, function(index, item) {
                console.log("poduct"+item);  // Log each item to see its structure
                html += `	
                <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                <!-- Block2 -->
                <div class="block2">
                    <div class="block2-pic hov-img0">
                                        <img src="${item.images}" alt="IMG-PRODUCT" style="100%; height: 260px;">


                        <a class="block2-btn flex-c-m quickView stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1 ProductDetails" data-id="${item.productId}">
                            Quick View
                        </a>
                    </div>

                    <div class="block2-txt flex-w flex-t p-t-14">
                        <div class="block2-txt-child1 flex-col-14 ">
                            <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                            ${item.name}
                            </a>

                            <span class="stext-105 cl3" style="margin-left: 20px;color: #FEBA17;">
                            ${item.price}
                            </span>
                        </div>

                        <div class="block2-txt-child2 flex-r p-t-3">
                            <a  class="btn-addwish-b2 dis-block pos-relative js-addwish-b2 addItemInWhishList" data-product-id=${item.productId}>
                                                                                               <i class="fa-solid fa-heart loveicon" data-product-id=${item.productId}></i>      

                            </a>
                        </div>
                    </div>
                </div>
            </div>

        `;
            });
        
            $("#ListCardItem").html(html);
        }},        
        error: function(err) {
            $("#ListCardItem").html(`
                <p>No results found.</p>
                <br>
                <br>
                <p>Try searching for something else.</p>
                `);
               

        }
        
    });   
}
 function searchMotorcycle(searchValue){
    console.log(searchValue)
    $.ajax({
        url: "http://localhost:5147/api/Customer/SearchMotorcycle?name=" + searchValue,
        type: "GET",
        contentType: "application/json",
        success: function(response) {
            if (response.data.length === 0|| response.success === false) {
                
                $("#ListCardItem").html(`
                    <p>No results found. </p>
                    <br>
                    <p> Try searching for something else.</p>
                    `);
                

            }
            else{
            console.log(response);  // Log the response to check its structure
        
              
            $("#ListCardItem").empty()
            var html = '';
        
             
            $.each(response.data, function(index, item) {
                console.log("poduct"+item);  // Log each item to see its structure
                html += `	
                <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women" >
                <!-- Block2 -->
                <div class="block2">
                    <div class="block2-pic hov-img0">
                <img src="${item.images}" alt="IMG-PRODUCT" style="width: 100%;height: 260px ;">
                        <a class="block2-btn quickView flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1 MotoDetails" data-id="${item.motorcycleId}">
                            Quick View
                        </a>
                    </div>
                    <div class="block2-txt flex-w flex-t p-t-14 " >
                        <div class="block2-txt-child1 flex-col-l ">
                            <a" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                            ${item.name}
                            </a>

                            <span class="stext-105 cl3" style="margin-left: 20px;color: #FEBA17;">
                            ${item.price}
                            </span>
                        </div>

                        <div class="block2-txt-child2 flex-r p-t-3">
                            <a  class="btn-addwish-b2 dis-block pos-relative addMotoInWhishList" data-id=${item.motorcycleId}>
                                                 <i class="fa-solid fa-heart loveicon"></i>      
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        `;
            });
            
        
            $("#ListCardItem").html(html);
        }},        
        error: function(err) {
            $("#ListCardItem").html(`
                <p>No results found.</p>
                <br>
                <br>
                <p>Try searching for something else.</p>
                `);
               

        }
        
    });   
}
function filterMotorcycle() {
    $.ajax({
        url: `http://localhost:5147/api/Customer/FilteringMotorcycle`,
        type: "GET",
        data: {
            shopId: shopclickId,
            sortby: selectedSort,
            color: selectedColor,
            startPrice: selectedStartPrice,
            endPrice: selectedEndPrice
        },
        success: function (response) {
            if (response.success && response.data.length > 0) {
                renderMotorcycleProducts(response.data);
            } else {
                $("#ListCardItem").html("<p>No motorcycles found.</p>");
            }
        },
        error: function () {
            $("#ListCardItem").html("<p>Error loading motorcycles.</p>");
        }
    });
}
function filterProduct() {
    $.ajax({
        url: `http://localhost:5147/api/Customer/FilteringProduct`,
        type: "GET",
        data: {
            shopId: shopclickId,
            sortby: selectedSort,
            color: selectedColor,
            startPrice: selectedStartPrice,
            endPrice: selectedEndPrice
        },
        success: function (response) {
            if (response.success) {
                renderProductCards(response.data);
            } else {
                $("#ListCardItem").html("<p>No products found.</p>");
            }
        },
        error: function () {
            $("#ListCardItem").html("<p>Error loading products.</p>");
        }
    });
}
function renderMotorcycleProducts(data) {
    $("#ListCardItem").empty();

    if (data.length === 0) {
        $("#ListCardItem").html(`
            <p>No motorcycles found.</p>
            <br><p>Try adjusting the filters or search keywords.</p>
        `);
        return;
    }

    let html = "";
        
    $.each(data, function(index, item) {
        console.log("poduct"+item);  // Log each item to see its structure
        html += `	
        <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women" >
        <!-- Block2 -->
        <div class="block2">
            <div class="block2-pic hov-img0">
        <img src="http://localhost:5147${item.images}" alt="IMG-PRODUCT" style="width:100%; height: 260px ;">
                <a class="block2-btn quickView flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1 MotoDetails" data-id="${item.motorcycleId}">
                    Quick View
                </a>
            </div>
            <div class="block2-txt flex-w flex-t p-t-14 " >
                <div class="block2-txt-child1 flex-col-l ">
                    <a" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                    ${item.name}
                    </a>

                    <span class="stext-105 cl3" style="margin-left: 20px;color: #FEBA17;">
                    ${item.price}
                    </span>
                </div>

                <div class="block2-txt-child2 flex-r p-t-3">
                    <a  class="btn-addwish-b2 dis-block pos-relative addMotoInWhishList" data-id=${item.motorcycleId}>
                                                 <i class="fa-solid fa-heart loveicon"></i>      
                    </a>
                </div>
            </div>
        </div>
    </div>

`;
    });
    

    $("#ListCardItem").html(html);
}
function renderProductCards(data) {
    $("#ListCardItem").empty();

    if (data.length === 0) {
        $("#ListCardItem").html(`
            <p>No products found.</p>
            <br><p>Try adjusting the filters or search keywords.</p>
        `);
        return;
    }

    let html = "";
    $.each(data, function(index, item) {
        console.log("poduct"+item);  // Log each item to see its structure
        html += `	
        <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
        <!-- Block2 -->
        <div class="block2">
            <div class="block2-pic hov-img0">
                                <img src="http://localhost:5147${item.images}" alt="IMG-PRODUCT" style="width: 250px; height: 260px;">


                <a class="block2-btn flex-c-m quickView stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1 ProductDetails" data-id="${item.productId}">
                    Quick View
                </a>
            </div>

            <div class="block2-txt flex-w flex-t p-t-14">
                <div class="block2-txt-child1 flex-col-14 ">
                    <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                    ${item.name}
                    </a>

                    <span class="stext-105 cl3" style="margin-left: 20px;color: #FEBA17;">
                    ${item.price}
                    </span>
                </div>

                <div class="block2-txt-child2 flex-r p-t-3">
                    <a  class="btn-addwish-b2 dis-block pos-relative js-addwish-b2 addItemInWhishList" data-product-id=${item.productId}>
                                                 <i class="fa-solid fa-heart loveicon"  data-product-id=${item.productId}></i>     


                    </a>
                </div>
            </div>
        </div>
    </div>

`;
    });

    $("#ListCardItem").html(html);
}
