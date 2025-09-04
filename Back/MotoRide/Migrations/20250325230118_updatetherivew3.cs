using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MotoRide.Migrations
{
    /// <inheritdoc />
    public partial class updatetherivew3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "AdminNeedDeletedReview",
                table: "Reviews",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AdminReason",
                table: "Reviews",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdminNeedDeletedReview",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "AdminReason",
                table: "Reviews");
        }
    }
}
