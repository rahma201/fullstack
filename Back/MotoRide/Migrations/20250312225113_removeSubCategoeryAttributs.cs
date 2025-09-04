using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MotoRide.Migrations
{
    /// <inheritdoc />
    public partial class removeSubCategoeryAttributs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_SubCategories_SubCategoryId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_ShopOwnerOقders_Orders_OrderId",
                table: "ShopOwnerOقders");

            migrationBuilder.DropForeignKey(
                name: "FK_ShopOwnerOقders_ShopOwners_ShopOwnerId",
                table: "ShopOwnerOقders");

            migrationBuilder.DropIndex(
                name: "IX_Products_SubCategoryId",
                table: "Products");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ShopOwnerOقders",
                table: "ShopOwnerOقders");

            migrationBuilder.DropColumn(
                name: "SubCategoryId",
                table: "Products");

            migrationBuilder.RenameTable(
                name: "ShopOwnerOقders",
                newName: "ShopOwnerOrders");

            migrationBuilder.RenameIndex(
                name: "IX_ShopOwnerOقders_ShopOwnerId",
                table: "ShopOwnerOrders",
                newName: "IX_ShopOwnerOrders_ShopOwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_ShopOwnerOقders_OrderId",
                table: "ShopOwnerOrders",
                newName: "IX_ShopOwnerOrders_OrderId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ShopOwnerOrders",
                table: "ShopOwnerOrders",
                column: "ShopOwnerOrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_ShopOwnerOrders_Orders_OrderId",
                table: "ShopOwnerOrders",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_ShopOwnerOrders_ShopOwners_ShopOwnerId",
                table: "ShopOwnerOrders",
                column: "ShopOwnerId",
                principalTable: "ShopOwners",
                principalColumn: "ShopOwnerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShopOwnerOrders_Orders_OrderId",
                table: "ShopOwnerOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_ShopOwnerOrders_ShopOwners_ShopOwnerId",
                table: "ShopOwnerOrders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ShopOwnerOrders",
                table: "ShopOwnerOrders");

            migrationBuilder.RenameTable(
                name: "ShopOwnerOrders",
                newName: "ShopOwnerOقders");

            migrationBuilder.RenameIndex(
                name: "IX_ShopOwnerOrders_ShopOwnerId",
                table: "ShopOwnerOقders",
                newName: "IX_ShopOwnerOقders_ShopOwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_ShopOwnerOrders_OrderId",
                table: "ShopOwnerOقders",
                newName: "IX_ShopOwnerOقders_OrderId");

            migrationBuilder.AddColumn<int>(
                name: "SubCategoryId",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ShopOwnerOقders",
                table: "ShopOwnerOقders",
                column: "ShopOwnerOrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_SubCategoryId",
                table: "Products",
                column: "SubCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_SubCategories_SubCategoryId",
                table: "Products",
                column: "SubCategoryId",
                principalTable: "SubCategories",
                principalColumn: "SubCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_ShopOwnerOقders_Orders_OrderId",
                table: "ShopOwnerOقders",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_ShopOwnerOقders_ShopOwners_ShopOwnerId",
                table: "ShopOwnerOقders",
                column: "ShopOwnerId",
                principalTable: "ShopOwners",
                principalColumn: "ShopOwnerId");
        }
    }
}
