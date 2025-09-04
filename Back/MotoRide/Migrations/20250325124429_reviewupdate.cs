using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MotoRide.Migrations
{
    /// <inheritdoc />
    public partial class reviewupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StoreId",
                table: "Reviews",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "StoreNeedDeletedReview",
                table: "Reviews",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StoreReason",
                table: "Reviews",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_StoreId",
                table: "Reviews",
                column: "StoreId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Stores_StoreId",
                table: "Reviews",
                column: "StoreId",
                principalTable: "Stores",
                principalColumn: "StoreId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Stores_StoreId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_StoreId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "StoreId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "StoreNeedDeletedReview",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "StoreReason",
                table: "Reviews");
        }
    }
}
