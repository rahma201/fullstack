using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MotoRide.Migrations
{
    /// <inheritdoc />
    public partial class upodstaddresoan : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdminReason",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "AdminReason",
                table: "ReviewMaintenances");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AdminReason",
                table: "Reviews",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AdminReason",
                table: "ReviewMaintenances",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
