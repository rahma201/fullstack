using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MotoRide.Migrations
{
    /// <inheritdoc />
    public partial class UP7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InitialTotalPrice",
                table: "Maintenances");

            migrationBuilder.RenameColumn(
                name: "Wednesday",
                table: "WorkHours",
                newName: "StartWednesday");

            migrationBuilder.RenameColumn(
                name: "Tuesday",
                table: "WorkHours",
                newName: "StartTuesday");

            migrationBuilder.RenameColumn(
                name: "Thursday",
                table: "WorkHours",
                newName: "StartThursday");

            migrationBuilder.RenameColumn(
                name: "Sunday",
                table: "WorkHours",
                newName: "StartSunday");

            migrationBuilder.RenameColumn(
                name: "Saturday",
                table: "WorkHours",
                newName: "StartSaturday");

            migrationBuilder.RenameColumn(
                name: "Monday",
                table: "WorkHours",
                newName: "StartMonday");

            migrationBuilder.RenameColumn(
                name: "Friday",
                table: "WorkHours",
                newName: "StartFriday");

            migrationBuilder.RenameColumn(
                name: "IsAcceptableUserIntialPrice",
                table: "Bookings",
                newName: "IsAcceptableUserBooking");

            migrationBuilder.AddColumn<string>(
                name: "EndFriday",
                table: "WorkHours",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EndMonday",
                table: "WorkHours",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EndSaturday",
                table: "WorkHours",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EndSunday",
                table: "WorkHours",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EndThursday",
                table: "WorkHours",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EndTuesday",
                table: "WorkHours",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EndWednesday",
                table: "WorkHours",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MaintanenceId",
                table: "WorkHours",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CustomerNote",
                table: "NotificationBookingMaintenances",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Isfavourite",
                table: "NotificationBookingMaintenances",
                type: "bit",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Maintenances_WorkHoursId",
                table: "Maintenances",
                column: "WorkHoursId",
                unique: true,
                filter: "[WorkHoursId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Maintenances_WorkHours_WorkHoursId",
                table: "Maintenances",
                column: "WorkHoursId",
                principalTable: "WorkHours",
                principalColumn: "WorkHoursId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Maintenances_WorkHours_WorkHoursId",
                table: "Maintenances");

            migrationBuilder.DropIndex(
                name: "IX_Maintenances_WorkHoursId",
                table: "Maintenances");

            migrationBuilder.DropColumn(
                name: "EndFriday",
                table: "WorkHours");

            migrationBuilder.DropColumn(
                name: "EndMonday",
                table: "WorkHours");

            migrationBuilder.DropColumn(
                name: "EndSaturday",
                table: "WorkHours");

            migrationBuilder.DropColumn(
                name: "EndSunday",
                table: "WorkHours");

            migrationBuilder.DropColumn(
                name: "EndThursday",
                table: "WorkHours");

            migrationBuilder.DropColumn(
                name: "EndTuesday",
                table: "WorkHours");

            migrationBuilder.DropColumn(
                name: "EndWednesday",
                table: "WorkHours");

            migrationBuilder.DropColumn(
                name: "MaintanenceId",
                table: "WorkHours");

            migrationBuilder.DropColumn(
                name: "CustomerNote",
                table: "NotificationBookingMaintenances");

            migrationBuilder.DropColumn(
                name: "Isfavourite",
                table: "NotificationBookingMaintenances");

            migrationBuilder.RenameColumn(
                name: "StartWednesday",
                table: "WorkHours",
                newName: "Wednesday");

            migrationBuilder.RenameColumn(
                name: "StartTuesday",
                table: "WorkHours",
                newName: "Tuesday");

            migrationBuilder.RenameColumn(
                name: "StartThursday",
                table: "WorkHours",
                newName: "Thursday");

            migrationBuilder.RenameColumn(
                name: "StartSunday",
                table: "WorkHours",
                newName: "Sunday");

            migrationBuilder.RenameColumn(
                name: "StartSaturday",
                table: "WorkHours",
                newName: "Saturday");

            migrationBuilder.RenameColumn(
                name: "StartMonday",
                table: "WorkHours",
                newName: "Monday");

            migrationBuilder.RenameColumn(
                name: "StartFriday",
                table: "WorkHours",
                newName: "Friday");

            migrationBuilder.RenameColumn(
                name: "IsAcceptableUserBooking",
                table: "Bookings",
                newName: "IsAcceptableUserIntialPrice");

            migrationBuilder.AddColumn<float>(
                name: "InitialTotalPrice",
                table: "Maintenances",
                type: "real",
                nullable: true);
        }
    }
}
