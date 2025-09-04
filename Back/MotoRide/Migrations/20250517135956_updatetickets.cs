using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MotoRide.Migrations
{
    /// <inheritdoc />
    public partial class updatetickets : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Users_UserId",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "CustomerNote",
                table: "NotificationBookingMaintenances");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Customers_UserId",
                table: "Tickets",
                column: "UserId",
                principalTable: "Customers",
                principalColumn: "CustomerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Customers_UserId",
                table: "Tickets");

            migrationBuilder.AddColumn<string>(
                name: "CustomerNote",
                table: "NotificationBookingMaintenances",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Users_UserId",
                table: "Tickets",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId");
        }
    }
}
