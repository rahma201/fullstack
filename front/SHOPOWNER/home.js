var shopId = localStorage.getItem("ShopId");
  $(document).ready(function () {

   
    salesByShopId(shopId)
      countSalesByShopId(shopId);;
      countYearlySalesByShopId(shopId);;
      TopProductSalyes(shopId);
      TopMotorcycleSalyes(shopId);
      CountHowManyMoto(shopId);
      getCountProductsAndCategory(shopId);
});

function salesByShopId(shopId) {
    $.ajax({
        url: `http://localhost:5147/api/ShopOwner/Salyes/`+shopId,
        method: 'GET',
        success: function (response) {
          if (response.success) {
            $('#allSalyes').html(response.data);
           
          } else {
            console.log('No data found');
          }
        },
        error: function (err) {
          console.error('Error fetching motorcycle data:', err);
        }
      });
    
}
function TopProductSalyes(shopId) {
    $.ajax({
        url: `http://localhost:5147/api/ShopOwner/TopProductSalyes/`+shopId,
        method: 'GET',
        success: function (response) {
          if (response.success) {
            $('#top-Product-card').show();
            $('#Product-name').text(response.data.name);
            $('#Productorder-count').text(`Orders Year: ${response.data.orderCount}`);
            $('#Product-image').attr('src','http://localhost:5147'+response.data.image);
          } else {
            console.log('No data found');
          }
        },
        error: function (err) {
          console.error('Error fetching motorcycle data:', err);
        }
      });
}

function TopMotorcycleSalyes(shopId) {
    $.ajax({
        url: `http://localhost:5147/api/ShopOwner/TopMotorcycleSalyes/`+shopId,
        method: 'GET',
        success: function (response) {
          if (response.success) {
            $('#top-motorcycle-card').show();
            $('#motorcycle-name').text(response.data.name);
            $('#order-count').text(`Orders Year: ${response.data.orderCount}`);
            $('#motorcycle-image').attr('src','http://localhost:5147'+response.data.image);
          } else {
            console.log('No data found');
          }
        },
        error: function (err) {
          console.error('Error fetching motorcycle data:', err);
        }
      });
}
function countSalesByShopId(shopId) {
    $.ajax({
      url: `http://localhost:5147/api/ShopOwner/CountSalesByShopId/` + shopId,
      method: 'GET',
      success: function (res) {
        if (res.success) {
          // عرض القيم في النصوص
          $('#sales-today').text(res.data.today);
          $('#sales-month').text(res.data.month);
          $('#sales-year').text(res.data.year);
          $("#Today").html(res.data.today);
          // رسم الرسم البياني
          renderSalesChart(res.data.today, res.data.month, res.data.year);
        } else {
          $('#sales-today, #sales-month, #sales-year').text('N/A');
        }
      },
      error: function () {
        $('#sales-today, #sales-month, #sales-year').text('Error');
      }
    });
  }
  


    function renderSalesChart(today, month, year) {
        var options = {
          chart: {
            type: 'bar',
            height: 300
          },
          series: [{
            name: 'Sales',
            data: [today, month, year]
          }],
          xaxis: {
            categories: ['Today', 'This Month', 'This Year']
          },
          colors: ['#D21312'],
          title: {
            text: 'Sales Overview',
            align: 'center'
          }
        };
      
        var chart = new ApexCharts(document.querySelector("#sales-overview"), options);
        chart.render();
      }
      
      function countYearlySalesByShopId(shopId) {
        $.ajax({
          url: 'http://localhost:5147/api/ShopOwner/GetYearlySalesAsync/' + shopId,
          type: 'GET',
          success: function(response) {
            if(response.success) {
              // Process the data for the chart
              const months = [];
              const sales = [];
              
              // Assuming response.data is an array of objects with month and sales properties
              response.data.forEach(item => {
                months.push(item.month);  // e.g. "Apr", "May", etc.
                sales.push(item.sales);   // e.g. 2.0, 1.3, etc.
              });
              
              // Calculate total sales
              const totalSales = sales.reduce((sum, value) => sum + value, 0);
              
              // Update the total sales display
              $(".Total").text(totalSales);
              
              // Render the chart
              createCustomApexChart(months, sales);
            } else {
              console.log("Error:", response.message);
            }
          },
          error: function(xhr, status, error) {
            console.log("AJAX Error:", error);
          }
        });
      }
      
      function createCustomApexChart(months, salesData) {
        // First, destroy any existing chart with the same ID
        if (window.customApexChart) {
          window.customApexChart.destroy();
        }
      
        // Calculate total sales
        const totalSales = salesData.reduce((sum, value) => sum + value, 0);
      
        // Chart options
        const options = {
          series: [{
            name: "Sales",
            data: salesData
          }],
          chart: {
            id: 'apexcharts84kz8tiq',
            type: 'bar',
            width: 236,
            height: 260,
            toolbar: {
              show: false
            },
            animations: {
              enabled: true
            }
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              columnWidth: '55%',
              distributed: false
            }
          },
          dataLabels: {
            enabled: false
          },
          colors: ['#D21312'], // Primary color for bars
          grid: {
            show: false
          },
          xaxis: {
            categories: months,
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            labels: {
              style: {
                colors: '#adb0bb',
                fontSize: '12px'
              }
            }
          },
          yaxis: {
            show: false
          },
          tooltip: {
            enabled: true,
            theme: 'dark',
            x: {
              show: true
            }
          }
        };
      
        // Create the chart in the specified container
        window.customApexChart = new ApexCharts(
          document.querySelector("#apexcharts84kz8tiq"), 
          options
        );
        
        window.customApexChart.render();
        
        return totalSales; // Return total sales if needed
      }
      function CountHowManyProducts(shopId) {
        $.ajax({
          url: "http://localhost:5147/api/ShopOwner/CountProduct/" + shopId,
          type: "GET",
          success: function (response) {
            // If the value is inside `data`, use it; otherwise fallback
            let count = response.data ?? response;
            $(".countProduct").text(`${count.toLocaleString()}`);
          },
          error: function (xhr, status, error) {
            console.error("Failed to fetch product count:", error);
          }
        });
      }
      
      function CountHowManyMoto(shopId){

            $.ajax({
              url: "http://localhost:5147/api/ShopOwner/CountMotorcycle/" + shopId,
              type: "GET",
              success: function (response) {
                // إذا كانت القيمة في الخاصية count
                let count = response.data; // إذا رجع مباشرة رقم
                $("#countMoto").text(`${count}`);
              },
              error: function (xhr, status, error) {
                console.error("فشل في جلب البيانات:", error);
              }
            });
      }
      function getCountProductsAndCategory(shopId){
        $.ajax({
          url: 'http://localhost:5147/api/ShopOwner/CountProductAndCategory/' + shopId,
          method: 'GET',
          dataType: 'json',
          success: function (response) {
            if (response.success && response.data && response.data.details) {
              const details = response.data.details;
      
              // Prepare chart data
              const labels = details.map(item => item.categoryName ?? "Unspecified");
              const data = details.map(item => item.productCount);
      
              const ctx = document.getElementById('myPieChart').getContext('2d');
              new Chart(ctx, {
                type: 'pie',
                data: {
                  labels: labels,
                  datasets: [{
                    label: 'Product Count per Category',
                    data: data,
                    backgroundColor: [
                      '#D21312', '#000000' , '#DC143C', '#B22222',
                      '#4B4B4B', '#2F2F2F', '#A9A9A9', '#696969','#FF3D3D', '#FF6B6B',
                      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                      '#9966FF', '#FF9F40', '#66FF66', '#FF66B2',
                      '#66B2FF', '#D4A5A5'
                    ]
                  }]
                },
                options: {
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'right',
                    },
                    title: {
                      display: true,
                      text: 'Products per Category'
                    }
                  }
                }
              });
            } else {
              console.log("No valid data found for chart.");
            }
          },
          error: function () {
            console.log('Failed to load data!');
          }
        });
      }
      