using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MotoRide.Migrations
{
    /// <inheritdoc />
    public partial class d : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Stores_StoreId",
                table: "OrderItems");

            migrationBuilder.DropForeignKey(
                name: "FK_Stores_Orders_OrderId",
                table: "Stores");

            migrationBuilder.DropIndex(
                name: "IX_Stores_OrderId",
                table: "Stores");

            migrationBuilder.DropIndex(
                name: "IX_OrderItems_StoreId",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "Stores");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OrderId",
                table: "Stores",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Stores_OrderId",
                table: "Stores",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_StoreId",
                table: "OrderItems",
                column: "StoreId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Stores_StoreId",
                table: "OrderItems",
                column: "StoreId",
                principalTable: "Stores",
                principalColumn: "StoreId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Stores_Orders_OrderId",
                table: "Stores",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "OrderId");
        }
    }
}
