// تخزين معرف المتجر من LocalStorage
var shopId = localStorage.getItem("ShopId");

$(function() {
    // تحميل جدول الدراجات عند فتح الصفحة
    loadMotoTable(shopId);

    // زر حفظ دراجة جديدة
    $(document).on("click", "#MotoSave", function () {
        console.log("MotoSave")
        addMoto(shopId);
    });
    $(document).on("click", ".getReviewsmoto", function () {
        var MotoId = $(this).data("id");
        localStorage.setItem("MotoIdreview", MotoId);
        window.location.href = "review.html";
    });
    
    // زر تعديل دراجة موجودة
    $(document).on("click", ".editeMoto", function () {
        $("#editeMotoModals").modal("show");
        var motoId = $(this).data("id");
        localStorage.setItem("motoId", motoId);
        editeMoto(motoId);
    });   
     $(document).on("click", ".GetModulButton", function () {
        $("#viewMotoModal").modal("show");
        var motoId = $(this).data("id");
        localStorage.setItem("motoId", motoId);
        viewMoto(motoId);
    });
    
    // زر حفظ التعديلات
    $("#saveEditMoto").on("click", function () {
        var motoId = localStorage.getItem("motoId");
        updateMoto(motoId);
    });
    $("#addNewMoto").on("click", function () {
      $("#addMotoModel").modal('show');
    });
    $(document).on("click", ".deleteMoto", function () {
        console.log("deleteMoto clicked");

        var motoId = $(this).data("id");
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMoto(motoId);
            }
        });
        // Show SweetAlert confirmation
     // Add new color input



    });
    
});

function addMoto(shopId) {
    var formData = new FormData();
    var files = $("#addMotoImages")[0].files;
    
    formData.append("name", $("#addMotoName").val());
    formData.append("engineType", $("#addMotoEngineType").val());
    formData.append("year", $("#addMotoYear").val());
    formData.append("mileage", $("#addMotoMileage").val());
    formData.append("brand", $("#addMotoBrand").val());
    formData.append("condition", $("#addMotoCondition").val());
    formData.append("price", $("#addMotoPrice").val());
    formData.append("stockQuantity", $("#addMotoStockQuantity").val());
    formData.append("description", $("#addMotoDescription").val());
    formData.append("StoreId", shopId);
        // إضافة الألوان
        var colors = [];
        $(".color-pickerMoto").each(function () {
            colors.push($(this).val());
        });
        formData.append("colors", colors.join(','));
    if (files.length > 0) {
        formData.append("images", files[0]);
    }

    // إرسال البيانات إلى الخادم
    $.ajax({
        url: 'http://localhost:5147/api/ShopOwner/AddMotorcycle',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            if (response.success) {
                $(".addMotoModel").modal('hide');
                Swal.fire("Success!", "The motorcycle has been added successfully!", "success",  "OK");
                $("#addMotoName").val("");
$("#addMotoEngineType").val("");
$("#addMotoYear").val("");
$("#addMotoMileage").val("");
$("#addMotoBrand").val("");
$("#addMotoCondition").val("");
$("#addMotoPrice").val("");
$("#addMotoStockQuantity").val("");
$("#addMotoDescription").val("");

                $("#card_moto_table").DataTable().ajax.reload(null, false);
            
            } else {
                Swal.fire("Error!", response.message, "error");
            }
            
        }
        
    });
}

// وظيفة تحميل قائمة الدراجات

function loadMotoTable(shopId) {
    console.log("Loading MotoTable..."+shopId);


    let apiUrl = "http://localhost:5147/api/ShopOwner/GetMotocyleByShop/$" + shopId;

    console.log("API URL:", apiUrl);

    // Check if the DataTable is already initialized
    if ($.fn.DataTable.isDataTable("#card_moto_table")) {
        var table = $('#card_moto_table').DataTable();
        table.clear().rows.add(response.data).draw();
        
    }

    $("#card_moto_table").DataTable({
        "processing": false,
        "serverSide": false,
        "ajax": {
            url: apiUrl,
            type: "GET",
            dataSrc: function (response) {
                console.log("API Response:", response);
                if (response.success && response.data) {
                    console.log(response.data)
                    return response.data;

                } else {
                    Swal.fire("Error!", "Failed to load data. Invalid response format.", "error");
                    return [];
                }
            },
            error: function (xhr, status, error) {
                console.error("AJAX Error:", xhr.status, xhr.responseText);
                Swal.fire("Error!", `Failed to load categories. Status: ${xhr.status}`, "error");
            }
        },   
    
        "columns": [
    { 
            "data": null, // This is the column where we will show the index
            "render": function (data, type, row, meta) {
                return meta.row + 1; // `meta.row` is zero-based, so we add 1 to make it 1-based.
            },
        },            { "data": "name" },
            { "data": 'images', render: function(data) {
                // You can use a custom function to show the image URL
                return `<img src="${data}" alt="Product Image" width="50" height="50">`; // Display image
            }},
            { "data": "price" },
            { "data": "quantity" },

            {
                "data": null,
                "render": function (data, type, row) {
                    return `
<button class="btn btn-review getReviewsmoto" data-id="${row.motorcycleId}"><i class="fa-regular fa-star-half-stroke"></i></i></button>

                        <button class="btn btn-info GetModulButton" data-id="${row.motorcycleId}"><i class="fa-solid fa-circle-info"></i></button>

                        <button class="btn btn-primary editeMoto " data-id="${row.motorcycleId}"><i class="fa-solid fa-pencil"></i></button>
                    <button class="btn btn-danger deleteMoto" data-id="${row.motorcycleId}"><i class="fa-solid fa-trash"></i></button>

                    `;
                }
            }
        ]
    });
}
// وظيفة تحميل بيانات دراجة للتعديل


function viewMoto(motoId) {
    // API URL to fetch product details
    let apiUrl = `http://localhost:5147/api/Customer/GetMotorcycle/$` + motoId;

    $.ajax({
        url: apiUrl, // API to fetch product details
        type: "GET",
        success: function(response) {
            if (response.success) {
                // Populate modal with product data
                $("#viewMotoName").val(response.data.name);
                $("#viewEngineType").val(response.data.engineType);
                $("#viewYear").val(response.data.year);
                $("#viewMileage").val(response.data.mileage);
                $("#viewCondition").val(response.data.condition);
                $("#viewMotoPrice").val(response.data.price);
                $("#viewStockQuantity").val(response.data.quantity);
                $("#viewMotoDescription").val(response.data.description);
               $("#getMotoBrand").val(response.data.brand);

                // Handle images
                $("#viewMotoImagesContainer").empty();
                if (response.data.images) {
                    var imageElement = $('<img>', {
                        src: response.data.images,  // Use the single image URL
                        class: 'img-thumbnail',
                        style: 'width: 400px; height: 300px; margin-right: 10px;',
                        alt: 'Product Image'
                    });
                    $("#viewMotoImagesContainer").append(imageElement);
                } else {
                    $("#viewMotoImagesContainer").append('<p>No images available</p>');
                }

                // Handle colors
           // Handle colors

// Log colors to check the format
console.log("Raw colors from API:", response.data.colors);
          // Split the string into an array
// Check the colors string
console.log(response.data.colors); // Ensure this contains the correct data

// Split the string into an array
var colorsArray = response.data.colors ? response.data.colors.split(',') : [];
// Assuming you have a response with the colors as a comma-separated string

// Clear the existing color pickers
$("#viewColorPickerContainerMoto").empty();

// Loop through the colors array and create color pickers for each color
colorsArray.forEach(function(color) {
    // Create a color picker for each color
    var colorPicker = $('<input>', {
        type: 'color',
        class: 'form-control form-control-color edit-color-picker',
        value: color.trim(),  // Default to white if color is undefined
        disabled: true // Set the color picker to be read-only
    });

    // Append the color picker to the container
    $("#viewColorPickerContainerMoto").append(colorPicker);
});


// Force a reflow after appending the elements
$("#viewColorPickerContainerMoto")[0].offsetHeight;
                // Show the modal
                $("#viewMotoModal").modal('show');
                
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to load product details.",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
        },
        error: function(xhr, status, error) {
            Swal.fire({
                title: "Error!",
                text: "Failed to fetch product details. Please try again.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    });
}

function editeMoto(motoId) {
    let apiUrl = `http://localhost:5147/api/Customer/GetMotorcycle/$`+motoId;

    $.ajax({
        url: apiUrl,
        type: "GET",
        success: function (response) {
            if (response.success) {
                $("#editMotoName").val(response.data.name);
                $("#editEngineType").val(response.data.engineType);
                $("#editYear").val(response.data.year);
                $("#editMileage").val(response.data.mileage);
                $("#editCondition").val(response.data.condition);
                $("#editMotoPrice").val(response.data.price);
                $("#editStockQuantity").val(response.data.quantity);
                $("#editMotoDescription").val(response.data.description);
                $("#editMotoBrand").val(response.data.brand);

                // مسح الألوان فقط إذا لم تكن موجودة مسبقًا
                if ($("#editColorPickerContainerMoto").children().length === 0) {
                    let colors = response.data.colors;

                    // التأكد من أن الألوان في شكل مصفوفة
                    if (typeof colors === "string") {
                        colors = colors.split(',').map(color => color.trim());
                    }

                    // إضافة الألوان الموجودة مسبقًا
                    colors.forEach(function (color) {
                        if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
                            color = "#ffffff"; // الافتراضي إذا كان اللون غير صالح
                        }

                        var colorPicker = $('<input>', {
                            type: 'color',
                            class: 'form-control form-control-color edit-moto-color-picker mt-1',
                            value: color
                        });

                        $("#editColorPickerContainerMoto").append(colorPicker);
                    });
                }

                // عرض النافذة المنبثقة
                $("#editeMotoModal").modal('show');
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to load product details. " + response.message,
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
        },
        error: function (xhr, status, error) {
            Swal.fire({
                title: "Error!",
                text: "Failed to fetch product details. Please try again.",
                icon: "error",
                confirmButtonText: "OK"
            });
            console.error("Error:", error);
            console.error("Response:", xhr.responseText);
        }
    });
}


function updateMoto(motoId) {
    var formData = new FormData();
    var file = $("#editImagesMoto")[0].files[0];

    formData.append("motorcycleId", motoId);
    formData.append("name", $("#editMotoName").val());
    formData.append("engineType", $("#editEngineType").val());
    formData.append("year", $("#editYear").val());
    formData.append("mileage", $("#editMileage").val());
    formData.append("condition", $("#editCondition").val());
    formData.append("price", $("#editMotoPrice").val());
    formData.append("stockQuantity", $("#editStockQuantity").val());
    formData.append("description", $("#editMotoDescription").val());
    formData.append("brand", $("#editMotoBrand").val());

    formData.append("StoreId", shopId);

    // جمع جميع الألوان (القديمة والجديدة)

    var colors = [];
    $(".edit-moto-color-picker").each(function () {
        colors.push($(this).val());
    });
    formData.append("colors", colors.join(",")); // إرسال الألوان كقائمة مفصولة بفواصل

    // إضافة الصورة إذا تم اختيارها
    if (file) {
        formData.append("images", file);
    }

    $.ajax({
        url: 'http://localhost:5147/api/ShopOwner/UpdateMotorcycle',
        type: 'PUT',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            if (response.success) {
                Swal.fire("Success!", "Motorcycle updated successfully!", "success");
                $(".editMotoModal").modal('hide');
                $("#card_moto_table").DataTable().ajax.reload(null, false);
            } else {
                Swal.fire("Error!", response.message, "error");
            }
        }
    });
}

function  deleteMoto(motoId) {
    $.ajax({
        url: `http://localhost:5147/api/ShopOwner/DeleteMotorcycle/$`+motoId,
        type: "DELETE",
   
       
        success: function (data) {
            if (data.success) {
                Swal.fire({
                    title: "Moto!",
                    text: " deleted successfully!",
                    icon: "success",
                    confirmButtonText: "Ok"
                });

                // Remove the row from DataTable
                $("#card_moto_table").DataTable().row($(`[data-id="${motoId}"]`).parents('tr')).remove().draw();
            } else {
                Swal.fire({
                    title: "Moto!",
                    text: "Cannot delete this Moto!",
                    icon: "error",
                    confirmButtonText: "Ok"
                });
            }
        },
        error: function (err) {
            Swal.fire({
                title: "Moto!",
                text: "Cannot delete this Moto!",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    });
}

