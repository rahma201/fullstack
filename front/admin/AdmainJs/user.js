$(function(){
    //-----------------------------------------------Shop------------------------------------------------------------------------------------
    $("#Shop-tab").trigger("click"); // Trigger the click event to load the default tab

$("#shop-noreply-tab").trigger("click"); 
      GetAllshopNotReply();
$("#shop-accept-tab").on("click",function(){

    GetAllshopAccept();
});
$("#shop-reject-tab").on("click",function(){

    GetAllshopReject();
});
$("#shop-noreply-tab").on("click",function(){

    GetAllshopNotReply();
});

var selectedId = null;      // هنا نخزن الـ ID المختار
var selectedType = null;    // وهنا نخزن الـ type (store or maintenance)

// عند الضغط على زر عرض الصورة (مثلا من الجدول)
$(document).on('click', '.viewBookingAccept', function () {
    var imgSrc = $(this).data('image');    // الصورة
    selectedId = $(this).data('id');        // المعرف
    selectedType = $(this).data('type');    // النوع

    // عرض الصورة داخل المودال
    $('#modalImage').attr('src', "http://localhost:5147" + imgSrc);

    // فتح المودال
    $('#userModal').modal('show');
});
$(document).on('click', '.clickImg', function () {
    var imgSrc = $(this).data('image');    // الصورة
   
    $('#showimag').attr('src', "http://localhost:5147" + imgSrc);

    // فتح المودال
    $('#usermodalImage').modal('show');
});
// عند الضغط على زر قبول
$('#approveBtn').on('click', function () {
    if (selectedId && selectedType) {
        allowLogin(selectedId, true, selectedType);
    }
});

// عند الضغط على زر رفض
$('#rejectBtn').on('click', function () {
    if (selectedId && selectedType) {
        allowLogin(selectedId, false, selectedType);
    }
    console.log(selectedId, false, selectedType)

});
/////-----------------------------------------------Maintenance------------------------------------------------------------------------------------

$("#maintenance-acceptance-tab").on("click",function(){
    console.log("Loading Maintenance Acceptance Data...");
    GetAllMaintenanceAccept();
});
$("#maintenance-reject-tab").on("click",function(){
console.log("Loading Maintenance Reject Data...");
    GetAllMaintenanceReject();
});
$("#maintenance-noreply-tab").on("click",function(){
    console.log("Loading Maintenance No Reply Data...");

    GetAllMaintenanceNotReply();
});
$(document).on("click","#maintenance-tab",function(){
    console.log("Loading Maintenance No Reply Data...");

    GetAllMaintenanceNotReply();
});

//-----------------------------------------------------------------------------------------------------------------------------------
$("#government-tab").on("click",function(){
    
    GetAllGovernment();
});

$(document).on("click","#addGovernment",function(){
   $("#addUserModal").modal("show");
});
$("#saveAddGoverment").on("click",function(){
    
    AddNewGovernment();
});
});
/////////////////////////////////////////////////////shop functions///////////////////////////////////////////////////////
function GetAllshopAccept() {
        console.log("Loading Get AllBooking Not Received By Shop...");
    
        if ($.fn.DataTable.isDataTable("#shop_accept_table")) {
            $("#shop_accept_table").DataTable().destroy();
        }
    
        $("#shop_accept_table").DataTable({
            "processing": true,
            "serverSide": false,
            "ajax": {
                url: "http://localhost:5147/api/Admain/GetAllStoreAccept",
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
                    console.error("AJAX Error:", xhr.status, xhr.responseText);
                }
            },
            "columns": [
                { "data": "storeId" },
                { "data": "storeName" },
                { "data": "email" },
                { "data": "phone" },
                { "data": "location" },

                { "data": 'iamgelicense', render: function(data) {
                    // You can use a custom function to show the image URL
                    return `<img src="http://localhost:5147${data}" alt="Product Image" width="70" height="70" class="clickImg" data-image="${data}">`; // Display image
                }},
                
]        
    
        });
    }
function GetAllshopReject() {
        console.log("Loading Get AllBooking Not Received By Shop...");
    
        if ($.fn.DataTable.isDataTable("#shop_reject_table")) {
            $("#shop_reject_table").DataTable().destroy();
        }
    
        $("#shop_reject_table").DataTable({
            "processing": true,
            "serverSide": false,
            "ajax": {
                url: "http://localhost:5147/api/Admain/GetAllStoreReject",
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
                    console.error("AJAX Error:", xhr.status, xhr.responseText);
                }
            },
            "columns": [
                { "data": "storeId" },
                { "data": "storeName" },
                { "data": "email" },
                { "data": "phone" },
                { "data": "location" },

                { "data": 'iamgelicense', render: function(data) {
                    // You can use a custom function to show the image URL
                    return `<img src="http://localhost:5147${data}" alt="Product Image" width="70" height="70" class="clickImg" data-image="${data}">`; // Display image
                }},
                
              
            ]
    
        });
    }
function GetAllshopNotReply() {
    console.log("Loading Get AllBooking Not Received By Shop...");

    if ($.fn.DataTable.isDataTable("#shop_noreply_table")) {
        $("#shop_noreply_table").DataTable().destroy();
    }

    $("#shop_noreply_table").DataTable({
        "processing": true,
        "serverSide": false,
        "ajax": {
            url: "http://localhost:5147/api/Admain/GetAllStoreNotResponse",
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
                console.error("AJAX Error:", xhr.status, xhr.responseText);
            }
        },
        "columns": [
            { "data": "storeId" },
            { "data": "storeName" },
            { "data": "email" },
            { "data": "phone" },
            { "data": "location" },

            { "data": 'iamgelicense', render: function(data) {
                // You can use a custom function to show the image URL
                    return `<img src="http://localhost:5147${data}" alt="Product Image" width="70" height="70" class="clickImg" data-image="${data}">`; // Display image
            }},
                
            {
                "data": null,
                "render": function (data, type, row) {
                    return `
                   <button class="btn btn-primary viewBookingAccept" 
    data-id="${row.storeId}" 
    data-type="store" 
    data-image="${row.iamgelicense}">
    <i class="fa-solid fa-circle-info"></i> 
</button>
 `;
                }
            }
        ]

    });
}

function GetAccept(img) {
    var imageUrl = "http://localhost:5147" + img;
    $("#imgAccept").attr("src", imageUrl);
    $("#viewAcceptModal").modal("show");
}
/////////////////////////////////////////////////////maintance functions///////////////////////////////////////////////////////
function GetAllMaintenanceAccept() {
    console.log("Loading Maintenance Acceptance Data...");

    if ($.fn.DataTable.isDataTable("#maintenance_acceptance_table")) {
        $("#maintenance_acceptance_table").DataTable().destroy();
    }

    $("#maintenance_acceptance_table").DataTable({
        "processing": true,
        "serverSide": false,
        "ajax": {
            url: "http://localhost:5147/api/Admain/GetAllMaintanceAccept",
            type: "GET",
            dataSrc: function (response) {
                console.log("API Response:", response);
                if ( response.data) {
                    return response.data;
                } else {
                    console.log("Failed to load data. Invalid response format.");
                    return [];
                }
            },
            error: function (xhr, status, error) {
                console.error("AJAX Error:", xhr.status, xhr.responseText);
            }
        },
        "columns": [
            { "data": "id" },
            { "data": "maintenanceName" },
            { "data": "location" },
            { "data": "email" },
            { "data": "phone" },
            { "data": 'iamgelicense', render: function(data) {
                // You can use a custom function to show the image URL
                    return `<img src="http://localhost:5147${data}" alt="Product Image" width="70" height="70" class="clickImg" data-image="${data}">`; // Display image
            }}
        ]
    });
}

function GetAllMaintenanceReject() {
    console.log("Loading Maintenance Reject Data...");

    if ($.fn.DataTable.isDataTable("#maintenance_reject_table")) {
        $("#maintenance_reject_table").DataTable().destroy();
    }

    $("#maintenance_reject_table").DataTable({
        "processing": true,
        "serverSide": false,
        "ajax": {
            url: "http://localhost:5147/api/Admain/GetAllMaintanceReject",
            type: "GET",
            dataSrc: function (response) {
                console.log("API Response:", response);
                if (response.data) {
                    return response.data;
                } else {
                    console.log("Failed to load data. Invalid response format.");
                    return [];
                }
            },
            error: function (xhr, status, error) {
                console.error("AJAX Error:", xhr.status, xhr.responseText);
            }
        },
        "columns": [
            { "data": "id" },
            { "data": "maintenanceName" },
            { "data": "location" },
            { "data": "email" },
            { "data": "phone" },
            { "data": "iamgelicense","render": function(data) {
                    return `<img src="http://localhost:5147${data}" alt="Product Image" width="70" height="70" class="clickImg" data-image="${data}">`; // Display image
                 
                }
            },
           
        ]
    });
}


function GetAllMaintenanceNotReply() {
    console.log("Loading Maintenance No Reply Data...");

    if ($.fn.DataTable.isDataTable("#maintenance_noreply_table")) {
        $("#maintenance_noreply_table").DataTable().destroy();
    }

    $("#maintenance_noreply_table").DataTable({
        "processing": true,
        "serverSide": false,
        "ajax": {
            url: "http://localhost:5147/api/Admain/GetAllMaintanceNotReplay",
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
                console.error("AJAX Error:", xhr.status, xhr.responseText);
            }
        },
        "columns": [
            { "data": "id" },
            { "data": "maintenanceName" },
            { "data": "location" },
            { "data": "email" },
            { "data": "phone" },
            { "data": 'iamgelicense', render: function(data) {
                // You can use a custom function to show the image URL
                return `<img src="http://localhost:5147${data}" alt="Product Image" width="50" height="50">`; // Display image
            }
        },      {
            "data": null,
            "render": function (data, type, row) {
                return `<button class="btn btn-primary viewBookingAccept"
                 data-id="${row.id}" 

                data-image="${row.iamgelicense}"    data-type="maintenanc" ><i class="fa-solid fa-circle-info"></i></button>`;
            }
        }  
                
            
        ]
    });
}

//////////////////////////////////////////////////////////////////coverment functions///////////////////////////////////////////////////////
function GetAllGovernment() {
    console.log("Loading Coverment No Reply Data...");

    if ($.fn.DataTable.isDataTable(".government_table")) {
        $(".government_table").DataTable().destroy();
    }

    $(".government_table").DataTable({
        "processing": true,
        "serverSide": false,
        "ajax": {
            url: "http://localhost:5147/api/Admain/GetAllGovernment",
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
                console.error("AJAX Error:", xhr.status, xhr.responseText);
            }
        },
        "columns": [
            { "data": "userId" },
            { "data": "username" },
            {"data": null,
                "render": function (data, type, row) {
                    return `<button class="btn btn-primary viewMaintenanceAccept" data-id="${row.userId}"><i class="fa-solid fa-circle-info"></i></button>`;
                }
            },
        ]
    });
}


function AddNewGovernment() {
    
    var userData = {
        userName: $("#userName").val(),
        password: $("#password").val(),
        userType:"government",
    };

    $.ajax({
        url: "http://localhost:5147/api/Admain/AddUser", 
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(userData),
        success: function (response) {
            if (response.success) {
          $("#userName").val("")
           $("#password").val("")
           Swal.fire({
            title: "success!",
            text: "Your account was created successfully.",
            icon: "success",
            confirmButtonText: "Let's go!"
        });
        $(".government_table").DataTable().ajax.reload(null, false);
        }},
        error: function (xhr) {
            Swal.fire({
                title: "Login!",
                text: JSON.parse(xhr.responseText).message,
                icon: "error",
                confirmButtonText: "Ok"
        });         }
    });

}
function allowLogin(id, isCanLogin, type) {
    var url = '';

    if (type === 'store') {
        url = 'http://localhost:5147/api/Admain/AllowStoreToLogin';
    } else if (type === 'maintenanc') {
        url = 'http://localhost:5147/api/Admain/AllowMaintenanceToLogin';
    }

    $.ajax({
        url: url,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({
            id: id,
            isCanLogin: isCanLogin
        }),
        success: function (response) {
            Swal.fire({
                icon: isCanLogin ? 'success' : 'error',
                title: isCanLogin ? 'Approved!' : 'Rejected!',
                text: 'Operation completed successfully.',
                confirmButtonText: 'OK'
            }).then(() => {
                $('#userModal').modal('hide');
             
    if (type === 'store') {
   $("#shop_noreply_table").DataTable().ajax.reload();    } else if (type === 'maintenanc') {
    $("#maintenance_noreply_table").DataTable().ajax.reload()    }
            ;
              
            });
        },
        error: function (xhr) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Something went wrong!',
                confirmButtonText: 'OK'
            });
        }
    });
}