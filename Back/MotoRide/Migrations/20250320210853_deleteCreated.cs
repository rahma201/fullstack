using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MotoRide.Migrations
{
    /// <inheritdoc />
    public partial class deleteCreated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "WishLists");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "WishListItems");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "ShopOwners");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Motorcycles");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Carts");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "CartItems");

            migrationBuilder.AddColumn<int>(
                name: "PaymentmethodId",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserType",
                table: "Customers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PaymentmetodId",
                table: "Carts",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Paymentmethod",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CardNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CardHolder = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExpireDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Blane = table.Column<float>(type: "real", nullable: true),
                    Method = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Paymentmethod", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_PaymentmethodId",
                table: "Orders",
                column: "PaymentmethodId");

            migrationBuilder.CreateIndex(
                name: "IX_Carts_PaymentmetodId",
                table: "Carts",
                column: "PaymentmetodId");

            migrationBuilder.AddForeignKey(
                name: "FK_Carts_Paymentmethod_PaymentmetodId",
                table: "Carts",
                column: "PaymentmetodId",
                principalTable: "Paymentmethod",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Paymentmethod_PaymentmethodId",
                table: "Orders",
                column: "PaymentmethodId",
                principalTable: "Paymentmethod",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Carts_Paymentmethod_PaymentmetodId",
                table: "Carts");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Paymentmethod_PaymentmethodId",
                table: "Orders");

            migrationBuilder.DropTable(
                name: "Paymentmethod");

            migrationBuilder.DropIndex(
                name: "IX_Orders_PaymentmethodId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Carts_PaymentmetodId",
                table: "Carts");

            migrationBuilder.DropColumn(
                name: "PaymentmethodId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "UserType",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "PaymentmetodId",
                table: "Carts");

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "WishLists",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "WishListItems",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "ShopOwners",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Reviews",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Motorcycles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Customers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Categories",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Carts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "CartItems",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
