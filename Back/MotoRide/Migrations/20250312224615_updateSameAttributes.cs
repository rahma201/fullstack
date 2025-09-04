using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MotoRide.Migrations
{
    /// <inheritdoc />
    public partial class updateSameAttributes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ShopOwnerId",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Motorcycles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserType",
                table: "Customers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Products_ShopOwnerId",
                table: "Products",
                column: "ShopOwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ShopOwners_ShopOwnerId",
                table: "Products",
                column: "ShopOwnerId",
                principalTable: "ShopOwners",
                principalColumn: "ShopOwnerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_ShopOwners_ShopOwnerId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_ShopOwnerId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ShopOwnerId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Motorcycles");

            migrationBuilder.DropColumn(
                name: "UserType",
                table: "Customers");
        }
    }
}
