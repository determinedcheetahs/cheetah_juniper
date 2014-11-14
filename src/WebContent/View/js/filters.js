

var selection_bar;
var selection_pie;
var is_bar_selected=0;
function filter_org()
      {
     //   alert(selected_org);
        $.ajaxPrefilter(function(options,originaloptions,xmll ) {
              if(is_year_selected && is_period_selected){
                $('.detail_text').empty();
                $('.detail_text').append("showing data for year "+selected_year+" and Sales Organization "+selected_org+" and Period "+selected_period);

                options.url = originaloptions.url + "&$filter=GJAHR eq '"+selected_year+"' and VKORG eq '"+selected_org+"' and PERDE eq '"+selected_period+"'";

              }
             else if(is_year_selected){
                $('.detail_text').empty();
                $('.detail_text').append("showing data for year "+selected_year+" and Sales Organization "+selected_org);
                options.url = originaloptions.url + "&$filter=GJAHR eq '"+selected_year+"' and VKORG eq '"+selected_org+"'";
              }
              else if(is_period_selected)
              {
                 $('.detail_text').empty();
                $('.detail_text').append("showing data for period "+selected_period+" and Sales Organization "+selected_org);
                options.url = originaloptions.url + "&$filter=PERDE eq '"+selected_period+"' and VKORG eq '"+selected_org+"'";
              }
              else{
                $('.detail_text').empty();
                $('.detail_text').append("showing data for Sales Organization "+selected_org);
                options.url =  originaloptions.url + "&$filter=VKORG eq '"+selected_org+"'";}
                });
      }
     function filter_year()
        {
              $.ajaxPrefilter(function(options,originaloptions,xmll ) {
               // alert(originaloptions.url)
               if(is_sales_selected && is_period_selected){
                $('.detail_text').empty();
                $('.detail_text').append("showing data for year "+selected_year+" and Sales Organization "+selected_org+" and Period "+selected_period);
                options.url = originaloptions.url + "&$filter=GJAHR eq '"+selected_year+"' and VKORG eq '"+selected_org+"' and PERDE eq '"+selected_period+"'";
              }
               else if(is_sales_selected){
                    $('.detail_text').empty();
                    $('.detail_text').append("showing data for year "+selected_year+" and Sales Organization "+selected_org);
                  options.url = originaloptions.url + "&$filter=GJAHR eq '"+selected_year+"' and VKORG eq '"+selected_org+"'";
                }
               else if(is_period_selected)
                {
                   $('.detail_text').empty();
                   $('.detail_text').append("showing data for year "+selected_year+" and Period "+selected_period);
                  options.url = originaloptions.url + "&$filter=PERDE eq '"+selected_period+"' and GJAHR eq '"+selected_year+"'";
                }
                else
                {
                  $('.detail_text').empty();
                  $('.detail_text').append("showing data for year "+selected_year+"");
                  options.url = originaloptions.url + "&$filter=GJAHR eq '"+selected_year+"'";
                }
                });
        }

    
      //alert(query_period.toString());
    
    function filter_period()
        {
        //  multiselect_period(period);

            $.ajaxPrefilter(function(options,originaloptions,xmll ) {
              if(is_year_selected && is_sales_selected){
                $('.detail_text').empty();
                $('.detail_text').append("showing data for year "+selected_year+" and Sales Organization "+selected_org+" and Period "+selected_period);
                options.url = originaloptions.url + "&$filter=GJAHR eq '"+selected_year+"' and VKORG eq '"+selected_org+"' and PERDE eq '"+selected_period+"'";
              }
              else if(is_sales_selected)
              {
                $('.detail_text').empty();
                $('.detail_text').append("showing data for Sales Organization "+selected_org+" and Period "+selected_period);
                options.url = originaloptions.url + "&$filter=PERDE eq '"+selected_period+"' and VKORG eq '"+selected_org+"'";
              }
              else if(is_year_selected)
              {
                $('.detail_text').empty();
                $('.detail_text').append("showing data for year "+selected_year+" and Period "+selected_period);
                options.url = originaloptions.url + "&$filter=PERDE eq '"+selected_period+"' and GJAHR eq '"+selected_year+"'";
              }
              else{
                $('.detail_text').empty();
                $('.detail_text').append("showing data for Period "+selected_period);
                options.url =  originaloptions.url + "&$filter=PERDE eq '"+selected_period+"'";
              }
                });
        }

        function getData_org(category)
        {
          is_bar_selected = 1;
           selection_bar = category;
          $.ajaxPrefilter(function(options,originaloptions,xmll ) {
                    options.url = "http://localhost:8000/proxy/SDOP1/test1/data/copa.xsodata/analyticView?$format=json&$select=BEZEK,ERLOS&$filter=KMHI01_NAME1 eq '"+category+"'";


          });
            generate_pie();
            $.ajaxPrefilter(function(options,originaloptions,xmll ) {
                    options.url = "http://localhost:8000/proxy/SDOP1/test1/data/copa.xsodata/analyticView?$format=json&$select=KMHI01_NAME1,WWDFM,ERLOS&$filter=KMHI01_NAME1 eq '"+category+"'&$orderby=ERLOS desc&$top=10";


          });
            generate_Table();
            $('.detail_text').empty();
          $('.detail_text').append("Drilled down chart for "+category);
               // alert(category);
        }

       function getData_prod(category)
        {          
          //alert(is_bar_selected);
         // alert(selection_bar);
         // alert(category); 
         generate_Table(); 
         $('.detail_text').empty();   
          if(is_bar_selected)
          {
           // alert(category); 
            
          $('.detail_text').append("Drilled down chart for "+selection_bar+" and "+category);
            $.ajaxPrefilter(function(options,originaloptions,xmll ) {
                    options.url = "http://localhost:8000/proxy/SDOP1/test1/data/copa.xsodata/analyticView?$format=json&$select=KMHI01_NAME1,WWDFM,ERLOS&$filter=KMHI01_NAME1 eq '"+selection_bar+"' and BEZEK eq '"+category+"'&$orderby=ERLOS desc&$top=10";
           });
            
          }
          else{  
          //   $('.detail_text').empty();
          $('.detail_text').append("Drilled down chart for "+category);
            $.ajaxPrefilter(function(options,originaloptions,xmll ) {
                    options.url = "http://localhost:8000/proxy/SDOP1/test1/data/copa.xsodata/analyticView?$format=json&$select=KMHI01_NAME1,WWDFM,ERLOS&$filter=BEZEK eq '"+category+"'&$orderby=ERLOS desc&$top=10";
        });
          
          }

      }
        
        function format2(n, currency) {
    return currency + " " + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        }