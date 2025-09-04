using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MotoRide.Migrations
{
    /// <inheritdoc />
    public partial class updatePrice : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FridayClose",
                table: "WorkHours");

            migrationBuilder.DropColumn(
                name: "FridayOpen",
                table: "WorkHours");

            migrationBuilder.DropColumn(
                name: "MondayClose",
                table: "WorkHours");

            migrationBuilder.DropColumn(
                name: "MondayOpen",
                table: "WorkHours");

            migrationBuilder.DropColumn(
                name: "SaturdayClose",
                table: "WorkHours");

            migrationBuilder.DropColumn(
                name: "SaturdayOpen",
                table: "WorkHours");

            migrationBuilder.DropColumn(
                name: "SundayClose",
                table: "WorkHours");

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
                name: "InitialTotalPrice",
                table: "Bookings");

            migrationBuilder.RenameColumn(
                name: "WednesdayOpen",
                table: "WorkHours",
                newName: "Wednesday");

            migrationBuilder.RenameColumn(
                name: "WednesdayClose",
                table: "WorkHours",
                newName: "Tuesday");

            migrationBuilder.RenameColumn(
                name: "TuesdayOpen",
                table: "WorkHours",
                newName: "Thursday");

            migrationBuilder.RenameColumn(
                name: "TuesdayClose",
                table: "WorkHours",
                newName: "Sunday");

            migrationBuilder.RenameColumn(
                name: "ThursdayOpen",
                table: "WorkHours",
                newName: "Saturday");

            migrationBuilder.RenameColumn(
                name: "ThursdayClose",
                table: "WorkHours",
                newName: "Monday");

            migrationBuilder.RenameColumn(
                name: "SundayOpen",
                table: "WorkHours",
                newName: "Friday");

            migrationBuilder.AddColumn<float>(
                name: "InitialTotalPrice",
                table: "Maintenances",
                type: "real",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InitialTotalPrice",
                table: "Maintenances");

            migrationBuilder.RenameColumn(
                name: "Wednesday",
                table: "WorkHours",
                newName: "WednesdayOpen");

            migrationBuilder.RenameColumn(
                name: "Tuesday",
                table: "WorkHours",
                newName: "WednesdayClose");

            migrationBuilder.RenameColumn(
                name: "Thursday",
                table: "WorkHours",
                newName: "TuesdayOpen");

            migrationBuilder.RenameColumn(
                name: "Sunday",
                table: "WorkHours",
                newName: "TuesdayClose");

            migrationBuilder.RenameColumn(
                name: "Saturday",
                table: "WorkHours",
                newName: "ThursdayOpen");

            migrationBuilder.RenameColumn(
                name: "Monday",
                table: "WorkHours",
                newName: "ThursdayClose");

            migrationBuilder.RenameColumn(
                name: "Friday",
                table: "WorkHours",
                newName: "SundayOpen");

            migrationBuilder.AddColumn<string>(
                name: "FridayClose",
                table: "WorkHours",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FridayOpen",
                table: "WorkHours",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MondayClose",
                table: "WorkHours",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MondayOpen",
                table: "WorkHours",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SaturdayClose",
                table: "WorkHours",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SaturdayOpen",
                table: "WorkHours",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SundayClose",
                table: "WorkHours",
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

            migrationBuilder.AddColumn<float>(
                name: "InitialTotalPrice",
                table: "Bookings",
                type: "real",
                nullable: true);
        }
    }
}
