function generate_bar() {
    var previousPoint  = null;
    var options = {
         chart: {
            renderTo: 'flot-line-chart',
            type: 'column'
        },
        title: {
            text: 'Total Revenue by top 10 Customers'
        },
        subtitle: {
            text: 'Source: SAP HANA'
        },
        xAxis: {
            title: {
                text: 'customers'
            },
            categories: [
              
                
            ],
            labels: {
                rotation: 80,
                  formatter: function () {
              var text = this.value,
                formatted = text.length > 5 ? text.substring(0, 8) + '...' : text;

                        return '<div class="js-ellipse" style="width:150px; overflow:hidden" title="' + text + '">' + formatted + '</div>';
            }
            }

        },
        yAxis: {
            min: 0,
            labels: {
            formatter: function () {
            return this.value + 'M';
                } 
            },
            title: {
                text: 'Revenue'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0">$<b>{point.y} M</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            //pointStart: -500,
            column: {
                stacking: 'normal',
                depth: 40,
                pointPadding: 0.3,
                borderWidth: 0

            },
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function () {
                          
                          getData_org(this.category);
                          if (previousPoint) {
                                previousPoint.update({ color: '#7cb5ec' });
                            }
                            previousPoint = this;
                            this.update({ color: 'red' });
                         //alert('hi');
                        }
                    }
                }
            }
        },
        
        series: [{data:[]}]
    }
    
    var json_results= [];
    var json_categories = [];

    getData_Bar(options);
    }

     function generate_pie()
    {
        var options = {
         chart: {
              renderTo: 'containerPie',
            plotBackgroundColor: null,
           //null,
            plotShadow: false
        },
        title: {
            text: 'Revenue By Product'
        },
        tooltip: {
            pointFormat: 'Revenue: $<b>{point.y:.0f}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            },
             series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function () {
                          
                          getData_prod(this.name);
                         //alert('hi');
                        }
                    }
                }
            }
        },
        series: [{
           
        }]
    }
   

    getData_Pie(options);
    
    }

    function displayNullChart(options)
    {
             
              new Highcharts.Chart(options).showNoData("Your custom error message");
    }
    function generate_Table()
    {
        var json_customers= [];
        var json_products = [];
        var json_sales = [];
        var json_revenue = [];
        
        $.ajax(
            {
    type: "GET",
    url: "http://localhost:8000/proxy/SDOP1/test1/data/copa.xsodata/analyticView?$format=json&$select=KMHI01_NAME1,WWDFM,ERLOS&$orderby=ERLOS desc&$top=50",
    dataType: 'json',
    async: false,
    data: '{}',
     success: function(data){
           $('#my-table > tbody').empty();
           
            
          for(i=0;i<data.d.results.length;i++)
          {
            
             if(data.d.results[i].ERLOS != 0 && data.d.results[i].KMHI01_NAME1 != null && data.d.results[i].WWDFM != "")
             {
               $('#my-table > tbody:last').append('<tr>' +
                    '<td>' + data.d.results[i]["KMHI01_NAME1"] + '</td>' +
                    '<td>' + data.d.results[i].WWDFM + '</td>' +
                 //   '<td>' + data.d.results[i].VKORG + '</td>' +
                    '<td>' + format2(parseInt(data.d.results[i].ERLOS),"$") + '</td>' +
                    '</tr>').trigger('footable_redraw');
            }
            else
            {
                $('.hide-if-no-paging').empty();
            }
          }
        
            }
        });
     
    }

    // ------------------Data For The Highcharts--------------------------------------------------------------------

    function getData_Pie(options)
    {

     var json_results= [];
    var json_categories = [];
    $.ajax(
            {
    type: "GET",
    url: "http://localhost:8000/proxy/SDOP1/test1/data/copa.xsodata/analyticView?$format=json&$select=BEZEK,ERLOS&$orderby=ERLOS desc&$top=10",
    dataType: 'json',
    async: false,
    data: '{}',
    
    success: function(data){
      if(data.d.results.length > 0)
            {
          for(i=0;i<data.d.results.length;i++)
           {
            
            if(data.d.results[i].ERLOS > 0)
               json_results.push([data.d.results[i].BEZEK,parseInt(data.d.results[i].ERLOS)]);
               
           }
          
            options.series[0].minPointLength= 20,
            options.series[0].type = 'pie';
            options.series[0].name = 'name';
             options.series[0].data = json_results;
             data:{};
            
             chart_pie = new Highcharts.Chart(options);
            }
          
          else
          {
            displayNullChart(options);
          }
        }
        });
    }

   
    function getData_Bar(options){
    var previous_year;
    var json_results= [];
    var json_categories = [];
    var series_number=0;
    
     $.ajax(
            {
    type: "GET",
    url: "http://localhost:8000/proxy/SDOP1/test1/data/copa.xsodata/analyticView?$format=json&$select=KMHI01_NAME1,ERLOS&$orderby=ERLOS desc&$top=10",
    dataType: 'json',
    async: false,
    data: '{}',
   
    success: function(data){
          
        options.series[0].name = 'Revenue';
     
           for(i=0;i<data.d.results.length;i++)
           {
            
            if(data.d.results[i].ERLOS > 0 && data.d.results[i].KMHI01_NAME1 != null)
            {
                options.series[0].data.push(parseInt(data.d.results[i].ERLOS)/1000000);
             
                json_categories.push(data.d.results[i]["KMHI01_NAME1"]);
            
            }
           }
            options.series[0].minPointLength= 10,
            options.xAxis.categories = json_categories;
            chart_bar = new Highcharts.Chart(options);
    }
        });
}