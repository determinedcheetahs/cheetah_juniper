$().ready(function(){
      $.ajax(
            {
    type: "GET",
    url: "http://localhost:8000/proxy/SDOP1/test1/data/copa.xsodata/analyticView?$format=json&$select=GJAHR",
    dataType: 'json',
    async: false,
    data: '{}',
     success: function(data){
          
          for(i=0;i<data.d.results.length;i++)
          {
            
             
                 $('.drop_menu').append('<li>'+
                    '<a href="#">'+data.d.results[i].GJAHR+'</a>'+'</li>');
         
          }
        
            }
        });

     $.ajax(
            {
    type: "GET",
    url: "http://localhost:8000/proxy/SDOP1/test1/data/copa.xsodata/analyticView?$format=json&$select=VKORG",
    dataType: 'json',
    async: false,
    data: '{}',
     success: function(data){
      //     $('#my-table > tbody').empty();
          for(i=0;i<data.d.results.length;i++)
          {
            
             
                 $('.drop_menu2').append('<li>'+
                    '<a href="#">'+data.d.results[i].VKORG+'</a>'+'</li>');
         
          }
        
            }
        });

     $.ajax(
            {
    type: "GET",
    url: "http://localhost:8000/proxy/SDOP1/test1/data/copa.xsodata/analyticView?$format=json&$select=PERDE",
    dataType: 'json',
    async: false,
    data: '{}',
     success: function(data){
      //     $('#my-table > tbody').empty();
          for(i=0;i<data.d.results.length;i++)
          {
            
             
                 $('.drop_menu3').append('<li>'+
                    '<a href="#">'+data.d.results[i].PERDE+'</a>'+'</li>');
         
          }
        
            }
        });

    });