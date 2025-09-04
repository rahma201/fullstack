using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MotoRide.Migrations
{
    /// <inheritdoc />
    public partial class upd3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CategoryMaintenanceMaintenance_CategoryMaintenances_CategoryMaintenanceId",
                table: "CategoryMaintenanceMaintenance");

            migrationBuilder.DropColumn(
                name: "CategoryMaintenanceId",
                table: "Maintenances");

            migrationBuilder.DropColumn(
                name: "Servies",
                table: "Maintenances");

            migrationBuilder.RenameColumn(
                name: "CategoryMaintenanceId",
                table: "CategoryMaintenanceMaintenance",
                newName: "CategoriesCategoryMaintenanceId");

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryMaintenanceMaintenance_CategoryMaintenances_CategoriesCategoryMaintenanceId",
                table: "CategoryMaintenanceMaintenance",
                column: "CategoriesCategoryMaintenanceId",
                principalTable: "CategoryMaintenances",
                principalColumn: "CategoryMaintenanceId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CategoryMaintenanceMaintenance_CategoryMaintenances_CategoriesCategoryMaintenanceId",
                table: "CategoryMaintenanceMaintenance");

            migrationBuilder.RenameColumn(
                name: "CategoriesCategoryMaintenanceId",
                table: "CategoryMaintenanceMaintenance",
                newName: "CategoryMaintenanceId");

            migrationBuilder.AddColumn<int>(
                name: "CategoryMaintenanceId",
                table: "Maintenances",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Servies",
                table: "Maintenances",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryMaintenanceMaintenance_CategoryMaintenances_CategoryMaintenanceId",
                table: "CategoryMaintenanceMaintenance",
                column: "CategoryMaintenanceId",
                principalTable: "CategoryMaintenances",
                principalColumn: "CategoryMaintenanceId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
