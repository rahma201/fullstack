using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MotoRide.Migrations
{
    /// <inheritdoc />
    public partial class detsubcatecoryaddby : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "SubCategories");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "SubCategories",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
