var shopId = localStorage.getItem("ShopId");
$(function(){
    loadSubCategories(shopId);
    loadItemTable(shopId);
    $(document).on("click","#saveProduct",function () {
        console.log("saveProduct clicked");
        AddItem(shopId);
    });
    

$(document).on("click", "#addNewProduct", function () {
    $("#addProductModal").modal("show");
});
$(document).on("click", ".getReviews", function () {
    var productId = $(this).data("id");
    localStorage.setItem("produactIdreview", productId);
    localStorage.setItem("reviewis", "product");
    window.location.href = "review.html";

});

    $(document).on("click", ".deleteProduct", function () {
        console.log("deleteProduct clicked");

        var productId = $(this).data("id");
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
                deleteItem(productId);
            }
        });
        // Show SweetAlert confirmation
     // Add new color input



    });
    $(document).on("click", ".editeProductGetModulButton", function () {
        console.log("editCategory");
        $("#editeProductModal").modal("show");
        var productId = $(this).data("id");
        localStorage.setItem("productId", productId);
        editItem(productId)
    });
    $(document).on("click", ".getProduct", function () {
        console.log("editCategory");
        $("#viewProductModal").modal("show");
        var productId = $(this).data("id");
        localStorage.setItem("productId", productId);
        viewProduct(productId)
         });
    $("#saveEditedProduct").on("click", function () {
        console.log("saveEditedProduct");
        var productId = localStorage.getItem("productId");
        updateProduct(productId);
    });
});
function loadSubCategories(shopId) {
    let apiUrl = `http://localhost:5147/api/Shared/GetAllCategoryProductByShop/$`+shopId;

    $.ajax({
        url: apiUrl,
        type: "GET",
        success: function(response) {
            if (response.success && response.data) {
                let categoryProducts = response.data;
                let select = $(".productCategory");

                // Clear existing options
                select.empty();
                select.append('<option value="">Select a category</option>');

                // Populate the dropdown
                categoryProducts.forEach(categoryProduct => {
                    select.append(`<option value="${categoryProduct.categoryProductId}">${categoryProduct.name}</option>`);
                    $("#viewProductCategory").append(`<option value="${categoryProduct.categoryProductId}">${categoryProduct.name}</option>`);

                });
              
            
            } else {
                Swal.fire("Error!", "Failed to load subcategories.", "error");
            }
        },
        error: function(xhr) {
            console.error("AJAX Error:", xhr.status, xhr.responseText);
            Swal.fire("Error!", `Failed to load categories. Status: ${xhr.status}`, "error");
        }
    });
}
function AddItem(shopId) {
    var formData = new FormData();
    var files = $("#productImages")[0].files;

    // إضافة البيانات النصية
    formData.append("name", $("#productName").val());
    formData.append("description", $("#productDescription").val());
    formData.append("price", $("#productPrice").val());
    formData.append("quantity", $("#productQuantity").val());
    formData.append("categoryProductId", $(".productCategory").val());
    formData.append("storeId", shopId);
    
    // إضافة الألوان
   // إضافة الألوان
var colors = [];
$(".color-picker").each(function () {
    colors.push($(this).val());
});
formData.append("colors", Array.from(new Set(colors)).join(',')); // إزالة التكرارات


    // إضافة المقاسات
    var sizes = [];
    $("#SizeList li").each(function () {
        sizes.push($(this).text().replace('Remove', '').trim());
    });
    formData.append("sizes", sizes.join(','));

    // إضافة ملف الصورة
    if (files.length > 0) {
        formData.append("images", files[0]||null);
    }

    // عرض البيانات المرسلة (للتأكد)
    for (var pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
    }

    // إرسال البيانات إلى الخلفية
    $.ajax({
        url: 'http://localhost:5147/api/ShopOwner/AddProduct',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            if (response.success) {
                Swal.fire({
                    title: "Success!",
                    text: "The product has been add successfully!",
                    icon: "success",
                    confirmButtonText: "OK"
                });
                  $(".addProductModal").modal('hide');
                $("#card_product_table").DataTable().ajax.reload(null, false);
              
                $("#productName").val('');
                $("#productDescription").val('');
                $("#productPrice").val('');
                $("#productQuantity").val('');
                $(".productCategory").val('');
                $(".color-picker").html(`
`);
                $("#SizeList li").each(function () {
                    $(this).remove();
                });
                $("#productImages").val('');
                

            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to add the product. Please try again."+response.message,
                    icon: "error",
                    confirmButtonText: "OK"
                });            }
        },
        error: function(xhr, status, error) {
            Swal.fire({
                title: "Error!",
                text: "Failed to add the product. Please try again.",
                icon: "error",
                confirmButtonText: "OK"
            });
                        console.error("Error:", error);
            console.error("Response:", xhr.responseText); // عرض تفاصيل الخطأ من الخلفية
        }
    });
}
function loadItemTable(shopId) {
    console.log("Loading categories...");


    let apiUrl = "http://localhost:5147/api/ShopOwner/GetProductByShop/$" + shopId;

    console.log("API URL:", apiUrl);

    // Check if the DataTable is already initialized
    if ($.fn.DataTable.isDataTable("#card_product_table")) {
        var table = $('#card_product_table').DataTable();
        table.clear().rows.add(response.data).draw();
        
    }

    $("#card_product_table").DataTable({
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
                        <button class="btn btn-review getReviews" data-id="${row.productId}"><i class="fa-regular fa-star-half-stroke"></i></i></button>
                         <button class="btn btn-info getProduct" data-id="${row.productId}"><i class="fa-solid fa-circle-info"></i></button>
                        <button class="btn btn-primary editeProductGetModulButton"  data-id="${row.productId}"><i class="fa-solid fa-pencil"></i></button>
                        <button class="btn btn-danger deleteProduct" data-id="${row.productId}"><i class="fa-solid fa-trash"></i></button>

                    `;
                }
            }
        ]
    });
}
// عند الضغط على زر "Edit"
function editItem(productId) {
    let apiUrl = `http://localhost:5147/api/Customer/GetProduct/$`+productId;

    console.log(productId)
    $.ajax({
        url: apiUrl, // جلب التفاصيل
        type: "GET",
        success: function (response) {
            if (response.success) {
                $("#editSizeList li").empty()
                // تعبئة النموذج بالبيانات التي تم جلبها
                $("#editProductName").val(response.data.name);
                $("#editProductDescription").val(response.data.description);
                $("#editProductPrice").val(response.data.price);
                $("#editProductQuantity").val(response.data.quantity);
                $("#editProductCategory").val(response.data.categoryProductId);
// Clear the existing color pickers
$("#editColorPickerContainer").empty();
console.log(response.data.colors); // Check the array of colors
if (typeof response.data.colors === 'string') {
    response.data.colors = response.data.colors.split(',');
}

// Add a color picker for each color in response.data.colors
response.data.colors.forEach(function(color) {
    var colorPicker = $('<input>', {
        type: 'color',
        class: 'form-control form-control-color edit-color-picker',
        value: color   // Default to white if color is undefined
    });
    $("#editColorPickerContainer").append(colorPicker);
});

                
                // تعبئة الأحجام
                if (typeof response.data.sizes === 'string') {
                    var sizesArray = response.data.sizes.split(',');
                    sizesArray.forEach(function (size) {
                        $("#editSizeList").append('<li class="sizes">' + size.trim() + '</li>'); // Trim spaces if any
                    });
                }


                // فتح المودال للتعديل مباشرة
                $("#editeProductModal").modal('show');
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
        
        }
    });
}
// Function to view product details in the modal
function viewProduct(productId) {
    // API URL to fetch product details
    let apiUrl = `http://localhost:5147/api/Customer/GetProduct/$`+productId;

    $.ajax({
        url: apiUrl, // API to fetch product details
        type: "GET",
        success: function(response) {
            if (response.success) {
                // Populate modal with product data
                $("#viewProductName").val(response.data.name);
                $("#viewProductDescription").val(response.data.description);
                $("#viewProductPrice").val(response.data.price);
                $("#viewProductQuantity").val(response.data.quantity);
                $("#viewProductCategory").val(response.data.categoryProductId);

                // Handle colors
             
                // Handle images (if available)
                $("#viewProductImagesContainer").empty();

                if (response.data.images) {
                    console.log(response.data)
                    var imageElement = $('<img>', {
                        src: response.data.images,  // Use the single image URL
                        class: 'img-thumbnail',
                        style: 'width: 400px; height: 300px; margin-right: 10px;',
                        alt: 'Product Image'
                    });
                    $("#viewProductImagesContainer").append(imageElement);
                } else {
                    $("#viewProductImagesContainer").append('<p>No images available</p>');
                }
            // Split the string into an array
// Check the colors string
console.log(response.data.colors); // Ensure this contains the correct data

// Split the string into an array
var colorsArray = response.data.colors ? response.data.colors.split(',') : [];
// Assuming you have a response with the colors as a comma-separated string

// Clear the existing color pickers
$("#viewColorPickerContainer").empty();

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
    $("#viewColorPickerContainer").append(colorPicker);
});


// Force a reflow after appending the elements
$("#editColorPickerContainer")[0].offsetHeight;

                
                // Handle sizes (if available)
                $("#viewSizeList").empty();
                var sizes = response.data.sizes.split(',');
                sizes.forEach(function(size) {
                    $("#viewSizeList").append(`<li class="list-group-item">${size.trim()}</li>`);
                });

                // Show the modal
                $("#viewProductModal").modal('show');
                
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

// دالة التحديث
// Function to save the updated product
function updateProduct(productId) {
    var formData = new FormData();
    var file = $("#editProductImages")[0].files[0]; // Get image if selected

    // Add product details to formData
    formData.append("productId", productId);
    formData.append("name", $("#editProductName").val());
    formData.append("description", $("#editProductDescription").val());
    formData.append("price", $("#editProductPrice").val());
    formData.append("quantity", $("#editProductQuantity").val());
    formData.append("categoryProductId", $("#editProductCategory").val());

    // Add colors
    var colors = [];
    $(".edit-color-picker").each(function () {
        colors.push($(this).val());
    });
    formData.append("colors", colors.join(","));

    // Add sizes
    var sizes = [];
$("#editSizeList li").each(function () {
    var sizeText = $(this).text().replace('Remove', '').trim();
    // إضافة القيمة فقط إذا كانت غير فارغة أو تحتوي على نص حقيقي
    if (sizeText) {
        sizes.push(sizeText);
    }
});
formData.append("sizes", sizes.join(","));


    // Add the image if it exists
    if (file) {
        formData.append("images", file);
    }

    // Send the updated data to the backend
    $.ajax({
        url: 'http://localhost:5147/api/ShopOwner/UpdateProduct', // Update endpoint
        type: 'PUT',
        data: formData,
        processData: false, // Don't process the data
        contentType: false, // Let jQuery handle the content type
        success: function (response) {
            if (response.success) {
                Swal.fire({
                    title: "Success!",
                    text: "Product updated successfully!",
                    icon: "success",
                    confirmButtonText: "OK"
                });
                // Reset form and close modal
                $("#editeProductModal").modal('hide');
                $("#card_product_table").DataTable().ajax.reload(null, false);

                // Optionally reload the product list
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to update the product: " + response.message,
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
        },
        error: function (xhr, status, error) {
            Swal.fire({
                title: "Error!",
                text: "Failed to update the product. Please try again.",
                icon: "error",
                confirmButtonText: "OK"
            });
            console.error("Error:", error);
        }
    });
}


// Call this function when the page loads
function deleteItem(productId) {
    $.ajax({
        url: `http://localhost:5147/api/ShopOwner/DeleteProduct/$`+productId,
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
                $("#card_product_table").DataTable().row($(`[data-id="${productId}"]`).parents('tr')).remove().draw();
            } else {
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
