var categoryMaintenanceId;

$(function () {
    $("#saveCategory").on("click", function () {
        addCategory();
    });

    $("#addCategorybutton").on("click", function () {
        $("#addCategoryModal").modal("show");
    });

    $(document).on("click", ".editCategory", function () {
        console.log("editCategory");
        categoryMaintenanceId = $(this).data("id");
        GetCategory(categoryMaintenanceId);
        $("#editCategoryModal").modal("show");
    });

    $("#editCategoryModalButton").on("click", function () {
        console.log("editCategoryModalButton");
        editCategory(categoryMaintenanceId);
    });

    $(document).on("click", ".deleteCategory", function () {
        console.log("deleteCategory clicked");

        var id = $(this).data("id");

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
                deleteCategory(id);
            }
        });
    });

    loadCategoriesTable();
});

function loadCategoriesTable() {
    console.log("Loading maintenance categories...");

    let apiUrl = "http://localhost:5147/api/Shared/GetAllCategoryMaintenances";

    console.log("API URL:", apiUrl);

    if ($.fn.DataTable.isDataTable("#categoryTable")) {
        $("#categoryTable").DataTable().ajax.url(apiUrl).load();
        return;
    }

    $("#categoryTable").DataTable({
        processing: false,
        serverSide: false,
        ajax: {
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
                Swal.fire("Error!", `Failed to load maintenance categories. Status: ${xhr.status}`, "error");
            }
        },
        columns: [
            { data: "categoryMaintenanceId" },
            { data: "name" },
            {
                data: null,
                render: function (data, type, row) {
                    return `
                        <button class="btn btn-primary editCategory" data-id="${row.categoryMaintenanceId}">
                            <i class="fa-solid fa-pencil"></i>
                        </button>
                        <button class="btn btn-danger deleteCategory" data-id="${row.categoryMaintenanceId}">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    `;
                }
            }
        ]
    });
}

function addCategory() {
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

    $.ajax({
        url: "http://localhost:5147/api/Admain/AddCategoryMaintenances?name=" + encodeURIComponent(name),
        type: "POST",
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



function GetCategory(id) {
    $.ajax({
        url: "http://localhost:5147/api/Shared/GetCategory/" + id,
        type: "GET",
        contentType: "application/json",
        success: function (response) {
            if (response.success && response.data) {
                $(".categoryName").val(response.data.name);
            } else {
                Swal.fire({
                    title: "Category!",
                    text: "Failed to get category details!",
                    icon: "error",
                    confirmButtonText: "Ok"
                });
            }
        },
        error: function (err) {
            Swal.fire({
                title: "Category!",
                text: "Cannot get category!",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    });
}
function editCategory( categoryProductId) {
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
        categoryMaintenanceId: categoryProductId
    };

    $.ajax({
        url: "http://localhost:5147/api/Admain/UpdateCategoryMaintenances",
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

function deleteCategory(id) {
    $.ajax({
        url: `http://localhost:5147/api/Admain/DeleteCategoryMaintenances/` + id,
        type: "DELETE",
        success: function (data) {
            if (data.success) {
                Swal.fire({
                    title: "Category!",
                    text: "Category deleted successfully!",
                    icon: "success",
                    confirmButtonText: "Ok"
                });

                $("#categoryTable").DataTable().row($(`[data-id="${id}"]`).parents('tr')).remove().draw();
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
