using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MotoRide.Migrations
{
    /// <inheritdoc />
    public partial class addMaintance : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeliveryNote",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "StatusCompleteOrder",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "StatusDelivery",
                table: "Orders");

            migrationBuilder.AddColumn<bool>(
                name: "StatusCompleteOrder",
                table: "OrderItems",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "StatusDelivery",
                table: "OrderItems",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Dciscretion",
                table: "Maintenances",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Iamge2",
                table: "Maintenances",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Iamge3",
                table: "Maintenances",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IamgeBase",
                table: "Maintenances",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OurServies",
                table: "Maintenances",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "WorkHoursId",
                table: "Maintenances",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "WorkHours",
                columns: table => new
                {
                    WorkHoursId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SundayOpen = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SundayClose = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MondayOpen = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MondayClose = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TuesdayOpen = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TuesdayClose = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WednesdayOpen = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WednesdayClose = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ThursdayOpen = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ThursdayClose = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FridayOpen = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FridayClose = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SaturdayOpen = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SaturdayClose = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkHours", x => x.WorkHoursId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WorkHours");

            migrationBuilder.DropColumn(
                name: "StatusCompleteOrder",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "StatusDelivery",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "Dciscretion",
                table: "Maintenances");

            migrationBuilder.DropColumn(
                name: "Iamge2",
                table: "Maintenances");

            migrationBuilder.DropColumn(
                name: "Iamge3",
                table: "Maintenances");

            migrationBuilder.DropColumn(
                name: "IamgeBase",
                table: "Maintenances");

            migrationBuilder.DropColumn(
                name: "OurServies",
                table: "Maintenances");

            migrationBuilder.DropColumn(
                name: "WorkHoursId",
                table: "Maintenances");

            migrationBuilder.AddColumn<string>(
                name: "DeliveryNote",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "StatusCompleteOrder",
                table: "Orders",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "StatusDelivery",
                table: "Orders",
                type: "bit",
                nullable: true);
        }
    }
}
