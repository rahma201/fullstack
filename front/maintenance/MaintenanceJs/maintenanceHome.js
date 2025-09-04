 customerId= localStorage.getItem("customerId");
var categoryMaintenanceId = 1;
console.log(customerId)
$(function() {
    
    getAllCategory();
    GetAllManitance()
    
    $(document).on("click", "#requestMaintenance", function() {
      $("#MaintenanceModal").modal("show");
    });

    $(document).on("click", "#saveMaintainceBtn", function() {
       saveBookingMaintenance();
    });
    $(document).on("click",".buttonCategoryMaintenance", function(){
         categoryMaintenanceId = $(this).data("filter");
        GetAllManitance(categoryMaintenanceId);
        console.log(categoryMaintenanceId)

    });  
    $(document).on("click","#searchMaintenanceButton", function(){
        let searchText = $("#searchMaintenance").val().toLowerCase();
        if (searchText === "") {
            // عرض الكل لما الخانة فاضية
            GetAllManitance(categoryMaintenanceId); // هذا دالة بتعرض الكل، تأكدي إنها موجودة
        } else {
            searchMaintenance(); // البحث بالكلمة
        }
        

    });
  
    
    $(document).on("keyup", "#searchMaintenance", function () {
        
        let searchText = $(this).val().trim();
    
        if (searchText === "") {
            // عرض الكل لما الخانة فاضية
            GetAllManitance(categoryMaintenanceId); // هذا دالة بتعرض الكل، تأكدي إنها موجودة
        } else {
            searchMaintenance(); // البحث بالكلمة
        }
    });
    
}); 

function getAllCategory() {
    let base = `http://localhost:5147/api/Shared/GetAllCategoryMaintenances`;

    $.ajax({
        url: base,
        type: "GET",
        contentType: "application/json",
        success: function(response) {
            console.log(response);  // Log the response to check its structure
        
            var html = '';
     
                
                $.each(response.data, function(index, item) {
                    if(index==0){
                    GetAllManitance(item.categoryMaintenanceId);
                }
                    console.log(item);  // Log each item to see its structure
                    html += `<button class=" cl6 hov1 bor3 nav-link  text-center trans-04 m-r-32 m-tb-5  buttonCategoryMaintenance" data-filter="${item.categoryMaintenanceId}">
                                ${item.name}  
                            </button>`;
                });
            
        
            $("#MaintenanceCategores").html(html);
        },        
        error: function(err) {
            console.log("Cannot get subcategory:", err);
        }
    });
}

function GetAllManitance(categoryMaintenanceId){   $("#ListCardMaintaince").empty()
    $.ajax({
        url: "http://localhost:5147/api/Shared/GetAllMaintanceByCategory/" + categoryMaintenanceId,
        type: "GET",
        contentType: "application/json",
        success: function(response) {
            console.log(response);  // Log the response to check its structure
        
         
            var html = '';
        
                $.each(response.data, function(index, item) {
                    console.log("poduct"+item);  // Log each item to see its structure
                    html += `	
                         <div class="col-sm-3 col-md-4 col-lg-3 p-b-35 isotope-item women">
					<!-- Block2 -->
					<div class="block2">
						<div class="block2-pic hov-img0">
							<img src="../../maintenance/img/maintenance.png" alt="IMG-PRODUCT">

							<a class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1" id="btnMaintenance" onclick="localStorage.setItem('maintenanceclickId',${item.id});window.location.href='maintenanceDetails.html'">
								Quick View
							</a>
						</div>

						<div class="block2-txt flex-w flex-t p-t-14 ">
							<div class="block2-txt-child1 flex-col-l " >
								<a  class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6" style="margin-left: 20px;">
								  	<span  style="color:#222222">  Name: 	</span>
                                    <span>	${item.maintenanceName}   </span>         
                                <br>  
                                	<span  style="color:#222222">  Location: 	</span>
                                	<span>${item.location}  </span>  
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

function searchMaintenance() 
{
    var searchValue = $("#searchMaintenance").val().toLowerCase();
    console.log(searchValue)
    $.ajax({
        url: "http://localhost:5147/api/Shared/SearchMaintenance?name=" + searchValue,
        type: "GET",
        contentType: "application/json",
        success: function(response) {
            if (response.data.length === 0|| response.success === false) {
                
                $("#ListCardMaintaince").html(`
                    <p>No results found. </p>
                    <br>
                    <p> Try searching for something else.</p>
                    `);
                

            }
            else{
            console.log(response);  // Log the response to check its structure
        
              
            $("#ListCardMaintaince").empty()
            var html = '';
        
                $.each(response.data, function(index, item) {
                    console.log("poduct"+item);  // Log each item to see its structure
                    html += `	
                         <div class="col-sm-3 col-md-4 col-lg-3 p-b-35 isotope-item women">
					<!-- Block2 -->
					<div class="block2">
						<div class="block2-pic hov-img0">
							<img src="../../maintenance/img/maintenance.png" alt="IMG-PRODUCT">

							<a class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1" id="btnMaintenance" onclick="localStorage.setItem('maintenanceId',${item.id});window.location.href='maintenanceDetails.html'">
								Quick View
							</a>
						</div>

						<div class="block2-txt flex-w flex-t p-t-14 ">
							<div class="block2-txt-child1 flex-col-l" >
								<a  class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6" style="margin-left: 20px;">
								  	<span  style="color:#222222">  Name: 	</span>
                                    <span>	${item.maintenanceName}   </span>         
                                <br>  
                                	<span  style="color:#222222">  Location: 	</span>
                                	<span>${item.location}  </span>  
								</a>

								
							</div>

						
						</div>
					</div>
				</div>

			`;
                });
            
        
            $("#ListCardMaintaince").html(html);
        }},        
        error: function(err) {
            $("#ListCardMaintaince").html(`
                <p>No results found.</p>
                <br>
                <br>
                <p>Try searching for something else.</p>
                `);
               

        }
        
    });   
}
function saveBookingMaintenance() 
{
    customerId= localStorage.getItem("customerId")||undefined;
console.log(customerId)
    if(customerId!=0 &&customerId!=null &&customerId!=undefined){
    let formData = new FormData();

    formData.append('title', $('#titleMoto').val());
    formData.append('date', $('#date').val());
    formData.append('customerNote', $('#description').val());
    formData.append('customerId', customerId); // عدل هذا حسب النظام لديك
    formData.append('location', $('#location').val());
    formData.append('bikeType', $('#bikeType').val());

    // صورة الدراجة
    let imageFile = $('#bikeImage')[0].files[0];
    if (imageFile) {
        formData.append('imageUrl', imageFile);
    }

    $.ajax({
        url: 'http://localhost:5147/api/Customer/AddBooking',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            if (response.success) {
                $("#MaintenanceModal").modal("hide");

                Swal.fire({
                    title: "Success!",
                    text: "Booking saved successfully!",
                    icon: "success",
                    confirmButtonText: "OK"
                });
                // Reset form or close modal here
            } else {
                Swal.fire({
                    title: "Oops!",
                    text: "Something went wrong while saving the booking.",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
        },
        error: function (xhr, status, error) {
            Swal.fire({
                title: "Oops!",
                text: "Failed to send the request. Please try again.",
                icon: "error",
                confirmButtonText: "OK"
            });
            console.error("AJAX Error:", status, error);
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
            $("#authModal").modal("show");

        }
    });
    return;
}
}
