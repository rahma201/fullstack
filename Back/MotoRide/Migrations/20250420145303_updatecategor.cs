using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MotoRide.Migrations
{
    /// <inheritdoc />
    public partial class updatecategor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Motorcycles_Categories_CategoryId",
                table: "Motorcycles");

            migrationBuilder.DropForeignKey(
                name: "FK_NotificationBookingMaintenances_Bookings_BookingId",
                table: "NotificationBookingMaintenances");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Categories_CategoryId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_SubCategories_SubCategoryId",
                table: "Products");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "SubCategories");

            migrationBuilder.DropIndex(
                name: "IX_Products_CategoryId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_NotificationBookingMaintenances_BookingId",
                table: "NotificationBookingMaintenances");

            migrationBuilder.DropIndex(
                name: "IX_Motorcycles_CategoryId",
                table: "Motorcycles");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "AcceptMaintenanceStutes",
                table: "NotificationBookingMaintenances");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Motorcycles");

            migrationBuilder.RenameColumn(
                name: "SubCategoryId",
                table: "Products",
                newName: "CategoryProductId");

            migrationBuilder.RenameIndex(
                name: "IX_Products_SubCategoryId",
                table: "Products",
                newName: "IX_Products_CategoryProductId");

            migrationBuilder.AddColumn<bool>(
                name: "AcceptCustomer",
                table: "NotificationBookingMaintenances",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "AcceptMaintenance",
                table: "NotificationBookingMaintenances",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CategoryMaintenanceId",
                table: "Maintenances",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NotificationBookingMaintenanceId",
                table: "Bookings",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "CategoryMaintenances",
                columns: table => new
                {
                    CategoryMaintenanceId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryMaintenances", x => x.CategoryMaintenanceId);
                });

            migrationBuilder.CreateTable(
                name: "CategoryProducts",
                columns: table => new
                {
                    CategoryProductId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StoreId = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryProducts", x => x.CategoryProductId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Maintenances_CategoryMaintenanceId",
                table: "Maintenances",
                column: "CategoryMaintenanceId");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_NotificationBookingMaintenanceId",
                table: "Bookings",
                column: "NotificationBookingMaintenanceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_NotificationBookingMaintenances_NotificationBookingMaintenanceId",
                table: "Bookings",
                column: "NotificationBookingMaintenanceId",
                principalTable: "NotificationBookingMaintenances",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Maintenances_CategoryMaintenances_CategoryMaintenanceId",
                table: "Maintenances",
                column: "CategoryMaintenanceId",
                principalTable: "CategoryMaintenances",
                principalColumn: "CategoryMaintenanceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_CategoryProducts_CategoryProductId",
                table: "Products",
                column: "CategoryProductId",
                principalTable: "CategoryProducts",
                principalColumn: "CategoryProductId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_NotificationBookingMaintenances_NotificationBookingMaintenanceId",
                table: "Bookings");

            migrationBuilder.DropForeignKey(
                name: "FK_Maintenances_CategoryMaintenances_CategoryMaintenanceId",
                table: "Maintenances");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_CategoryProducts_CategoryProductId",
                table: "Products");

            migrationBuilder.DropTable(
                name: "CategoryMaintenances");

            migrationBuilder.DropTable(
                name: "CategoryProducts");

            migrationBuilder.DropIndex(
                name: "IX_Maintenances_CategoryMaintenanceId",
                table: "Maintenances");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_NotificationBookingMaintenanceId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "AcceptCustomer",
                table: "NotificationBookingMaintenances");

            migrationBuilder.DropColumn(
                name: "AcceptMaintenance",
                table: "NotificationBookingMaintenances");

            migrationBuilder.DropColumn(
                name: "CategoryMaintenanceId",
                table: "Maintenances");

            migrationBuilder.DropColumn(
                name: "NotificationBookingMaintenanceId",
                table: "Bookings");

            migrationBuilder.RenameColumn(
                name: "CategoryProductId",
                table: "Products",
                newName: "SubCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Products_CategoryProductId",
                table: "Products",
                newName: "IX_Products_SubCategoryId");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AcceptMaintenanceStutes",
                table: "NotificationBookingMaintenances",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Motorcycles",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.CategoryId);
                });

            migrationBuilder.CreateTable(
                name: "SubCategories",
                columns: table => new
                {
                    SubCategoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShopId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubCategories", x => x.SubCategoryId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_CategoryId",
                table: "Products",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_NotificationBookingMaintenances_BookingId",
                table: "NotificationBookingMaintenances",
                column: "BookingId");

            migrationBuilder.CreateIndex(
                name: "IX_Motorcycles_CategoryId",
                table: "Motorcycles",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Motorcycles_Categories_CategoryId",
                table: "Motorcycles",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_NotificationBookingMaintenances_Bookings_BookingId",
                table: "NotificationBookingMaintenances",
                column: "BookingId",
                principalTable: "Bookings",
                principalColumn: "BookingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Categories_CategoryId",
                table: "Products",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_SubCategories_SubCategoryId",
                table: "Products",
                column: "SubCategoryId",
                principalTable: "SubCategories",
                principalColumn: "SubCategoryId");
        }
    }
}
