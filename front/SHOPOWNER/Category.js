var shopId = localStorage.getItem("ShopId");
var categoryProductId;
$(function () {
    $("#saveCategory").on("click", function () {
        addCategory(shopId);
    });

    $("#addCategorybutton").on("click", function () {
        $("#addCategoryModal").modal("show");
    });

    $(document).on("click", ".editCategory", function () {
        console.log("editCategory");
        $("#editCategoryModal").modal("show");
         categoryProductId = $(this).data("id");
        GetCategory( categoryProductId) 
    });

    $("#editCategoryModalButton").on("click", function () {
        console.log("editCategoryModalButton");
        editCategory(shopId, categoryProductId);
    });

    $(document).on("click", ".deleteCategory", function () {
        console.log("deleteCategory clicked");

        var categoryId = $(this).data("id");

        // Show SweetAlert confirmation
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
                deleteCategory(categoryId);
            }
        });
    });

    loadCategoriesTable();
});

function loadCategoriesTable() {
    console.log("Loading categories...");


    let apiUrl = "http://localhost:5147/api/Shared/GetAllCategoryProductByShop/$" + shopId;

    console.log("API URL:", apiUrl);

    // Check if the DataTable is already initialized
    if ($.fn.DataTable.isDataTable("#categoryTable")) {
        $("#categoryTable").DataTable().ajax.url(apiUrl).load();
        return;
    }

    $("#categoryTable").DataTable({
        "processing": false,
        "serverSide": false,
        "ajax": {
            url: apiUrl,
            type: "GET",
            dataSrc: function (response) {
                console.log("API Response:", response);
                if (response.success && response.data) {
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
            { "data": "categoryProductId" },
            { "data": "name" },
            {
                "data": null,
                "render": function (data, type, row) {
                    return `

                        <button class="btn btn-primary editCategory " data-id="${row.categoryProductId}"><i class="fa-solid fa-pencil"></i></button>
                    <button class="btn btn-danger deleteCategory" data-id="${row.categoryProductId}"><i class="fa-solid fa-trash"></i></button>
                    `;
                }
            }
        ]
    });
}

function addCategory(shopId) {
    var name = $(".addCategoryName").val();
    if (!name) {
        Swal.fire({
            title: "Category!",
            text: "Please fill in the category name!",
            icon: "warning",
            confirmButtonText: "Ok"
        });
        return;
    }

    var category = {
        name: name,
        storeId: shopId
    };

    $.ajax({
        url: "http://localhost:5147/api/ShopOwner/AddCategoryProduct",
        type: "POST",
        data: JSON.stringify(category),
        contentType: "application/json",
        success: function (data) {
            $(".addCategoryName").val("");
            $("#addCategoryModal").modal('hide');

            Swal.fire({
                title: "Category!",
                text: "Category added successfully!",
                icon: "success",
                confirmButtonText: "Ok"
            });

            // Refresh the table without destroying headers
            $("#categoryTable").DataTable().ajax.reload(null, false);
        },
        error: function (err) {
            Swal.fire({
                title: "Category!",
                text: "Cannot add category!",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    });
}
function GetCategory( categoryProductId) {

  

    $.ajax({
        url: "http://localhost:5147/api/ShopOwner/GetCategoryProduct/$" + categoryProductId,
        type: "GET",
        contentType: "application/json",
        success: function (response) {
            $(".categoryName").val(`${response.data.name}`);    
        
         
        },
        error: function (err) {
            Swal.fire({
                title: "Category!",
                text: "Cannot update category!",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    });
}

function editCategory(shopId, categoryProductId) {
    var name = $(".categoryName").val();

    if (!name) {
        Swal.fire({
            title: "Category!",
            text: "Please fill in the category name!",
            icon: "warning",
            confirmButtonText: "Ok"
        });
        return;
    }

    var category = {
        name: name,
        shopId: shopId,
        categoryProductId: categoryProductId
    };

    $.ajax({
        url: "http://localhost:5147/api/ShopOwner/UpdateCategoryProduct",
        type: "PUT",
        data: JSON.stringify(category),
        contentType: "application/json",
        success: function (data) {
            $(".categoryName").val("");
            $("#editCategoryModal").modal('hide');

            Swal.fire({
                title: "Category!",
                text: "Category updated successfully!",
                icon: "success",
                confirmButtonText: "Ok"
            });

            // Refresh the table without destroying headers
            $("#categoryTable").DataTable().ajax.reload(null, false);
            localStorage.removeItem("categoryProductId");
        },
        error: function (err) {
            Swal.fire({
                title: "Category!",
                text: "Cannot update category!",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    });
}

function deleteCategory(categoryProductId) {
    $.ajax({
        url: `http://localhost:5147/api/ShopOwner/DeleteCategoryProduct/$`+categoryProductId,
        type: "DELETE",
        success: function (data) {
            if (data.success) {
                Swal.fire({
                    title: "Category!",
                    text: "Category deleted successfully!",
                    icon: "success",
                    confirmButtonText: "Ok"
                });

                // Remove the row from DataTable
                $("#categoryTable").DataTable().row($(`[data-id="${categoryProductId}"]`).parents('tr')).remove().draw();
            } else {
                Swal.fire({
                    title: "Category!",
                    text: "Cannot delete this category!",
                    icon: "error",
                    confirmButtonText: "Ok"
                });
            }
        },
        error: function (err) {
            Swal.fire({
                title: "Category!",
                text: "Cannot delete this category!",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    });
}
