using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MotoRide.Migrations
{
    /// <inheritdoc />
    public partial class updateMaintanence : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Maintenances_MaintenanceId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_MaintenanceId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "MaintenanceId",
                table: "Reviews");

            migrationBuilder.AddColumn<bool>(
                name: "HaveTrollyProvider",
                table: "Events",
                type: "bit",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ReviewMaintenances",
                columns: table => new
                {
                    ReviewMaintenanceId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MaintenanceNeedDeletedReview = table.Column<bool>(type: "bit", nullable: true),
                    MaintenanceReason = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AdminNeedDeletedReview = table.Column<bool>(type: "bit", nullable: true),
                    AdminReason = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MaintenanceId = table.Column<int>(type: "int", nullable: true),
                    Rating = table.Column<int>(type: "int", nullable: true),
                    CustomerId = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReviewMaintenances", x => x.ReviewMaintenanceId);
                    table.ForeignKey(
                        name: "FK_ReviewMaintenances_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "CustomerId");
                    table.ForeignKey(
                        name: "FK_ReviewMaintenances_Maintenances_MaintenanceId",
                        column: x => x.MaintenanceId,
                        principalTable: "Maintenances",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReviewMaintenances_CustomerId",
                table: "ReviewMaintenances",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_ReviewMaintenances_MaintenanceId",
                table: "ReviewMaintenances",
                column: "MaintenanceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReviewMaintenances");

            migrationBuilder.DropColumn(
                name: "HaveTrollyProvider",
                table: "Events");

            migrationBuilder.AddColumn<int>(
                name: "MaintenanceId",
                table: "Reviews",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_MaintenanceId",
                table: "Reviews",
                column: "MaintenanceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Maintenances_MaintenanceId",
                table: "Reviews",
                column: "MaintenanceId",
                principalTable: "Maintenances",
                principalColumn: "Id");
        }
    }
}
